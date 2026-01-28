<template>
  <div class="landing-page">
    <!-- Navigation Bar -->
    <nav class="navbar">
      <div class="navbar-content">
        <!-- Left side - Brand Header -->
        <div class="navbar-left">
          <div class="brand-header">
            <Building2 :size="48" class="brand-icon" />
            <h1 class="brand-title">Grannskapet</h1>
          </div>
        </div>
        
        <!-- Right side - Login only -->
        <div class="navbar-right">
          <router-link to="/login" class="login-link">
            <Lock :size="16" />
            Logga in här
          </router-link>
        </div>
      </div>
    </nav>
    
    <!-- Hero Section with Blue Gradient -->
    <section class="hero-section">
      <div class="hero-content">
        <p class="hero-subtitle">
          Hitta din lokala hyresgästförening
        </p>
        
        <p class="hero-description">
          Ange ditt postnummer, stad eller område för att hitta din lokala förening och se vad som händer i ditt område
        </p>

        <!-- Search Box -->
        <div class="search-container">
          <div class="search-input-wrapper">
            <MapPin :size="20" class="search-icon" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Postnummer, stad eller område (t.ex. Uppsala eller 75226)"
              class="search-input"
              @keyup.enter="handleSearch"
              @input="handleSearch"
            />
          </div>
          <button 
            @click="handleSearch" 
            class="search-button"
            :disabled="!searchQuery.trim()"
          >
            <Search :size="20" />
            Sök
          </button>
        </div>

        <!-- Use Current Location Button -->
        <button @click="useCurrentLocation" class="location-button">
          <Navigation :size="20" />
          Använd min plats
        </button>

        <!-- Loading State -->
        <div v-if="isLoading" class="loading-state">
          <div class="spinner"></div>
          <span>Söker föreningar...</span>
        </div>
      </div>
    </section>

    <!-- Results Section -->
    <section v-if="showResults && !isLoading" class="results-section">
      <div class="results-container">
        <h2 class="results-title">
          {{ searchResults.length }} förening{{ searchResults.length !== 1 ? 'ar' : '' }} 
          {{ searchLocation ? `nära ${searchLocation}` : 'hittade' }}
        </h2>

        <!-- Association Cards Grid -->
        <div v-if="searchResults.length > 0" class="associations-grid">
          <div
            v-for="assoc in searchResults"
            :key="assoc.id"
            class="association-card"
            @click="goToAssociation(assoc.id)"
          >
            <div class="card-header">
              <Building2 :size="32" class="card-icon" />
              <div class="card-header-text">
                <h3 class="card-title">{{ assoc.name }}</h3>
                <div class="card-location">
                  <MapPin :size="16" />
                  <span>{{ assoc.area }}, {{ assoc.city }}</span>
                </div>
              </div>
            </div>
            
            <p class="card-description">{{ assoc.description }}</p>

            <div class="card-footer">
              <div v-if="assoc.distance" class="card-distance">
                <Navigation :size="16" />
                <span>{{ assoc.distance.toFixed(1) }} km bort</span>
              </div>
              
              <div class="card-members">
                <Users :size="16" />
                <span>{{ assoc.memberCount || 0 }} medlemmar</span>
              </div>
            </div>

            <button class="view-button">
              Visa föreningssida
              <ArrowRight :size="16" />
            </button>
          </div>
        </div>

        <!-- No Results -->
        <div v-else class="no-results">
          <AlertCircle :size="64" class="no-results-icon" />
          <h3>Inga föreningar hittades</h3>
          <p>Prova att söka med ett annat postnummer, stad eller område</p>
        </div>
      </div>
    </section>

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
              <a href="#" class="footer-link">
                <Info :size="24" class="link-icon" />
                <span>Om oss</span>
              </a>
            </li>
            <li>
              <a href="#" class="footer-link">
                <Mail :size="24" class="link-icon" />
                <span>Kontakt</span>
              </a>
            </li>
            <li>
              <a href="#" class="footer-link">
                <CircleQuestionMark :size="24" class="link-icon" />
                <span>Support</span>
              </a>
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
              <a href="#" class="footer-link">
                <Eye :size="24" class="link-icon" />
                <span>Integritetspolicy</span>
              </a>
            </li>
            <li>
              <a href="#" class="footer-link">
                <FileText :size="24" class="link-icon" />
                <span>Användarvillkor</span>
              </a>
            </li>
            <li>
              <a href="#" class="footer-link">
                <Cookie :size="24" class="link-icon" />
                <span>Cookies</span>
              </a>
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
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useMockDataStore } from '@/stores/mockData';
import { 
  Building2, 
  MapPin, 
  Search, 
  Navigation, 
  Users, 
  ArrowRight, 
  AlertCircle, 
  Lock,
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
  Calendar,
  TrendingUp,
  Building
} from 'lucide-vue-next';
import type { Association } from '@/types';

const router = useRouter();
const mockDataStore = useMockDataStore();

const searchQuery = ref('');
const searchResults = ref<(Association & { distance?: number })[]>([]);
const showResults = ref(false);
const isLoading = ref(false);
const searchLocation = ref('');

// Calculate distance between two coordinates (Haversine formula)
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

const handleSearch = () => {
  if (!searchQuery.value.trim()) {
    showResults.value = false;
    return;
  }

  isLoading.value = true;
  searchLocation.value = searchQuery.value;

  // Simulate API delay
  setTimeout(() => {
    const results = mockDataStore.searchAssociations(searchQuery.value);
    searchResults.value = results;
    showResults.value = true;
    isLoading.value = false;
  }, 500);
};

const useCurrentLocation = () => {
  if (!navigator.geolocation) {
    alert('Geolocation stöds inte av din webbläsare');
    return;
  }

  isLoading.value = true;
  searchLocation.value = 'din plats';

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      
      // Get nearby associations
      const results = mockDataStore.getNearbyAssociations(latitude, longitude, 10);
      searchResults.value = results;
      showResults.value = true;
      isLoading.value = false;
      searchQuery.value = `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
    },
    (error) => {
      console.error('Geolocation error:', error);
      alert('Kunde inte hämta din plats. Kontrollera att du har gett tillåtelse.');
      isLoading.value = false;
    }
  );
};

const goToAssociation = (id: string) => {
  router.push(`/association/${id}/public`);
};
</script>

<style scoped>
.landing-page {
  min-height: 100vh;
  background: var(--hgf-gray-bg);
}

/* Hero Section with Light Background (RED only for title) */
.hero-section {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  color: var(--hgf-gray-dark);
  padding: 4rem 2rem 6rem;
  text-align: center;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.brand-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.brand-icon {
  color: var(--hgf-blue);
}

.brand-title {
  font-size: 3rem;
  font-weight: 700;
  margin: 0;
  color: var(--hgf-red);
}

.hero-subtitle {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
  color: var(--hgf-red);
}

.hero-description {
  font-size: 1.125rem;
  margin: 0 0 2.5rem 0;
  color: var(--hgf-gray-medium);
  line-height: 1.6;
}

/* Search Container */
.search-container {
  display: flex;
  gap: 1rem;
  max-width: 700px;
  margin: 0 auto 1.5rem;
}

.search-input-wrapper {
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 1rem;
  color: var(--hgf-gray-medium);
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  color: var(--hgf-gray-dark);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.search-input:focus {
  outline: none;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
}

.search-input::placeholder {
  color: var(--hgf-gray-medium);
}

.search-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: var(--hgf-blue);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 102, 179, 0.3);
  white-space: nowrap;
}

.search-button:hover:not(:disabled) {
  background: var(--hgf-blue-dark);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 102, 179, 0.4);
}

.search-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Location Button */
.location-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: transparent;
  color: var(--hgf-blue);
  border: 2px solid var(--hgf-blue);
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.location-button:hover {
  background: var(--hgf-blue);
  color: white;
  transform: translateY(-2px);
}

/* Loading State */
.loading-state {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
  color: white;
  font-size: 1.1rem;
}

.spinner {
  width: 32px;
  height: 32px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Results Section */
.results-section {
  padding: 3rem 2rem;
  background: var(--hgf-gray-bg);
}

.results-container {
  max-width: 1200px;
  margin: 0 auto;
}

.results-title {
  font-size: 1.75rem;
  font-weight: 600;
  color: var(--hgf-gray-dark);
  margin: 0 0 2rem 0;
  text-align: center;
}

/* Association Cards Grid */
.associations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
}

.association-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  cursor: pointer;
  border: 2px solid transparent;
}

.association-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 102, 179, 0.15);
  border-color: var(--hgf-blue);
}

.card-header {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.card-icon {
  color: var(--hgf-blue);
  flex-shrink: 0;
}

.card-header-text {
  flex: 1;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--hgf-gray-dark);
  margin: 0 0 0.5rem 0;
}

.card-location {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--hgf-gray-medium);
  font-size: 0.9rem;
}

.card-description {
  color: var(--hgf-gray-medium);
  line-height: 1.6;
  margin: 0 0 1rem 0;
}

.card-footer {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--hgf-gray-border);
}

.card-distance,
.card-members {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--hgf-gray-medium);
  font-size: 0.9rem;
}

.view-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.75rem;
  background: var(--hgf-blue);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.view-button:hover {
  background: var(--hgf-blue-dark);
}

/* No Results */
.no-results {
  text-align: center;
  padding: 4rem 2rem;
}

.no-results-icon {
  color: var(--hgf-gray-light);
  margin-bottom: 1rem;
}

.no-results h3 {
  font-size: 1.5rem;
  color: var(--hgf-gray-dark);
  margin: 0 0 0.5rem 0;
}

.no-results p {
  color: var(--hgf-gray-medium);
  font-size: 1.1rem;
}

/* Navigation Bar */
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
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.navbar-left {
  display: flex;
  align-items: center;
}

.navbar-left .brand-header {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.navbar-left .brand-icon {
  color: var(--hgf-blue);
}

.navbar-left .brand-title {
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

.navbar-right .login-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: white;
  color: var(--hgf-blue);
  border: 2px solid var(--hgf-blue);
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
}

.navbar-right .login-link:hover {
  background: var(--hgf-blue);
  color: white;
  transform: translateY(-1px);
}

/* Add padding to hero section to account for fixed navbar */
.hero-section {
  padding-top: 6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 6rem);
  min-height: calc(100vh - 6rem);
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

/* Footer Container */
.footer-container {
  background: var(--hgf-blue);
  color: white;
  padding: 3rem 2rem 1rem;
  margin-top: 4rem;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.footer-section {
  display: flex;
  flex-direction: column;
}

.footer-brand .brand-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.footer-brand .brand-icon {
  color: white;
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
  color: rgba(255, 255, 255, 0.7);
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

.footer-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-link:hover {
  color: white;
}

.link-icon {
  color: rgba(255, 255, 255, 0.6);
}

.demo-info {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.demo-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
}

.demo-icon {
  color: rgba(255, 255, 255, 0.6);
}


.footer-bottom {
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
}

.copyright {
  color: rgba(255, 255, 255, 0.6);
  margin: 0;
  font-size: 0.9rem;
}

/* Responsive */
@media (max-width: 768px) {
  .brand-title {
    font-size: 2rem;
  }

  .hero-subtitle {
    font-size: 1.25rem;
  }

  .search-container {
    flex-direction: column;
  }

  .associations-grid {
    grid-template-columns: 1fr;
  }
}
</style>
