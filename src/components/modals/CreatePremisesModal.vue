<template>
  <BaseModal
    v-model="isOpen"
    :title="premises ? 'Redigera lokal' : 'Registrera lokal'"
    size="lg"
    @close="handleClose"
  >
    <form @submit.prevent="handleSubmit" class="premises-form">
      <BaseInput
        v-model="formData.name"
        label="Lokalnamn"
        placeholder="T.ex. Föreningslokalen"
        :error="errors.name"
        required
      />

      <BaseInput
        v-model="formData.address"
        label="Adress"
        placeholder="T.ex. Storvreta Centrum 15, Uppsala"
        :error="errors.address"
        required
      />

      <div class="form-row">
        <BaseSelect
          v-model="formData.spaceType"
          label="Typ av lokal"
          :options="spaceTypeOptions"
          placeholder="Välj typ"
          :error="errors.spaceType"
          required
        />
        <BaseInput
          v-model="formData.capacity"
          type="number"
          label="Kapacitet (personer)"
          placeholder="0"
          :error="errors.capacity"
          required
        />
      </div>

      <div class="form-group">
        <label class="form-label">Avsedd användning</label>
        <textarea
          v-model="formData.intendedUse"
          class="form-textarea"
          rows="2"
          placeholder="T.ex. Styrelsemöten, medlemsmöten, studiecirklar"
        ></textarea>
      </div>

      <div class="form-group">
        <label class="form-label">Regler</label>
        <textarea
          v-model="formData.rules"
          class="form-textarea"
          rows="3"
          placeholder="T.ex. Städa efter dig. Max 20 personer. Ingen alkohol."
        ></textarea>
      </div>

      <div class="form-group">
        <label class="checkbox-label">
          <input
            v-model="formData.isPublic"
            type="checkbox"
            class="checkbox"
          />
          <span>Gör lokalen publik (synlig för allmänheten)</span>
        </label>
      </div>
    </form>

    <template #footer>
      <BaseButton variant="outline" @click="handleClose">
        Avbryt
      </BaseButton>
      <BaseButton variant="primary" :loading="loading" @click="handleSubmit">
        {{ premises ? 'Spara ändringar' : 'Registrera lokal' }}
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
import type { Premises } from '../../types';

interface Props {
  modelValue: boolean;
  premises?: Premises | null;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
  'premises-saved': [];
}>();

const mockDataStore = useMockDataStore();
const { premises: premisesList, currentAssociation } = storeToRefs(mockDataStore);

const isOpen = ref(props.modelValue);
const loading = ref(false);

const formData = reactive({
  name: '',
  address: '',
  spaceType: '',
  capacity: '',
  intendedUse: '',
  rules: '',
  isPublic: false,
});

const errors = reactive({
  name: '',
  address: '',
  spaceType: '',
  capacity: '',
});

const spaceTypeOptions = [
  { value: 'Möteslokal', label: 'Möteslokal' },
  { value: 'Verkstad', label: 'Verkstad' },
  { value: 'Festlokal', label: 'Festlokal' },
  { value: 'Kontor', label: 'Kontor' },
  { value: 'Lager', label: 'Lager' },
  { value: 'Övrigt', label: 'Övrigt' },
];

watch(() => props.modelValue, (newVal) => {
  isOpen.value = newVal;
  if (newVal) {
    resetForm();
    if (props.premises) {
      loadPremises(props.premises);
    }
  }
});

watch(isOpen, (newVal) => {
  emit('update:modelValue', newVal);
});

const resetForm = () => {
  formData.name = '';
  formData.address = '';
  formData.spaceType = '';
  formData.capacity = '';
  formData.intendedUse = '';
  formData.rules = '';
  formData.isPublic = false;
  
  Object.keys(errors).forEach(key => {
    errors[key as keyof typeof errors] = '';
  });
};

const loadPremises = (premises: Premises) => {
  formData.name = premises.name;
  formData.address = premises.address;
  formData.spaceType = premises.spaceType;
  formData.capacity = premises.capacity.toString();
  formData.intendedUse = premises.intendedUse;
  formData.rules = premises.rules;
  formData.isPublic = premises.isPublic;
};

const validateForm = () => {
  let isValid = true;
  
  Object.keys(errors).forEach(key => {
    errors[key as keyof typeof errors] = '';
  });
  
  if (!formData.name.trim()) {
    errors.name = 'Ange lokalnamn';
    isValid = false;
  }
  
  if (!formData.address.trim()) {
    errors.address = 'Ange adress';
    isValid = false;
  }
  
  if (!formData.spaceType) {
    errors.spaceType = 'Välj typ av lokal';
    isValid = false;
  }
  
  if (!formData.capacity || parseInt(formData.capacity) <= 0) {
    errors.capacity = 'Ange en giltig kapacitet';
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
    
    if (props.premises) {
      const index = premisesList.value.findIndex(p => p.id === props.premises!.id);
      if (index > -1) {
        premisesList.value[index] = {
          ...premisesList.value[index],
          name: formData.name,
          address: formData.address,
          spaceType: formData.spaceType,
          capacity: parseInt(formData.capacity),
          intendedUse: formData.intendedUse,
          rules: formData.rules,
          isPublic: formData.isPublic,
        };
      }
    } else {
      const newPremises: Premises = {
        id: `premises-${Date.now()}`,
        associationId: currentAssociation.value.id,
        name: formData.name,
        address: formData.address,
        spaceType: formData.spaceType,
        capacity: parseInt(formData.capacity),
        intendedUse: formData.intendedUse,
        rules: formData.rules,
        isPublic: formData.isPublic,
      };
      premisesList.value.push(newPremises);
    }
    
    emit('premises-saved');
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
.premises-form {
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

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>
