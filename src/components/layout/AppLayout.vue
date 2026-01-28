<template>
  <div class="app-layout">
    <!-- Navigation Bar -->
    <nav class="navbar">
      <div class="navbar-content">
        <!-- 2-Part Layout - Aligned to Sidebar -->
        <div class="navbar-left">
          <!-- Part 1: Sidebar Column (320px) - Brand Header -->
          <div class="navbar-part">
            <button @click="toggleMobileMenu" class="mobile-menu-toggle">
              <Menu class="w-6 h-6" />
            </button>
            <router-link to="/" class="brand-header">
              <Building2 :size="48" class="brand-icon" />
              <h1 class="brand-title">Grannskapet</h1>
            </router-link>
          </div>
          
          <!-- Part 2: Main Content Column -->
          <div class="navbar-part"></div>
        </div>
        
        <!-- Mobile Menu -->
        <div v-if="showMobileMenu" class="mobile-menu">
          <router-link v-if="!showBoardLogin" to="/" class="mobile-nav-link" @click="closeMobileMenu">
            <Home class="w-5 h-5" />
            Hem
          </router-link>
          <router-link v-if="showBoardLogin" to="/login" class="mobile-nav-link" @click="closeMobileMenu">
            <Lock class="w-5 h-5" />
            Styrelsemedlem? Logga in
          </router-link>
          <button v-if="showBackButton" @click="handleMobileBack" class="mobile-nav-link">
            <ArrowLeft class="w-5 h-5" />
            Tillbaka till sökning
          </button>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="main-content">
      <slot />
    </main>

    <!-- Footer Content -->
    <div class="footer-container">
      <div class="footer-content">
        <div class="footer-section">
          <div class="footer-brand">
            <div class="brand-header">
              <Building2 :size="24" class="brand-icon" />
              <h3 class="footer-title">Grannskapet</h3>
            </div>
            <p class="footer-text">Digital plattform för hyresgästföreningar</p>
            <div class="footer-description">
              <p>En modern, komplett plattform för att hantera din hyresgästförening. Från möteshantering och dokument till budget och lokalbokning - allt på ett ställe.</p>
            </div>
          </div>
        </div>
        
        <div class="footer-section">
          <div class="section-header">
            <Link :size="24" class="section-icon" />
            <h4 class="footer-subtitle">Länkar</h4>
          </div>
          <ul class="footer-links">
            <li>
              <router-link to="/info/om-oss" class="footer-link">
                <Info :size="24" class="link-icon" />
                <span>Om oss</span>
              </router-link>
            </li>
            <li>
              <router-link to="/info/kontakt" class="footer-link">
                <Mail :size="24" class="link-icon" />
                <span>Kontakt</span>
              </router-link>
            </li>
            <li>
              <router-link to="/info/support" class="footer-link">
                <CircleQuestionMark :size="24" class="link-icon" />
                <span>Support</span>
              </router-link>
            </li>
          </ul>
        </div>
        
        <div class="footer-section">
          <div class="section-header">
            <Shield :size="24" class="section-icon" />
            <h4 class="footer-subtitle">Juridiskt</h4>
          </div>
          <ul class="footer-links">
            <li>
              <router-link to="/info/integritetspolicy" class="footer-link">
                <Eye :size="24" class="link-icon" />
                <span>Integritetspolicy</span>
              </router-link>
            </li>
            <li>
              <router-link to="/info/anvandarvillkor" class="footer-link">
                <FileText :size="24" class="link-icon" />
                <span>Användarvillkor</span>
              </router-link>
            </li>
            <li>
              <router-link to="/info/cookies" class="footer-link">
                <Cookie :size="24" class="link-icon" />
                <span>Cookies</span>
              </router-link>
            </li>
          </ul>
        </div>
        
        <div class="footer-section">
          <div class="section-header">
            <Rocket :size="24" class="section-icon" />
            <h4 class="footer-subtitle">Demo Info</h4>
          </div>
          <div class="demo-info">
            <div class="demo-item">
              <CircleCheckBig :size="24" class="demo-icon" />
              <span>Fullständig frontend demo</span>
            </div>
            <div class="demo-item">
              <Users :size="24" class="demo-icon" />
              <span>Rollbaserad åtkomst</span>
            </div>
            <div class="demo-item">
              <Calendar :size="24" class="demo-icon" />
              <span>Möteshantering</span>
            </div>
            <div class="demo-item">
              <FileText :size="24" class="demo-icon" />
              <span>Dokumenthantering</span>
            </div>
            <div class="demo-item">
              <TrendingUp :size="24" class="demo-icon" />
              <span>Budget & Rapporter</span>
            </div>
            <div class="demo-item">
              <Building :size="24" class="demo-icon" />
              <span>Lokalbokning</span>
            </div>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p class="copyright">© 2026 Grannskapet. Alla rättigheter förbehållna.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Building2,
  ArrowLeft,
  Lock,
  Menu,
  Home,
  Link,
  Info,
  Mail,
  CircleQuestionMark,
  Shield,
  Eye,
  FileText,
  Cookie,
  Rocket,
  CircleCheckBig,
  Users,
  Calendar,
  TrendingUp,
  Building
} from 'lucide-vue-next';
import { computed, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const showMobileMenu = ref(false);

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value;
};

const closeMobileMenu = () => {
  showMobileMenu.value = false;
};

const handleMobileBack = () => {
  router.go(-1);
  closeMobileMenu();
};

const goBack = () => {
  router.go(-1);
};

const showBackButton = computed(() => {
  return route.path.startsWith('/association/') && route.path.includes('/public');
});

const showBoardLogin = computed(() => {
  return route.path.startsWith('/association/') && route.path.includes('/public');
});
</script>

<style scoped>
.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--hgf-gray-bg);
}

/* Navbar Styles - Same as LandingPage */
.navbar {
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.navbar-content {
  width: 100%;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
}

.navbar-left {
  display: grid;
  grid-template-columns: 320px 1fr;
  align-items: center;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

.navbar-part {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.navbar-part:first-child {
  justify-content: flex-start;
}

.mobile-menu-toggle {
  background: none;
  border: none;
  color: var(--hgf-blue);
  cursor: pointer;
  padding: 0.25rem;
  margin-left: -0.5rem;
}

.mobile-menu-toggle svg {
  width: 32px;
  height: 28px;
  stroke-width: 3;
}

/* Mobile only - Blue rounded border for hamburger */
@media (max-width: 768px) {
  .mobile-menu-toggle {
    border: 2px solid var(--hgf-blue);
    border-radius: 8px;
    padding: 0.5rem;
  }
  
  .navbar-left {
    position: relative;
  }
  
  .navbar-part:first-child {
    position: absolute;
    left: 0;
  }
  
  .brand-header {
    margin: 0 auto;
  }
}

.brand-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  text-decoration: none;
  color: inherit;
  outline: none;
}

/* Big screens - Double brand size */
@media (min-width: 1024px) {
  .brand-header {
    gap: 2rem;
  }
  
  .brand-header .brand-icon {
    width: 96px !important;
    height: 96px !important;
  }
  
  .brand-header .brand-title {
    font-size: 3rem !important;
  }
}

.brand-header:focus {
  outline: none;
  box-shadow: none;
}

.brand-icon {
  color: var(--hgf-blue);
}

.brand-title {
  color: var(--hgf-red);
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
}

.navbar-right {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.back-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: transparent;
  color: var(--hgf-blue);
  border: 2px solid var(--hgf-blue);
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
}

.back-button:hover {
  background: var(--hgf-blue);
  color: white;
  transform: translateY(-1px);
}

.nav-link {
  color: var(--hgf-blue);
  text-decoration: none;
  font-weight: 600;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.nav-link:hover {
  background: var(--hgf-blue);
  color: white;
  transform: translateY(-1px);
}

.board-login-nav {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.login-text {
  color: var(--hgf-gray-dark);
  font-size: 0.9rem;
  font-weight: 500;
  margin: 0;
}

.login-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: transparent;
  color: var(--hgf-blue);
  border: 2px solid var(--hgf-blue);
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
}

.login-button:hover {
  background: var(--hgf-blue);
  color: white;
  transform: translateY(-1px);
}

/* Mobile Menu Styles */
.mobile-menu-toggle {
  display: none;
  background: none;
  border: none;
  color: var(--hgf-blue);
  cursor: pointer;
  padding: 0.25rem;
}

.mobile-menu-toggle svg {
  width: 32px;
  height: 28px;
  stroke-width: 3;
}

.mobile-menu {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid var(--hgf-gray-light);
  border-radius: 0 0 8px 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  z-index: 1000;
}

.mobile-nav-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  color: var(--hgf-gray-dark);
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.mobile-nav-link:hover {
  background: var(--hgf-gray-bg);
  color: var(--hgf-blue);
}


/* Responsive Styles */
@media (max-width: 768px) {
  .desktop-nav {
    display: none;
  }
  
  .mobile-menu-toggle {
    display: block;
  }
  
  .mobile-menu {
    display: block;
  }
}

/* Main Content */
.main-content {
  flex: 1;
  margin-top: 80px; /* Account for fixed navbar */
}

/* Footer Styles - Same as LandingPage */
.footer-container {
  background: var(--hgf-blue);
  color: white;
  padding: 3rem 0 1rem;
  margin-top: auto;
}

.footer-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 3rem;
}

.footer-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.footer-brand {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.footer-title {
  color: white;
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0;
}

.footer-text {
  color: rgba(255, 255, 255, 0.8);
  margin: 0 0 1rem 0;
}

.footer-description {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  line-height: 1.6;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.section-icon {
  color: white;
}

.footer-subtitle {
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 0.75rem;
}

.footer-link,
.footer-link span,
.footer-link a,
.footer-link router-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: rgba(255, 255, 255, 0.8) !important;
  text-decoration: none;
  transition: all 0.3s ease;
  padding: 0.5rem 0;
  border-radius: 4px;
}

.footer-link:hover,
.footer-link:hover span,
.footer-link:hover a,
.footer-link:hover router-link {
  color: white !important;
  background: rgba(255, 255, 255, 0.1);
  transform: translateX(4px);
}

.footer-link .link-icon,
.footer-link a .link-icon,
.footer-link router-link .link-icon {
  color: rgba(255, 255, 255, 0.7) !important;
  transition: color 0.3s ease;
}

.footer-link:hover .link-icon,
.footer-link:hover a .link-icon,
.footer-link:hover router-link .link-icon {
  color: white !important;
}

.demo-info {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.demo-item,
.demo-item span {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: rgba(255, 255, 255, 0.8) !important;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  padding: 0.25rem 0;
}

.demo-item:hover,
.demo-item:hover span {
  color: white !important;
  transform: translateX(2px);
}

.demo-icon,
.demo-item .demo-icon {
  color: rgba(255, 255, 255, 0.7) !important;
  transition: color 0.3s ease;
}

.demo-item:hover .demo-icon,
.demo-item:hover .demo-icon {
  color: white !important;
}

.footer-bottom {
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  margin-top: 2rem;
}

.copyright {
  color: rgba(255, 255, 255, 0.6);
  margin: 0;
  font-size: 0.9rem;
}

/* Responsive */
@media (max-width: 1024px) {
  .footer-content {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
  
  .navbar-content {
    padding: 1rem;
  }
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }
  
  .brand-header {
    justify-content: center;
  }
  
  .section-header {
    justify-content: center;
  }
  
  .navbar-content {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }
  
  .main-content {
    margin-top: 120px; /* Account for taller navbar on mobile */
  }
}

@media (max-width: 480px) {
  .footer-container {
    padding: 2rem 0 1rem;
  }
  
  .footer-content {
    padding: 0 1rem;
  }
  
  .navbar-right {
    flex-direction: column;
    width: 100%;
    text-align: center;
  }
  
  .nav-link {
    width: 100%;
    text-align: center;
  }
}
</style>
