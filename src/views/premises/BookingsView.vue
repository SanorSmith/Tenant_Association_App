<template>
  <MainLayout>
    <div class="bookings-view">
      <div class="bookings-header">
        <h1 class="text-3xl font-bold text-text-primary">Bokningsförfrågningar</h1>
      </div>

      <div class="tabs">
        <!-- Mobile Dropdown -->
        <div class="mobile-tabs-dropdown md:hidden">
          <select 
            v-model="activeTab" 
            class="tab-select"
            @change="handleTabChange"
          >
            <option 
              v-for="tab in tabs" 
              :key="tab.id" 
              :value="tab.id"
            >
              {{ tab.label }} {{ getTabCount(tab.id) > 0 ? `(${getTabCount(tab.id)})` : '' }}
            </option>
          </select>
        </div>

        <!-- Desktop Tabs -->
        <div class="desktop-tabs hidden md:flex">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            :class="['tab', { active: activeTab === tab.id }]"
            @click="activeTab = tab.id"
          >
            {{ tab.label }}
            <Badge v-if="getTabCount(tab.id) > 0" variant="primary" size="sm">
              {{ getTabCount(tab.id) }}
            </Badge>
          </button>
        </div>
      </div>

      <div class="bookings-filters">
        <BaseInput
          v-model="searchQuery"
          placeholder="Sök efter namn..."
          class="search-input"
        >
          <template #prefix>
            <Search class="w-4 h-4 text-text-tertiary" />
          </template>
        </BaseInput>
        <BaseSelect
          v-model="selectedPremises"
          :options="premisesOptions"
          placeholder="Alla lokaler"
        />
      </div>

      <div class="bookings-list">
        <BookingRequestCard
          v-for="booking in filteredBookings"
          :key="booking.id"
          :booking="booking"
          @review="reviewBooking"
          @approve="approveBooking"
          @reject="rejectBooking"
          @contact="contactRequester"
        />
        <div v-if="filteredBookings.length === 0" class="empty-state">
          <Calendar class="w-12 h-12 text-text-tertiary" />
          <p class="text-text-secondary">Inga bokningsförfrågningar</p>
        </div>
      </div>
    </div>

    <ReviewBookingModal
      v-model="showReviewModal"
      :booking="reviewingBooking"
      @booking-updated="handleBookingUpdated"
    />
  </MainLayout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { Calendar, Search } from 'lucide-vue-next';
import MainLayout from '../../components/layout/MainLayout.vue';
import BaseInput from '../../components/common/BaseInput.vue';
import BaseSelect from '../../components/common/BaseSelect.vue';
import Badge from '../../components/ui/Badge.vue';
import BookingRequestCard from '../../components/premises/BookingRequestCard.vue';
import ReviewBookingModal from '../../components/modals/ReviewBookingModal.vue';
import { useMockDataStore } from '../../stores/mockData';
import type { Booking } from '../../types';

const mockDataStore = useMockDataStore();
const { bookings, premises } = storeToRefs(mockDataStore);

const activeTab = ref('pending');
const searchQuery = ref('');
const selectedPremises = ref('');
const showReviewModal = ref(false);
const reviewingBooking = ref<Booking | null>(null);

const tabs = [
  { id: 'pending', label: 'Väntande' },
  { id: 'approved', label: 'Godkända' },
  { id: 'rejected', label: 'Avvisade' },
  { id: 'all', label: 'Alla' },
];

const premisesOptions = computed(() => {
  return [
    { value: '', label: 'Alla lokaler' },
    ...premises.value.map(p => ({ value: p.id, label: p.name })),
  ];
});

const filteredBookings = computed(() => {
  let filtered = bookings.value;

  // Filter by tab
  if (activeTab.value !== 'all') {
    filtered = filtered.filter(b => b.status === activeTab.value);
  }

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(b =>
      b.requesterName.toLowerCase().includes(query)
    );
  }

  // Filter by premises
  if (selectedPremises.value) {
    filtered = filtered.filter(b => b.premisesId === selectedPremises.value);
  }

  return filtered;
});

const getTabCount = (tabId: string) => {
  if (tabId === 'all') return bookings.value.length;
  return bookings.value.filter(b => b.status === tabId).length;
};

const reviewBooking = (booking: Booking) => {
  reviewingBooking.value = booking;
  showReviewModal.value = true;
};

const approveBooking = (bookingId: string) => {
  mockDataStore.approveBooking(bookingId, mockDataStore.currentUser.fullName);
};

const rejectBooking = (bookingId: string) => {
  const reason = prompt('Ange anledning till avslag (valfritt):');
  mockDataStore.rejectBooking(bookingId, mockDataStore.currentUser.fullName, reason || 'Ingen anledning angiven');
};

const contactRequester = (booking: Booking) => {
  window.location.href = `mailto:${booking.requesterEmail}`;
};

const handleBookingUpdated = () => {
  showReviewModal.value = false;
  reviewingBooking.value = null;
};

const handleTabChange = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  activeTab.value = target.value;
};
</script>

<style scoped>
.bookings-view {
  width: 100%;
}

.bookings-header {
  margin-bottom: 2rem;
}

.tabs {
  display: flex;
  gap: 0.5rem;
  border-bottom: 2px solid var(--color-border);
  margin-bottom: 2rem;
}

.tab {
  padding: 0.75rem 1.5rem;
  background: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  color: var(--color-text-secondary);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: all var(--transition-fast);
  margin-bottom: -2px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.tab:hover {
  color: var(--color-text-primary);
  background: var(--color-background-secondary);
}

.tab.active {
  color: var(--color-primary);
  border-bottom-color: var(--color-primary);
}

.bookings-filters {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.search-input {
  flex: 1;
  max-width: 400px;
}

.bookings-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  gap: 1rem;
}

/* Mobile Dropdown Styles */
.mobile-tabs-dropdown {
  width: 100%;
}

.tab-select {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid var(--color-border);
  border-radius: var(--radius-md);
  background: white;
  color: var(--color-text-primary);
  font-size: 1rem;
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.tab-select:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(0, 95, 115, 0.1);
}

.tab-select option {
  padding: 0.5rem;
  background: white;
  color: var(--color-text-primary);
}

/* Desktop Tabs Styles */
.desktop-tabs {
  width: 100%;
}

@media (max-width: 768px) {
  .bookings-filters {
    flex-direction: column;
  }

  .search-input {
    max-width: 100%;
  }

  .tabs {
    flex-direction: column;
    border-bottom: none;
    margin-bottom: 1rem;
  }

  .tab {
    display: none; /* Hide desktop tabs on mobile */
  }
}
</style>
