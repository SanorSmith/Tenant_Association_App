<template>
  <AppLayout>
    <div class="public-page">
      <!-- Association Hero Banner -->

    <!-- Association Hero Banner -->
    <section v-if="association" class="association-hero">
      <div class="hero-container">
        <div class="hero-content">
          <div class="hero-icon">
            <Building2 class="w-12 h-12" />
          </div>
          <div class="hero-text">
            <h1 class="hero-title">{{ association.name }}</h1>
            <p class="hero-location">
              <MapPin class="w-5 h-5" />
              {{ association.address }}
            </p>
            <p class="hero-description">{{ association.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content: Sidebar + News -->
    <div v-if="association" class="main-content">
      <div class="content-container">
        
        <!-- Sidebar: Action Buttons -->
        <aside class="action-sidebar">
          <div class="sidebar-card">
            <h2 class="sidebar-title">Vad vill du göra?</h2>
            
            <div class="action-buttons">
              <button @click="openProposalForm" class="action-btn primary">
                <FileText class="btn-icon" />
                <span>Lämna förslag</span>
              </button>

              <button @click="openCreateLHForm" class="action-btn secondary">
                <PlusCircle class="btn-icon" />
                <span>Starta ny förening</span>
              </button>

              <button @click="openMembershipForm" class="action-btn secondary">
                <Users class="btn-icon" />
                <span>Bli aktiv medlem</span>
              </button>

              <button @click="openBookingPage" class="action-btn secondary">
                <Calendar class="btn-icon" />
                <span>Boka lokal</span>
              </button>
            </div>

                      </div>
        </aside>

        <!-- Main: News Feed -->
        <main class="news-feed">
          <h2 class="feed-title">Nyheter & Aktiviteter</h2>

          <!-- Activities -->
          <div v-if="publicActivities.length > 0" class="activity-list">
            <article
              v-for="activity in publicActivities"
              :key="activity.id"
              class="activity-card"
            >
              <!-- Image -->
              <div v-if="activity.imageUrl" class="activity-image">
                <img :src="activity.imageUrl" :alt="activity.title" />
                <div class="image-badge" :class="activity.category">
                  {{ getCategoryLabel(activity.category) }}
                </div>
              </div>

              <!-- Content -->
              <div class="activity-content">
                <div class="activity-meta">
                  <Calendar class="meta-icon" />
                  <span>{{ formatDate(activity.activityDate) }}</span>
                </div>

                <h3 class="activity-title">{{ activity.title }}</h3>
                <p class="activity-description">{{ activity.description }}</p>

                <div class="activity-footer">
                  <span class="status-badge" :class="activity.status">
                    {{ getStatusLabel(activity.status) }}
                  </span>
                </div>
              </div>
            </article>
          </div>

          <!-- No Activities -->
          <div v-else class="no-activities">
            <AlertCircle class="w-16 h-16 text-gray-400" />
            <p class="text-gray-600">Inga offentliga aktiviteter att visa just nu</p>
          </div>
        </main>

      </div>
    </div>

    <!-- Not Found -->
    <div v-else class="not-found">
      <AlertCircle class="w-20 h-20 text-gray-400" />
      <h2 class="text-2xl font-bold text-gray-700 mt-4">Förening hittades inte</h2>
      <router-link to="/" class="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg inline-block">
        Tillbaka till sökning
      </router-link>
    </div>

    <!-- Form Modals -->
    <ProposalFormModal
      :is-open="showProposalForm"
      :association-id="associationId"
      @close="showProposalForm = false"
      @success="handleFormSuccess"
    />

    <CreateAssociationFormModal
      :is-open="showCreateAssociationForm"
      @close="showCreateAssociationForm = false"
      @success="handleFormSuccess"
    />

    <MembershipFormModal
      :is-open="showMembershipForm"
      :association-id="associationId"
      @close="showMembershipForm = false"
      @success="handleFormSuccess"
    />

    <PremisesBookingModal
      :is-open="showBookingForm"
      :association-id="associationId"
      @close="showBookingForm = false"
      @success="handleFormSuccess"
    />

    <!-- Confirmation Message -->
    <div v-if="confirmationMessage" class="confirmation-toast">
      <div class="toast-content">
        <CheckCircle class="toast-icon" />
        <p class="toast-message">{{ confirmationMessage }}</p>
        <button @click="confirmationMessage = ''" class="toast-close">
          <X class="w-5 h-5" />
        </button>
      </div>
    </div>

    <!-- Footer -->
    <AppFooter />
  </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useMockDataStore } from '@/stores/mockData';
import { format } from 'date-fns';
import { sv } from 'date-fns/locale';
import {
  Building2,
  MapPin,
  FileText,
  PlusCircle,
  Users,
  Calendar,
  AlertCircle,
  CheckCircle,
  X,
} from 'lucide-vue-next';
import ProposalFormModal from '@/components/forms/ProposalFormModal.vue';
import CreateAssociationFormModal from '@/components/forms/CreateAssociationFormModal.vue';
import MembershipFormModal from '@/components/forms/MembershipFormModal.vue';
import PremisesBookingModal from '@/components/forms/PremisesBookingModal.vue';
import AppLayout from '../../components/layout/AppLayout.vue';
import AppFooter from '@/components/layout/AppFooter.vue';

const route = useRoute();
const router = useRouter();
const mockDataStore = useMockDataStore();

const associationId = route.params.id as string;

const association = computed(() => 
  mockDataStore.getAssociationById(associationId)
);

const showProposalForm = ref(false);
const showCreateAssociationForm = ref(false);
const showMembershipForm = ref(false);
const showBookingForm = ref(false);
const confirmationMessage = ref('');

const publicActivities = computed(() =>
  association.value 
    ? mockDataStore.getPublicActivitiesByAssociation(association.value.id)
    : []
);

const formatDate = (date: string | Date) => {
  return format(new Date(date), 'd MMMM yyyy', { locale: sv });
};

const getCategoryLabel = (category: string) => {
  const labels: Record<string, string> = {
    event: 'Evenemang',
    news: 'Nyhet',
    announcement: 'Meddelande',
    meeting: 'Möte',
  };
  return labels[category] || category;
};

const getStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    planned: 'Kommande',
    ongoing: 'Pågående',
    completed: 'Genomförd',
    cancelled: 'Inställd',
  };
  return labels[status] || status;
};


const openProposalForm = () => {
  showProposalForm.value = true;
};

const openCreateLHForm = () => {
  showCreateAssociationForm.value = true;
};

const openMembershipForm = () => {
  showMembershipForm.value = true;
};

const openBookingPage = () => {
  showBookingForm.value = true;
};

const handleFormSuccess = (message: string) => {
  confirmationMessage.value = message;
  setTimeout(() => {
    confirmationMessage.value = '';
  }, 8000);
};
</script>

<style scoped>
/* Page Layout */
.public-page {
  min-height: 100vh;
  background: var(--hgf-gray-bg);
  margin-top: 80px; /* Account for fixed navbar */
}

/* Header */
.page-header {
  background: white;
  border-bottom: 1px solid var(--hgf-gray-light);
  padding: 1rem 0;
}

.header-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

.back-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: transparent;
  border: 1px solid var(--hgf-gray-light);
  border-radius: 6px;
  color: var(--hgf-gray-dark);
  cursor: pointer;
  transition: all 0.3s;
}

.back-button:hover {
  background: var(--hgf-gray-bg);
  border-color: var(--hgf-blue);
  color: var(--hgf-blue);
}

/* Hero Banner */
.association-hero {
  background: var(--hgf-gray-bg);
  color: var(--hgf-gray-dark);
  padding: 3rem 0;
}

.hero-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.hero-back-button {
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
  margin-top: 2rem;
}

.hero-back-button:hover {
  background: var(--hgf-blue);
  color: white;
  transform: translateY(-1px);
}

.hero-content {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
}

.hero-icon {
  width: 80px;
  height: 80px;
  background: var(--hgf-blue);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: white;
}

.hero-text {
  flex: 1;
}

.hero-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
}

.hero-location {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.1rem;
  margin-bottom: 1rem;
  opacity: 0.95;
}

.hero-description {
  font-size: 1.1rem;
  line-height: 1.6;
  opacity: 0.95;
}

/* Main Content */
.main-content {
  padding: 3rem 0;
}

.content-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 3rem;
}

/* Sidebar */
.action-sidebar {
  position: sticky;
  top: 2rem;
  height: fit-content;
  border-radius: 12px;
  overflow: hidden;
}

.sidebar-card {
  background: var(--hgf-blue);
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.sidebar-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  margin-bottom: 1.5rem;
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 2rem;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: white;
  color: var(--hgf-gray-dark);
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  text-align: left;
}

.action-btn.primary {
  background: white;
  color: var(--hgf-blue);
  border: none;
}

.action-btn.primary:hover {
  background: var(--hgf-blue);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 102, 179, 0.3);
}

.action-btn.secondary {
  background: white;
  color: var(--hgf-blue);
  border: none;
}

.action-btn.secondary:hover {
  background: var(--hgf-blue);
  color: white;
}

/* Big Screen Sidebar Alignment */
@media (min-width: 769px) {
  .sidebar-title {
    text-align: left;
  }
  
  .action-buttons {
    align-items: flex-start;
  }
  
  .action-btn {
    text-align: left;
    justify-content: flex-start;
  }
}

.btn-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

/* Board Login Box */
.board-login-box {
  border-top: 1px solid var(--hgf-gray-light);
  padding-top: 1.5rem;
  text-align: center;
}

.login-text {
  font-size: 0.9rem;
  color: var(--hgf-gray-medium);
  margin-bottom: 0.75rem;
}

.login-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: var(--hgf-blue);
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s;
}

.login-button:hover {
  background: var(--hgf-blue-dark);
}

/* News Feed */
.news-feed {
  min-height: 600px;
}

.feed-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--hgf-gray-dark);
  margin-bottom: 2rem;
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.activity-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s;
}

.activity-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
}

.activity-image {
  position: relative;
  height: 300px;
  overflow: hidden;
}

.activity-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-badge {
  position: absolute;
  top: 1rem;
  left: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.image-badge.event {
  background: var(--hgf-green);
  color: white;
}

.image-badge.news {
  background: var(--hgf-blue);
  color: white;
}

.image-badge.announcement {
  background: var(--hgf-yellow);
  color: var(--hgf-gray-dark);
}

.activity-content {
  padding: 2rem;
}

.activity-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--hgf-gray-medium);
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.meta-icon {
  width: 16px;
  height: 16px;
}

.activity-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--hgf-gray-dark);
  margin-bottom: 1rem;
  line-height: 1.3;
}

.activity-description {
  font-size: 1.05rem;
  color: var(--hgf-gray-medium);
  line-height: 1.7;
  margin-bottom: 1.5rem;
}

.activity-footer {
  border-top: 1px solid var(--hgf-gray-light);
  padding-top: 1rem;
}

.status-badge {
  display: inline-block;
  padding: 0.4rem 1rem;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
}

.status-badge.planned {
  background: #E6F2FF;
  color: var(--hgf-blue);
}

.status-badge.ongoing {
  background: #E6F7EE;
  color: var(--hgf-green);
}

.status-badge.completed {
  background: var(--hgf-gray-bg);
  color: var(--hgf-gray-medium);
}

.no-activities {
  text-align: center;
  padding: 4rem 2rem;
}

.not-found {
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

/* Confirmation Toast */
.confirmation-toast {
  position: fixed;
  top: 2rem;
  right: 2rem;
  z-index: 2000;
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.toast-content {
  background: white;
  border-left: 4px solid var(--hgf-green);
  border-radius: 8px;
  padding: 1.25rem 1.5rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  max-width: 500px;
}

.toast-icon {
  width: 24px;
  height: 24px;
  color: var(--hgf-green);
  flex-shrink: 0;
}

.toast-message {
  flex: 1;
  color: var(--hgf-gray-dark);
  line-height: 1.5;
}

.toast-close {
  background: none;
  border: none;
  color: var(--hgf-gray-medium);
  cursor: pointer;
  padding: 0;
  flex-shrink: 0;
  transition: color 0.3s;
}

.toast-close:hover {
  color: var(--hgf-gray-dark);
}

/* Responsive */
@media (max-width: 1024px) {
  .content-container {
    grid-template-columns: 1fr;
  }

  .action-sidebar {
    position: static;
  }

  .action-buttons {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .hero-content {
    flex-direction: column;
  }

  .hero-title {
    font-size: 1.75rem;
  }

  .action-buttons {
    grid-template-columns: 1fr;
  }

  .activity-image {
    height: 200px;
  }
}
</style>
