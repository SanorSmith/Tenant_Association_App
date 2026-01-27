<template>
  <div class="landing-page">
    <!-- Hero Section with Blue Gradient -->
    <section class="hero-section">
      <div class="hero-content">
        <div class="brand-header">
          <Building2 :size="48" class="brand-icon" />
          <h1 class="brand-title">Grannskapet</h1>
        </div>
        
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

    <!-- Board Login Link -->
    <div class="board-login-link">
      <p>Är du styrelsemedlem?</p>
      <router-link to="/login" class="login-link">
        <Lock :size="16" />
        Logga in här
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useMockDataStore } from '@/stores/mockData';
import { Building2, MapPin, Search, Navigation, Users, ArrowRight, AlertCircle, Lock } from 'lucide-vue-next';
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

/* Hero Section with Blue Gradient */
.hero-section {
  background: linear-gradient(135deg, var(--hgf-blue) 0%, var(--hgf-blue-dark) 100%);
  color: white;
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
  color: white;
}

.brand-title {
  font-size: 3rem;
  font-weight: 700;
  margin: 0;
  color: white;
}

.hero-subtitle {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
  color: white;
}

.hero-description {
  font-size: 1.125rem;
  margin: 0 0 2.5rem 0;
  color: rgba(255, 255, 255, 0.9);
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
  background: var(--hgf-green);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 166, 81, 0.3);
  white-space: nowrap;
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

/* Location Button */
.location-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid white;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.location-button:hover {
  background: rgba(255, 255, 255, 0.3);
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

/* Board Login Link */
.board-login-link {
  text-align: center;
  padding: 2rem;
  background: white;
  border-top: 1px solid var(--hgf-gray-border);
}

.board-login-link p {
  margin: 0 0 0.5rem 0;
  color: var(--hgf-gray-medium);
}

.login-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--hgf-blue);
  font-weight: 600;
  text-decoration: none;
  transition: color 0.3s ease;
}

.login-link:hover {
  color: var(--hgf-blue-dark);
  text-decoration: underline;
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
