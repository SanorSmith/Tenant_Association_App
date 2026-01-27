<template>
  <div v-if="isOpen" class="modal-overlay" @click="handleOverlayClick">
    <div class="modal-container" @click.stop>
      <div class="modal-header">
        <h2 class="modal-title">Boka lokal</h2>
        <button @click="closeModal" class="close-button">
          <X class="w-6 h-6" />
        </button>
      </div>

      <div class="modal-body">
        <p class="modal-description">
          Boka en av föreningens lokaler för ditt evenemang eller aktivitet. Din bokning skickas till styrelsen för godkännande.
        </p>

        <form @submit.prevent="handleSubmit" class="booking-form">
          <div class="form-group">
            <label for="premisesId" class="form-label">Välj lokal *</label>
            <select
              id="premisesId"
              v-model="formData.premisesId"
              class="form-input"
              :class="{ 'error': errors.premisesId }"
              required
              @change="handlePremisesChange"
            >
              <option value="">Välj en lokal</option>
              <option 
                v-for="premises in availablePremises" 
                :key="premises.id" 
                :value="premises.id"
              >
                {{ premises.name }} - {{ premises.spaceType }} ({{ premises.capacity }} pers)
              </option>
            </select>
            <span v-if="errors.premisesId" class="error-message">{{ errors.premisesId }}</span>
          </div>

          <div v-if="selectedPremises" class="premises-info">
            <div class="info-row">
              <MapPin class="info-icon" />
              <span>{{ selectedPremises.address }}</span>
            </div>
            <div class="info-row">
              <Info class="info-icon" />
              <span>{{ selectedPremises.intendedUse }}</span>
            </div>
            <div class="info-row">
              <AlertCircle class="info-icon" />
              <span>{{ selectedPremises.rules }}</span>
            </div>
          </div>

          <div class="form-group">
            <label for="requesterName" class="form-label">Ditt namn *</label>
            <input
              id="requesterName"
              v-model="formData.requesterName"
              type="text"
              class="form-input"
              :class="{ 'error': errors.requesterName }"
              placeholder="För- och efternamn"
              required
            />
            <span v-if="errors.requesterName" class="error-message">{{ errors.requesterName }}</span>
          </div>

          <div class="form-group">
            <label for="requesterEmail" class="form-label">E-post *</label>
            <input
              id="requesterEmail"
              v-model="formData.requesterEmail"
              type="email"
              class="form-input"
              :class="{ 'error': errors.requesterEmail }"
              placeholder="din.epost@example.se"
              required
            />
            <span v-if="errors.requesterEmail" class="error-message">{{ errors.requesterEmail }}</span>
          </div>

          <div class="form-group">
            <label for="requesterPhone" class="form-label">Telefon *</label>
            <input
              id="requesterPhone"
              v-model="formData.requesterPhone"
              type="tel"
              class="form-input"
              :class="{ 'error': errors.requesterPhone }"
              placeholder="+46701234567"
              required
            />
            <span v-if="errors.requesterPhone" class="error-message">{{ errors.requesterPhone }}</span>
          </div>

          <div class="form-group">
            <label for="bookingDate" class="form-label">Datum *</label>
            <input
              id="bookingDate"
              v-model="formData.bookingDate"
              type="date"
              class="form-input"
              :class="{ 'error': errors.bookingDate }"
              :min="minDate"
              required
            />
            <span v-if="errors.bookingDate" class="error-message">{{ errors.bookingDate }}</span>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="startTime" class="form-label">Starttid *</label>
              <input
                id="startTime"
                v-model="formData.startTime"
                type="time"
                class="form-input"
                :class="{ 'error': errors.startTime }"
                required
              />
              <span v-if="errors.startTime" class="error-message">{{ errors.startTime }}</span>
            </div>

            <div class="form-group">
              <label for="endTime" class="form-label">Sluttid *</label>
              <input
                id="endTime"
                v-model="formData.endTime"
                type="time"
                class="form-input"
                :class="{ 'error': errors.endTime }"
                required
              />
              <span v-if="errors.endTime" class="error-message">{{ errors.endTime }}</span>
            </div>
          </div>

          <div class="form-group">
            <label for="purpose" class="form-label">Syfte med bokningen *</label>
            <textarea
              id="purpose"
              v-model="formData.purpose"
              class="form-textarea"
              :class="{ 'error': errors.purpose }"
              placeholder="Beskriv vad du ska använda lokalen till..."
              rows="4"
              required
            ></textarea>
            <span v-if="errors.purpose" class="error-message">{{ errors.purpose }}</span>
          </div>

          <div class="form-actions">
            <button type="button" @click="closeModal" class="btn-secondary">
              Avbryt
            </button>
            <button type="submit" class="btn-primary" :disabled="isSubmitting">
              <span v-if="!isSubmitting">Skicka bokningsförfrågan</span>
              <span v-else>Skickar...</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { X, MapPin, Info, AlertCircle } from 'lucide-vue-next';
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
  premisesId: '',
  requesterName: '',
  requesterEmail: '',
  requesterPhone: '',
  bookingDate: '',
  startTime: '',
  endTime: '',
  purpose: '',
});

const errors = reactive({
  premisesId: '',
  requesterName: '',
  requesterEmail: '',
  requesterPhone: '',
  bookingDate: '',
  startTime: '',
  endTime: '',
  purpose: '',
});

const isSubmitting = ref(false);

const availablePremises = computed(() => {
  return mockDataStore.getPremisesByAssociation(props.associationId);
});

const selectedPremises = computed(() => {
  if (!formData.premisesId) return null;
  return mockDataStore.getPremisesById(formData.premisesId);
});

const minDate = computed(() => {
  const today = new Date();
  return today.toISOString().split('T')[0];
});

const handlePremisesChange = () => {
  errors.premisesId = '';
};

const validateForm = (): boolean => {
  let isValid = true;
  
  Object.keys(errors).forEach(key => {
    errors[key as keyof typeof errors] = '';
  });

  if (!formData.premisesId) {
    errors.premisesId = 'Välj en lokal';
    isValid = false;
  }

  if (!formData.requesterName.trim()) {
    errors.requesterName = 'Namn är obligatoriskt';
    isValid = false;
  }

  if (!formData.requesterEmail.trim()) {
    errors.requesterEmail = 'E-post är obligatoriskt';
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.requesterEmail)) {
    errors.requesterEmail = 'Ogiltig e-postadress';
    isValid = false;
  }

  if (!formData.requesterPhone.trim()) {
    errors.requesterPhone = 'Telefon är obligatoriskt';
    isValid = false;
  }

  if (!formData.bookingDate) {
    errors.bookingDate = 'Datum är obligatoriskt';
    isValid = false;
  }

  if (!formData.startTime) {
    errors.startTime = 'Starttid är obligatoriskt';
    isValid = false;
  }

  if (!formData.endTime) {
    errors.endTime = 'Sluttid är obligatoriskt';
    isValid = false;
  }

  if (formData.startTime && formData.endTime && formData.startTime >= formData.endTime) {
    errors.endTime = 'Sluttid måste vara efter starttid';
    isValid = false;
  }

  if (!formData.purpose.trim()) {
    errors.purpose = 'Syfte är obligatoriskt';
    isValid = false;
  } else if (formData.purpose.trim().length < 10) {
    errors.purpose = 'Syftet måste vara minst 10 tecken';
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
    const result = await mockDataStore.submitBooking({
      premisesId: formData.premisesId,
      requesterName: formData.requesterName,
      requesterEmail: formData.requesterEmail,
      requesterPhone: formData.requesterPhone,
      bookingDate: new Date(formData.bookingDate),
      startTime: formData.startTime,
      endTime: formData.endTime,
      purpose: formData.purpose,
    });

    if (result.success) {
      const premisesName = selectedPremises.value?.name || 'lokalen';
      let message = `Tack ${formData.requesterName}! Din bokningsförfrågan för ${premisesName} den ${formData.bookingDate} har skickats till styrelsen.`;
      
      if (result.customMessage) {
        message += `\n\n📋 Viktigt: ${result.customMessage}`;
      }
      
      emit('success', message);
      resetForm();
      closeModal();
    }
  } catch (error) {
    console.error('Error submitting booking:', error);
  } finally {
    isSubmitting.value = false;
  }
};

const resetForm = () => {
  formData.premisesId = '';
  formData.requesterName = '';
  formData.requesterEmail = '';
  formData.requesterPhone = '';
  formData.bookingDate = '';
  formData.startTime = '';
  formData.endTime = '';
  formData.purpose = '';
  
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

.booking-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.premises-info {
  background: var(--hgf-gray-bg);
  border-left: 4px solid var(--hgf-blue);
  padding: 1rem 1.25rem;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.info-row {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  font-size: 0.95rem;
  color: var(--hgf-gray-dark);
}

.info-icon {
  width: 18px;
  height: 18px;
  color: var(--hgf-blue);
  flex-shrink: 0;
  margin-top: 2px;
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
  background: var(--hgf-blue);
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: var(--hgf-blue-dark);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 102, 179, 0.3);
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
