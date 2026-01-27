<template>
  <BaseModal
    v-model="isOpen"
    title="Lägg till styrelsemedlem"
    size="md"
    @close="handleClose"
  >
    <form @submit.prevent="handleSubmit" class="add-member-form">
      <BaseInput
        v-model="formData.fullName"
        label="Fullständigt namn"
        placeholder="För- och efternamn"
        :error="errors.fullName"
        required
      />
      
      <BaseInput
        v-model="formData.email"
        type="email"
        label="E-post"
        placeholder="medlem@example.se"
        :error="errors.email"
        required
      />
      
      <BaseInput
        v-model="formData.phone"
        type="tel"
        label="Telefon"
        placeholder="+46701234567"
        :error="errors.phone"
        required
      />
      
      <BaseSelect
        v-model="formData.role"
        label="Roll"
        :options="roleOptions"
        placeholder="Välj roll"
        :error="errors.role"
        required
      />
      
      <BaseSelect
        v-model="formData.notificationPreference"
        label="Notifieringsinställning"
        :options="notificationOptions"
        placeholder="Välj notifieringsinställning"
        required
      />
    </form>
    
    <template #footer>
      <BaseButton variant="outline" @click="handleClose">
        Avbryt
      </BaseButton>
      <BaseButton variant="primary" :loading="loading" @click="handleSubmit">
        Lägg till
      </BaseButton>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue';
import BaseModal from '../common/BaseModal.vue';
import BaseInput from '../common/BaseInput.vue';
import BaseSelect from '../common/BaseSelect.vue';
import BaseButton from '../common/BaseButton.vue';
import { useMockDataStore } from '../../stores/mockData';
import type { UserRole } from '../../types';

interface Props {
  modelValue: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
  'member-added': [];
}>();

const mockDataStore = useMockDataStore();

const isOpen = ref(props.modelValue);
const loading = ref(false);

const formData = reactive({
  fullName: '',
  email: '',
  phone: '',
  role: '' as UserRole | '',
  notificationPreference: 'both' as 'email' | 'sms' | 'both',
});

const errors = reactive({
  fullName: '',
  email: '',
  phone: '',
  role: '',
});

const roleOptions = [
  { value: 'board_member', label: 'Styrelsemedlem' },
  { value: 'secretary', label: 'Sekreterare' },
  { value: 'treasurer', label: 'Kassör' },
];

const notificationOptions = [
  { value: 'email', label: 'E-post' },
  { value: 'sms', label: 'SMS' },
  { value: 'both', label: 'Både e-post och SMS' },
];

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
  formData.fullName = '';
  formData.email = '';
  formData.phone = '';
  formData.role = '';
  formData.notificationPreference = 'both';
  
  Object.keys(errors).forEach(key => {
    errors[key as keyof typeof errors] = '';
  });
};

const validateForm = () => {
  let isValid = true;
  errors.fullName = '';
  errors.email = '';
  errors.phone = '';
  errors.role = '';
  
  if (!formData.fullName) {
    errors.fullName = 'Namn är obligatoriskt';
    isValid = false;
  }
  
  if (!formData.email) {
    errors.email = 'E-post är obligatorisk';
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = 'Ogiltig e-postadress';
    isValid = false;
  }
  
  if (!formData.phone) {
    errors.phone = 'Telefon är obligatoriskt';
    isValid = false;
  }
  
  if (!formData.role) {
    errors.role = 'Roll är obligatorisk';
    isValid = false;
  }
  
  return isValid;
};

const handleSubmit = async () => {
  if (!validateForm()) {
    return;
  }
  
  loading.value = true;
  
  setTimeout(() => {
    const newMember = {
      id: `user-${Date.now()}`,
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      role: formData.role as UserRole,
      notificationPreference: formData.notificationPreference,
    };
    
    mockDataStore.addBoardMember(newMember);
    
    loading.value = false;
    emit('member-added');
    handleClose();
  }, 500);
};

const handleClose = () => {
  isOpen.value = false;
  resetForm();
};
</script>

<style scoped>
.add-member-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
</style>
