<template>
  <div class="info-page">
    <div class="info-container">
      <div class="info-header">
        <button @click="goBack" class="back-button">
          <ArrowLeft class="w-5 h-5" />
          Tillbaka
        </button>
        <h1 class="info-title">Användarvillkor</h1>
      </div>

      <div class="info-content">
        <div class="terms-intro">
          <FileText class="terms-icon" />
          <h2>Användarvillkor för Grannskapet</h2>
          <p class="last-updated">Senast uppdaterad: 1 januari 2026</p>
          <p>
            Dessa användarvillkor reglerar din användning av Grannskapets plattform. Genom att använda 
            tjänsten godkänner du dessa villkor.
          </p>
        </div>

        <div class="terms-sections">
          <div class="terms-section">
            <h3>1. Acceptans av villkor</h3>
            <div class="section-content">
              <p>
                Genom att registrera ett konto och använda Grannskapets plattform godkänner du att följa 
                dessa användarvillkor. Om du inte godkänner villkoren får du inte använda tjänsten.
              </p>
            </div>
          </div>

          <div class="terms-section">
            <h3>2. Tjänstens beskrivning</h3>
            <div class="section-content">
              <p>
                Grannskapet är en digital plattform för hyresgästföreningar som erbjuder:
              </p>
              <ul>
                <li>Möteshantering och kalenderfunktioner</li>
                <li>Dokumenthantering och arkivering</li>
                <li>Budget- och rapportsystem</li>
                <li>Lokalbokning och resurshantering</li>
                <li>Medlemsadministration</li>
                <li>Kommunikationsverktyg</li>
              </ul>
            </div>
          </div>

          <div class="terms-section">
            <h3>3. Användarkonto</h3>
            <div class="section-content">
              <h4>Registrering</h4>
              <ul>
                <li>Du måste vara minst 18 år för att skapa ett konto</li>
                <li>Du måste ange korrekt och fullständig information</li>
                <li>Du är ansvarig för att skydda dina inloggningsuppgifter</li>
                <li>Du får inte dela ditt konto med andra</li>
              </ul>

              <h4>Behörighet</h4>
              <ul>
                <li>Din behörighet bestäms av din förening</li>
                <li>Endast behöriga användare kan få tillgång till känslig information</li>
                <li>Behörighet kan när som helst ändras av föreningen</li>
              </ul>
            </div>
          </div>

          <div class="terms-section">
            <h3>4. Användaransvar</h3>
            <div class="section-content">
              <p>Som användare ansvarar du för:</p>
              <ul>
                <li>Att använda plattformen i enlighet med gällande lagar</li>
                <li>Att inte ladda upp olagligt eller skadligt innehåll</li>
                <li>Att inte störa eller skada plattformen</li>
                <li>Att respektera andra användares rättigheter</li>
                <li>Att inte använda plattformen för kommersiella ändamål utan tillstånd</li>
              </ul>
            </div>
          </div>

          <div class="terms-section">
            <h3>5. Innehåll och data</h3>
            <div class="section-content">
              <h4>Ditt innehåll</h4>
              <ul>
                <li>Du behåller äganderätten till innehåll du skapar</li>
                <li>Du ger Grannskapet rätt att använda ditt innehåll för att tillhandahålla tjänsten</li>
                <li>Du ansvarar för att du har rätt att publicera innehållet</li>
              </ul>

              <h4>Föreningens data</h4>
              <ul>
                <li>Föreningen äger all data som genereras inom organisationen</li>
                <li>Grannskapet behandlar data som databehandlare på uppdrag av föreningen</li>
                <li>Föreningen kan exportera sin data när som helst</li>
              </ul>
            </div>
          </div>

          <div class="terms-section">
            <h3>6. Betalning och prenumerationer</h3>
            <div class="section-content">
              <h4>Priser</h4>
              <ul>
                <li>Alla priser visas exklusive moms</li>
                <li>Priser kan ändras med 30 dagars varsel</li>
                <li>Särskilda erbjudanden kan ges till nya kunder</li>
              </ul>

              <h4>Betalningsvillkor</h4>
              <ul>
                <li>Betalning sker månadsvis eller årsvis i förskott</li>
                <li>Första månaden är alltid kostnadsfri</li>
                <li>Uppsägningstid är 30 dagar</li>
                <li>Obetalda fakturor kan leda till avstängning av tjänsten</li>
              </ul>
            </div>
          </div>

          <div class="terms-section">
            <h3>7. Uppsägning och avslutande</h3>
            <div class="section-content">
              <h4>Av användaren</h4>
              <ul>
                <li>Du kan när som helst avsluta ditt konto</li>
                <li>Din data raderas enligt gällande lagstiftning</li>
                <li>Betalda avgifter återbetalas inte</li>
              </ul>

              <h4>Av Grannskapet</h4>
              <ul>
                <li>Vi kan avsluta ditt konto vid missbruk av tjänsten</li>
                <li>Vi kan avsluta tjänsten vid obetalda fakturor</li>
                <li>Vi kan avsluta tjänsten vid väsentliga ändringar av villkor</li>
              </ul>
            </div>
          </div>

          <div class="terms-section">
            <h3>8. Immateriella rättigheter</h3>
            <div class="section-content">
              <p>
                Grannskapet, dess logotyp, design och funktioner är skyddade av immateriella rättigheter. 
                Du får inte kopiera, modifiera eller distribuera vår plattform utan tillstånd.
              </p>
            </div>
          </div>

          <div class="terms-section">
            <h3>9. Ansvarsbegränsning</h3>
            <div class="section-content">
              <p>
                Grannskapet tillhandahåller tjänsten "i befintligt skick" utan några garantier. Vi ansvarar inte för:
              </p>
              <ul>
                <li>Förlust av data eller information</li>
                <li>Störningar eller driftstopp</li>
                <li>Innehåll som publiceras av användare</li>
                <li>Indirekta skador eller följdskador</li>
              </ul>
              <p>
                Vår totala ansvar är begränsat till det belopp du betalat för tjänsten under de senaste 12 månaderna.
              </p>
            </div>
          </div>

          <div class="terms-section">
            <h3>10. Force majeure</h3>
            <div class="section-content">
              <p>
                Vi ansvarar inte för utebliven prestation om orsaken är utanför vår rimliga kontroll, 
                inklusive men inte begränsat till: naturkatastrofer, krig, terrorism, strejker, 
                myndighetsåtgärder eller tekniska problem hos tredjepart.
              </p>
            </div>
          </div>

          <div class="terms-section">
            <h3>11. Ändringar av villkor</h3>
            <div class="section-content">
              <p>
                Vi förbehåller oss rätten att ändra dessa användarvillkor. Ändringar träder i kraft 
                30 dagar efter att de har publicerats på vår webbplats. Väsentliga ändringar meddelas 
                via e-post till registrerade användare.
              </p>
            </div>
          </div>

          <div class="terms-section">
            <h3>12. Tvister</h3>
            <div class="section-content">
              <p>
                Eventuella tvister som uppstår i samband med dessa användarvillkor ska i första hand 
                lösas genom dialog mellan parterna. Om en överenskommelse inte kan nås ska tvisten 
                hanteras av allmän domstol i Stockholm.
              </p>
            </div>
          </div>

          <div class="terms-section">
            <h3>13. Kontakt</h3>
            <div class="section-content">
              <p>
                Om du har frågor om dessa användarvillkor, kontakta oss:
              </p>
              <div class="contact-info">
                <p><strong>E-post:</strong> legal@grannskapet.se</p>
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
import { ArrowLeft, FileText } from 'lucide-vue-next';

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

.terms-intro {
  text-align: center;
  margin-bottom: 3rem;
}

.terms-icon {
  width: 64px;
  height: 64px;
  color: var(--hgf-blue);
  margin: 0 auto 1.5rem;
}

.terms-intro h2 {
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

.terms-intro p {
  font-size: 1.1rem;
  color: var(--hgf-gray-medium);
  line-height: 1.6;
  max-width: 700px;
  margin: 0 auto;
}

.terms-sections {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.terms-section {
  padding: 2rem;
  background: var(--hgf-gray-bg);
  border-radius: 8px;
}

.terms-section h3 {
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
  
  .terms-section {
    padding: 1.5rem;
  }
  
  .terms-intro p {
    font-size: 1rem;
  }
}
</style>
