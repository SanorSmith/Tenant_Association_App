<template>
  <div v-if="isOpen" class="modal-overlay" @click="handleOverlayClick">
    <div class="modal-container" @click.stop>
      <div class="modal-header">
        <h2 class="modal-title">Bli aktiv medlem</h2>
        <button @click="closeModal" class="close-button">
          <X class="w-6 h-6" />
        </button>
      </div>

      <div class="modal-body">
        <p class="modal-description">
          Vill du engagera dig och hjälpa till att förbättra ditt bostadsområde? Ansök om att bli aktiv medlem!
        </p>

        <form @submit.prevent="handleSubmit" class="membership-form">
          <div class="form-group">
            <label for="applicantName" class="form-label">Ditt namn *</label>
            <input
              id="applicantName"
              v-model="formData.applicantName"
              type="text"
              class="form-input"
              :class="{ 'error': errors.applicantName }"
              placeholder="För- och efternamn"
              required
            />
            <span v-if="errors.applicantName" class="error-message">{{ errors.applicantName }}</span>
          </div>

          <div class="form-group">
            <label for="applicantEmail" class="form-label">E-post *</label>
            <input
              id="applicantEmail"
              v-model="formData.applicantEmail"
              type="email"
              class="form-input"
              :class="{ 'error': errors.applicantEmail }"
              placeholder="din.epost@example.se"
              required
            />
            <span v-if="errors.applicantEmail" class="error-message">{{ errors.applicantEmail }}</span>
          </div>

          <div class="form-group">
            <label for="applicantPhone" class="form-label">Telefon *</label>
            <input
              id="applicantPhone"
              v-model="formData.applicantPhone"
              type="tel"
              class="form-input"
              :class="{ 'error': errors.applicantPhone }"
              placeholder="+46701234567"
              required
            />
            <span v-if="errors.applicantPhone" class="error-message">{{ errors.applicantPhone }}</span>
          </div>

          <div class="form-group">
            <label for="address" class="form-label">Adress *</label>
            <input
              id="address"
              v-model="formData.address"
              type="text"
              class="form-input"
              :class="{ 'error': errors.address }"
              placeholder="Din bostadsadress"
              required
            />
            <span v-if="errors.address" class="error-message">{{ errors.address }}</span>
          </div>

          <div class="form-group">
            <label for="motivation" class="form-label">Varför vill du engagera dig? *</label>
            <textarea
              id="motivation"
              v-model="formData.motivation"
              class="form-textarea"
              :class="{ 'error': errors.motivation }"
              placeholder="Berätta varför du vill bli aktiv medlem..."
              rows="4"
              required
            ></textarea>
            <span v-if="errors.motivation" class="error-message">{{ errors.motivation }}</span>
          </div>

          <div class="form-group">
            <label for="skills" class="form-label">Kompetenser och intressen</label>
            <textarea
              id="skills"
              v-model="formData.skills"
              class="form-textarea"
              placeholder="T.ex. event-planering, trädgårdsskötsel, IT, ekonomi, kommunikation..."
              rows="3"
            ></textarea>
            <p class="form-hint">Frivilligt - hjälper oss matcha dig med rätt uppgifter</p>
          </div>

          <div class="form-group">
            <label for="availability" class="form-label">När kan du hjälpa till? *</label>
            <select
              id="availability"
              v-model="formData.availability"
              class="form-input"
              :class="{ 'error': errors.availability }"
              required
            >
              <option value="">Välj tillgänglighet</option>
              <option value="weekdays">Vardagar</option>
              <option value="weekends">Helger</option>
              <option value="evenings">Kvällar</option>
              <option value="flexible">Flexibel</option>
            </select>
            <span v-if="errors.availability" class="error-message">{{ errors.availability }}</span>
          </div>

          <div class="form-actions">
            <button type="button" @click="closeModal" class="btn-secondary">
              Avbryt
            </button>
            <button type="submit" class="btn-primary" :disabled="isSubmitting">
              <span v-if="!isSubmitting">Skicka ansökan</span>
              <span v-else>Skickar...</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { X } from 'lucide-vue-next';
import { useMockDataStore } from '@/stores/mockData';

interface Props {
  isOpen: boolean;
  associationId: string;
}

interface Emits {
  (e: 'close'): void;
  (e: 'success', message: string): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const mockDataStore = useMockDataStore();

const formData = reactive({
  applicantName: '',
  applicantEmail: '',
  applicantPhone: '',
  address: '',
  motivation: '',
  skills: '',
  availability: '' as 'weekdays' | 'weekends' | 'evenings' | 'flexible' | '',
});

const errors = reactive({
  applicantName: '',
  applicantEmail: '',
  applicantPhone: '',
  address: '',
  motivation: '',
  availability: '',
});

const isSubmitting = ref(false);

const validateForm = (): boolean => {
  let isValid = true;
  
  Object.keys(errors).forEach(key => {
    errors[key as keyof typeof errors] = '';
  });

  if (!formData.applicantName.trim()) {
    errors.applicantName = 'Namn är obligatoriskt';
    isValid = false;
  }

  if (!formData.applicantEmail.trim()) {
    errors.applicantEmail = 'E-post är obligatoriskt';
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.applicantEmail)) {
    errors.applicantEmail = 'Ogiltig e-postadress';
    isValid = false;
  }

  if (!formData.applicantPhone.trim()) {
    errors.applicantPhone = 'Telefon är obligatoriskt';
    isValid = false;
  }

  if (!formData.address.trim()) {
    errors.address = 'Adress är obligatoriskt';
    isValid = false;
  }

  if (!formData.motivation.trim()) {
    errors.motivation = 'Motivation är obligatoriskt';
    isValid = false;
  } else if (formData.motivation.trim().length < 20) {
    errors.motivation = 'Motivationen måste vara minst 20 tecken';
    isValid = false;
  }

  if (!formData.availability) {
    errors.availability = 'Välj din tillgänglighet';
    isValid = false;
  }

  return isValid;
};

const handleSubmit = async () => {
  if (!validateForm()) {
    return;
  }

  isSubmitting.value = true;

  try {
    const result = await mockDataStore.submitMembershipApplication({
      associationId: props.associationId,
      applicantName: formData.applicantName,
      applicantEmail: formData.applicantEmail,
      applicantPhone: formData.applicantPhone,
      address: formData.address,
      motivation: formData.motivation,
      skills: formData.skills,
      availability: formData.availability as 'weekdays' | 'weekends' | 'evenings' | 'flexible',
    });

    if (result.success) {
      emit('success', `Tack ${formData.applicantName}! Din ansökan har skickats till styrelsen. Vi kommer att kontakta dig inom kort på ${formData.applicantEmail}.`);
      resetForm();
      closeModal();
    }
  } catch (error) {
    console.error('Error submitting membership application:', error);
  } finally {
    isSubmitting.value = false;
  }
};

const resetForm = () => {
  formData.applicantName = '';
  formData.applicantEmail = '';
  formData.applicantPhone = '';
  formData.address = '';
  formData.motivation = '';
  formData.skills = '';
  formData.availability = '';
  
  Object.keys(errors).forEach(key => {
    errors[key as keyof typeof errors] = '';
  });
};

const closeModal = () => {
  resetForm();
  emit('close');
};

const handleOverlayClick = () => {
  closeModal();
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal-container {
  background: white;
  border-radius: 12px;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid var(--hgf-gray-light);
}

.modal-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--hgf-gray-dark);
}

.close-button {
  background: none;
  border: none;
  color: var(--hgf-gray-medium);
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 6px;
  transition: all 0.3s;
}

.close-button:hover {
  background: var(--hgf-gray-bg);
  color: var(--hgf-gray-dark);
}

.modal-body {
  padding: 2rem;
}

.modal-description {
  color: var(--hgf-gray-medium);
  margin-bottom: 2rem;
  line-height: 1.6;
}

.membership-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  font-weight: 600;
  color: var(--hgf-gray-dark);
  font-size: 0.95rem;
}

.form-input,
.form-textarea {
  padding: 0.75rem 1rem;
  border: 2px solid var(--hgf-gray-light);
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: var(--hgf-blue);
}

.form-input.error,
.form-textarea.error {
  border-color: var(--hgf-red);
}

.form-textarea {
  resize: vertical;
  font-family: inherit;
}

.form-hint {
  font-size: 0.85rem;
  color: var(--hgf-gray-medium);
  margin-top: -0.25rem;
}

.error-message {
  color: var(--hgf-red);
  font-size: 0.85rem;
  margin-top: -0.25rem;
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1rem;
}

.btn-secondary,
.btn-primary {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  border: none;
}

.btn-secondary {
  background: white;
  color: var(--hgf-gray-dark);
  border: 2px solid var(--hgf-gray-light);
}

.btn-secondary:hover {
  background: var(--hgf-gray-bg);
}

.btn-primary {
  background: var(--hgf-green);
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: var(--hgf-green-dark);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 166, 81, 0.3);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

@media (max-width: 640px) {
  .modal-container {
    max-height: 100vh;
    border-radius: 0;
  }

  .modal-header,
  .modal-body {
    padding: 1.5rem;
  }

  .form-actions {
    flex-direction: column-reverse;
  }

  .btn-secondary,
  .btn-primary {
    width: 100%;
  }
}
</style>
