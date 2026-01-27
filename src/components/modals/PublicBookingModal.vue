<template>
  <BaseModal
    v-model="isOpen"
    :title="`Boka ${premises?.name}`"
    size="lg"
    @close="handleClose"
  >
    <form v-if="premises" @submit.prevent="handleSubmit" class="booking-form">
      <div class="premises-info">
        <h3 class="info-title">{{ premises.name }}</h3>
        <p class="info-address">{{ premises.address }}</p>
        <div class="info-details">
          <Badge variant="primary">{{ premises.spaceType }}</Badge>
          <span class="capacity">Max {{ premises.capacity }} personer</span>
        </div>
      </div>

      <div class="form-divider"></div>

      <h4 class="section-title">Dina uppgifter</h4>

      <BaseInput
        v-model="formData.requesterName"
        label="Namn"
        placeholder="För- och efternamn"
        :error="errors.requesterName"
        required
      />

      <div class="form-row">
        <BaseInput
          v-model="formData.requesterEmail"
          type="email"
          label="E-post"
          placeholder="din.epost@example.se"
          :error="errors.requesterEmail"
          required
        />
        <BaseInput
          v-model="formData.requesterPhone"
          type="tel"
          label="Telefon"
          placeholder="+46701234567"
          :error="errors.requesterPhone"
          required
        />
      </div>

      <h4 class="section-title">Bokningsdetaljer</h4>

      <div class="form-row">
        <BaseInput
          v-model="formData.bookingDate"
          type="date"
          label="Datum"
          :error="errors.bookingDate"
          required
        />
        <div class="time-inputs">
          <BaseInput
            v-model="formData.startTime"
            type="time"
            label="Starttid"
            :error="errors.startTime"
            required
          />
          <span class="time-separator">-</span>
          <BaseInput
            v-model="formData.endTime"
            type="time"
            label="Sluttid"
            :error="errors.endTime"
            required
          />
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Syfte med bokningen</label>
        <textarea
          v-model="formData.purpose"
          class="form-textarea"
          rows="3"
          placeholder="Beskriv vad lokalen ska användas till..."
          required
        ></textarea>
        <span v-if="errors.purpose" class="error-message">{{ errors.purpose }}</span>
      </div>

      <div class="info-box">
        <Info class="w-5 h-5 text-info" />
        <div>
          <p class="info-box-title">Bokningsprocess</p>
          <p class="info-box-text">
            Din bokningsförfrågan kommer att granskas av föreningens administratör. 
            Du får besked via e-post och SMS inom 2-3 arbetsdagar.
          </p>
        </div>
      </div>

      <div class="form-group">
        <label class="checkbox-label">
          <input
            v-model="formData.acceptRules"
            type="checkbox"
            class="checkbox"
            required
          />
          <span>
            Jag har läst och accepterar lokalens regler: {{ premises.rules }}
          </span>
        </label>
        <span v-if="errors.acceptRules" class="error-message">{{ errors.acceptRules }}</span>
      </div>
    </form>

    <template #footer>
      <BaseButton variant="outline" @click="handleClose">
        Avbryt
      </BaseButton>
      <BaseButton variant="primary" :loading="loading" @click="handleSubmit">
        Skicka bokningsförfrågan
      </BaseButton>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { Info } from 'lucide-vue-next';
import BaseModal from '../common/BaseModal.vue';
import BaseInput from '../common/BaseInput.vue';
import BaseButton from '../common/BaseButton.vue';
import Badge from '../ui/Badge.vue';
import { useMockDataStore } from '../../stores/mockData';
import type { Premises, Booking } from '../../types';

interface Props {
  modelValue: boolean;
  premises?: Premises | null;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
  'booking-submitted': [];
}>();

const mockDataStore = useMockDataStore();
const { bookings } = storeToRefs(mockDataStore);

const isOpen = ref(props.modelValue);
const loading = ref(false);

const formData = reactive({
  requesterName: '',
  requesterEmail: '',
  requesterPhone: '',
  bookingDate: '',
  startTime: '',
  endTime: '',
  purpose: '',
  acceptRules: false,
});

const errors = reactive({
  requesterName: '',
  requesterEmail: '',
  requesterPhone: '',
  bookingDate: '',
  startTime: '',
  endTime: '',
  purpose: '',
  acceptRules: '',
});

watch(() => props.modelValue, (newVal) => {
  isOpen.value = newVal;
  if (newVal) {
    resetForm();
  }
});

watch(isOpen, (newVal) => {
  emit('update:modelValue', newVal);
});

const resetForm = () => {
  formData.requesterName = '';
  formData.requesterEmail = '';
  formData.requesterPhone = '';
  formData.bookingDate = '';
  formData.startTime = '';
  formData.endTime = '';
  formData.purpose = '';
  formData.acceptRules = false;
  
  Object.keys(errors).forEach(key => {
    errors[key as keyof typeof errors] = '';
  });
};

const validateForm = () => {
  let isValid = true;
  
  Object.keys(errors).forEach(key => {
    errors[key as keyof typeof errors] = '';
  });
  
  if (!formData.requesterName.trim()) {
    errors.requesterName = 'Ange ditt namn';
    isValid = false;
  }
  
  if (!formData.requesterEmail.trim()) {
    errors.requesterEmail = 'Ange din e-post';
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.requesterEmail)) {
    errors.requesterEmail = 'Ange en giltig e-postadress';
    isValid = false;
  }
  
  if (!formData.requesterPhone.trim()) {
    errors.requesterPhone = 'Ange ditt telefonnummer';
    isValid = false;
  }
  
  if (!formData.bookingDate) {
    errors.bookingDate = 'Välj datum';
    isValid = false;
  } else {
    const selectedDate = new Date(formData.bookingDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      errors.bookingDate = 'Datum kan inte vara i det förflutna';
      isValid = false;
    }
  }
  
  if (!formData.startTime) {
    errors.startTime = 'Välj starttid';
    isValid = false;
  }
  
  if (!formData.endTime) {
    errors.endTime = 'Välj sluttid';
    isValid = false;
  }
  
  if (formData.startTime && formData.endTime && formData.startTime >= formData.endTime) {
    errors.endTime = 'Sluttid måste vara efter starttid';
    isValid = false;
  }
  
  if (!formData.purpose.trim()) {
    errors.purpose = 'Beskriv syftet med bokningen';
    isValid = false;
  }
  
  if (!formData.acceptRules) {
    errors.acceptRules = 'Du måste acceptera lokalens regler';
    isValid = false;
  }
  
  return isValid;
};

const handleSubmit = async () => {
  if (!validateForm() || !props.premises) {
    return;
  }
  
  loading.value = true;
  
  try {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newBooking: Booking = {
      id: `booking-${Date.now()}`,
      premisesId: props.premises.id,
      requesterName: formData.requesterName,
      requesterEmail: formData.requesterEmail,
      requesterPhone: formData.requesterPhone,
      bookingDate: new Date(formData.bookingDate),
      startTime: formData.startTime,
      endTime: formData.endTime,
      purpose: formData.purpose,
      status: 'pending',
    };
    
    bookings.value.push(newBooking);
    
    alert(`✅ Bokningsförfrågan skickad!\n\nTack ${formData.requesterName}! Din bokningsförfrågan har skickats till föreningens administratör.\n\nDu kommer att få besked via e-post (${formData.requesterEmail}) och SMS (${formData.requesterPhone}) inom 2-3 arbetsdagar.`);
    
    emit('booking-submitted');
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
.booking-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.premises-info {
  padding: 1.5rem;
  background: var(--color-background-secondary);
  border-radius: var(--radius-md);
}

.info-title {
  font-size: 1.25rem;
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0 0 0.25rem 0;
}

.info-address {
  color: var(--color-text-secondary);
  margin: 0 0 0.75rem 0;
}

.info-details {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.capacity {
  color: var(--color-text-secondary);
  font-size: 0.875rem;
}

.form-divider {
  height: 1px;
  background: var(--color-border);
}

.section-title {
  font-size: 1.125rem;
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.time-inputs {
  display: flex;
  align-items: flex-end;
  gap: 0.5rem;
}

.time-separator {
  padding-bottom: 0.5rem;
  color: var(--color-text-secondary);
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

.error-message {
  color: var(--color-error);
  font-size: 0.875rem;
}

.info-box {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: var(--color-info-light);
  border-radius: var(--radius-md);
  border-left: 4px solid var(--color-info);
}

.info-box-title {
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0 0 0.25rem 0;
}

.info-box-text {
  color: var(--color-text-secondary);
  font-size: 0.875rem;
  line-height: 1.6;
  margin: 0;
}

.checkbox-label {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  cursor: pointer;
  user-select: none;
}

.checkbox {
  width: 1.25rem;
  height: 1.25rem;
  margin-top: 0.125rem;
  cursor: pointer;
  flex-shrink: 0;
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }

  .time-inputs {
    flex-direction: column;
    align-items: stretch;
  }

  .time-separator {
    display: none;
  }
}
</style>
