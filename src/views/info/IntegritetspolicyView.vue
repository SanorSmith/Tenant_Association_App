<template>
  <div class="info-page">
    <div class="info-container">
      <div class="info-header">
        <button @click="goBack" class="back-button">
          <ArrowLeft class="w-5 h-5" />
          Tillbaka
        </button>
        <h1 class="info-title">Integritetspolicy</h1>
      </div>

      <div class="info-content">
        <div class="policy-intro">
          <Eye class="policy-icon" />
          <h2>Skydd av din personliga information</h2>
          <p class="last-updated">Senast uppdaterad: 1 januari 2026</p>
          <p>
            Grannskapet tar din integritet på största allvar. Denna integritetspolicy beskriver hur vi 
            samlar in, använder och skyddar din personliga information när du använder vår plattform.
          </p>
        </div>

        <div class="policy-sections">
          <div class="policy-section">
            <h3>1. Vilken information samlar vi in?</h3>
            <div class="section-content">
              <h4>Personlig information</h4>
              <ul>
                <li>Namn och kontaktuppgifter (e-post, telefon)</li>
                <li>Roll och behörighet i föreningen</li>
                <li>Inloggningsinformation (krypterad)</li>
              </ul>

              <h4>Användningsdata</h4>
              <ul>
                <li>IP-adress och platsinformation</li>
                <li>Webbläsare och enhetsinformation</li>
                <li>Sidvisningar och användningsmönster</li>
                <li>Tidsstämplar för aktiviteter</li>
              </ul>

              <h4>Föreningsdata</h4>
              <ul>
                <li>Föreningsnamn, adress och organisationsnummer</li>
                <li>Medlemmar och styrelseinformation</li>
                <li>Mötesprotokoll och dokument</li>
                <li>Bokningar och kalenderhändelser</li>
              </ul>
            </div>
          </div>

          <div class="policy-section">
            <h3>2. Hur använder vi din information?</h3>
            <div class="section-content">
              <h4>Tjänsteleverans</h4>
              <ul>
                <li>För att tillhandahålla och underhålla plattformen</li>
                <li>För att hantera användarkonton och behörigheter</li>
                <li>För att möjliggöra kommunikation inom föreningar</li>
                <li>För att hantera bokningar och möten</li>
              </ul>

              <h4>Kommunikation</h4>
              <ul>
                <li>Skicka viktiga meddelanden och uppdateringar</li>
                <li>Mejla inbjudningar till möten och aktiviteter</li>
                <li>Ge support och teknisk hjälp</li>
                <li>Skicka nyhetsbrev (om du anmält dig)</li>
              </ul>

              <h4>Säkerhet och förbättring</h4>
              <ul>
                <li>Skydda mot obehörig åtkomst</li>
                <li>Förebygga missbruk och bedrägeri</li>
                <li>Analysera användning för att förbättra tjänsten</li>
                <li>Utveckla nya funktioner och tjänster</li>
              </ul>
            </div>
          </div>

          <div class="policy-section">
            <h3>3. Lagring och säkerhet</h3>
            <div class="section-content">
              <h4>Datalagring</h4>
              <ul>
                <li>All data lagras på servrar inom EU/EES</li>
                <li>Personlig information sparas endast så länge det är nödvändigt</li>
                <li>Automatisk radering av inaktiv konton efter 24 månader</li>
                <li>Säkerhetskopior tas dagligen</li>
              </ul>

              <h4>Säkerhetsåtgärder</h4>
              <ul>
                <li>Kryptering av all data (både i vila och under överföring)</li>
                <li>Regelbundna säkerhetsrevisioner</li>
                <li>Begränsad åtkomst till känslig data</li>
                <li>2FA (tvåfaktorsautentisering) för administratörer</li>
              </ul>
            </div>
          </div>

          <div class="policy-section">
            <h3>4. Dina rättigheter</h3>
            <div class="section-content">
              <h4>Rätt att få information</h4>
              <p>Du har rätt att veta vilken personlig information vi har om dig.</p>

              <h4>Rätt till rättelse</h4>
              <p>Du kan begära att felaktig information korrigeras.</p>

              <h4>Rätt till radering</h4>
              <p>Du kan begära att din personliga information raderas ("rätten att bli glömd").</p>

              <h4>Rätt till dataportabilitet</h4>
              <p>Du kan begära att få ut din data i ett maskinläsbart format.</p>

              <h4>Rätt att invända</h4>
              <p>Du kan invända mot behandling av din personliga information.</p>
            </div>
          </div>

          <div class="policy-section">
            <h3>5. Cookies</h3>
            <div class="section-content">
              <h4>Vad är cookies?</h4>
              <p>Cookies är små textfiler som lagras på din enhet när du besöker vår webbplats.</p>

              <h4>Vi använder cookies för:</h4>
              <ul>
                <li>Essentiella funktioner (inloggning, sessioner)</li>
                <li>Användarinställningar och preferenser</li>
                <li>Analys och förbättring av webbplatsen</li>
                <li>Säkerhet och skydd mot bedrägeri</li>
              </ul>

              <h4>Cookie-inställningar</h4>
              <p>Du kan kontrollera cookies via din webbläsares inställningar.</p>
            </div>
          </div>

          <div class="policy-section">
            <h3>6. Tredjeparter</h3>
            <div class="section-content">
              <h4>Vi delar endast information med:</h4>
              <ul>
                <li>Din hyresgästförening (för medlemsadministration)</li>
                <li>Tjänsteleverantörer (endast för att tillhandahålla tjänsten)</li>
                <li>Myndigheter (vid lagkrav eller misstanke om brott)</li>
              </ul>

              <h4>Vi säljer aldrig din personliga information till tredjepart.</h4>
            </div>
          </div>

          <div class="policy-section">
            <h3>7. Ändringar i policyn</h3>
            <div class="section-content">
              <p>
                Vi kan uppdatera denna integritetspolicy från tid till annan. Alla ändringar publiceras på denna sida 
                och gäller från det datum de publiceras. Vi kommer att meddela väsentliga ändringar via e-post.
              </p>
            </div>
          </div>

          <div class="policy-section">
            <h3>8. Kontakt</h3>
            <div class="section-content">
              <p>
                Om du har frågor om denna integritetspolicy eller hur vi hanterar din personliga information, 
                kontakta oss:
              </p>
              <div class="contact-info">
                <p><strong>E-post:</strong> gdpr@grannskapet.se</p>
                <p><strong>Telefon:</strong> 08-123 456 789</p>
                <p><strong>Adress:</strong> Teknikringen 1, 114 28 Stockholm</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ArrowLeft, Eye } from 'lucide-vue-next';

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

.policy-intro {
  text-align: center;
  margin-bottom: 3rem;
}

.policy-icon {
  width: 64px;
  height: 64px;
  color: var(--hgf-blue);
  margin: 0 auto 1.5rem;
}

.policy-intro h2 {
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

.policy-intro p {
  font-size: 1.1rem;
  color: var(--hgf-gray-medium);
  line-height: 1.6;
  max-width: 700px;
  margin: 0 auto;
}

.policy-sections {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.policy-section {
  padding: 2rem;
  background: var(--hgf-gray-bg);
  border-radius: 8px;
}

.policy-section h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--hgf-gray-dark);
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid var(--hgf-blue);
}

.section-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.section-content h4 {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--hgf-gray-dark);
  margin-bottom: 0.75rem;
}

.section-content p {
  font-size: 1rem;
  color: var(--hgf-gray-medium);
  line-height: 1.6;
  margin: 0;
}

.section-content ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.section-content li {
  font-size: 0.95rem;
  color: var(--hgf-gray-medium);
  padding: 0.25rem 0;
  position: relative;
  padding-left: 1.5rem;
  line-height: 1.5;
}

.section-content li::before {
  content: "•";
  color: var(--hgf-blue);
  position: absolute;
  left: 0.5rem;
  font-weight: bold;
}

.contact-info {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  border-left: 4px solid var(--hgf-blue);
  margin-top: 1rem;
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
  
  .policy-section {
    padding: 1.5rem;
  }
  
  .policy-intro p {
    font-size: 1rem;
  }
}
</style>
