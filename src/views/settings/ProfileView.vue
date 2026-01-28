<template>
  <MainLayout>
    <div class="profile-view">
      <div class="profile-header">
        <h1 class="text-3xl font-bold text-text-primary">Min profil</h1>
        <p class="text-text-secondary mt-2">Hantera dina personliga uppgifter</p>
      </div>
      
      <div class="profile-content">
        <BaseCard title="Profilinformation">
          <Alert v-if="successMessage" variant="success" :dismissible="true" @dismiss="successMessage = ''">
            {{ successMessage }}
          </Alert>
          
          <form @submit.prevent="handleSaveProfile" class="profile-form">
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
              placeholder="din.epost@example.se"
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
            
            <div class="form-group">
              <label class="block text-sm font-medium text-text-primary mb-2">
                Notifieringsinställningar
              </label>
              <div class="radio-group">
                <label class="radio-option">
                  <input
                    type="radio"
                    v-model="formData.notificationPreference"
                    value="email"
                    class="radio-input"
                  />
                  <span>E-post</span>
                </label>
                <label class="radio-option">
                  <input
                    type="radio"
                    v-model="formData.notificationPreference"
                    value="sms"
                    class="radio-input"
                  />
                  <span>SMS</span>
                </label>
                <label class="radio-option">
                  <input
                    type="radio"
                    v-model="formData.notificationPreference"
                    value="both"
                    class="radio-input"
                  />
                  <span>Både e-post och SMS</span>
                </label>
              </div>
            </div>
            
            <div class="form-actions">
              <BaseButton type="submit" variant="outline" :loading="loading">
                Spara ändringar
              </BaseButton>
              <BaseButton type="button" variant="outline" @click="resetForm">
                Återställ
              </BaseButton>
            </div>
          </form>
        </BaseCard>
        
        <BaseCard title="Ändra lösenord">
          <Alert v-if="passwordSuccessMessage" variant="success" :dismissible="true" @dismiss="passwordSuccessMessage = ''">
            {{ passwordSuccessMessage }}
          </Alert>
          
          <form @submit.prevent="handleChangePassword" class="password-form">
            <BaseInput
              v-model="passwordData.currentPassword"
              type="password"
              label="Nuvarande lösenord"
              placeholder="Ange nuvarande lösenord"
              :error="passwordErrors.currentPassword"
              required
            />
            
            <BaseInput
              v-model="passwordData.newPassword"
              type="password"
              label="Nytt lösenord"
              placeholder="Minst 8 tecken"
              :error="passwordErrors.newPassword"
              hint="Lösenordet måste vara minst 8 tecken långt"
              required
            />
            
            <BaseInput
              v-model="passwordData.confirmPassword"
              type="password"
              label="Bekräfta nytt lösenord"
              placeholder="Ange lösenordet igen"
              :error="passwordErrors.confirmPassword"
              required
            />
            
            <BaseButton type="submit" variant="outline" :loading="passwordLoading">
              Ändra lösenord
            </BaseButton>
          </form>
        </BaseCard>
      </div>
    </div>
  </MainLayout>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import MainLayout from '../../components/layout/MainLayout.vue';
import BaseCard from '../../components/common/BaseCard.vue';
import BaseInput from '../../components/common/BaseInput.vue';
import BaseButton from '../../components/common/BaseButton.vue';
import Alert from '../../components/ui/Alert.vue';
import { useMockDataStore } from '../../stores/mockData';

const mockDataStore = useMockDataStore();
const { currentUser } = storeToRefs(mockDataStore);

const loading = ref(false);
const passwordLoading = ref(false);
const successMessage = ref('');
const passwordSuccessMessage = ref('');

const formData = reactive({
  fullName: '',
  email: '',
  phone: '',
  notificationPreference: 'both' as 'email' | 'sms' | 'both',
});

const errors = reactive({
  fullName: '',
  email: '',
  phone: '',
});

const passwordData = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
});

const passwordErrors = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
});

const loadUserData = () => {
  formData.fullName = currentUser.value.fullName;
  formData.email = currentUser.value.email;
  formData.phone = currentUser.value.phone;
  formData.notificationPreference = currentUser.value.notificationPreference;
};

const resetForm = () => {
  loadUserData();
  Object.keys(errors).forEach(key => {
    errors[key as keyof typeof errors] = '';
  });
};

const validateProfile = () => {
  let isValid = true;
  errors.fullName = '';
  errors.email = '';
  errors.phone = '';
  
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
  
  return isValid;
};

const validatePassword = () => {
  let isValid = true;
  passwordErrors.currentPassword = '';
  passwordErrors.newPassword = '';
  passwordErrors.confirmPassword = '';
  
  if (!passwordData.currentPassword) {
    passwordErrors.currentPassword = 'Nuvarande lösenord är obligatoriskt';
    isValid = false;
  }
  
  if (!passwordData.newPassword) {
    passwordErrors.newPassword = 'Nytt lösenord är obligatoriskt';
    isValid = false;
  } else if (passwordData.newPassword.length < 8) {
    passwordErrors.newPassword = 'Lösenordet måste vara minst 8 tecken';
    isValid = false;
  }
  
  if (!passwordData.confirmPassword) {
    passwordErrors.confirmPassword = 'Bekräfta lösenord';
    isValid = false;
  } else if (passwordData.newPassword !== passwordData.confirmPassword) {
    passwordErrors.confirmPassword = 'Lösenorden matchar inte';
    isValid = false;
  }
  
  return isValid;
};

const handleSaveProfile = async () => {
  if (!validateProfile()) {
    return;
  }
  
  loading.value = true;
  
  setTimeout(() => {
    mockDataStore.updateUser({
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      notificationPreference: formData.notificationPreference,
    });
    
    successMessage.value = 'Profilen har uppdaterats';
    loading.value = false;
  }, 500);
};

const handleChangePassword = async () => {
  if (!validatePassword()) {
    return;
  }
  
  passwordLoading.value = true;
  
  setTimeout(() => {
    passwordSuccessMessage.value = 'Lösenordet har ändrats';
    passwordData.currentPassword = '';
    passwordData.newPassword = '';
    passwordData.confirmPassword = '';
    passwordLoading.value = false;
  }, 500);
};

onMounted(() => {
  loadUserData();
});
</script>

<style scoped>
.profile-view {
  width: 100%;
  max-width: 800px;
}

.profile-header {
  margin-bottom: 2rem;
}

.profile-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.profile-form,
.password-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.radio-group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.radio-option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.radio-option:hover {
  background: var(--color-background-secondary);
  border-color: var(--color-primary);
}

.radio-input {
  width: 1.25rem;
  height: 1.25rem;
  cursor: pointer;
}

.radio-input:checked + span {
  font-weight: var(--font-weight-semibold);
  color: var(--color-primary);
}

.form-actions {
  display: flex;
  gap: 1rem;
}
</style>
