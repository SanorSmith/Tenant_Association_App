<template>
  <BaseCard class="booking-card">
    <div class="booking-header">
      <div class="booking-info">
        <h3 class="booking-title">{{ getPremisesName(booking.premisesId) }}</h3>
        <div class="booking-meta">
          <div class="meta-item">
            <User class="w-4 h-4" />
            <span>{{ booking.requesterName }}</span>
          </div>
          <div class="meta-item">
            <Calendar class="w-4 h-4" />
            <span>{{ formatBookingDate(booking) }}</span>
          </div>
          <div class="meta-item">
            <Clock class="w-4 h-4" />
            <span>{{ booking.startTime }} - {{ booking.endTime }}</span>
          </div>
        </div>
      </div>
      <Badge :variant="getStatusVariant(booking.status)">
        {{ getStatusLabel(booking.status) }}
      </Badge>
    </div>

    <div class="booking-details">
      <div class="detail-row">
        <span class="detail-label">Syfte:</span>
        <span class="detail-value">{{ booking.purpose }}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Kontakt:</span>
        <div class="contact-info">
          <a :href="`mailto:${booking.requesterEmail}`" class="contact-link">
            <Mail class="w-4 h-4" />
            {{ booking.requesterEmail }}
          </a>
          <a :href="`tel:${booking.requesterPhone}`" class="contact-link">
            <Phone class="w-4 h-4" />
            {{ booking.requesterPhone }}
          </a>
        </div>
      </div>
    </div>

    <div class="booking-actions">
      <BaseButton
        variant="outline"
        size="sm"
        @click="$emit('review', booking)"
      >
        Visa detaljer
      </BaseButton>
      <BaseButton
        v-if="booking.status === 'pending'"
        variant="primary"
        size="sm"
        @click="$emit('approve', booking.id)"
      >
        <Check class="w-4 h-4" />
        Godkänn
      </BaseButton>
      <BaseButton
        v-if="booking.status === 'pending'"
        variant="outline"
        size="sm"
        @click="$emit('reject', booking.id)"
      >
        <X class="w-4 h-4" />
        Avvisa
      </BaseButton>
      <BaseButton
        variant="outline"
        size="sm"
        @click="$emit('contact', booking)"
      >
        <Mail class="w-4 h-4" />
        Kontakta
      </BaseButton>
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { User, Calendar, Clock, Mail, Phone, Check, X } from 'lucide-vue-next';
import { format } from 'date-fns';
import { sv } from 'date-fns/locale';
import BaseCard from '../common/BaseCard.vue';
import BaseButton from '../common/BaseButton.vue';
import Badge from '../ui/Badge.vue';
import { useMockDataStore } from '../../stores/mockData';
import type { Booking } from '../../types';

interface Props {
  booking: Booking;
}

const props = defineProps<Props>();

defineEmits<{
  'review': [booking: Booking];
  'approve': [bookingId: string];
  'reject': [bookingId: string];
  'contact': [booking: Booking];
}>();

const mockDataStore = useMockDataStore();
const { premises } = storeToRefs(mockDataStore);

const getPremisesName = (premisesId: string) => {
  const p = premises.value.find(pr => pr.id === premisesId);
  return p ? p.name : 'Okänd lokal';
};

const formatBookingDate = (booking: Booking) => {
  return format(new Date(booking.bookingDate), 'PPP', { locale: sv });
};

const getStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    pending: 'Väntande',
    approved: 'Godkänd',
    rejected: 'Avvisad',
  };
  return labels[status] || status;
};

const getStatusVariant = (status: string) => {
  const variants: Record<string, 'default' | 'success' | 'error'> = {
    pending: 'default',
    approved: 'success',
    rejected: 'error',
  };
  return variants[status] || 'default';
};
</script>

<style scoped>
.booking-card {
  transition: all var(--transition-fast);
}

.booking-card:hover {
  box-shadow: var(--shadow-md);
}

.booking-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1rem;
}

.booking-info {
  flex: 1;
}

.booking-title {
  font-size: 1.125rem;
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0 0 0.5rem 0;
}

.booking-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-text-secondary);
  font-size: 0.875rem;
}

.booking-details {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem;
  background: var(--color-background-secondary);
  border-radius: var(--radius-md);
  margin-bottom: 1rem;
}

.detail-row {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.detail-label {
  font-size: 0.875rem;
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-secondary);
}

.detail-value {
  color: var(--color-text-primary);
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.contact-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-primary);
  text-decoration: none;
  font-size: 0.875rem;
  transition: color var(--transition-fast);
}

.contact-link:hover {
  color: var(--color-primary-dark);
  text-decoration: underline;
}

.booking-actions {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .booking-meta {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>
