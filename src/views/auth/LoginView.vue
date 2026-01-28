<template>
  <AppLayout>
    <div class="login-view">
      <div class="login-container">
        <div class="login-card">
        <div class="login-header">
          <h1 class="text-3xl font-bold text-primary mb-2">Grannskapet</h1>
          <p class="text-text-secondary">Digital plattform för hyresgästföreningar</p>
        </div>
        
        <Alert v-if="errorMessage" variant="error" :dismissible="true" @dismiss="errorMessage = ''">
          {{ errorMessage }}
        </Alert>
        
        <form @submit.prevent="handleLogin" class="login-form">
          <BaseInput
            v-model="email"
            type="email"
            label="E-post"
            placeholder="din.epost@example.se"
            :error="emailError"
            required
          />
          
          <BaseInput
            v-model="password"
            type="password"
            label="Lösenord"
            placeholder="Ange ditt lösenord"
            :error="passwordError"
            required
          />
          
          <div class="flex items-center justify-between">
            <BaseCheckbox v-model="rememberMe" label="Kom ihåg mig" />
            <router-link to="/forgot-password" class="text-sm text-primary hover:underline">
              Glömt lösenord?
            </router-link>
          </div>
          
          <BaseButton
            type="submit"
            variant="outline"
            size="lg"
            :loading="loading"
            class="w-full"
          >
            Logga in
          </BaseButton>
          
          <div class="text-center text-sm text-text-secondary">
            Har du ingen förening ännu?
            <router-link to="/register" class="text-primary hover:underline ml-1">
              Registrera här
            </router-link>
          </div>
        </form>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import AppLayout from '../../components/layout/AppLayout.vue';
import BaseInput from '../../components/common/BaseInput.vue';
import BaseCheckbox from '../../components/common/BaseCheckbox.vue';
import BaseButton from '../../components/common/BaseButton.vue';
import Alert from '../../components/ui/Alert.vue';
import { useMockDataStore } from '../../stores/mockData';

const router = useRouter();
const mockDataStore = useMockDataStore();

const email = ref('');
const password = ref('');
const rememberMe = ref(false);
const loading = ref(false);
const errorMessage = ref('');
const emailError = ref('');
const passwordError = ref('');

const validateForm = () => {
  let isValid = true;
  emailError.value = '';
  passwordError.value = '';
  
  if (!email.value) {
    emailError.value = 'E-post är obligatorisk';
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    emailError.value = 'Ogiltig e-postadress';
    isValid = false;
  }
  
  if (!password.value) {
    passwordError.value = 'Lösenord är obligatoriskt';
    isValid = false;
  } else if (password.value.length < 6) {
    passwordError.value = 'Lösenordet måste vara minst 6 tecken';
    isValid = false;
  }
  
  return isValid;
};

const handleLogin = async () => {
  errorMessage.value = '';
  
  if (!validateForm()) {
    return;
  }
  
  loading.value = true;
  
  try {
    await mockDataStore.mockLogin(email.value, password.value);
    router.push('/dashboard');
  } catch (error) {
    errorMessage.value = 'Felaktigt användarnamn eller lösenord';
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.login-view {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--hgf-gray-bg);
  padding: 1rem;
}

.login-container {
  width: 100%;
  max-width: 400px;
}

.login-card {
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xl);
  padding: 2rem;
}

.login-header {
  text-align: center;
  margin-bottom: 2rem;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
</style>
