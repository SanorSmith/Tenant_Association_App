<template>
  <footer class="app-footer">
    <div class="footer-container">
      <div class="footer-content">
        <div class="footer-section">
          <div class="footer-brand">
            <div class="brand-header">
              <Building2 class="brand-icon" />
              <h3 class="footer-title">Grannskapet</h3>
            </div>
            <p class="footer-text">Digital plattform för hyresgästföreningar</p>
            <div class="footer-description">
              <p>En modern, komplett plattform för att hantera din hyresgästförening. 
                 Från möteshantering och dokument till budget och lokalbokning - allt på ett ställe.</p>
            </div>
          </div>
        </div>
        
        <div class="footer-section">
          <div class="section-header">
            <Link class="section-icon" />
            <h4 class="footer-subtitle">Länkar</h4>
          </div>
          <ul class="footer-links">
            <li><a href="#" class="footer-link" @click.prevent="handleLinkClick('om-oss')">
              <Info class="link-icon" />
              <span>Om oss</span>
            </a></li>
            <li><a href="#" class="footer-link" @click.prevent="handleLinkClick('kontakt')">
              <Mail class="link-icon" />
              <span>Kontakt</span>
            </a></li>
            <li><a href="#" class="footer-link" @click.prevent="handleLinkClick('support')">
              <HelpCircle class="link-icon" />
              <span>Support</span>
            </a></li>
          </ul>
        </div>
        
        <div class="footer-section">
          <div class="section-header">
            <Shield class="section-icon" />
            <h4 class="footer-subtitle">Juridiskt</h4>
          </div>
          <ul class="footer-links">
            <li><a href="#" class="footer-link" @click.prevent="handleLinkClick('integritetspolicy')">
              <Eye class="link-icon" />
              <span>Integritetspolicy</span>
            </a></li>
            <li><a href="#" class="footer-link" @click.prevent="handleLinkClick('anvandarvillkor')">
              <FileText class="link-icon" />
              <span>Användarvillkor</span>
            </a></li>
            <li><a href="#" class="footer-link" @click.prevent="handleLinkClick('cookies')">
              <Cookie class="link-icon" />
              <span>Cookies</span>
            </a></li>
          </ul>
        </div>

        <div class="footer-section">
          <div class="section-header">
            <Rocket class="section-icon" />
            <h4 class="footer-subtitle">Demo Info</h4>
          </div>
          <div class="demo-info">
            <div class="demo-item">
              <CheckCircle class="demo-icon" />
              <span>Fullständig frontend demo</span>
            </div>
            <div class="demo-item">
              <Users class="demo-icon" />
              <span>Rollbaserad åtkomst</span>
            </div>
            <div class="demo-item">
              <Calendar class="demo-icon" />
              <span>Möteshantering</span>
            </div>
            <div class="demo-item">
              <FileText class="demo-icon" />
              <span>Dokumenthantering</span>
            </div>
            <div class="demo-item">
              <TrendingUp class="demo-icon" />
              <span>Budget & Rapporter</span>
            </div>
            <div class="demo-item">
              <Building class="demo-icon" />
              <span>Lokalbokning</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p class="copyright">&copy; {{ currentYear }} Grannskapet. Alla rättigheter förbehållna.</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { 
  Building2, 
  Link, 
  Shield, 
  Rocket, 
  Info, 
  Mail, 
  HelpCircle, 
  Eye, 
  FileText, 
  Cookie,
  CheckCircle,
  Users,
  Calendar,
  TrendingUp,
  Building
} from 'lucide-vue-next';

const router = useRouter();
const currentYear = computed(() => new Date().getFullYear());

const handleLinkClick = (linkType: string) => {
  // Navigate to appropriate pages
  const routes = {
    'om-oss': '/info/om-oss',
    'kontakt': '/info/kontakt', 
    'support': '/info/support',
    'integritetspolicy': '/info/integritetspolicy',
    'anvandarvillkor': '/info/anvandarvillkor',
    'cookies': '/info/cookies'
  };
  
  const route = routes[linkType as keyof typeof routes];
  if (route) {
    router.push(route);
  }
};
</script>

<style scoped>
.app-footer {
  background: var(--hgf-blue);
  margin-top: auto;
  position: relative;
  width: 100%;
}

.footer-container {
  max-width: 1920px;
  margin: 0 auto;
  padding: 3rem 2rem 2rem;
}

.footer-content {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1.5fr;
  gap: 3rem;
  margin-bottom: 2rem;
}

.footer-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Brand Section */
.footer-brand {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.brand-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.brand-icon {
  width: 32px;
  height: 32px;
  color: var(--hgf-blue);
  flex-shrink: 0;
}

.footer-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  margin: 0;
}

.footer-text {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
  font-weight: 600;
}

.footer-description {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  max-width: 400px;
}

/* Section Headers */
.section-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.section-icon {
  width: 20px;
  height: 20px;
  color: white;
}

.footer-subtitle {
  font-size: 1rem;
  font-weight: 600;
  color: white;
  margin: 0;
}

/* Links */
.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.footer-link,
.footer-link span {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8) !important;
  text-decoration: none;
  transition: all 0.3s ease;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
}

.footer-link:hover,
.footer-link:hover span {
  color: white !important;
  background: rgba(255, 255, 255, 0.1);
  transform: translateX(4px);
}

.link-icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  color: rgba(255, 255, 255, 0.7) !important;
}

.footer-link:hover .link-icon {
  color: white !important;
}

/* Demo Info */
.demo-info {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.demo-item,
.demo-item span {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.8) !important;
  transition: all 0.3s ease;
}

.demo-item:hover,
.demo-item:hover span {
  color: white !important;
  transform: translateX(2px);
}

.demo-icon {
  width: 16px;
  height: 16px;
  color: rgba(255, 255, 255, 0.7) !important;
  flex-shrink: 0;
}

.demo-item:hover .demo-icon {
  color: white !important;
}

/* Footer Bottom */
.footer-bottom {
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  text-align: center;
}

.copyright {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
  margin: 0;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .footer-content {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
}

@media (max-width: 768px) {
  .footer-container {
    padding: 2rem 1rem 1.5rem;
  }
  
  .footer-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .brand-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .brand-icon {
    width: 28px;
    height: 28px;
  }
  
  .footer-title {
    font-size: 1.25rem;
  }
  
  }

@media (max-width: 480px) {
  .footer-container {
    padding: 1.5rem 1rem 1rem;
  }
  
  .footer-content {
    gap: 1.5rem;
  }
  
  .footer-description {
    font-size: 0.85rem;
  }
  
  }
</style>
