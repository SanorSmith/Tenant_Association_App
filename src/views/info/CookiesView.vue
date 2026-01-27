<template>
  <div class="info-page">
    <div class="info-container">
      <div class="info-header">
        <button @click="goBack" class="back-button">
          <ArrowLeft class="w-5 h-5" />
          Tillbaka
        </button>
        <h1 class="info-title">Cookies</h1>
      </div>

      <div class="info-content">
        <div class="cookies-intro">
          <Cookie class="cookies-icon" />
          <h2>Cookies på Grannskapet</h2>
          <p class="last-updated">Senast uppdaterad: 1 januari 2026</p>
          <p>
            Vi använder cookies för att förbättra din upplevelse på vår webbplats. 
            Denna sida förklarar vad cookies är, vilka vi använder och hur du kan kontrollera dem.
          </p>
        </div>

        <div class="cookie-settings">
          <h3>Dina cookie-inställningar</h3>
          <div class="settings-grid">
            <div class="setting-item">
              <div class="setting-header">
                <div class="setting-info">
                  <h4>Nödvändiga cookies</h4>
                  <p>Krävs för att webbplatsen ska fungera</p>
                </div>
                <label class="toggle-switch">
                  <input type="checkbox" checked disabled>
                  <span class="slider"></span>
                </label>
              </div>
              <p class="setting-description">
                Dessa cookies är nödvändiga för grundläggande funktioner som inloggning, 
                sessioner och säkerhet. De kan inte stängas av.
              </p>
            </div>

            <div class="setting-item">
              <div class="setting-header">
                <div class="setting-info">
                  <h4>Preferens-cookies</h4>
                  <p>Håller reda på dina inställningar</p>
                </div>
                <label class="toggle-switch">
                  <input type="checkbox" v-model="preferences.functional" @change="updatePreferences">
                  <span class="slider"></span>
                </label>
              </div>
              <p class="setting-description">
                Dessa cookies minns dina inställningar som språk, tema och andra preferenser 
                för att ge dig en bättre upplevelse.
              </p>
            </div>

            <div class="setting-item">
              <div class="setting-header">
                <div class="setting-info">
                  <h4>Analys-cookies</h4>
                  <p>Hjäper oss förbättra webbplatsen</p>
                </div>
                <label class="toggle-switch">
                  <input type="checkbox" v-model="preferences.analytics" @change="updatePreferences">
                  <span class="slider"></span>
                </label>
              </div>
              <p class="setting-description">
                Dessa cookies hjälper oss att förstå hur besökare använder vår webbplats 
                så att vi kan förbättra innehållet och funktionerna.
              </p>
            </div>

            <div class="setting-item">
              <div class="setting-header">
                <div class="setting-info">
                  <h4>Marknadsförings-cookies</h4>
                  <p>Används för riktad reklam</p>
                </div>
                <label class="toggle-switch">
                  <input type="checkbox" v-model="preferences.marketing" @change="updatePreferences">
                  <span class="slider"></span>
                </label>
              </div>
              <p class="setting-description">
                Dessa cookies används för att visa relevanta annonser baserat på dina intressen 
                och surfvanor.
              </p>
            </div>
          </div>

          <div class="settings-actions">
            <button @click="acceptAll" class="btn-primary">Acceptera alla</button>
            <button @click="rejectAll" class="btn-secondary">Avvisa alla</button>
            <button @click="saveSettings" class="btn-outline">Spara inställningar</button>
          </div>
        </div>

        <div class="cookie-details">
          <h3>Detaljerad information om cookies</h3>
          
          <div class="cookie-category">
            <h4>1. Nödvändiga cookies</h4>
            <p>Dessa cookies är nödvändiga för att webbplatsen ska fungera korrekt.</p>
            <div class="cookie-table">
              <div class="table-header">
                <span>Cookie-namn</span>
                <span>Ändamål</span>
                <span>Giltighetstid</span>
              </div>
              <div class="table-row">
                <span>session_id</span>
                <span>Autentisering och session</span>
                <span>Session</span>
              </div>
              <div class="table-row">
                <span>csrf_token</span>
                <span>Skydd mot CSRF-attacker</span>
                <span>Session</span>
              </div>
              <div class="table-row">
                <span>preferences</span>
                <span>Användarinställningar</span>
                <span>1 år</span>
              </div>
            </div>
          </div>

          <div class="cookie-category">
            <h4>2. Preferens-cookies</h4>
            <p>Dessa cookies minns dina inställningar för att förbättra din upplevelse.</p>
            <div class="cookie-table">
              <div class="table-header">
                <span>Cookie-namn</span>
                <span>Ändamål</span>
                <span>Giltighetstid</span>
              </div>
              <div class="table-row">
                <span>language</span>
                <span>Språkinställningar</span>
                <span>1 år</span>
              </div>
              <div class="table-row">
                <span>theme</span>
                <span>Visuellt tema</span>
                <span>6 månader</span>
              </div>
              <div class="table-row">
                <span>layout</span>
                <span>Sidlayout och preferenser</span>
                <span>6 månader</span>
              </div>
            </div>
          </div>

          <div class="cookie-category">
            <h4>3. Analys-cookies</h4>
            <p>Dessa cookies hjälper oss att analysera trafik och förbättra webbplatsen.</p>
            <div class="cookie-table">
              <div class="table-header">
                <span>Cookie-namn</span>
                <span>Ändamål</span>
                <span>Giltighetstid</span>
              </div>
              <div class="table-row">
                <span>_ga</span>
                <span>Google Analytics - unik besökare</span>
                <span>2 år</span>
              </div>
              <div class="table-row">
                <span>_gid</span>
                <span>Google Analytics - sessions-ID</span>
                <span>24 timmar</span>
              </div>
              <div class="table-row">
                <span>_gat</span>
                <span>Google Analytics - spårning</span>
                <span>1 minut</span>
              </div>
            </div>
          </div>

          <div class="cookie-category">
            <h4>4. Marknadsförings-cookies</h4>
            <p>Dessa cookies används för riktad marknadsföring.</p>
            <div class="cookie-table">
              <div class="table-header">
                <span>Cookie-namn</span>
                <span>Ändamål</span>
                <span>Giltighetstid</span>
              </div>
              <div class="table-row">
                <span>ads_id</span>
                <span>Annonsering-ID</span>
                <span>1 år</span>
              </div>
              <div class="table-row">
                <span>ad_storage</span>
                <span>Annonslagring</span>
                <span>2 år</span>
              </div>
              <div class="table-row">
                <span>conversion</span>
                <span>Konverteringsspårning</span>
                <span>30 dagar</span>
              </div>
            </div>
          </div>
        </div>

        <div class="cookie-info">
          <h3>Vanliga frågor om cookies</h3>
          
          <div class="faq-item">
            <div class="faq-question" @click="toggleFaq(0)">
              <span>Vad är cookies?</span>
              <ChevronDown :class="{ 'rotated': faqOpen[0] }" class="faq-icon" />
            </div>
            <div v-show="faqOpen[0]" class="faq-answer">
              <p>
                Cookies är små textfiler som lagras på din enhet när du besöker en webbplats. 
                De innehåller information som hjälper webbplatsen att komma ihåg dina handlingar och preferenser.
              </p>
            </div>
          </div>

          <div class="faq-item">
            <div class="faq-question" @click="toggleFaq(1)">
              <span>Varför använder vi cookies?</span>
              <ChevronDown :class="{ 'rotated': faqOpen[1] }" class="faq-icon" />
            </div>
            <div v-show="faqOpen[1]" class="faq-answer">
              <p>
                Vi använder cookies för att: förbättra din upplevelse, analysera trafik, 
                visa personligt anpassat innehåll och för säkerhetsändamål.
              </p>
            </div>
          </div>

          <div class="faq-item">
            <div class="faq-question" @click="toggleFaq(2)">
              <span>Kan jag hantera cookies?</span>
              <ChevronDown :class="{ 'rotated': faqOpen[2] }" class="faq-icon" />
            </div>
            <div v-show="faqOpen[2]" class="faq-answer">
              <p>
                Ja! Du kan kontrollera cookies genom din webbläsares inställningar eller genom 
                cookie-inställningarna på denna sida. Du kan när som helst ändra eller ta bort cookies.
              </p>
            </div>
          </div>

          <div class="faq-item">
            <div class="faq-question" @click="toggleFaq(3)">
              <span>Vad händer om jag inte accepterar cookies?</span>
              <ChevronDown :class="{ 'rotated': faqOpen[3] }" class="faq-icon" />
            </div>
            <div v-show="faqOpen[3]" class="faq-answer">
              <p>
                Nödvändiga cookies måste accepteras för att webbplatsen ska fungera. 
                Övriga cookies kan nekas, men vissa funktioner kanske inte fungerar som förväntat.
              </p>
            </div>
          </div>
        </div>

        <div class="cookie-contact">
          <h3>Behöver du mer hjälp?</h3>
          <p>
            Om du har frågor om vår användning av cookies eller dina rättigheter, 
            kontakta oss:
          </p>
          <div class="contact-info">
            <p><strong>E-post:</strong> privacy@grannskapet.se</p>
            <p><strong>Telefon:</strong> 08-123 456 789</p>
            <p><strong>Adress:</strong> Teknikringen 1, 114 28 Stockholm</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { ArrowLeft, Cookie, ChevronDown } from 'lucide-vue-next';

const router = useRouter();

const preferences = reactive({
  necessary: true,
  functional: true,
  analytics: false,
  marketing: false
});

const faqOpen = ref([false, false, false, false]);

const goBack = () => {
  router.go(-1);
};

const toggleFaq = (index: number) => {
  faqOpen.value[index] = !faqOpen.value[index];
};

const updatePreferences = () => {
  // Save preferences to localStorage
  localStorage.setItem('cookiePreferences', JSON.stringify(preferences));
  
  // In a real app, this would update actual cookie settings
  console.log('Cookie preferences updated:', preferences);
};

const acceptAll = () => {
  preferences.functional = true;
  preferences.analytics = true;
  preferences.marketing = true;
  updatePreferences();
};

const rejectAll = () => {
  preferences.functional = false;
  preferences.analytics = false;
  preferences.marketing = false;
  updatePreferences();
};

const saveSettings = () => {
  updatePreferences();
  // Show success message
  alert('Dina cookie-inställningar har sparats!');
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

.cookies-intro {
  text-align: center;
  margin-bottom: 3rem;
}

.cookies-icon {
  width: 64px;
  height: 64px;
  color: var(--hgf-blue);
  margin: 0 auto 1.5rem;
}

.cookies-intro h2 {
  font-size: 1.75rem;
  font-weight: 600;
  color: var(--hgf-gray-dark);
  margin-bottom: 0.5rem;
}

.last-updated {
  font-size: 0.9rem;
  color: var(--hgf-gray-medium);
  margin-bottom: 1rem;
}

.cookies-intro p {
  font-size: 1.1rem;
  color: var(--hgf-gray-medium);
  line-height: 1.6;
  max-width: 700px;
  margin: 0 auto;
}

.cookie-settings {
  margin-bottom: 3rem;
}

.cookie-settings h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--hgf-gray-dark);
  margin-bottom: 2rem;
  text-align: center;
}

.settings-grid {
  display: grid;
  gap: 2rem;
  margin-bottom: 2rem;
}

.setting-item {
  padding: 1.5rem;
  background: var(--hgf-gray-bg);
  border-radius: 8px;
}

.setting-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.setting-info h4 {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--hgf-gray-dark);
  margin: 0 0 0.25rem 0;
}

.setting-info p {
  font-size: 0.9rem;
  color: var(--hgf-gray-medium);
  margin: 0;
}

.setting-description {
  font-size: 0.95rem;
  color: var(--hgf-gray-medium);
  line-height: 1.5;
  margin: 0;
}

.toggle-switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: var(--hgf-blue);
}

input:checked + .slider:before {
  transform: translateX(26px);
}

input:disabled + .slider {
  background-color: var(--hgf-green);
  cursor: not-allowed;
}

.settings-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-primary,
.btn-secondary,
.btn-outline {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
}

.btn-primary {
  background: var(--hgf-blue);
  color: white;
}

.btn-primary:hover {
  background: var(--hgf-blue-dark);
}

.btn-secondary {
  background: var(--hgf-gray-medium);
  color: white;
}

.btn-secondary:hover {
  background: var(--hgf-gray-dark);
}

.btn-outline {
  background: white;
  color: var(--hgf-blue);
  border: 2px solid var(--hgf-blue);
}

.btn-outline:hover {
  background: var(--hgf-blue);
  color: white;
}

.cookie-details {
  margin-bottom: 3rem;
}

.cookie-details h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--hgf-gray-dark);
  margin-bottom: 2rem;
  text-align: center;
}

.cookie-category {
  margin-bottom: 2rem;
}

.cookie-category h4 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--hgf-gray-dark);
  margin-bottom: 1rem;
}

.cookie-category p {
  font-size: 1rem;
  color: var(--hgf-gray-medium);
  line-height: 1.6;
  margin-bottom: 1rem;
}

.cookie-table {
  background: white;
  border: 1px solid var(--hgf-gray-light);
  border-radius: 8px;
  overflow: hidden;
}

.table-header {
  display: grid;
  grid-template-columns: 2fr 2fr 1fr;
  background: var(--hgf-gray-bg);
  padding: 1rem;
  font-weight: 600;
  color: var(--hgf-gray-dark);
  border-bottom: 1px solid var(--hgf-gray-light);
}

.table-row {
  display: grid;
  grid-template-columns: 2fr 2fr 1fr;
  padding: 1rem;
  border-bottom: 1px solid var(--hgf-gray-light);
  font-size: 0.9rem;
}

.table-row:last-child {
  border-bottom: none;
}

.cookie-info {
  margin-bottom: 3rem;
}

.cookie-info h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--hgf-gray-dark);
  margin-bottom: 2rem;
  text-align: center;
}

.faq-item {
  margin-bottom: 1rem;
  border: 1px solid var(--hgf-gray-light);
  border-radius: 8px;
  overflow: hidden;
}

.faq-question {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  background: var(--hgf-gray-bg);
  cursor: pointer;
  transition: background 0.3s ease;
}

.faq-question:hover {
  background: var(--hgf-gray-light);
}

.faq-question span {
  font-weight: 600;
  color: var(--hgf-gray-dark);
}

.faq-icon {
  width: 20px;
  height: 20px;
  color: var(--hgf-blue);
  transition: transform 0.3s ease;
}

.faq-icon.rotated {
  transform: rotate(180deg);
}

.faq-answer {
  padding: 1rem 1.5rem;
  background: white;
}

.faq-answer p {
  font-size: 0.95rem;
  color: var(--hgf-gray-medium);
  line-height: 1.6;
  margin: 0;
}

.cookie-contact {
  text-align: center;
}

.cookie-contact h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--hgf-gray-dark);
  margin-bottom: 1rem;
}

.cookie-contact p {
  font-size: 1rem;
  color: var(--hgf-gray-medium);
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.contact-info {
  background: var(--hgf-gray-bg);
  padding: 1.5rem;
  border-radius: 8px;
  border-left: 4px solid var(--hgf-blue);
  display: inline-block;
  text-align: left;
}

.contact-info p {
  margin-bottom: 0.5rem;
}

.contact-info p:last-child {
  margin-bottom: 0;
}

@media (max-width: 768px) {
  .info-title {
    font-size: 2rem;
  }
  
  .info-content {
    padding: 1.5rem;
  }
  
  .table-header,
  .table-row {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
  
  .settings-actions {
    flex-direction: column;
  }
  
  .btn-primary,
  .btn-secondary,
  .btn-outline {
    width: 100%;
  }
}
</style>
