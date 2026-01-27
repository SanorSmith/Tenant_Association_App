<template>
  <BaseModal
    v-model="isOpen"
    title="Skapa nytt möte"
    size="lg"
    @close="handleClose"
  >
    <form @submit.prevent="handleSubmit" class="create-meeting-form">
      <BaseSelect
        v-model="formData.type"
        label="Mötestyp"
        :options="meetingTypeOptions"
        placeholder="Välj mötestyp"
        :error="errors.type"
        required
      />

      <BaseInput
        v-model="formData.title"
        label="Mötesbeskrivning"
        placeholder="T.ex. Styrelsemöte januari 2025"
        :error="errors.title"
        required
      />

      <div class="form-row">
        <BaseInput
          v-model="formData.date"
          type="date"
          label="Datum"
          :error="errors.date"
          required
        />
        <BaseInput
          v-model="formData.time"
          type="time"
          label="Tid"
          :error="errors.time"
          required
        />
      </div>

      <BaseInput
        v-model="formData.location"
        label="Plats"
        placeholder="Adress eller 'Online'"
        :error="errors.location"
        required
      />

      <div class="form-group">
        <label class="form-label">Beskrivning</label>
        <textarea
          v-model="formData.description"
          class="form-textarea"
          rows="3"
          placeholder="Ytterligare information om mötet..."
        ></textarea>
      </div>

      <div class="form-group">
        <label class="form-label">Deltagare</label>
        <div class="attendees-list">
          <label
            v-for="member in boardMembers"
            :key="member.id"
            class="attendee-checkbox"
          >
            <input
              type="checkbox"
              :value="member.id"
              :checked="formData.attendees.includes(member.id)"
              @change="toggleAttendee(member.id)"
            />
            <span>{{ member.fullName }} ({{ getRoleLabel(member.role) }})</span>
          </label>
        </div>
        <p v-if="errors.attendees" class="error-message">{{ errors.attendees }}</p>
      </div>

      <div class="notification-info">
        <Info class="w-4 h-4" />
        <span>Inbjudningar kommer att skickas via email/SMS till valda deltagare</span>
      </div>
    </form>

    <template #footer>
      <BaseButton variant="outline" @click="handleClose">
        Avbryt
      </BaseButton>
      <BaseButton variant="primary" :loading="loading" @click="handleSubmit">
        Skapa möte
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
import BaseSelect from '../common/BaseSelect.vue';
import BaseButton from '../common/BaseButton.vue';
import { useMockDataStore } from '../../stores/mockData';
import type { UserRole } from '../../types';

interface Props {
  modelValue: boolean;
  selectedDate?: Date | null;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
  'meeting-created': [];
}>();

const mockDataStore = useMockDataStore();
const { boardMembers } = storeToRefs(mockDataStore);

const isOpen = ref(props.modelValue);
const loading = ref(false);

const formData = reactive({
  type: '' as 'board_meeting' | 'annual_meeting' | 'extraordinary_meeting' | '',
  title: '',
  date: '',
  time: '',
  location: '',
  description: '',
  attendees: [] as string[],
});

const errors = reactive({
  type: '',
  title: '',
  date: '',
  time: '',
  location: '',
  attendees: '',
});

const meetingTypeOptions = [
  { value: 'board_meeting', label: 'Styrelsemöte' },
  { value: 'annual_meeting', label: 'Årsmöte' },
  { value: 'extraordinary_meeting', label: 'Extra möte' },
];

watch(() => props.modelValue, (newVal) => {
  isOpen.value = newVal;
  if (newVal) {
    resetForm();
    if (props.selectedDate) {
      const date = new Date(props.selectedDate);
      formData.date = date.toISOString().split('T')[0];
    }
  }
});

watch(isOpen, (newVal) => {
  emit('update:modelValue', newVal);
});

const resetForm = () => {
  formData.type = '';
  formData.title = '';
  formData.date = '';
  formData.time = '18:00';
  formData.location = '';
  formData.description = '';
  formData.attendees = [];
  
  Object.keys(errors).forEach(key => {
    errors[key as keyof typeof errors] = '';
  });
};

const toggleAttendee = (userId: string) => {
  const index = formData.attendees.indexOf(userId);
  if (index > -1) {
    formData.attendees.splice(index, 1);
  } else {
    formData.attendees.push(userId);
  }
};

const getRoleLabel = (role: UserRole) => {
  const labels: Record<UserRole, string> = {
    administrator: 'Administratör',
    board_member: 'Styrelsemedlem',
    secretary: 'Sekreterare',
    treasurer: 'Kassör',
    official: 'Funktionär',
  };
  return labels[role];
};

const validateForm = () => {
  let isValid = true;
  
  Object.keys(errors).forEach(key => {
    errors[key as keyof typeof errors] = '';
  });
  
  if (!formData.type) {
    errors.type = 'Välj mötestyp';
    isValid = false;
  }
  
  if (!formData.title.trim()) {
    errors.title = 'Ange mötesbeskrivning';
    isValid = false;
  }
  
  if (!formData.date) {
    errors.date = 'Välj datum';
    isValid = false;
  }
  
  if (!formData.time) {
    errors.time = 'Välj tid';
    isValid = false;
  }
  
  if (!formData.location.trim()) {
    errors.location = 'Ange plats';
    isValid = false;
  }
  
  if (formData.attendees.length === 0) {
    errors.attendees = 'Välj minst en deltagare';
    isValid = false;
  }
  
  return isValid;
};

const handleSubmit = async () => {
  if (!validateForm()) {
    return;
  }
  
  loading.value = true;
  
  try {
    const dateTime = new Date(`${formData.date}T${formData.time}`);
    
    await mockDataStore.createMeeting({
      type: formData.type as 'board_meeting' | 'annual_meeting' | 'extraordinary_meeting',
      title: formData.title,
      date: dateTime,
      location: formData.location,
      description: formData.description,
      attendees: formData.attendees,
    });
    
    emit('meeting-created');
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
.create-meeting-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
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

.attendees-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem;
  background: var(--color-background-secondary);
  border-radius: var(--radius-md);
  max-height: 200px;
  overflow-y: auto;
}

.attendee-checkbox {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: var(--radius-sm);
  transition: background var(--transition-fast);
}

.attendee-checkbox:hover {
  background: var(--color-background);
}

.attendee-checkbox input[type="checkbox"] {
  width: 1.25rem;
  height: 1.25rem;
  cursor: pointer;
}

.error-message {
  color: var(--color-error);
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.notification-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background: var(--color-info-light);
  border-radius: var(--radius-md);
  color: var(--color-info);
  font-size: 0.875rem;
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>
