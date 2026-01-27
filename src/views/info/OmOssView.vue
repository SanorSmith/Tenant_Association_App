<template>
  <div class="info-page">
    <div class="info-container">
      <div class="info-header">
        <button @click="goBack" class="back-button">
          <ArrowLeft class="w-5 h-5" />
          Tillbaka
        </button>
        <h1 class="info-title">Om oss</h1>
      </div>

      <div class="info-content">
        <div class="brand-section">
          <div class="brand-header">
            <Building2 class="brand-icon" />
            <h2>Grannskapet</h2>
          </div>
          <p class="brand-description">
            Digital plattform för hyresgästföreningar
          </p>
          <p class="brand-text">
            En modern, komplett plattform för att hantera din hyresgästförening. 
            Från möteshantering och dokument till budget och lokalbokning - allt på ett ställe.
          </p>
        </div>

        <div class="content-section">
          <h3>Vår Vision</h3>
          <p>
            Vi strävar efter att göra det enklare för hyresgästföreningar att hantera sitt dagliga arbete 
            genom att erbjuda en modern, användarvänlig digital plattform som samlar alla viktiga funktioner 
            på ett ställe.
          </p>
        </div>

        <div class="content-section">
          <h3>Vårt Uppdrag</h3>
          <p>
            Grannskapet utvecklas för att möta de unika behoven hos svenska hyresgästföreningar. 
            Vi förstår utmaningarna med att driva en förening och har byggt en plattform som 
            förenklar administration, förbättrar kommunikation och stärker engagemang.
          </p>
        </div>

        <div class="features-grid">
          <h3>Våra Kärnfunktioner</h3>
          <div class="feature-item">
            <Calendar class="feature-icon" />
            <div>
              <h4>Möteshantering</h4>
              <p>Planera, bjud in och följ upp möten enkelt</p>
            </div>
          </div>
          <div class="feature-item">
            <FileText class="feature-icon" />
            <div>
              <h4>Dokumenthantering</h4>
              <p>Skapa, dela och arkivera dokument digitalt</p>
            </div>
          </div>
          <div class="feature-item">
            <TrendingUp class="feature-icon" />
            <div>
              <h4>Budget & Rapporter</h4>
              <p>Övervaka ekonomi och generera rapporter</p>
            </div>
          </div>
          <div class="feature-item">
            <Building class="feature-icon" />
            <div>
              <h4>Lokalbokning</h4>
              <p>Boka och hantera föreningens lokaler</p>
            </div>
          </div>
        </div>

        <div class="content-section">
          <h3>Varför Grannskapet?</h3>
          <ul class="benefits-list">
            <li><CheckCircle class="list-icon" />Allt på ett ställe - inga fler system</li>
            <li><CheckCircle class="list-icon" />Användarvänligt för alla tekniska nivåer</li>
            <li><CheckCircle class="list-icon" />Byggt för svenska hyresgästföreningar</li>
            <li><CheckCircle class="list-icon" />Säker och pålitlig plattform</li>
            <li><CheckCircle class="list-icon" />Ständig utveckling baserat på användarfeedback</li>
          </ul>
        </div>

        <div class="content-section">
          <h3>Teknologi</h3>
          <p>
            Grannskapet är byggt med modern webbteknik för att säkerställa bästa möjliga 
            prestanda, säkerhet och användarupplevelse:
          </p>
          <div class="tech-badges">
            <span class="tech-badge">Vue 3</span>
            <span class="tech-badge">TypeScript</span>
            <span class="tech-badge">Tailwind CSS</span>
            <span class="tech-badge">Pinia</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { 
  ArrowLeft, 
  Building2, 
  Calendar, 
  FileText, 
  TrendingUp, 
  Building, 
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

.brand-section {
  text-align: center;
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--hgf-gray-light);
}

.brand-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.brand-icon {
  width: 48px;
  height: 48px;
  color: var(--hgf-blue);
}

.brand-header h2 {
  font-size: 2rem;
  font-weight: 700;
  color: var(--hgf-blue);
  margin: 0;
}

.brand-description {
  font-size: 1.25rem;
  color: var(--hgf-gray-medium);
  font-weight: 600;
  margin: 0.5rem 0;
}

.brand-text {
  font-size: 1rem;
  color: var(--hgf-gray-medium);
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto;
}

.content-section {
  margin-bottom: 2.5rem;
}

.content-section h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--hgf-gray-dark);
  margin-bottom: 1rem;
}

.content-section p {
  font-size: 1rem;
  color: var(--hgf-gray-medium);
  line-height: 1.7;
  margin-bottom: 1rem;
}

.features-grid {
  margin-top: 2rem;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: var(--hgf-gray-bg);
  border-radius: 8px;
  margin-bottom: 1rem;
  transition: transform 0.3s ease;
}

.feature-item:hover {
  transform: translateY(-2px);
}

.feature-icon {
  width: 24px;
  height: 24px;
  color: var(--hgf-blue);
  flex-shrink: 0;
  margin-top: 2px;
}

.feature-item h4 {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--hgf-gray-dark);
  margin: 0 0 0.5rem 0;
}

.feature-item p {
  font-size: 0.9rem;
  color: var(--hgf-gray-medium);
  margin: 0;
  line-height: 1.5;
}

.benefits-list {
  list-style: none;
  padding: 0;
  margin: 1rem 0;
}

.benefits-list li {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1rem;
  color: var(--hgf-gray-medium);
  margin-bottom: 0.75rem;
}

.list-icon {
  width: 20px;
  height: 20px;
  color: var(--hgf-green);
  flex-shrink: 0;
}

.tech-badges {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-top: 1rem;
}

.tech-badge {
  font-size: 0.85rem;
  font-weight: 600;
  padding: 0.5rem 1rem;
  background: var(--hgf-blue);
  color: white;
  border-radius: 20px;
}

@media (max-width: 768px) {
  .info-title {
    font-size: 2rem;
  }
  
  .info-content {
    padding: 1.5rem;
  }
  
  .brand-header {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .brand-icon {
    width: 40px;
    height: 40px;
  }
  
  .brand-header h2 {
    font-size: 1.5rem;
  }
  
  .feature-item {
    flex-direction: column;
    text-align: center;
    gap: 0.75rem;
  }
  
  .tech-badges {
    justify-content: center;
  }
}
</style>
