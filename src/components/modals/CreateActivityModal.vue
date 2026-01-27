<template>
  <BaseModal
    v-model="isOpen"
    :title="activity ? 'Redigera aktivitet' : 'Ny aktivitet'"
    size="md"
    @close="handleClose"
  >
    <form @submit.prevent="handleSubmit" class="activity-form">
      <BaseInput
        v-model="formData.title"
        label="Titel"
        placeholder="T.ex. Sommargrillfest"
        :error="errors.title"
        required
      />

      <div class="form-group">
        <label class="form-label">Beskrivning</label>
        <textarea
          v-model="formData.description"
          class="form-textarea"
          rows="3"
          placeholder="Beskriv aktiviteten..."
        ></textarea>
      </div>

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
        placeholder="T.ex. Parkområdet, Storvreta"
      />

      <BaseSelect
        v-model="formData.status"
        label="Status"
        :options="statusOptions"
        required
      />
    </form>

    <template #footer>
      <BaseButton variant="outline" @click="handleClose">
        Avbryt
      </BaseButton>
      <BaseButton variant="primary" :loading="loading" @click="handleSubmit">
        {{ activity ? 'Spara ändringar' : 'Skapa aktivitet' }}
      </BaseButton>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue';
import { storeToRefs } from 'pinia';
import BaseModal from '../common/BaseModal.vue';
import BaseInput from '../common/BaseInput.vue';
import BaseSelect from '../common/BaseSelect.vue';
import BaseButton from '../common/BaseButton.vue';
import { useMockDataStore } from '../../stores/mockData';
import type { Activity } from '../../types';

interface Props {
  modelValue: boolean;
  activity?: Activity | null;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
  'activity-saved': [];
}>();

const mockDataStore = useMockDataStore();
const { activities, currentAssociation } = storeToRefs(mockDataStore);

const isOpen = ref(props.modelValue);
const loading = ref(false);

const formData = reactive({
  title: '',
  description: '',
  date: '',
  time: '',
  location: '',
  status: 'planned' as 'planned' | 'ongoing' | 'completed' | 'cancelled',
});

const errors = reactive({
  title: '',
  date: '',
  time: '',
});

const statusOptions = [
  { value: 'planned', label: 'Planerad' },
  { value: 'ongoing', label: 'Pågående' },
  { value: 'completed', label: 'Genomförd' },
  { value: 'cancelled', label: 'Inställd' },
];

watch(() => props.modelValue, (newVal) => {
  isOpen.value = newVal;
  if (newVal) {
    resetForm();
    if (props.activity) {
      loadActivity(props.activity);
    }
  }
});

watch(isOpen, (newVal) => {
  emit('update:modelValue', newVal);
});

const resetForm = () => {
  formData.title = '';
  formData.description = '';
  formData.date = '';
  formData.time = '17:00';
  formData.location = '';
  formData.status = 'planned';
  
  Object.keys(errors).forEach(key => {
    errors[key as keyof typeof errors] = '';
  });
};

const loadActivity = (activity: Activity) => {
  const activityDate = new Date(activity.activityDate);
  formData.title = activity.title;
  formData.description = activity.description;
  formData.date = activityDate.toISOString().split('T')[0];
  formData.time = activityDate.toTimeString().slice(0, 5);
  formData.location = activity.location || '';
  formData.status = activity.status;
};

const validateForm = () => {
  let isValid = true;
  
  Object.keys(errors).forEach(key => {
    errors[key as keyof typeof errors] = '';
  });
  
  if (!formData.title.trim()) {
    errors.title = 'Ange titel';
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
  
  return isValid;
};

const handleSubmit = async () => {
  if (!validateForm()) {
    return;
  }
  
  loading.value = true;
  
  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const activityDate = new Date(`${formData.date}T${formData.time}`);
    
    if (props.activity) {
      const index = activities.value.findIndex(a => a.id === props.activity!.id);
      if (index > -1) {
        activities.value[index] = {
          ...activities.value[index],
          title: formData.title,
          description: formData.description,
          activityDate,
          location: formData.location,
          status: formData.status,
        };
      }
    } else {
      const newActivity: Activity = {
        id: `activity-${Date.now()}`,
        associationId: currentAssociation.value.id,
        title: formData.title,
        description: formData.description,
        activityDate,
        location: formData.location,
        status: formData.status,
      };
      activities.value.push(newActivity);
    }
    
    emit('activity-saved');
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
.activity-form {
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

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>
