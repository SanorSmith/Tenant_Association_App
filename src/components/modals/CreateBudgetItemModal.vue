<template>
  <BaseModal
    v-model="isOpen"
    :title="budgetItem ? 'Redigera budgetpost' : 'Ny budgetpost'"
    size="md"
    @close="handleClose"
  >
    <form @submit.prevent="handleSubmit" class="budget-form">
      <BaseSelect
        v-model="formData.category"
        label="Kategori"
        :options="categoryOptions"
        placeholder="Välj kategori"
        :error="errors.category"
        required
      />

      <BaseInput
        v-model="formData.description"
        label="Beskrivning"
        placeholder="T.ex. Kontorsmaterial och trycksaker"
        :error="errors.description"
        required
      />

      <BaseInput
        v-model="formData.amount"
        type="number"
        label="Belopp (SEK)"
        placeholder="0"
        :error="errors.amount"
        required
      />

      <BaseSelect
        v-model="formData.budgetYear"
        label="Budgetår"
        :options="yearOptions"
        :error="errors.budgetYear"
        required
      />

      <BaseSelect
        v-model="formData.activityId"
        label="Kopplad aktivitet (valfritt)"
        :options="activityOptions"
        placeholder="Ingen aktivitet"
      />
    </form>

    <template #footer>
      <BaseButton variant="outline" @click="handleClose">
        Avbryt
      </BaseButton>
      <BaseButton variant="primary" :loading="loading" @click="handleSubmit">
        {{ budgetItem ? 'Spara ändringar' : 'Skapa budgetpost' }}
      </BaseButton>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref, reactive, watch, computed } from 'vue';
import { storeToRefs } from 'pinia';
import BaseModal from '../common/BaseModal.vue';
import BaseInput from '../common/BaseInput.vue';
import BaseSelect from '../common/BaseSelect.vue';
import BaseButton from '../common/BaseButton.vue';
import { useMockDataStore } from '../../stores/mockData';
import type { BudgetItem } from '../../types';

interface Props {
  modelValue: boolean;
  budgetItem?: BudgetItem | null;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
  'budget-item-saved': [];
}>();

const mockDataStore = useMockDataStore();
const { budgetItems, activities, currentAssociation } = storeToRefs(mockDataStore);

const isOpen = ref(props.modelValue);
const loading = ref(false);

const formData = reactive({
  category: '',
  description: '',
  amount: '',
  budgetYear: '2025',
  activityId: '',
});

const errors = reactive({
  category: '',
  description: '',
  amount: '',
  budgetYear: '',
});

const categoryOptions = [
  { value: 'Administrativa kostnader', label: 'Administrativa kostnader' },
  { value: 'Aktiviteter', label: 'Aktiviteter' },
  { value: 'Lokaler', label: 'Lokaler' },
  { value: 'Underhåll', label: 'Underhåll' },
  { value: 'Övrigt', label: 'Övrigt' },
];

const yearOptions = [
  { value: '2024', label: '2024' },
  { value: '2025', label: '2025' },
  { value: '2026', label: '2026' },
];

const activityOptions = computed(() => {
  return [
    { value: '', label: 'Ingen aktivitet' },
    ...activities.value.map(activity => ({
      value: activity.id,
      label: activity.title,
    })),
  ];
});

watch(() => props.modelValue, (newVal) => {
  isOpen.value = newVal;
  if (newVal) {
    resetForm();
    if (props.budgetItem) {
      loadBudgetItem(props.budgetItem);
    }
  }
});

watch(isOpen, (newVal) => {
  emit('update:modelValue', newVal);
});

const resetForm = () => {
  formData.category = '';
  formData.description = '';
  formData.amount = '';
  formData.budgetYear = '2025';
  formData.activityId = '';
  
  Object.keys(errors).forEach(key => {
    errors[key as keyof typeof errors] = '';
  });
};

const loadBudgetItem = (item: BudgetItem) => {
  formData.category = item.category;
  formData.description = item.description;
  formData.amount = item.amount.toString();
  formData.budgetYear = item.budgetYear.toString();
  formData.activityId = item.activityId || '';
};

const validateForm = () => {
  let isValid = true;
  
  Object.keys(errors).forEach(key => {
    errors[key as keyof typeof errors] = '';
  });
  
  if (!formData.category) {
    errors.category = 'Välj kategori';
    isValid = false;
  }
  
  if (!formData.description.trim()) {
    errors.description = 'Ange beskrivning';
    isValid = false;
  }
  
  if (!formData.amount || parseFloat(formData.amount) <= 0) {
    errors.amount = 'Ange ett giltigt belopp';
    isValid = false;
  }
  
  if (!formData.budgetYear) {
    errors.budgetYear = 'Välj budgetår';
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
    
    if (props.budgetItem) {
      const index = budgetItems.value.findIndex(i => i.id === props.budgetItem!.id);
      if (index > -1) {
        budgetItems.value[index] = {
          ...budgetItems.value[index],
          category: formData.category,
          description: formData.description,
          amount: parseFloat(formData.amount),
          budgetYear: parseInt(formData.budgetYear),
          activityId: formData.activityId || undefined,
        };
      }
    } else {
      const newItem: BudgetItem = {
        id: `budget-${Date.now()}`,
        associationId: currentAssociation.value.id,
        category: formData.category,
        description: formData.description,
        amount: parseFloat(formData.amount),
        budgetYear: parseInt(formData.budgetYear),
        activityId: formData.activityId || undefined,
      };
      budgetItems.value.push(newItem);
    }
    
    emit('budget-item-saved');
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
.budget-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
</style>
