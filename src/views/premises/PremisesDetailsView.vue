<template>
  <MainLayout>
    <div v-if="premises" class="premises-details-view">
      <div class="details-header">
        <div>
          <h1 class="text-3xl font-bold text-text-primary">{{ premises.name }}</h1>
          <p class="text-text-secondary">{{ premises.address }}</p>
        </div>
        <div class="header-actions">
          <Badge :variant="premises.isPublic ? 'success' : 'default'">
            {{ premises.isPublic ? 'Publik' : 'Privat' }}
          </Badge>
          <BaseButton
            v-if="canEdit"
            variant="outline"
            @click="editPremises"
          >
            <Edit class="w-4 h-4" />
            Redigera
          </BaseButton>
        </div>
      </div>

      <div class="details-content">
        <div class="info-section">
          <BaseCard title="Information">
            <div class="info-grid">
              <div class="info-item">
                <span class="info-label">Typ av lokal:</span>
                <Badge variant="primary">{{ premises.spaceType }}</Badge>
              </div>
              <div class="info-item">
                <span class="info-label">Kapacitet:</span>
                <span class="info-value">{{ premises.capacity }} personer</span>
              </div>
              <div class="info-item">
                <span class="info-label">Avsedd användning:</span>
                <span class="info-value">{{ premises.intendedUse }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Regler:</span>
                <span class="info-value">{{ premises.rules }}</span>
              </div>
            </div>
          </BaseCard>

          <BaseCard title="Bildgalleri">
            <div class="image-gallery">
              <div class="image-placeholder">
                <ImageIcon class="w-12 h-12 text-text-tertiary" />
                <p class="text-text-secondary">Inga bilder uppladdade</p>
              </div>
            </div>
          </BaseCard>
        </div>

        <div class="availability-section">
          <BaseCard title="Tillgänglighet">
            <AvailabilityCalendar
              :premises-id="premises.id"
              :bookings="relatedBookings"
              @set-availability="handleSetAvailability"
            />
          </BaseCard>

          <BaseCard title="Bokningar">
            <div class="bookings-list">
              <div
                v-for="booking in relatedBookings"
                :key="booking.id"
                class="booking-item"
              >
                <div class="booking-info">
                  <p class="booking-requester">{{ booking.requesterName }}</p>
                  <p class="booking-date">{{ formatBookingDate(booking) }}</p>
                </div>
                <Badge :variant="getBookingStatusVariant(booking.status)">
                  {{ getBookingStatusLabel(booking.status) }}
                </Badge>
              </div>
              <div v-if="relatedBookings.length === 0" class="empty-bookings">
                <p class="text-text-secondary">Inga bokningar</p>
              </div>
            </div>
          </BaseCard>
        </div>
      </div>
    </div>

    <div v-else class="not-found">
      <p class="text-text-secondary">Lokalen hittades inte</p>
      <BaseButton variant="outline" @click="$router.push('/premises')">
        Tillbaka till lokaler
      </BaseButton>
    </div>

    <SetAvailabilityModal
      v-model="showAvailabilityModal"
      :premises-id="premises?.id"
      @availability-saved="handleAvailabilitySaved"
    />
  </MainLayout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { Edit, Image as ImageIcon } from 'lucide-vue-next';
import { format } from 'date-fns';
import { sv } from 'date-fns/locale';
import MainLayout from '../../components/layout/MainLayout.vue';
import BaseCard from '../../components/common/BaseCard.vue';
import BaseButton from '../../components/common/BaseButton.vue';
import Badge from '../../components/ui/Badge.vue';
import AvailabilityCalendar from '../../components/premises/AvailabilityCalendar.vue';
import SetAvailabilityModal from '../../components/modals/SetAvailabilityModal.vue';
import { useMockDataStore } from '../../stores/mockData';

const route = useRoute();
const router = useRouter();
const mockDataStore = useMockDataStore();
const { premises: premisesList, bookings, currentUser } = storeToRefs(mockDataStore);

const showAvailabilityModal = ref(false);

const premises = computed(() => {
  return premisesList.value.find(p => p.id === route.params.id);
});

const relatedBookings = computed(() => {
  if (!premises.value) return [];
  return bookings.value.filter(b => b.premisesId === premises.value!.id);
});

const canEdit = computed(() => currentUser.value.role === 'administrator');

const formatBookingDate = (booking: any) => {
  const date = new Date(booking.bookingDate);
  return `${format(date, 'PPP', { locale: sv })} ${booking.startTime}-${booking.endTime}`;
};

const getBookingStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    pending: 'Väntande',
    approved: 'Godkänd',
    rejected: 'Avvisad',
  };
  return labels[status] || status;
};

const getBookingStatusVariant = (status: string) => {
  const variants: Record<string, 'default' | 'success' | 'error'> = {
    pending: 'default',
    approved: 'success',
    rejected: 'error',
  };
  return variants[status] || 'default';
};

const editPremises = () => {
  router.push('/premises');
};

const handleSetAvailability = () => {
  showAvailabilityModal.value = true;
};

const handleAvailabilitySaved = () => {
  showAvailabilityModal.value = false;
};
</script>

<style scoped>
.premises-details-view {
  width: 100%;
}

.details-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
  gap: 1rem;
}

.header-actions {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.details-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.info-section,
.availability-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.info-grid {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.info-label {
  font-size: 0.875rem;
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-secondary);
}

.info-value {
  color: var(--color-text-primary);
  line-height: 1.6;
}

.image-gallery {
  min-height: 200px;
}

.image-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  border: 2px dashed var(--color-border);
  border-radius: var(--radius-md);
  gap: 1rem;
}

.bookings-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.booking-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: var(--color-background-secondary);
  border-radius: var(--radius-md);
}

.booking-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.booking-requester {
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
}

.booking-date {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
}

.empty-bookings {
  text-align: center;
  padding: 2rem;
}

.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem;
  gap: 1rem;
}

@media (max-width: 1024px) {
  .details-content {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .details-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .header-actions {
    flex-direction: column;
    width: 100%;
  }
}
</style>
