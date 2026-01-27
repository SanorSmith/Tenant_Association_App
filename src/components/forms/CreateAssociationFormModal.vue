<template>
  <div v-if="isOpen" class="modal-overlay" @click="handleOverlayClick">
    <div class="modal-container" @click.stop>
      <div class="modal-header">
        <h2 class="modal-title">Starta ny förening</h2>
        <button @click="closeModal" class="close-button">
          <X class="w-6 h-6" />
        </button>
      </div>

      <div class="modal-body">
        <p class="modal-description">
          Vill du starta en ny hyresgästförening i ditt område? Fyll i formuläret så hjälper vi dig komma igång!
        </p>

        <form @submit.prevent="handleSubmit" class="association-form">
          <div class="form-group">
            <label for="organizationName" class="form-label">Föreningens namn *</label>
            <input
              id="organizationName"
              v-model="formData.organizationName"
              type="text"
              class="form-input"
              :class="{ 'error': errors.organizationName }"
              placeholder="T.ex. Storvreta Hyresgäster"
              required
            />
            <span v-if="errors.organizationName" class="error-message">{{ errors.organizationName }}</span>
          </div>

          <div class="form-group">
            <label for="contactName" class="form-label">Kontaktperson *</label>
            <input
              id="contactName"
              v-model="formData.contactName"
              type="text"
              class="form-input"
              :class="{ 'error': errors.contactName }"
              placeholder="För- och efternamn"
              required
            />
            <span v-if="errors.contactName" class="error-message">{{ errors.contactName }}</span>
          </div>

          <div class="form-group">
            <label for="contactEmail" class="form-label">E-post *</label>
            <input
              id="contactEmail"
              v-model="formData.contactEmail"
              type="email"
              class="form-input"
              :class="{ 'error': errors.contactEmail }"
              placeholder="din.epost@example.se"
              required
            />
            <span v-if="errors.contactEmail" class="error-message">{{ errors.contactEmail }}</span>
          </div>

          <div class="form-group">
            <label for="contactPhone" class="form-label">Telefon *</label>
            <input
              id="contactPhone"
              v-model="formData.contactPhone"
              type="tel"
              class="form-input"
              :class="{ 'error': errors.contactPhone }"
              placeholder="+46701234567"
              required
            />
            <span v-if="errors.contactPhone" class="error-message">{{ errors.contactPhone }}</span>
          </div>

          <div class="form-group">
            <label for="address" class="form-label">Adress *</label>
            <input
              id="address"
              v-model="formData.address"
              type="text"
              class="form-input"
              :class="{ 'error': errors.address }"
              placeholder="Gatuadress"
              required
            />
            <span v-if="errors.address" class="error-message">{{ errors.address }}</span>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="postcode" class="form-label">Postnummer *</label>
              <input
                id="postcode"
                v-model="formData.postcode"
                type="text"
                class="form-input"
                :class="{ 'error': errors.postcode }"
                placeholder="75226"
                required
              />
              <span v-if="errors.postcode" class="error-message">{{ errors.postcode }}</span>
            </div>

            <div class="form-group">
              <label for="city" class="form-label">Stad *</label>
              <input
                id="city"
                v-model="formData.city"
                type="text"
                class="form-input"
                :class="{ 'error': errors.city }"
                placeholder="Uppsala"
                required
              />
              <span v-if="errors.city" class="error-message">{{ errors.city }}</span>
            </div>
          </div>

          <div class="form-group">
            <label for="numberOfMembers" class="form-label">Antal intresserade medlemmar *</label>
            <input
              id="numberOfMembers"
              v-model.number="formData.numberOfMembers"
              type="number"
              class="form-input"
              :class="{ 'error': errors.numberOfMembers }"
              placeholder="Minst 10 medlemmar krävs"
              min="1"
              required
            />
            <span v-if="errors.numberOfMembers" class="error-message">{{ errors.numberOfMembers }}</span>
          </div>

          <div class="form-group">
            <label for="description" class="form-label">Berätta om ert område *</label>
            <textarea
              id="description"
              v-model="formData.description"
              class="form-textarea"
              :class="{ 'error': errors.description }"
              placeholder="Beskriv bostadsområdet, antal lägenheter, hyresvärd, etc..."
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
}

interface Emits {
  (e: 'close'): void;
  (e: 'success', message: string): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const mockDataStore = useMockDataStore();

const formData = reactive({
  organizationName: '',
  contactName: '',
  contactEmail: '',
  contactPhone: '',
  address: '',
  postcode: '',
  city: '',
  numberOfMembers: 0,
  description: '',
});

const errors = reactive({
  organizationName: '',
  contactName: '',
  contactEmail: '',
  contactPhone: '',
  address: '',
  postcode: '',
  city: '',
  numberOfMembers: '',
  description: '',
});

const isSubmitting = ref(false);

const validateForm = (): boolean => {
  let isValid = true;
  
  Object.keys(errors).forEach(key => {
    errors[key as keyof typeof errors] = '';
  });

  if (!formData.organizationName.trim()) {
    errors.organizationName = 'Föreningens namn är obligatoriskt';
    isValid = false;
  }

  if (!formData.contactName.trim()) {
    errors.contactName = 'Kontaktperson är obligatoriskt';
    isValid = false;
  }

  if (!formData.contactEmail.trim()) {
    errors.contactEmail = 'E-post är obligatoriskt';
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail)) {
    errors.contactEmail = 'Ogiltig e-postadress';
    isValid = false;
  }

  if (!formData.contactPhone.trim()) {
    errors.contactPhone = 'Telefon är obligatoriskt';
    isValid = false;
  }

  if (!formData.address.trim()) {
    errors.address = 'Adress är obligatoriskt';
    isValid = false;
  }

  if (!formData.postcode.trim()) {
    errors.postcode = 'Postnummer är obligatoriskt';
    isValid = false;
  }

  if (!formData.city.trim()) {
    errors.city = 'Stad är obligatoriskt';
    isValid = false;
  }

  if (!formData.numberOfMembers || formData.numberOfMembers < 10) {
    errors.numberOfMembers = 'Minst 10 intresserade medlemmar krävs';
    isValid = false;
  }

  if (!formData.description.trim()) {
    errors.description = 'Beskrivning är obligatoriskt';
    isValid = false;
  } else if (formData.description.trim().length < 30) {
    errors.description = 'Beskrivningen måste vara minst 30 tecken';
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
    const result = await mockDataStore.submitAssociationRequest({
      organizationName: formData.organizationName,
      contactName: formData.contactName,
      contactEmail: formData.contactEmail,
      contactPhone: formData.contactPhone,
      address: formData.address,
      postcode: formData.postcode,
      city: formData.city,
      numberOfMembers: formData.numberOfMembers,
      description: formData.description,
    });

    if (result.success) {
      emit('success', `Tack ${formData.contactName}! Din ansökan för "${formData.organizationName}" har skickats. Hyresgästföreningen kommer att kontakta dig inom 5 arbetsdagar på ${formData.contactEmail}.`);
      resetForm();
      closeModal();
    }
  } catch (error) {
    console.error('Error submitting association request:', error);
  } finally {
    isSubmitting.value = false;
  }
};

const resetForm = () => {
  formData.organizationName = '';
  formData.contactName = '';
  formData.contactEmail = '';
  formData.contactPhone = '';
  formData.address = '';
  formData.postcode = '';
  formData.city = '';
  formData.numberOfMembers = 0;
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
  max-width: 700px;
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

.association-form {
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

  .form-row {
    grid-template-columns: 1fr;
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
