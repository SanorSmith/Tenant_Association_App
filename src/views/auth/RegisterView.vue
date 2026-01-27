<template>
  <div class="register-view">
    <div class="register-container">
      <div class="register-card">
        <div class="register-header">
          <h1 class="text-3xl font-bold text-primary mb-2">Registrera förening</h1>
          <p class="text-text-secondary">Skapa ett konto för din hyresgästförening</p>
        </div>
        
        <div class="progress-indicator">
          <div
            v-for="step in 4"
            :key="step"
            :class="['progress-step', { active: currentStep >= step, completed: currentStep > step }]"
          >
            <div class="step-number">{{ step }}</div>
            <div class="step-label">{{ getStepLabel(step) }}</div>
          </div>
        </div>
        
        <Alert v-if="successMessage" variant="success">
          {{ successMessage }}
        </Alert>
        
        <form @submit.prevent="handleNext" class="register-form">
          <div v-if="currentStep === 1" class="step-content">
            <h3 class="text-lg font-semibold mb-4">Föreningsinformation</h3>
            <BaseInput
              v-model="formData.associationName"
              label="Föreningsnamn"
              placeholder="T.ex. Storvreta Hyresgäster"
              :error="errors.associationName"
              required
            />
            <BaseInput
              v-model="formData.address"
              label="Adress"
              placeholder="Stad eller område"
              :error="errors.address"
              required
            />
            <BaseInput
              v-model="formData.registrationNumber"
              label="Registreringsnummer (valfritt)"
              placeholder="HGF-XXXX-XXX"
            />
          </div>
          
          <div v-if="currentStep === 2" class="step-content">
            <h3 class="text-lg font-semibold mb-4">Ordförandeinformation</h3>
            <BaseInput
              v-model="formData.chairpersonName"
              label="Fullständigt namn"
              placeholder="För- och efternamn"
              :error="errors.chairpersonName"
              required
            />
            <BaseInput
              v-model="formData.chairpersonEmail"
              type="email"
              label="E-post"
              placeholder="din.epost@example.se"
              :error="errors.chairpersonEmail"
              required
            />
            <BaseInput
              v-model="formData.chairpersonPhone"
              type="tel"
              label="Telefon"
              placeholder="+46701234567"
              :error="errors.chairpersonPhone"
              required
            />
          </div>
          
          <div v-if="currentStep === 3" class="step-content">
            <h3 class="text-lg font-semibold mb-4">Skapa lösenord</h3>
            <BaseInput
              v-model="formData.password"
              type="password"
              label="Lösenord"
              placeholder="Minst 8 tecken"
              :error="errors.password"
              hint="Lösenordet måste vara minst 8 tecken långt"
              required
            />
            <BaseInput
              v-model="formData.confirmPassword"
              type="password"
              label="Bekräfta lösenord"
              placeholder="Ange lösenordet igen"
              :error="errors.confirmPassword"
              required
            />
            <BaseCheckbox
              v-model="formData.acceptTerms"
              label="Jag accepterar användarvillkoren och integritetspolicyn"
              :error="errors.acceptTerms"
            />
          </div>
          
          <div v-if="currentStep === 4" class="step-content text-center">
            <div class="success-icon mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-success mx-auto">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="m9 12 2 2 4-4"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">Registrering mottagen!</h3>
            <p class="text-text-secondary mb-4">
              Din ansökan har skickats för verifiering. Du kommer att få ett e-postmeddelande när din förening har godkänts.
            </p>
            <p class="text-sm text-text-secondary">
              Detta kan ta upp till 2-3 arbetsdagar.
            </p>
          </div>
          
          <div class="form-actions">
            <BaseButton
              v-if="currentStep > 1 && currentStep < 4"
              type="button"
              variant="outline"
              @click="handlePrevious"
            >
              Tillbaka
            </BaseButton>
            
            <BaseButton
              v-if="currentStep < 3"
              type="submit"
              variant="primary"
              :loading="loading"
              class="ml-auto"
            >
              Nästa
            </BaseButton>
            
            <BaseButton
              v-if="currentStep === 3"
              type="submit"
              variant="primary"
              :loading="loading"
              class="ml-auto"
            >
              Skicka ansökan
            </BaseButton>
            
            <BaseButton
              v-if="currentStep === 4"
              type="button"
              variant="primary"
              @click="$router.push('/login')"
              class="mx-auto"
            >
              Gå till inloggning
            </BaseButton>
          </div>
          
          <div v-if="currentStep < 4" class="text-center text-sm text-text-secondary mt-4">
            Har du redan ett konto?
            <router-link to="/login" class="text-primary hover:underline ml-1">
              Logga in här
            </router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import BaseInput from '../../components/common/BaseInput.vue';
import BaseCheckbox from '../../components/common/BaseCheckbox.vue';
import BaseButton from '../../components/common/BaseButton.vue';
import Alert from '../../components/ui/Alert.vue';
import { useMockDataStore } from '../../stores/mockData';

const router = useRouter();
const mockDataStore = useMockDataStore();

const currentStep = ref(1);
const loading = ref(false);
const successMessage = ref('');

const formData = reactive({
  associationName: '',
  address: '',
  registrationNumber: '',
  chairpersonName: '',
  chairpersonEmail: '',
  chairpersonPhone: '',
  password: '',
  confirmPassword: '',
  acceptTerms: false,
});

const errors = reactive({
  associationName: '',
  address: '',
  chairpersonName: '',
  chairpersonEmail: '',
  chairpersonPhone: '',
  password: '',
  confirmPassword: '',
  acceptTerms: '',
});

const getStepLabel = (step: number) => {
  const labels = ['Förening', 'Ordförande', 'Lösenord', 'Klar'];
  return labels[step - 1];
};

const validateStep1 = () => {
  let isValid = true;
  errors.associationName = '';
  errors.address = '';
  
  if (!formData.associationName) {
    errors.associationName = 'Föreningsnamn är obligatoriskt';
    isValid = false;
  }
  
  if (!formData.address) {
    errors.address = 'Adress är obligatorisk';
    isValid = false;
  }
  
  return isValid;
};

const validateStep2 = () => {
  let isValid = true;
  errors.chairpersonName = '';
  errors.chairpersonEmail = '';
  errors.chairpersonPhone = '';
  
  if (!formData.chairpersonName) {
    errors.chairpersonName = 'Namn är obligatoriskt';
    isValid = false;
  }
  
  if (!formData.chairpersonEmail) {
    errors.chairpersonEmail = 'E-post är obligatorisk';
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.chairpersonEmail)) {
    errors.chairpersonEmail = 'Ogiltig e-postadress';
    isValid = false;
  }
  
  if (!formData.chairpersonPhone) {
    errors.chairpersonPhone = 'Telefon är obligatoriskt';
    isValid = false;
  }
  
  return isValid;
};

const validateStep3 = () => {
  let isValid = true;
  errors.password = '';
  errors.confirmPassword = '';
  errors.acceptTerms = '';
  
  if (!formData.password) {
    errors.password = 'Lösenord är obligatoriskt';
    isValid = false;
  } else if (formData.password.length < 8) {
    errors.password = 'Lösenordet måste vara minst 8 tecken';
    isValid = false;
  }
  
  if (!formData.confirmPassword) {
    errors.confirmPassword = 'Bekräfta lösenord';
    isValid = false;
  } else if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = 'Lösenorden matchar inte';
    isValid = false;
  }
  
  if (!formData.acceptTerms) {
    errors.acceptTerms = 'Du måste acceptera villkoren';
    isValid = false;
  }
  
  return isValid;
};

const handleNext = async () => {
  if (currentStep.value === 1 && !validateStep1()) return;
  if (currentStep.value === 2 && !validateStep2()) return;
  if (currentStep.value === 3 && !validateStep3()) {
    return;
  }
  
  if (currentStep.value === 3) {
    loading.value = true;
    try {
      await mockDataStore.mockRegisterAssociation(formData);
      currentStep.value = 4;
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      loading.value = false;
    }
  } else {
    currentStep.value++;
  }
};

const handlePrevious = () => {
  if (currentStep.value > 1) {
    currentStep.value--;
  }
};
</script>

<style scoped>
.register-view {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%);
  padding: 2rem 1rem;
}

.register-container {
  width: 100%;
  max-width: 600px;
}

.register-card {
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xl);
  padding: 2rem;
}

.register-header {
  text-align: center;
  margin-bottom: 2rem;
}

.progress-indicator {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  position: relative;
}

.progress-indicator::before {
  content: '';
  position: absolute;
  top: 20px;
  left: 10%;
  right: 10%;
  height: 2px;
  background: var(--color-border);
  z-index: 0;
}

.progress-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  z-index: 1;
  flex: 1;
}

.step-number {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-full);
  background: var(--color-background-secondary);
  border: 2px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-secondary);
  transition: all var(--transition-base);
}

.progress-step.active .step-number {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: white;
}

.progress-step.completed .step-number {
  background: var(--color-success);
  border-color: var(--color-success);
  color: white;
}

.step-label {
  font-size: 0.75rem;
  color: var(--color-text-secondary);
  text-align: center;
}

.register-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.step-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  min-height: 300px;
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.success-icon {
  animation: scaleIn 0.3s ease-out;
}

@keyframes scaleIn {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}
</style>
