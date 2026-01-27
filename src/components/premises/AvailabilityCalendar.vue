<template>
  <div class="availability-calendar">
    <div class="calendar-header">
      <BaseButton variant="outline" size="sm" @click="previousMonth">
        <ChevronLeft class="w-4 h-4" />
      </BaseButton>
      <h3 class="calendar-title">{{ formatMonth(currentDate) }}</h3>
      <BaseButton variant="outline" size="sm" @click="nextMonth">
        <ChevronRight class="w-4 h-4" />
      </BaseButton>
    </div>

    <div class="calendar-actions">
      <BaseButton variant="primary" size="sm" @click="$emit('set-availability')">
        <Settings class="w-4 h-4" />
        Ange tillgänglighet
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
          'available': day.status === 'available',
          'partially-booked': day.status === 'partially-booked',
          'fully-booked': day.status === 'fully-booked',
          'not-available': day.status === 'not-available'
        }]"
      >
        <span class="day-number">{{ day.dayNumber }}</span>
        <span class="status-label">{{ getStatusLabel(day.status) }}</span>
      </div>
    </div>

    <div class="calendar-legend">
      <div class="legend-item">
        <div class="legend-color available"></div>
        <span>Tillgänglig</span>
      </div>
      <div class="legend-item">
        <div class="legend-color partially-booked"></div>
        <span>Delvis bokad</span>
      </div>
      <div class="legend-item">
        <div class="legend-color fully-booked"></div>
        <span>Fullbokad</span>
      </div>
      <div class="legend-item">
        <div class="legend-color not-available"></div>
        <span>Ej tillgänglig</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { ChevronLeft, ChevronRight, Settings } from 'lucide-vue-next';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, isSameDay, addMonths, subMonths, startOfWeek, endOfWeek } from 'date-fns';
import { sv } from 'date-fns/locale';
import BaseButton from '../common/BaseButton.vue';
import type { Booking } from '../../types';

interface Props {
  premisesId: string;
  bookings: Booking[];
}

const props = defineProps<Props>();

defineEmits<{
  'set-availability': [];
}>();

const currentDate = ref(new Date());

const weekDays = ['Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör', 'Sön'];

const calendarDays = computed(() => {
  const start = startOfWeek(startOfMonth(currentDate.value), { weekStartsOn: 1 });
  const end = endOfWeek(endOfMonth(currentDate.value), { weekStartsOn: 1 });
  const days = eachDayOfInterval({ start, end });

  return days.map(day => {
    const dayBookings = props.bookings.filter(booking =>
      isSameDay(new Date(booking.bookingDate), day)
    );

    let status: 'available' | 'partially-booked' | 'fully-booked' | 'not-available' = 'available';
    
    if (dayBookings.length > 0) {
      const approvedBookings = dayBookings.filter(b => b.status === 'approved');
      if (approvedBookings.length > 0) {
        status = 'fully-booked';
      } else if (dayBookings.some(b => b.status === 'pending')) {
        status = 'partially-booked';
      }
    }

    return {
      date: day,
      dayNumber: format(day, 'd'),
      isCurrentMonth: isSameMonth(day, currentDate.value),
      isToday: isToday(day),
      status,
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

const getStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    available: 'Ledig',
    'partially-booked': 'Delvis',
    'fully-booked': 'Bokad',
    'not-available': 'Stängd',
  };
  return labels[status] || '';
};
</script>

<style scoped>
.availability-calendar {
  width: 100%;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.calendar-title {
  font-size: 1.125rem;
  font-weight: var(--font-weight-semibold);
  text-transform: capitalize;
}

.calendar-actions {
  margin-bottom: 1rem;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  background: var(--color-border);
  border: 1px solid var(--color-border);
  margin-bottom: 1rem;
}

.calendar-day-header {
  background: var(--color-background-secondary);
  padding: 0.5rem;
  text-align: center;
  font-weight: var(--font-weight-semibold);
  font-size: 0.875rem;
  color: var(--color-text-secondary);
}

.calendar-day {
  background: var(--color-background);
  padding: 0.5rem;
  min-height: 60px;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  position: relative;
}

.calendar-day.other-month {
  opacity: 0.4;
}

.calendar-day.today {
  font-weight: var(--font-weight-bold);
}

.calendar-day.available {
  background: rgba(34, 197, 94, 0.1);
}

.calendar-day.partially-booked {
  background: rgba(234, 179, 8, 0.1);
}

.calendar-day.fully-booked {
  background: rgba(239, 68, 68, 0.1);
}

.calendar-day.not-available {
  background: rgba(107, 114, 128, 0.1);
}

.day-number {
  font-weight: var(--font-weight-medium);
}

.status-label {
  font-size: 0.75rem;
  color: var(--color-text-tertiary);
}

.calendar-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1rem;
  background: var(--color-background-secondary);
  border-radius: var(--radius-md);
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
}

.legend-color {
  width: 1rem;
  height: 1rem;
  border-radius: var(--radius-sm);
}

.legend-color.available {
  background: rgba(34, 197, 94, 0.5);
}

.legend-color.partially-booked {
  background: rgba(234, 179, 8, 0.5);
}

.legend-color.fully-booked {
  background: rgba(239, 68, 68, 0.5);
}

.legend-color.not-available {
  background: rgba(107, 114, 128, 0.5);
}

@media (max-width: 768px) {
  .calendar-day {
    min-height: 50px;
    padding: 0.25rem;
  }

  .status-label {
    display: none;
  }
}
</style>
