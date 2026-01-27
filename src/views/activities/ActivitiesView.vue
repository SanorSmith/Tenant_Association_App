<template>
  <MainLayout>
    <div class="activities-view">
      <div class="activities-header">
        <h1 class="text-3xl font-bold text-text-primary">Aktiviteter</h1>
        <BaseButton variant="primary" @click="showCreateModal = true">
          <Plus class="w-4 h-4" />
          Ny aktivitet
        </BaseButton>
      </div>

      <div class="tabs">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          :class="['tab', { active: activeTab === tab.id }]"
          @click="activeTab = tab.id"
        >
          {{ tab.label }}
        </button>
      </div>

      <div v-if="activeTab === 'list'" class="activities-list">
        <ActivityCard
          v-for="activity in sortedActivities"
          :key="activity.id"
          :activity="activity"
          @view="viewActivity"
          @edit="editActivity"
          @delete="deleteActivity"
          @mark-complete="markComplete"
        />
        <div v-if="activities.length === 0" class="empty-state">
          <Calendar class="w-12 h-12 text-text-tertiary" />
          <p class="text-text-secondary">Inga aktiviteter planerade</p>
        </div>
      </div>

      <div v-else class="activities-calendar">
        <ActivityCalendar
          :activities="activities"
          @date-click="handleDateClick"
          @activity-click="viewActivity"
        />
      </div>
    </div>

    <CreateActivityModal
      v-model="showCreateModal"
      :activity="editingActivity"
      @activity-saved="handleActivitySaved"
    />
  </MainLayout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { Plus, Calendar } from 'lucide-vue-next';
import MainLayout from '../../components/layout/MainLayout.vue';
import BaseButton from '../../components/common/BaseButton.vue';
import ActivityCard from '../../components/activities/ActivityCard.vue';
import ActivityCalendar from '../../components/activities/ActivityCalendar.vue';
import CreateActivityModal from '../../components/modals/CreateActivityModal.vue';
import { useMockDataStore } from '../../stores/mockData';
import type { Activity } from '../../types';

const router = useRouter();
const mockDataStore = useMockDataStore();
const { activities } = storeToRefs(mockDataStore);

const activeTab = ref('list');
const showCreateModal = ref(false);
const editingActivity = ref<Activity | null>(null);

const tabs = [
  { id: 'list', label: 'Lista' },
  { id: 'calendar', label: 'Kalender' },
];

const sortedActivities = computed(() => {
  return [...activities.value].sort((a, b) => {
    return new Date(a.activityDate).getTime() - new Date(b.activityDate).getTime();
  });
});

const viewActivity = (activityId: string) => {
  router.push(`/activities/${activityId}`);
};

const editActivity = (activity: Activity) => {
  editingActivity.value = activity;
  showCreateModal.value = true;
};

const deleteActivity = (activityId: string) => {
  if (confirm('Är du säker på att du vill ta bort denna aktivitet?')) {
    const index = activities.value.findIndex(a => a.id === activityId);
    if (index > -1) {
      activities.value.splice(index, 1);
    }
  }
};

const markComplete = (activityId: string) => {
  const activity = activities.value.find(a => a.id === activityId);
  if (activity) {
    activity.status = 'completed';
  }
};

const handleDateClick = (date: Date) => {
  // Could open create modal with pre-filled date
  console.log('Date clicked:', date);
};

const handleActivitySaved = () => {
  showCreateModal.value = false;
  editingActivity.value = null;
};
</script>

<style scoped>
.activities-view {
  width: 100%;
}

.activities-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
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
}

.tab:hover {
  color: var(--color-text-primary);
  background: var(--color-background-secondary);
}

.tab.active {
  color: var(--color-primary);
  border-bottom-color: var(--color-primary);
}

.activities-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
}

.empty-state {
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  gap: 1rem;
}

@media (max-width: 768px) {
  .activities-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .activities-list {
    grid-template-columns: 1fr;
  }
}
</style>
