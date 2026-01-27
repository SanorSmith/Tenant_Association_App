<template>
  <div v-if="isOpen" class="modal-overlay" @click="handleOverlayClick">
    <div class="modal-container" @click.stop>
      <div class="modal-header">
        <h2 class="modal-title">Lämna förslag</h2>
        <button @click="closeModal" class="close-button">
          <X class="w-6 h-6" />
        </button>
      </div>

      <div class="modal-body">
        <p class="modal-description">
          Har du ett förslag som kan förbättra ditt bostadsområde? Dela dina idéer med styrelsen!
        </p>

        <form @submit.prevent="handleSubmit" class="proposal-form">
          <div class="form-group">
            <label for="submitterName" class="form-label">Ditt namn *</label>
            <input
              id="submitterName"
              v-model="formData.submitterName"
              type="text"
              class="form-input"
              :class="{ 'error': errors.submitterName }"
              placeholder="För- och efternamn"
              required
            />
            <span v-if="errors.submitterName" class="error-message">{{ errors.submitterName }}</span>
          </div>

          <div class="form-group">
            <label for="submitterEmail" class="form-label">E-post *</label>
            <input
              id="submitterEmail"
              v-model="formData.submitterEmail"
              type="email"
              class="form-input"
              :class="{ 'error': errors.submitterEmail }"
              placeholder="din.epost@example.se"
              required
            />
            <span v-if="errors.submitterEmail" class="error-message">{{ errors.submitterEmail }}</span>
          </div>

          <div class="form-group">
            <label for="submitterPhone" class="form-label">Telefon *</label>
            <input
              id="submitterPhone"
              v-model="formData.submitterPhone"
              type="tel"
              class="form-input"
              :class="{ 'error': errors.submitterPhone }"
              placeholder="+46701234567"
              required
            />
            <span v-if="errors.submitterPhone" class="error-message">{{ errors.submitterPhone }}</span>
          </div>

          <div class="form-group">
            <label for="title" class="form-label">Rubrik *</label>
            <input
              id="title"
              v-model="formData.title"
              type="text"
              class="form-input"
              :class="{ 'error': errors.title }"
              placeholder="Kort beskrivning av ditt förslag"
              required
            />
            <span v-if="errors.title" class="error-message">{{ errors.title }}</span>
          </div>

          <div class="form-group">
            <label for="category" class="form-label">Kategori *</label>
            <select
              id="category"
              v-model="formData.category"
              class="form-input"
              :class="{ 'error': errors.category }"
              required
            >
              <option value="">Välj kategori</option>
              <option value="improvement">Förbättring</option>
              <option value="event">Evenemang</option>
              <option value="maintenance">Underhåll</option>
              <option value="other">Övrigt</option>
            </select>
            <span v-if="errors.category" class="error-message">{{ errors.category }}</span>
          </div>

          <div class="form-group">
            <label for="description" class="form-label">Beskrivning *</label>
            <textarea
              id="description"
              v-model="formData.description"
              class="form-textarea"
              :class="{ 'error': errors.description }"
              placeholder="Beskriv ditt förslag i detalj..."
              rows="5"
              required
            ></textarea>
            <span v-if="errors.description" class="error-message">{{ errors.description }}</span>
          </div>

          <div class="form-actions">
            <button type="button" @click="closeModal" class="btn-secondary">
              Avbryt
            </button>
            <button type="submit" class="btn-primary" :disabled="isSubmitting">
              <span v-if="!isSubmitting">Skicka förslag</span>
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
  submitterName: '',
  submitterEmail: '',
  submitterPhone: '',
  title: '',
  category: '' as 'improvement' | 'event' | 'maintenance' | 'other' | '',
  description: '',
});

const errors = reactive({
  submitterName: '',
  submitterEmail: '',
  submitterPhone: '',
  title: '',
  category: '',
  description: '',
});

const isSubmitting = ref(false);

const validateForm = (): boolean => {
  let isValid = true;
  
  Object.keys(errors).forEach(key => {
    errors[key as keyof typeof errors] = '';
  });

  if (!formData.submitterName.trim()) {
    errors.submitterName = 'Namn är obligatoriskt';
    isValid = false;
  }

  if (!formData.submitterEmail.trim()) {
    errors.submitterEmail = 'E-post är obligatoriskt';
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.submitterEmail)) {
    errors.submitterEmail = 'Ogiltig e-postadress';
    isValid = false;
  }

  if (!formData.submitterPhone.trim()) {
    errors.submitterPhone = 'Telefon är obligatoriskt';
    isValid = false;
  }

  if (!formData.title.trim()) {
    errors.title = 'Rubrik är obligatoriskt';
    isValid = false;
  }

  if (!formData.category) {
    errors.category = 'Välj en kategori';
    isValid = false;
  }

  if (!formData.description.trim()) {
    errors.description = 'Beskrivning är obligatoriskt';
    isValid = false;
  } else if (formData.description.trim().length < 20) {
    errors.description = 'Beskrivningen måste vara minst 20 tecken';
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
    const result = await mockDataStore.submitProposal({
      associationId: props.associationId,
      submitterName: formData.submitterName,
      submitterEmail: formData.submitterEmail,
      submitterPhone: formData.submitterPhone,
      title: formData.title,
      category: formData.category as 'improvement' | 'event' | 'maintenance' | 'other',
      description: formData.description,
    });

    if (result.success) {
      emit('success', `Tack ${formData.submitterName}! Ditt förslag "${formData.title}" har skickats till styrelsen. Du får ett bekräftelsemail till ${formData.submitterEmail}.`);
      resetForm();
      closeModal();
    }
  } catch (error) {
    console.error('Error submitting proposal:', error);
  } finally {
    isSubmitting.value = false;
  }
};

const resetForm = () => {
  formData.submitterName = '';
  formData.submitterEmail = '';
  formData.submitterPhone = '';
  formData.title = '';
  formData.category = '';
  formData.description = '';
  
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

.proposal-form {
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
