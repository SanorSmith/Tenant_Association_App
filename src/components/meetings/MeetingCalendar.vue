<template>
  <div class="meeting-calendar">
    <div class="calendar-header">
      <div class="calendar-nav">
        <button class="nav-button" @click="previousMonth">
          <ChevronLeft class="w-5 h-5" />
        </button>
        <h2 class="current-month">{{ currentMonthYear }}</h2>
        <button class="nav-button" @click="nextMonth">
          <ChevronRight class="w-5 h-5" />
        </button>
      </div>
      <BaseButton variant="outline" size="sm" @click="goToToday">
        Idag
      </BaseButton>
    </div>

    <div class="calendar-grid">
      <div v-for="day in weekDays" :key="day" class="weekday-header">
        {{ day }}
      </div>

      <div
        v-for="(day, index) in calendarDays"
        :key="index"
        :class="getDayClasses(day)"
        @click="handleDayClick(day)"
      >
        <span class="day-number">{{ day.date }}</span>
        <div v-if="day.meetings.length > 0" class="day-meetings">
          <div
            v-for="meeting in day.meetings.slice(0, 2)"
            :key="meeting.id"
            :class="['meeting-dot', `meeting-${meeting.type}`]"
            :title="meeting.title"
            @click.stop="handleMeetingClick(meeting.id)"
          >
            {{ meeting.title }}
          </div>
          <div v-if="day.meetings.length > 2" class="more-meetings">
            +{{ day.meetings.length - 2 }} fler
          </div>
        </div>
      </div>
    </div>

    <div class="calendar-legend">
      <div class="legend-item">
        <span class="legend-dot meeting-board_meeting"></span>
        <span>Styrelsemöte</span>
      </div>
      <div class="legend-item">
        <span class="legend-dot meeting-annual_meeting"></span>
        <span>Årsmöte</span>
      </div>
      <div class="legend-item">
        <span class="legend-dot meeting-extraordinary_meeting"></span>
        <span>Extra möte</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { ChevronLeft, ChevronRight } from 'lucide-vue-next';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isToday, isSameDay, addMonths, subMonths } from 'date-fns';
import { sv } from 'date-fns/locale';
import BaseButton from '../common/BaseButton.vue';
import type { Meeting } from '../../types';

interface Props {
  meetings: Meeting[];
}

const props = defineProps<Props>();

const emit = defineEmits<{
  'date-click': [date: Date];
  'meeting-click': [meetingId: string];
}>();

const currentDate = ref(new Date());

const weekDays = ['Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör', 'Sön'];

const currentMonthYear = computed(() => {
  return format(currentDate.value, 'MMMM yyyy', { locale: sv });
});

interface CalendarDay {
  date: number;
  fullDate: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  meetings: Meeting[];
}

const calendarDays = computed(() => {
  const start = startOfMonth(currentDate.value);
  const end = endOfMonth(currentDate.value);
  
  const startDay = start.getDay() === 0 ? 6 : start.getDay() - 1;
  const days: CalendarDay[] = [];
  
  for (let i = 0; i < startDay; i++) {
    const date = new Date(start);
    date.setDate(date.getDate() - (startDay - i));
    days.push({
      date: date.getDate(),
      fullDate: date,
      isCurrentMonth: false,
      isToday: isToday(date),
      meetings: getMeetingsForDate(date),
    });
  }
  
  const monthDays = eachDayOfInterval({ start, end });
  monthDays.forEach(date => {
    days.push({
      date: date.getDate(),
      fullDate: date,
      isCurrentMonth: true,
      isToday: isToday(date),
      meetings: getMeetingsForDate(date),
    });
  });
  
  const remainingDays = 42 - days.length;
  for (let i = 1; i <= remainingDays; i++) {
    const date = new Date(end);
    date.setDate(date.getDate() + i);
    days.push({
      date: date.getDate(),
      fullDate: date,
      isCurrentMonth: false,
      isToday: isToday(date),
      meetings: getMeetingsForDate(date),
    });
  }
  
  return days;
});

const getMeetingsForDate = (date: Date): Meeting[] => {
  return props.meetings.filter(meeting => 
    isSameDay(new Date(meeting.date), date)
  );
};

const getDayClasses = (day: CalendarDay) => {
  return {
    'calendar-day': true,
    'other-month': !day.isCurrentMonth,
    'today': day.isToday,
    'has-meetings': day.meetings.length > 0,
  };
};

const handleDayClick = (day: CalendarDay) => {
  if (day.isCurrentMonth) {
    emit('date-click', day.fullDate);
  }
};

const handleMeetingClick = (meetingId: string) => {
  emit('meeting-click', meetingId);
};

const previousMonth = () => {
  currentDate.value = subMonths(currentDate.value, 1);
};

const nextMonth = () => {
  currentDate.value = addMonths(currentDate.value, 1);
};

const goToToday = () => {
  currentDate.value = new Date();
};
</script>

<style scoped>
.meeting-calendar {
  background: white;
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  box-shadow: var(--shadow-sm);
  width: 100%;
  max-width: 100%;
  overflow: hidden;
}

@media (max-width: 768px) {
  .meeting-calendar {
    padding: 1rem;
  }
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.calendar-nav {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.nav-button {
  padding: 0.5rem;
  background: transparent;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-button:hover {
  background: var(--color-background-secondary);
  border-color: var(--color-primary);
}

.current-month {
  font-size: 1.25rem;
  font-weight: var(--font-weight-semibold);
  text-transform: capitalize;
  margin: 0;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.5rem;
  width: 100%;
}

@media (max-width: 768px) {
  .calendar-grid {
    gap: 0.25rem;
  }
}

.weekday-header {
  padding: 0.75rem;
  text-align: center;
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-secondary);
  font-size: 0.875rem;
}

@media (max-width: 768px) {
  .weekday-header {
    padding: 0.5rem 0.25rem;
    font-size: 0.75rem;
  }
}

.calendar-day {
  min-height: 100px;
  padding: 0.5rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);
  position: relative;
}

.calendar-day:hover {
  border-color: var(--color-primary);
  background: var(--color-background-secondary);
}

.calendar-day.other-month {
  opacity: 0.4;
}

.calendar-day.today {
  background: var(--color-primary-light);
  border-color: var(--color-primary);
}

.day-number {
  display: block;
  font-weight: var(--font-weight-medium);
  margin-bottom: 0.25rem;
}

.day-meetings {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.meeting-dot {
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: var(--radius-sm);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: white;
}

.meeting-board_meeting {
  background: var(--color-primary);
}

.meeting-annual_meeting {
  background: var(--color-success);
}

.meeting-extraordinary_meeting {
  background: var(--color-warning);
}

.more-meetings {
  font-size: 0.75rem;
  color: var(--color-text-secondary);
  padding: 0.25rem;
}

.calendar-legend {
  display: flex;
  gap: 1.5rem;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--color-border);
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
}

.legend-dot {
  width: 1rem;
  height: 1rem;
  border-radius: var(--radius-sm);
}

@media (max-width: 768px) {
  .calendar-day {
    min-height: 60px;
    padding: 0.25rem;
    font-size: 0.75rem;
  }

  .day-number {
    font-size: 0.75rem;
  }

  .meeting-dot {
    font-size: 0.625rem;
    padding: 0.125rem 0.25rem;
  }

  .calendar-legend {
    flex-wrap: wrap;
    gap: 1rem;
  }

  .current-month {
    font-size: 1rem;
  }

  .calendar-header {
    margin-bottom: 1rem;
  }
}
</style>
