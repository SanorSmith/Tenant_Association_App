<template>
  <div class="activity-calendar">
    <div class="calendar-header">
      <BaseButton variant="outline" size="sm" @click="previousMonth">
        <ChevronLeft class="w-4 h-4" />
      </BaseButton>
      <h3 class="calendar-title">{{ formatMonth(currentDate) }}</h3>
      <BaseButton variant="outline" size="sm" @click="nextMonth">
        <ChevronRight class="w-4 h-4" />
      </BaseButton>
    </div>

    <div class="calendar-grid">
      <div v-for="day in weekDays" :key="day" class="calendar-day-header">
        {{ day }}
      </div>
      <div
        v-for="(day, index) in calendarDays"
        :key="index"
        :class="['calendar-day', {
          'other-month': !day.isCurrentMonth,
          'today': day.isToday,
          'has-activities': day.activities.length > 0
        }]"
        @click="handleDayClick(day.date)"
      >
        <span class="day-number">{{ day.dayNumber }}</span>
        <div v-if="day.activities.length > 0" class="activity-indicators">
          <div
            v-for="activity in day.activities.slice(0, 3)"
            :key="activity.id"
            :class="['activity-dot', `status-${activity.status}`]"
            :title="activity.title"
            @click.stop="$emit('activity-click', activity.id)"
          ></div>
          <span v-if="day.activities.length > 3" class="more-indicator">
            +{{ day.activities.length - 3 }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { ChevronLeft, ChevronRight } from 'lucide-vue-next';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, isSameDay, addMonths, subMonths, startOfWeek, endOfWeek } from 'date-fns';
import { sv } from 'date-fns/locale';
import BaseButton from '../common/BaseButton.vue';
import type { Activity } from '../../types';

interface Props {
  activities: Activity[];
}

const props = defineProps<Props>();

defineEmits<{
  'date-click': [date: Date];
  'activity-click': [activityId: string];
}>();

const currentDate = ref(new Date());

const weekDays = ['Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör', 'Sön'];

const calendarDays = computed(() => {
  const start = startOfWeek(startOfMonth(currentDate.value), { weekStartsOn: 1 });
  const end = endOfWeek(endOfMonth(currentDate.value), { weekStartsOn: 1 });
  const days = eachDayOfInterval({ start, end });

  return days.map(day => {
    const dayActivities = props.activities.filter(activity =>
      isSameDay(new Date(activity.activityDate), day)
    );

    return {
      date: day,
      dayNumber: format(day, 'd'),
      isCurrentMonth: isSameMonth(day, currentDate.value),
      isToday: isToday(day),
      activities: dayActivities,
    };
  });
});

const formatMonth = (date: Date) => {
  return format(date, 'MMMM yyyy', { locale: sv });
};

const previousMonth = () => {
  currentDate.value = subMonths(currentDate.value, 1);
};

const nextMonth = () => {
  currentDate.value = addMonths(currentDate.value, 1);
};

const handleDayClick = (date: Date) => {
  // Emit date click event
};
</script>

<style scoped>
.activity-calendar {
  width: 100%;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.calendar-title {
  font-size: 1.25rem;
  font-weight: var(--font-weight-semibold);
  text-transform: capitalize;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  background: var(--color-border);
  border: 1px solid var(--color-border);
}

.calendar-day-header {
  background: var(--color-background-secondary);
  padding: 0.75rem;
  text-align: center;
  font-weight: var(--font-weight-semibold);
  font-size: 0.875rem;
  color: var(--color-text-secondary);
}

.calendar-day {
  background: var(--color-background);
  padding: 0.75rem;
  min-height: 100px;
  cursor: pointer;
  transition: background var(--transition-fast);
  position: relative;
}

.calendar-day:hover {
  background: var(--color-background-secondary);
}

.calendar-day.other-month {
  opacity: 0.4;
}

.calendar-day.today {
  background: var(--color-primary-light);
}

.calendar-day.has-activities {
  border-left: 3px solid var(--color-primary);
}

.day-number {
  display: block;
  font-weight: var(--font-weight-medium);
  margin-bottom: 0.5rem;
}

.activity-indicators {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  align-items: center;
}

.activity-dot {
  width: 8px;
  height: 8px;
  border-radius: var(--radius-full);
  cursor: pointer;
}

.activity-dot.status-planned {
  background: var(--color-primary);
}

.activity-dot.status-ongoing {
  background: var(--color-warning);
}

.activity-dot.status-completed {
  background: var(--color-success);
}

.activity-dot.status-cancelled {
  background: var(--color-error);
}

.more-indicator {
  font-size: 0.75rem;
  color: var(--color-text-tertiary);
}

@media (max-width: 768px) {
  .calendar-day {
    min-height: 60px;
    padding: 0.5rem;
  }

  .day-number {
    font-size: 0.875rem;
  }
}
</style>
