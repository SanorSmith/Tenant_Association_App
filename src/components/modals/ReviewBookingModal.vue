<template>
  <BaseModal
    v-model="isOpen"
    title="Granska bokningsförfrågan"
    size="lg"
    @close="handleClose"
  >
    <div v-if="booking" class="review-content">
      <div class="info-section">
        <h3 class="section-title">Lokalinformation</h3>
        <div class="info-grid">
          <div class="info-item">
            <span class="info-label">Lokal:</span>
            <span class="info-value">{{ getPremisesName(booking.premisesId) }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Datum:</span>
            <span class="info-value">{{ formatDate(booking.bookingDate) }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Tid:</span>
            <span class="info-value">{{ booking.startTime }} - {{ booking.endTime }}</span>
          </div>
        </div>
      </div>

      <div class="info-section">
        <h3 class="section-title">Sökande</h3>
        <div class="info-grid">
          <div class="info-item">
            <span class="info-label">Namn:</span>
            <span class="info-value">{{ booking.requesterName }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">E-post:</span>
            <a :href="`mailto:${booking.requesterEmail}`" class="contact-link">
              {{ booking.requesterEmail }}
            </a>
          </div>
          <div class="info-item">
            <span class="info-label">Telefon:</span>
            <a :href="`tel:${booking.requesterPhone}`" class="contact-link">
              {{ booking.requesterPhone }}
            </a>
          </div>
          <div class="info-item">
            <span class="info-label">Syfte:</span>
            <span class="info-value">{{ booking.purpose }}</span>
          </div>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Anteckningar (valfritt)</label>
        <textarea
          v-model="notes"
          class="form-textarea"
          rows="3"
          placeholder="Lägg till anteckningar om bokningen..."
        ></textarea>
      </div>

      <div class="notification-info">
        <Info class="w-5 h-5 text-info" />
        <p class="text-sm text-text-secondary">
          Sökande kommer att meddelas via e-post och SMS om din beslut.
        </p>
      </div>
    </div>

    <template #footer>
      <BaseButton variant="outline" @click="handleClose">
        Stäng
      </BaseButton>
      <BaseButton
        v-if="booking?.status === 'pending'"
        variant="outline"
        :loading="loading"
        @click="handleReject"
      >
        <X class="w-4 h-4" />
        Avvisa
      </BaseButton>
      <BaseButton
        v-if="booking?.status === 'pending'"
        variant="primary"
        :loading="loading"
        @click="handleApprove"
      >
        <Check class="w-4 h-4" />
        Godkänn
      </BaseButton>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { Check, X, Info } from 'lucide-vue-next';
import { format } from 'date-fns';
import { sv } from 'date-fns/locale';
import BaseModal from '../common/BaseModal.vue';
import BaseButton from '../common/BaseButton.vue';
import { useMockDataStore } from '../../stores/mockData';
import type { Booking } from '../../types';

interface Props {
  modelValue: boolean;
  booking?: Booking | null;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
  'booking-updated': [];
}>();

const mockDataStore = useMockDataStore();
const { bookings, premises } = storeToRefs(mockDataStore);

const isOpen = ref(props.modelValue);
const loading = ref(false);
const notes = ref('');

watch(() => props.modelValue, (newVal) => {
  isOpen.value = newVal;
  if (newVal) {
    notes.value = '';
  }
});

watch(isOpen, (newVal) => {
  emit('update:modelValue', newVal);
});

const getPremisesName = (premisesId: string) => {
  const p = premises.value.find(pr => pr.id === premisesId);
  return p ? p.name : 'Okänd lokal';
};

const formatDate = (date: Date) => {
  return format(new Date(date), 'PPP', { locale: sv });
};

const handleApprove = async () => {
  if (!props.booking) return;
  
  loading.value = true;
  
  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const booking = bookings.value.find(b => b.id === props.booking!.id);
    if (booking) {
      booking.status = 'approved';
    }
    
    // Mock notification sending
    console.log('Sending approval notification to:', props.booking.requesterEmail);
    console.log('Notes:', notes.value);
    
    emit('booking-updated');
    isOpen.value = false;
  } finally {
    loading.value = false;
  }
};

const handleReject = async () => {
  if (!props.booking) return;
  
  if (!confirm('Är du säker på att du vill avvisa denna bokning?')) {
    return;
  }
  
  loading.value = true;
  
  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const booking = bookings.value.find(b => b.id === props.booking!.id);
    if (booking) {
      booking.status = 'rejected';
    }
    
    // Mock notification sending
    console.log('Sending rejection notification to:', props.booking.requesterEmail);
    console.log('Notes:', notes.value);
    
    emit('booking-updated');
    isOpen.value = false;
  } finally {
    loading.value = false;
  }
};

const handleClose = () => {
  isOpen.value = false;
};
</script>

<style scoped>
.review-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.info-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.section-title {
  font-size: 1.125rem;
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  padding: 1rem;
  background: var(--color-background-secondary);
  border-radius: var(--radius-md);
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.info-label {
  font-size: 0.875rem;
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-secondary);
}

.info-value {
  color: var(--color-text-primary);
}

.contact-link {
  color: var(--color-primary);
  text-decoration: none;
  transition: color var(--transition-fast);
}

.contact-link:hover {
  color: var(--color-primary-dark);
  text-decoration: underline;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
  font-size: 0.875rem;
}

.form-textarea {
  padding: 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-family: inherit;
  font-size: 1rem;
  transition: all var(--transition-fast);
  resize: vertical;
}

.form-textarea:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px var(--color-primary-light);
}

.notification-info {
  display: flex;
  gap: 0.75rem;
  padding: 1rem;
  background: var(--color-info-light);
  border-radius: var(--radius-md);
  border-left: 4px solid var(--color-info);
}
</style>
