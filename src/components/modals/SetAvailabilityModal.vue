<template>
  <BaseModal
    v-model="isOpen"
    title="Ange tillgänglighet"
    size="md"
    @close="handleClose"
  >
    <form @submit.prevent="handleSubmit" class="availability-form">
      <div class="form-row">
        <BaseInput
          v-model="formData.startDate"
          type="date"
          label="Från datum"
          :error="errors.startDate"
          required
        />
        <BaseInput
          v-model="formData.endDate"
          type="date"
          label="Till datum"
          :error="errors.endDate"
          required
        />
      </div>

      <div class="form-group">
        <label class="form-label">Tidsluckor</label>
        <div class="time-slots">
          <label class="checkbox-label">
            <input
              v-model="formData.timeSlots"
              type="checkbox"
              value="morning"
              class="checkbox"
            />
            <span>Förmiddag (08:00-12:00)</span>
          </label>
          <label class="checkbox-label">
            <input
              v-model="formData.timeSlots"
              type="checkbox"
              value="afternoon"
              class="checkbox"
            />
            <span>Eftermiddag (12:00-17:00)</span>
          </label>
          <label class="checkbox-label">
            <input
              v-model="formData.timeSlots"
              type="checkbox"
              value="evening"
              class="checkbox"
            />
            <span>Kväll (17:00-22:00)</span>
          </label>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Anpassade tider (valfritt)</label>
        <div class="custom-time">
          <BaseInput
            v-model="formData.customStartTime"
            type="time"
            placeholder="Starttid"
          />
          <span>-</span>
          <BaseInput
            v-model="formData.customEndTime"
            type="time"
            placeholder="Sluttid"
          />
        </div>
      </div>
    </form>

    <template #footer>
      <BaseButton variant="outline" @click="handleClose">
        Avbryt
      </BaseButton>
      <BaseButton variant="primary" :loading="loading" @click="handleSubmit">
        Spara tillgänglighet
      </BaseButton>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue';
import BaseModal from '../common/BaseModal.vue';
import BaseInput from '../common/BaseInput.vue';
import BaseButton from '../common/BaseButton.vue';

interface Props {
  modelValue: boolean;
  premisesId?: string;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
  'availability-saved': [];
}>();

const isOpen = ref(props.modelValue);
const loading = ref(false);

const formData = reactive({
  startDate: '',
  endDate: '',
  timeSlots: [] as string[],
  customStartTime: '',
  customEndTime: '',
});

const errors = reactive({
  startDate: '',
  endDate: '',
});

watch(() => props.modelValue, (newVal) => {
  isOpen.value = newVal;
  if (newVal) {
    resetForm();
  }
});

watch(isOpen, (newVal) => {
  emit('update:modelValue', newVal);
});

const resetForm = () => {
  const today = new Date().toISOString().split('T')[0];
  formData.startDate = today;
  formData.endDate = today;
  formData.timeSlots = [];
  formData.customStartTime = '';
  formData.customEndTime = '';
  
  Object.keys(errors).forEach(key => {
    errors[key as keyof typeof errors] = '';
  });
};

const validateForm = () => {
  let isValid = true;
  
  Object.keys(errors).forEach(key => {
    errors[key as keyof typeof errors] = '';
  });
  
  if (!formData.startDate) {
    errors.startDate = 'Välj startdatum';
    isValid = false;
  }
  
  if (!formData.endDate) {
    errors.endDate = 'Välj slutdatum';
    isValid = false;
  }
  
  if (formData.startDate && formData.endDate && formData.startDate > formData.endDate) {
    errors.endDate = 'Slutdatum måste vara efter startdatum';
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
    
    // Mock save - in real app would save to backend
    console.log('Saving availability:', {
      premisesId: props.premisesId,
      ...formData,
    });
    
    emit('availability-saved');
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
.availability-form {
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
  gap: 0.75rem;
}

.form-label {
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
  font-size: 0.875rem;
}

.time-slots {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem;
  background: var(--color-background-secondary);
  border-radius: var(--radius-md);
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  user-select: none;
}

.checkbox {
  width: 1.25rem;
  height: 1.25rem;
  cursor: pointer;
}

.custom-time {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.custom-time > span {
  color: var(--color-text-secondary);
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>
