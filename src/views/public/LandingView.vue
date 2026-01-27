<template>
  <div class="landing-page">
    <!-- Header -->
    <header class="landing-header">
      <div class="header-container">
        <div class="logo">
          <Building2 class="logo-icon" />
          <span class="logo-text">Grannskapet</span>
        </div>
        <button @click="goToLogin" class="login-button">
          <LogIn class="w-5 h-5" />
          <span>Logga in som styrelse</span>
        </button>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">Hitta din lokala hyresgästförening</h1>
        <p class="hero-subtitle">
          Ange ditt område för att hitta din lokala förening och se vad som händer i ditt område
        </p>

        <!-- Search Form -->
        <div class="search-container">
          <div class="search-input-wrapper">
            <MapPin class="search-icon" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Postnummer, stad eller område (t.ex. Uppsala eller 75226)"
              class="search-input"
              @keyup.enter="handleSearch"
            />
          </div>
          <button @click="handleSearch" class="search-button" :disabled="!searchQuery.trim()">
            <Search class="w-5 h-5" />
            Sök
          </button>
        </div>

        <!-- Use Current Location -->
        <button @click="useCurrentLocation" class="location-button">
          <Navigation class="w-5 h-5" />
          Använd min plats
        </button>

        <!-- Loading State -->
        <div v-if="isLoading" class="loading-state">
          <LoadingSpinner />
          <span>Söker föreningar...</span>
        </div>
      </div>
    </section>

    <!-- Results Section -->
    <section v-if="showResults" class="results-section">
      <div class="results-container">
        <h2 class="results-title">
          {{ searchResults.length }} förening{{ searchResults.length !== 1 ? 'ar' : '' }} 
          {{ searchLocation ? `nära ${searchLocation}` : 'hittade' }}
        </h2>

        <!-- Association Cards -->
        <div class="associations-grid">
          <div
            v-for="assoc in searchResults"
            :key="assoc.id"
            class="association-card"
            @click="goToAssociation(assoc.id)"
          >
            <div class="card-header">
              <Building2 class="card-icon" />
              <h3 class="card-title">{{ assoc.name }}</h3>
            </div>
            
            <div class="card-body">
              <div class="card-info">
                <MapPin class="info-icon" />
                <span>{{ assoc.area }}, {{ assoc.city }}</span>
              </div>
              
              <div v-if="assoc.distance" class="card-info">
                <Navigation class="info-icon" />
                <span>{{ assoc.distance.toFixed(1) }} km bort</span>
              </div>
              
              <p class="card-description">{{ assoc.description }}</p>
            </div>

            <div class="card-footer">
              <button class="view-button">
                Visa föreningssida
                <ArrowRight class="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>
        </div>

        <!-- No Results -->
        <div v-if="searchResults.length === 0" class="no-results">
          <AlertCircle class="no-results-icon" />
          <h3>Inga föreningar hittades</h3>
          <p>Försök söka med en annan stad eller postnummer</p>
        </div>
      </div>
    </section>

    <!-- Info Section -->
    <section class="info-section">
      <div class="info-container">
        <h2 class="info-title">Vad kan du göra?</h2>
        
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon blue">
              <Calendar class="w-8 h-8" />
            </div>
            <h3>Se aktiviteter</h3>
            <p>Håll dig uppdaterad om events och aktiviteter i ditt område</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon green">
              <Users class="w-8 h-8" />
            </div>
            <h3>Bli aktiv medlem</h3>
            <p>Engagera dig och hjälp till att förbättra ditt bostadsområde</p>
          </div>

          <div class="feature-card clickable" @click="goToPremisesSearch">
            <div class="feature-icon yellow">
              <Building2 class="w-8 h-8" />
            </div>
            <h3>Boka lokaler</h3>
            <p>Hitta och boka gemensamma lokaler för dina aktiviteter</p>
            <div class="card-action">
              <span>Utforska lokaler</span>
              <ArrowRight class="w-4 h-4" />
            </div>
          </div>

          <div class="feature-card">
            <div class="feature-icon red">
              <MessageSquare class="w-8 h-8" />
            </div>
            <h3>Lämna förslag</h3>
            <p>Dela dina idéer om hur vi kan förbättra området</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useMockDataStore } from '@/stores/mockData';
import { 
  MapPin, 
  Search, 
  Navigation, 
  Building2, 
  ArrowRight, 
  AlertCircle,
  Calendar,
  Users,
  MessageSquare,
  LogIn,
} from 'lucide-vue-next';
import LoadingSpinner from '@/components/common/LoadingSpinner.vue';
import AppFooter from '@/components/layout/AppFooter.vue';

const router = useRouter();
const mockDataStore = useMockDataStore();

const searchQuery = ref('');
const searchLocation = ref('');
const searchResults = ref<any[]>([]);
const showResults = ref(false);
const isLoading = ref(false);

const handleSearch = async () => {
  if (!searchQuery.value.trim()) return;
  
  isLoading.value = true;
  showResults.value = false;
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const results = mockDataStore.searchAssociations(searchQuery.value);
  searchResults.value = results;
  searchLocation.value = searchQuery.value;
  showResults.value = true;
  isLoading.value = false;
};

const useCurrentLocation = async () => {
  isLoading.value = true;
  showResults.value = false;
  
  // Simulate getting user location (in real app, use navigator.geolocation)
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Mock: Use Uppsala center coordinates
  const userLat = 59.8586;
  const userLon = 17.6389;
  
  const results = mockDataStore.getNearbyAssociations(userLat, userLon);
  searchResults.value = results;
  searchLocation.value = 'din plats';
  showResults.value = true;
  isLoading.value = false;
};

const goToAssociation = (associationId: string) => {
  router.push(`/association/${associationId}/public`);
};

const goToLogin = () => {
  router.push('/login');
};

const goToPremisesSearch = () => {
  router.push('/search');
};
</script>

<style scoped>
/* Header */
.landing-header {
  background: white;
  border-bottom: 1px solid var(--hgf-gray-light);
  padding: 1rem 2rem;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--hgf-blue);
}

.logo-icon {
  width: 32px;
  height: 32px;
}

.logo-text {
  color: var(--hgf-gray-dark);
}

.login-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: var(--hgf-blue);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.login-button:hover {
  background: var(--hgf-blue-dark);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 102, 179, 0.3);
}

/* Hero Section */
.hero-section {
  min-height: 70vh;
  background: linear-gradient(135deg, var(--hgf-blue) 0%, var(--hgf-blue-dark) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  color: white;
}

.hero-content {
  max-width: 700px;
  text-align: center;
}

.hero-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.hero-subtitle {
  font-size: 1.25rem;
  opacity: 0.95;
  margin-bottom: 3rem;
  line-height: 1.6;
}

/* Search Container */
.search-container {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.search-input-wrapper {
  flex: 1;
  position: relative;
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--hgf-gray-medium);
  width: 20px;
  height: 20px;
}

.search-input {
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.search-input:focus {
  outline: 3px solid var(--hgf-green);
  outline-offset: 2px;
}

.search-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: var(--hgf-green);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 12px rgba(0, 166, 81, 0.3);
}

.search-button:hover:not(:disabled) {
  background: var(--hgf-green-dark);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 166, 81, 0.4);
}

.search-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.location-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 0.95rem;
}

.location-button:hover {
  background: rgba(255, 255, 255, 0.25);
  border-color: rgba(255, 255, 255, 0.5);
}

/* Loading State */
.loading-state {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
  color: white;
}

/* Results Section */
.results-section {
  padding: 4rem 2rem;
  background: var(--hgf-gray-bg);
}

.results-container {
  max-width: 1200px;
  margin: 0 auto;
}

.results-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--hgf-gray-dark);
  margin-bottom: 2rem;
  text-align: center;
}

/* Association Cards */
.associations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
}

.association-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s;
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
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.card-icon {
  width: 40px;
  height: 40px;
  color: var(--hgf-blue);
}

.card-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--hgf-gray-dark);
}

.card-body {
  margin-bottom: 1.5rem;
}

.card-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  color: var(--hgf-gray-medium);
  font-size: 0.95rem;
}

.info-icon {
  width: 16px;
  height: 16px;
}

.card-description {
  color: var(--hgf-gray-medium);
  line-height: 1.6;
  margin-top: 1rem;
}

.card-footer {
  border-top: 1px solid var(--hgf-gray-light);
  padding-top: 1.5rem;
}

.view-button {
  display: inline-flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  background: var(--hgf-blue);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.view-button:hover {
  background: var(--hgf-blue-dark);
}

/* No Results */
.no-results {
  text-align: center;
  padding: 4rem 2rem;
  color: var(--hgf-gray-medium);
}

.no-results-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto 1.5rem;
  color: var(--hgf-gray-light);
}

/* Info Section */
.info-section {
  padding: 4rem 2rem;
  background: white;
}

.info-container {
  max-width: 1200px;
  margin: 0 auto;
}

.info-title {
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  color: var(--hgf-gray-dark);
  margin-bottom: 3rem;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.feature-card {
  text-align: center;
  padding: 2rem;
}

.feature-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: white;
}

.feature-icon.blue {
  background: var(--hgf-blue);
}

.feature-icon.green {
  background: var(--hgf-green);
}

.feature-icon.yellow {
  background: var(--hgf-yellow);
}

.feature-icon.red {
  background: var(--hgf-red);
}

.feature-card h3 {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--hgf-gray-dark);
  margin-bottom: 0.75rem;
}

.feature-card p {
  color: var(--hgf-gray-medium);
  line-height: 1.6;
}

.feature-card.clickable {
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.feature-card.clickable:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
  border-color: var(--hgf-blue);
}

.card-action {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
  color: var(--hgf-blue);
  font-weight: 600;
  font-size: 0.9rem;
}

/* Responsive */
@media (max-width: 768px) {
  .landing-header {
    padding: 1rem;
  }

  .logo {
    font-size: 1.25rem;
  }

  .logo-icon {
    width: 28px;
    height: 28px;
  }

  .login-button {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }

  .login-button span {
    display: none;
  }

  .hero-title {
    font-size: 2rem;
  }
  
  .search-container {
    flex-direction: column;
  }
  
  .associations-grid {
    grid-template-columns: 1fr;
  }
}
</style>
