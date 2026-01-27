<template>
  <div class="info-page">
    <div class="info-container">
      <div class="info-header">
        <button @click="goBack" class="back-button">
          <ArrowLeft class="w-5 h-5" />
          Tillbaka
        </button>
        <h1 class="info-title">Support</h1>
      </div>

      <div class="info-content">
        <div class="support-intro">
          <HelpCircle class="support-icon" />
          <h2>Vi hjälper dig komma igång</h2>
          <p>
            Få hjälp med Grannskapet genom vår online-hjälp, guider och direkt support. 
            Vi är här för att säkerställa att du får ut mesta möjliga av plattformen.
          </p>
        </div>

        <div class="support-options">
          <div class="support-option">
            <Book class="option-icon" />
            <h3>Guider & Manualer</h3>
            <p>Steg-för-steg guider för alla funktioner i Grannskapet</p>
            <ul>
              <li>Komma igång-guide</li>
              <li>Möteshantering</li>
              <li>Dokumenthantering</li>
              <li>Budget & Rapporter</li>
              <li>Lokalbokning</li>
            </ul>
          </div>

          <div class="support-option">
            <Video class="option-icon" />
            <h3>Video-tutorials</h3>
            <p>Visualeta guider som visar hur du använder olika funktioner</p>
            <ul>
              <li>Skapa ditt första möte</li>
              <li>Ladda upp dokument</li>
              <li>Boka en lokal</li>
              <li>Skapa budget</li>
              <li>Invantera medlemmar</li>
            </ul>
          </div>

          <div class="support-option">
            <MessageSquare class="option-icon" />
            <h3>FAQ - Vanliga frågor</h3>
            <p>Svar på de vanligaste frågorna från våra användare</p>
            <ul>
              <li>Konto och inloggning</li>
              <li>Medlemshantering</li>
              <li>Tekniska problem</li>
              <li>Fakturering</li>
              <li>Data och säkerhet</li>
            </ul>
          </div>
        </div>

        <div class="common-issues">
          <h3>Vanliga problem och lösningar</h3>
          
          <div class="issue-item">
            <div class="issue-header">
              <AlertCircle class="issue-icon" />
              <h4>Glömt lösenord</h4>
            </div>
            <div class="issue-content">
              <p>Klicka på "Glömt lösenord" på inloggningssidan. Följ instruktionerna i e-postmeddelandet för att återställa ditt lösenord.</p>
            </div>
          </div>

          <div class="issue-item">
            <div class="issue-header">
              <AlertCircle class="issue-icon" />
              <h4>Kan inte logga in</h4>
            </div>
            <div class="issue-content">
              <p>Kontrollera att du använder rätt e-postadress och lösenord. Om problemet kvarstår, kontakta supporten.</p>
            </div>
          </div>

          <div class="issue-item">
            <div class="issue-header">
              <AlertCircle class="issue-icon" />
              <h4>Dokument laddas inte upp</h4>
            </div>
            <div class="issue-content">
              <p>Kontrollera filformatet (PDF, DOC, DOCX, XLS, XLSX) och att filen är mindre än 10MB. Prova en annan webbläsare om problemet kvarstår.</p>
            </div>
          </div>

          <div class="issue-item">
            <div class="issue-header">
              <AlertCircle class="issue-icon" />
              <h4>Bokning fungerar inte</h4>
            </div>
            <div class="issue-content">
              <p>Kontrollera att lokalen är tillgänglig och att du har behörighet att boka. Kontakta styrelsen om du behöver behörighet.</p>
            </div>
          </div>
        </div>

        <div class="contact-support">
          <h3>Behöver du mer hjälp?</h3>
          <div class="contact-methods">
            <div class="contact-method">
              <Mail class="method-icon" />
              <div>
                <h4>E-post Support</h4>
                <p>support@grannskapet.se</p>
                <p class="method-description">Svar inom 24 timmar på vardagar</p>
              </div>
            </div>

            <div class="contact-method">
              <Phone class="method-icon" />
              <div>
                <h4>Telefon Support</h4>
                <p>08-123 456 789</p>
                <p class="method-description">Vardagar 09:00-17:00</p>
              </div>
            </div>

            <div class="contact-method">
              <MessageCircle class="method-icon" />
              <div>
                <h4>Live Chat</h4>
                <p>Tillgänglig i plattformen</p>
                <p class="method-description">Vardagar 10:00-16:00</p>
              </div>
            </div>
          </div>
        </div>

        <div class="tips-section">
          <h3>Tips för att få snabbare hjälp</h3>
          <ul class="tips-list">
            <li><CheckCircle class="tip-icon" />Beskriv problemet så detaljerat som möjligt</li>
            <li><CheckCircle class="tip-icon" />Inkludera felmeddelanden och skärmdumpar</li>
            <li><CheckCircle class="tip-icon" />Ange vilken webbläsare du använder</li>
            <li><CheckCircle class="tip-icon" />Berätta vad du har försökt göra hittills</li>
            <li><CheckCircle class="tip-icon" />Ange föreningens namn och ditt användarnamn</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { 
  ArrowLeft, 
  HelpCircle, 
  Book, 
  Video, 
  MessageSquare, 
  AlertCircle, 
  Mail, 
  Phone, 
  MessageCircle, 
  CheckCircle 
} from 'lucide-vue-next';

const router = useRouter();

const goBack = () => {
  router.go(-1);
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

.support-intro {
  text-align: center;
  margin-bottom: 3rem;
}

.support-icon {
  width: 64px;
  height: 64px;
  color: var(--hgf-blue);
  margin: 0 auto 1.5rem;
}

.support-intro h2 {
  font-size: 1.75rem;
  font-weight: 600;
  color: var(--hgf-gray-dark);
  margin-bottom: 1rem;
}

.support-intro p {
  font-size: 1.1rem;
  color: var(--hgf-gray-medium);
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto;
}

.support-options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.support-option {
  padding: 2rem;
  background: var(--hgf-gray-bg);
  border-radius: 12px;
  text-align: center;
  transition: transform 0.3s ease;
}

.support-option:hover {
  transform: translateY(-4px);
}

.option-icon {
  width: 48px;
  height: 48px;
  color: var(--hgf-green);
  margin: 0 auto 1rem;
}

.support-option h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--hgf-gray-dark);
  margin-bottom: 0.75rem;
}

.support-option p {
  font-size: 0.95rem;
  color: var(--hgf-gray-medium);
  margin-bottom: 1rem;
  line-height: 1.5;
}

.support-option ul {
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: left;
}

.support-option li {
  font-size: 0.9rem;
  color: var(--hgf-gray-medium);
  padding: 0.25rem 0;
  position: relative;
  padding-left: 1rem;
}

.support-option li::before {
  content: "•";
  color: var(--hgf-blue);
  position: absolute;
  left: 0;
}

.common-issues {
  margin-bottom: 3rem;
}

.common-issues h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--hgf-gray-dark);
  margin-bottom: 2rem;
  text-align: center;
}

.issue-item {
  margin-bottom: 1.5rem;
  padding: 1.5rem;
  background: var(--hgf-gray-bg);
  border-radius: 8px;
}

.issue-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.issue-icon {
  width: 24px;
  height: 24px;
  color: var(--hgf-yellow);
  flex-shrink: 0;
}

.issue-header h4 {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--hgf-gray-dark);
  margin: 0;
}

.issue-content p {
  font-size: 0.95rem;
  color: var(--hgf-gray-medium);
  line-height: 1.5;
  margin: 0;
}

.contact-support {
  margin-bottom: 3rem;
}

.contact-support h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--hgf-gray-dark);
  margin-bottom: 2rem;
  text-align: center;
}

.contact-methods {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.contact-method {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: var(--hgf-gray-bg);
  border-radius: 8px;
}

.method-icon {
  width: 32px;
  height: 32px;
  color: var(--hgf-blue);
  flex-shrink: 0;
}

.contact-method h4 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--hgf-gray-dark);
  margin: 0 0 0.25rem 0;
}

.contact-method p {
  font-size: 0.9rem;
  color: var(--hgf-gray-medium);
  margin: 0;
}

.method-description {
  font-size: 0.85rem !important;
  color: var(--hgf-gray-medium) !important;
  opacity: 0.8;
}

.tips-section h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--hgf-gray-dark);
  margin-bottom: 1.5rem;
  text-align: center;
}

.tips-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
}

.tips-list li {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  font-size: 0.95rem;
  color: var(--hgf-gray-medium);
  line-height: 1.5;
}

.tip-icon {
  width: 20px;
  height: 20px;
  color: var(--hgf-green);
  flex-shrink: 0;
  margin-top: 2px;
}

@media (max-width: 768px) {
  .info-title {
    font-size: 2rem;
  }
  
  .info-content {
    padding: 1.5rem;
  }
  
  .support-options {
    grid-template-columns: 1fr;
  }
  
  .contact-methods {
    grid-template-columns: 1fr;
  }
  
  .tips-list {
    grid-template-columns: 1fr;
  }
}
</style>
