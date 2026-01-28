<template>
  <MainLayout>
    <div class="meetings-view">
      <div class="meetings-header">
        <h1 class="text-3xl font-bold text-text-primary">Möten</h1>
        <BaseButton variant="outline" @click="showCreateMeetingModal = true">
          <Calendar class="w-4 h-4" />
          Skapa möte
        </BaseButton>
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
              {{ tab.label }}
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
          </button>
        </div>
      </div>

      <div class="tab-content">
        <div v-if="activeTab === 'calendar'" class="calendar-tab">
          <MeetingCalendar
            :meetings="meetings"
            @date-click="handleDateClick"
            @meeting-click="handleMeetingClick"
          />
        </div>

        <div v-if="activeTab === 'upcoming'" class="meetings-list">
          <div v-if="upcomingMeetings.length === 0" class="empty-state">
            <Calendar class="w-12 h-12 text-text-tertiary" />
            <p class="text-text-secondary">Inga kommande möten planerade</p>
          </div>
          <MeetingCard
            v-for="meeting in upcomingMeetings"
            :key="meeting.id"
            :meeting="meeting"
            @view-details="viewMeetingDetails"
            @create-agenda="createAgenda"
          />
        </div>

        <div v-if="activeTab === 'past'" class="meetings-list">
          <div v-if="pastMeetings.length === 0" class="empty-state">
            <Calendar class="w-12 h-12 text-text-tertiary" />
            <p class="text-text-secondary">Inga tidigare möten</p>
          </div>
          <MeetingCard
            v-for="meeting in pastMeetings"
            :key="meeting.id"
            :meeting="meeting"
            @view-details="viewMeetingDetails"
          />
        </div>
      </div>

      <CreateMeetingModal
        v-model="showCreateMeetingModal"
        :selected-date="selectedDate"
        @meeting-created="handleMeetingCreated"
      />
    </div>
  </MainLayout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { Calendar } from 'lucide-vue-next';
import MainLayout from '../../components/layout/MainLayout.vue';
import BaseButton from '../../components/common/BaseButton.vue';
import MeetingCalendar from '../../components/meetings/MeetingCalendar.vue';
import MeetingCard from '../../components/meetings/MeetingCard.vue';
import CreateMeetingModal from '../../components/modals/CreateMeetingModal.vue';
import { useMockDataStore } from '../../stores/mockData';

const router = useRouter();
const mockDataStore = useMockDataStore();
const { meetings } = storeToRefs(mockDataStore);

const activeTab = ref('calendar');
const showCreateMeetingModal = ref(false);
const selectedDate = ref<Date | null>(null);

const tabs = [
  { id: 'calendar', label: 'Kalender' },
  { id: 'upcoming', label: 'Kommande möten' },
  { id: 'past', label: 'Tidigare möten' },
];

const upcomingMeetings = computed(() => {
  const now = new Date();
  return meetings.value
    .filter(m => new Date(m.date) >= now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
});

const pastMeetings = computed(() => {
  const now = new Date();
  return meetings.value
    .filter(m => new Date(m.date) < now)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
});

const handleDateClick = (date: Date) => {
  selectedDate.value = date;
  showCreateMeetingModal.value = true;
};

const handleMeetingClick = (meetingId: string) => {
  router.push(`/meetings/${meetingId}`);
};

const viewMeetingDetails = (meetingId: string) => {
  router.push(`/meetings/${meetingId}`);
};

const createAgenda = (meetingId: string) => {
  router.push(`/documents/create?type=agenda&meetingId=${meetingId}`);
};

const handleMeetingCreated = () => {
  selectedDate.value = null;
};

const handleTabChange = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  activeTab.value = target.value;
};
</script>

<style scoped>
.meetings-view {
  width: 100%;
}

.meetings-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.meetings-header h1 {
  margin: 0;
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
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  color: var(--color-text-secondary);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: all var(--transition-fast);
  margin-bottom: -2px;
}

.tab:hover {
  color: var(--color-text-primary);
  background: var(--color-background-secondary);
}

.tab.active {
  color: var(--color-primary);
  border-bottom-color: var(--color-primary);
}

.tab-content {
  min-height: 400px;
}

.meetings-list {
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
  .meetings-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
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
