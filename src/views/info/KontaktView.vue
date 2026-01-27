<template>
  <div class="info-page">
    <div class="info-container">
      <div class="info-header">
        <button @click="goBack" class="back-button">
          <ArrowLeft class="w-5 h-5" />
          Tillbaka
        </button>
        <h1 class="info-title">Kontakt</h1>
      </div>

      <div class="info-content">
        <div class="contact-intro">
          <h2>Vi finns här för att hjälpa dig</h2>
          <p>
            Har du frågor om Grannskapet eller behöver support? Vårt team är redo att hjälpa dig 
            med allt från tekniska frågor till råd om hur du kan få ut mesta möjliga av plattformen.
          </p>
        </div>

        <div class="contact-grid">
          <div class="contact-card">
            <Mail class="contact-icon" />
            <h3>E-post</h3>
            <p class="contact-detail">info@grannskapet.se</p>
            <p class="contact-description">
              Skicka oss ett e-postmeddelande för allmänna frågor och supportärenden. 
              Vi svarar vanligtvis inom 24 timmar på vardagar.
            </p>
          </div>

          <div class="contact-card">
            <Phone class="contact-icon" />
            <h3>Telefon</h3>
            <p class="contact-detail">08-123 456 789</p>
            <p class="contact-description">
              Vardagar 09:00-17:00 för brådskande ärenden. 
              För teknisk support, föredrar vi e-post så vi kan hjälpa dig effektivare.
            </p>
          </div>

          <div class="contact-card">
            <MapPin class="contact-icon" />
            <h3>Besöksadress</h3>
            <p class="contact-detail">
              Grannskapet AB<br>
              Teknikringen 1<br>
              114 28 Stockholm
            </p>
            <p class="contact-description">
              Välkommen att besöka oss för personlig support och demo av plattformen. 
              Boka tid i förväg via e-post.
            </p>
          </div>
        </div>

        <div class="contact-form-section">
          <h3>Skicka meddelande</h3>
          <form @submit.prevent="handleSubmit" class="contact-form">
            <div class="form-row">
              <div class="form-group">
                <label for="name" class="form-label">Namn *</label>
                <input
                  id="name"
                  v-model="formData.name"
                  type="text"
                  class="form-input"
                  :class="{ 'error': errors.name }"
                  placeholder="Ditt namn"
                  required
                />
                <span v-if="errors.name" class="error-message">{{ errors.name }}</span>
              </div>

              <div class="form-group">
                <label for="email" class="form-label">E-post *</label>
                <input
                  id="email"
                  v-model="formData.email"
                  type="email"
                  class="form-input"
                  :class="{ 'error': errors.email }"
                  placeholder="din.epost@example.se"
                  required
                />
                <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
              </div>
            </div>

            <div class="form-group">
              <label for="subject" class="form-label">Ämne *</label>
              <select
                id="subject"
                v-model="formData.subject"
                class="form-input"
                :class="{ 'error': errors.subject }"
                required
              >
                <option value="">Välj ämne</option>
                <option value="support">Teknisk support</option>
                <option value="sales">Demo och pris</option>
                <option value="billing">Fakturering</option>
                <option value="partners">Samarbete</option>
                <option value="other">Annat</option>
              </select>
              <span v-if="errors.subject" class="error-message">{{ errors.subject }}</span>
            </div>

            <div class="form-group">
              <label for="message" class="form-label">Meddelande *</label>
              <textarea
                id="message"
                v-model="formData.message"
                class="form-textarea"
                :class="{ 'error': errors.message }"
                placeholder="Beskriv din fråga eller ditt ärende..."
                rows="6"
                required
              ></textarea>
              <span v-if="errors.message" class="error-message">{{ errors.message }}</span>
            </div>

            <button type="submit" class="submit-button" :disabled="isSubmitting">
              <span v-if="!isSubmitting">Skicka meddelande</span>
              <span v-else>Skickar...</span>
            </button>
          </form>

          <div v-if="showSuccess" class="success-message">
            <CheckCircle class="success-icon" />
            <h4>Tack för ditt meddelande!</h4>
            <p>Vi har tagit emot ditt meddelande och kommer att återkomma till dig så snart som möjligt.</p>
          </div>
        </div>

        <div class="support-hours">
          <h3>Supporttider</h3>
          <div class="hours-grid">
            <div class="hours-item">
              <Calendar class="hours-icon" />
              <div>
                <h4>Vardagar</h4>
                <p>09:00 - 17:00</p>
              </div>
            </div>
            <div class="hours-item">
              <Calendar class="hours-icon" />
              <div>
                <h4>Lördagar & Söndagar</h4>
                <p>Stängt</p>
              </div>
            </div>
            <div class="hours-item">
              <AlertCircle class="hours-icon" />
              <div>
                <h4>Brådskande ärenden</h4>
                <p>Telefon: 08-123 456 789 (dygnet runt)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  AlertCircle, 
  CheckCircle 
} from 'lucide-vue-next';

const router = useRouter();

const formData = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
});

const errors = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
});

const isSubmitting = ref(false);
const showSuccess = ref(false);

const goBack = () => {
  router.go(-1);
};

const validateForm = (): boolean => {
  let isValid = true;
  
  // Reset errors
  Object.keys(errors).forEach(key => {
    errors[key as keyof typeof errors] = '';
  });

  if (!formData.name.trim()) {
    errors.name = 'Namn är obligatoriskt';
    isValid = false;
  }

  if (!formData.email.trim()) {
    errors.email = 'E-post är obligatoriskt';
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = 'Ogiltig e-postadress';
    isValid = false;
  }

  if (!formData.subject) {
    errors.subject = 'Ämne är obligatoriskt';
    isValid = false;
  }

  if (!formData.message.trim()) {
    errors.message = 'Meddelande är obligatoriskt';
    isValid = false;
  } else if (formData.message.trim().length < 10) {
    errors.message = 'Meddelandet måste vara minst 10 tecken';
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
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Contact form submitted:', formData);
    
    // Reset form
    Object.keys(formData).forEach(key => {
      (formData as any)[key] = '';
    });
    
    showSuccess.value = true;
    
    // Hide success message after 5 seconds
    setTimeout(() => {
      showSuccess.value = false;
    }, 5000);
    
  } catch (error) {
    console.error('Error submitting form:', error);
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
.info-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  padding: 2rem 1rem;
}

.info-container {
  max-width: 1000px;
  margin: 0 auto;
}

.info-header {
  margin-bottom: 2rem;
}

.back-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: white;
  border: 1px solid var(--hgf-gray-light);
  border-radius: 8px;
  color: var(--hgf-gray-medium);
  text-decoration: none;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 1rem;
}

.back-button:hover {
  background: var(--hgf-gray-bg);
  color: var(--hgf-blue);
}

.info-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--hgf-gray-dark);
  margin: 0;
}

.info-content {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.contact-intro {
  text-align: center;
  margin-bottom: 3rem;
}

.contact-intro h2 {
  font-size: 1.75rem;
  font-weight: 600;
  color: var(--hgf-gray-dark);
  margin-bottom: 1rem;
}

.contact-intro p {
  font-size: 1.1rem;
  color: var(--hgf-gray-medium);
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto;
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.contact-card {
  text-align: center;
  padding: 2rem;
  background: var(--hgf-gray-bg);
  border-radius: 12px;
  transition: transform 0.3s ease;
}

.contact-card:hover {
  transform: translateY(-4px);
}

.contact-icon {
  width: 48px;
  height: 48px;
  color: var(--hgf-blue);
  margin: 0 auto 1rem;
}

.contact-card h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--hgf-gray-dark);
  margin-bottom: 0.5rem;
}

.contact-detail {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--hgf-blue);
  margin-bottom: 1rem;
}

.contact-description {
  font-size: 0.95rem;
  color: var(--hgf-gray-medium);
  line-height: 1.5;
}

.contact-form-section {
  margin-bottom: 3rem;
}

.contact-form-section h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--hgf-gray-dark);
  margin-bottom: 2rem;
  text-align: center;
}

.contact-form {
  max-width: 600px;
  margin: 0 auto;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  font-weight: 600;
  color: var(--hgf-gray-dark);
  margin-bottom: 0.5rem;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid var(--hgf-gray-light);
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
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
  margin-top: 0.25rem;
  display: block;
}

.submit-button {
  width: 100%;
  padding: 1rem;
  background: var(--hgf-blue);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.submit-button:hover:not(:disabled) {
  background: var(--hgf-blue-dark);
  transform: translateY(-2px);
}

.submit-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.success-message {
  text-align: center;
  padding: 2rem;
  background: #10b981;
  color: white;
  border-radius: 8px;
  margin-top: 2rem;
}

.success-icon {
  width: 48px;
  height: 48px;
  margin: 0 auto 1rem;
}

.success-message h4 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.support-hours h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--hgf-gray-dark);
  margin-bottom: 1.5rem;
  text-align: center;
}

.hours-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.hours-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: var(--hgf-gray-bg);
  border-radius: 8px;
}

.hours-icon {
  width: 32px;
  height: 32px;
  color: var(--hgf-green);
  flex-shrink: 0;
}

.hours-item h4 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--hgf-gray-dark);
  margin: 0 0 0.25rem 0;
}

.hours-item p {
  font-size: 0.9rem;
  color: var(--hgf-gray-medium);
  margin: 0;
}

@media (max-width: 768px) {
  .info-title {
    font-size: 2rem;
  }
  
  .info-content {
    padding: 1.5rem;
  }
  
  .contact-grid {
    grid-template-columns: 1fr;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .hours-grid {
    grid-template-columns: 1fr;
  }
}
</style>
