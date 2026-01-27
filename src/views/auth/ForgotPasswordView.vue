<template>
  <div class="forgot-password-view">
    <div class="forgot-password-container">
      <div class="forgot-password-card">
        <div class="forgot-password-header">
          <h1 class="text-3xl font-bold text-primary mb-2">Glömt lösenord?</h1>
          <p class="text-text-secondary">Ange din e-postadress så skickar vi instruktioner för att återställa ditt lösenord</p>
        </div>
        
        <Alert v-if="successMessage" variant="success">
          {{ successMessage }}
        </Alert>
        
        <form v-if="!successMessage" @submit.prevent="handleSubmit" class="forgot-password-form">
          <BaseInput
            v-model="email"
            type="email"
            label="E-post"
            placeholder="din.epost@example.se"
            :error="emailError"
            required
          />
          
          <BaseButton
            type="submit"
            variant="primary"
            size="lg"
            :loading="loading"
            class="w-full"
          >
            Skicka återställningslänk
          </BaseButton>
          
          <div class="text-center text-sm text-text-secondary">
            <router-link to="/login" class="text-primary hover:underline">
              Tillbaka till inloggning
            </router-link>
          </div>
        </form>
        
        <div v-else class="text-center">
          <BaseButton
            variant="primary"
            @click="$router.push('/login')"
          >
            Tillbaka till inloggning
          </BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import BaseInput from '../../components/common/BaseInput.vue';
import BaseButton from '../../components/common/BaseButton.vue';
import Alert from '../../components/ui/Alert.vue';
import { useMockDataStore } from '../../stores/mockData';

const router = useRouter();
const mockDataStore = useMockDataStore();

const email = ref('');
const loading = ref(false);
const successMessage = ref('');
const emailError = ref('');

const validateEmail = () => {
  emailError.value = '';
  
  if (!email.value) {
    emailError.value = 'E-post är obligatorisk';
    return false;
  }
  
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    emailError.value = 'Ogiltig e-postadress';
    return false;
  }
  
  return true;
};

const handleSubmit = async () => {
  if (!validateEmail()) {
    return;
  }
  
  loading.value = true;
  
  try {
    const result = await mockDataStore.mockForgotPassword(email.value) as { message: string };
    successMessage.value = result.message;
  } catch (error) {
    console.error('Forgot password error:', error);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.forgot-password-view {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%);
  padding: 1rem;
}

.forgot-password-container {
  width: 100%;
  max-width: 400px;
}

.forgot-password-card {
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xl);
  padding: 2rem;
}

.forgot-password-header {
  text-align: center;
  margin-bottom: 2rem;
}

.forgot-password-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
</style>
