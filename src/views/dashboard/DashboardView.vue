<template>
  <MainLayout>
    <div class="dashboard-view">
      <div class="dashboard-header">
        <div>
          <h1 style="color: var(--hgf-red) !important;" class="text-3xl font-bold">Översikt</h1>
          <p class="text-text-secondary mt-2">Välkommen tillbaka, {{ currentUser.fullName }}!</p>
        </div>
        <div v-if="currentUser.role === 'administrator'" class="quick-actions">
          <BaseButton variant="outline" size="sm">
            <Calendar class="w-4 h-4" />
            Skapa möte
          </BaseButton>
          <BaseButton variant="outline" size="sm">
            <FileText class="w-4 h-4" />
            Ny dagordning
          </BaseButton>
        </div>
      </div>
      
      <!-- Administrator Dashboard -->
      <div v-if="currentUser.role === 'administrator'">
        <!-- Stats Cards -->
        <div class="stats-grid">
          <BaseCard variant="elevated" class="stat-card">
            <div class="stat-content">
              <div class="stat-icon bg-primary/10 text-primary">
                <Calendar class="w-6 h-6" />
              </div>
              <div>
                <p class="stat-label">Kommande möten</p>
                <p class="stat-value">{{ upcomingMeetings.length }}</p>
              </div>
            </div>
          </BaseCard>
          
          <BaseCard variant="elevated" class="stat-card">
            <div class="stat-content">
              <div class="stat-icon bg-warning/10 text-warning">
                <FileText class="w-6 h-6" />
              </div>
              <div>
                <p class="stat-label">Väntande dokument</p>
                <p class="stat-value">{{ pendingDocuments.length }}</p>
              </div>
            </div>
          </BaseCard>
          
          <BaseCard variant="elevated" class="stat-card">
            <div class="stat-content">
              <div class="stat-icon bg-info/10 text-info">
                <Building class="w-6 h-6" />
              </div>
              <div>
                <p class="stat-label">Väntande bokningar</p>
                <p class="stat-value">{{ pendingBookings.length }}</p>
              </div>
            </div>
          </BaseCard>
          
          <BaseCard variant="elevated" class="stat-card">
            <div class="stat-content">
              <div class="stat-icon bg-success/10 text-success">
                <Users class="w-6 h-6" />
              </div>
              <div>
                <p class="stat-label">Aktiva styrelsemedlemmar</p>
                <p class="stat-value">{{ boardMembers.length }}</p>
              </div>
            </div>
          </BaseCard>
        </div>
        
        <div class="dashboard-content">
          <!-- Recent Activity Feed -->
          <div class="activity-section">
            <BaseCard title="Senaste aktiviteter">
              <div class="activity-feed">
                <div
                  v-for="activity in recentActivities"
                  :key="activity.id"
                  class="activity-item"
                >
                  <div class="activity-icon">
                    <Activity class="w-4 h-4 text-primary" />
                  </div>
                  <div class="activity-content">
                    <p class="activity-text">
                      <strong>{{ activity.user }}</strong> {{ activity.action }}
                    </p>
                    <p class="activity-time">{{ formatTime(activity.timestamp) }}</p>
                  </div>
                </div>
                <div v-if="recentActivities.length === 0" class="text-center text-text-secondary py-4">
                  Inga aktiviteter ännu
                </div>
              </div>
            </BaseCard>
            
            <!-- Upcoming Meetings -->
            <BaseCard title="Kommande möten">
              <div class="meetings-list">
                <div
                  v-for="meeting in upcomingMeetings"
                  :key="meeting.id"
                  class="meeting-item"
                >
                  <div class="meeting-date">
                    <div class="date-day">{{ formatDay(meeting.date) }}</div>
                    <div class="date-month">{{ formatMonth(meeting.date) }}</div>
                  </div>
                  <div class="meeting-details">
                    <h4 class="meeting-title">{{ getMeetingTypeLabel(meeting.type) }}</h4>
                    <p class="meeting-location">
                      <MapPin class="w-4 h-4" />
                      {{ meeting.location }}
                    </p>
                    <p class="meeting-time">{{ formatMeetingTime(meeting.date) }}</p>
                  </div>
                  <Badge :variant="meeting.status === 'scheduled' ? 'info' : 'success'">
                    {{ meeting.status === 'scheduled' ? 'Planerat' : 'Genomfört' }}
                  </Badge>
                </div>
                <div v-if="upcomingMeetings.length === 0" class="text-center text-text-secondary py-4">
                  Inga kommande möten
                </div>
              </div>
            </BaseCard>
          </div>
          
          <!-- Charts and Budget -->
          <div class="charts-section">
            <BaseCard title="Budget översikt 2025">
              <div class="budget-chart">
                <canvas ref="budgetChartCanvas"></canvas>
              </div>
              <div class="budget-summary">
                <div class="budget-item">
                  <span class="budget-label">Total budget:</span>
                  <span class="budget-amount">{{ formatCurrency(totalBudget) }}</span>
                </div>
              </div>
            </BaseCard>
            
            <BaseCard title="Förening information">
              <div class="association-info">
                <div class="info-item">
                  <span class="info-label">Föreningsnamn:</span>
                  <span class="info-value">{{ currentAssociation.name }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">Adress:</span>
                  <span class="info-value">{{ currentAssociation.address }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">Registreringsnummer:</span>
                  <span class="info-value">{{ currentAssociation.registrationNumber }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">Status:</span>
                  <Badge v-if="currentAssociation.verified" variant="success">Verifierad</Badge>
                  <Badge v-else variant="warning">Ej verifierad</Badge>
                </div>
              </div>
            </BaseCard>
          </div>
        </div>
      </div>
      
      <!-- Board Member Dashboard -->
      <div v-else-if="currentUser.role === 'board_member'">
        <div class="dashboard-grid">
          <BaseCard title="Kommande möten" variant="elevated">
            <div class="meetings-list">
              <div
                v-for="meeting in upcomingMeetings.slice(0, 3)"
                :key="meeting.id"
                class="meeting-item-simple"
              >
                <p class="font-medium">{{ getMeetingTypeLabel(meeting.type) }}</p>
                <p class="text-sm text-text-secondary">{{ formatMeetingDateTime(meeting.date) }}</p>
                <p class="text-sm text-text-secondary">{{ meeting.location }}</p>
              </div>
              <div v-if="upcomingMeetings.length === 0" class="text-center text-text-secondary py-4">
                Inga kommande möten
              </div>
            </div>
          </BaseCard>
          
          <BaseCard title="Senaste dokument" variant="elevated">
            <div class="documents-list">
              <div
                v-for="doc in documents.slice(0, 3)"
                :key="doc.id"
                class="document-item"
              >
                <FileText class="w-5 h-5 text-primary" />
                <div>
                  <p class="font-medium">{{ doc.title }}</p>
                  <Badge :variant="doc.status === 'draft' ? 'warning' : 'success'" size="sm">
                    {{ doc.status === 'draft' ? 'Utkast' : 'Färdigställt' }}
                  </Badge>
                </div>
              </div>
              <div v-if="documents.length === 0" class="text-center text-text-secondary py-4">
                Inga dokument ännu
              </div>
            </div>
          </BaseCard>
        </div>
      </div>
      
      <!-- Official Dashboard -->
      <div v-else-if="currentUser.role === 'official'">
        <BaseCard title="Föreningsöversikt" variant="elevated">
          <p class="text-text-secondary mb-4">Översikt över föreningar du har tillgång till</p>
          <div class="association-table">
            <div class="table-row table-header">
              <div>Förening</div>
              <div>Adress</div>
              <div>Status</div>
              <div>Medlemmar</div>
            </div>
            <div class="table-row">
              <div class="font-medium">{{ currentAssociation.name }}</div>
              <div>{{ currentAssociation.address }}</div>
              <div>
                <Badge v-if="currentAssociation.verified" variant="success">Verifierad</Badge>
                <Badge v-else variant="warning">Ej verifierad</Badge>
              </div>
              <div>{{ boardMembers.length }}</div>
            </div>
          </div>
        </BaseCard>
      </div>
    </div>
  </MainLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { Calendar, FileText, Building, Users, Activity, MapPin } from 'lucide-vue-next';
import { Chart, registerables } from 'chart.js';
import { format } from 'date-fns';
import { sv } from 'date-fns/locale';
import MainLayout from '../../components/layout/MainLayout.vue';
import BaseCard from '../../components/common/BaseCard.vue';
import BaseButton from '../../components/common/BaseButton.vue';
import Badge from '../../components/ui/Badge.vue';
import { useMockDataStore } from '../../stores/mockData';

Chart.register(...registerables);

const mockDataStore = useMockDataStore();
const { currentUser, currentAssociation, boardMembers, meetings, documents, budgetItems, recentActivities, bookings } = storeToRefs(mockDataStore);

const budgetChartCanvas = ref<HTMLCanvasElement | null>(null);

const upcomingMeetings = computed(() => {
  return meetings.value.filter(m => m.status === 'scheduled');
});

const pendingDocuments = computed(() => {
  return documents.value.filter(d => d.status === 'draft');
});

const pendingBookings = computed(() => {
  return bookings.value.filter(b => b.status === 'pending');
});

const totalBudget = computed(() => {
  return budgetItems.value.reduce((sum, item) => sum + item.amount, 0);
});

const formatTime = (date: Date) => {
  return format(date, 'PPp', { locale: sv });
};

const formatDay = (date: Date) => {
  return format(date, 'd');
};

const formatMonth = (date: Date) => {
  return format(date, 'MMM', { locale: sv });
};

const formatMeetingTime = (date: Date) => {
  return format(date, 'HH:mm');
};

const formatMeetingDateTime = (date: Date) => {
  return format(date, 'PPp', { locale: sv });
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('sv-SE', { style: 'currency', currency: 'SEK' }).format(amount);
};

const getMeetingTypeLabel = (type: string) => {
  const labels: Record<string, string> = {
    board_meeting: 'Styrelsemöte',
    annual_meeting: 'Årsmöte',
    extraordinary_meeting: 'Extra möte',
  };
  return labels[type] || type;
};

onMounted(() => {
  if (currentUser.value.role === 'administrator' && budgetChartCanvas.value) {
    const ctx = budgetChartCanvas.value.getContext('2d');
    if (ctx) {
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: budgetItems.value.map(item => item.category),
          datasets: [{
            data: budgetItems.value.map(item => item.amount),
            backgroundColor: [
              'rgba(0, 95, 115, 0.8)',
              'rgba(10, 147, 150, 0.8)',
              'rgba(148, 210, 189, 0.8)',
            ],
            borderWidth: 0,
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: {
              position: 'bottom',
            },
          },
        },
      });
    }
  }
});
</script>

<style scoped>
.dashboard-view {
  padding: 0;
  background: var(--hgf-gray-bg);
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1.5rem;
  background: transparent;
  border-radius: 12px;
  color: var(--hgf-gray-dark);
  box-shadow: none;
}

.dashboard-header h1 {
  color: var(--hgf-red) !important;
}

.dashboard-header p {
  color: var(--hgf-gray-medium) !important;
}

.quick-actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 102, 179, 0.15);
  border-color: var(--hgf-blue);
}

.stat-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.stat-icon {
  width: 3rem;
  height: 3rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-label {
  font-size: 0.875rem;
  color: var(--hgf-gray-medium);
  margin-bottom: 0.25rem;
}

.stat-value {
  font-size: 1.875rem;
  font-weight: var(--font-weight-bold);
  color: var(--hgf-gray-dark);
}

.dashboard-content {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 1.5rem;
}

@media (max-width: 1024px) {
  .dashboard-content {
    grid-template-columns: 1fr;
  }
}

.activity-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.charts-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.activity-feed {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.activity-item {
  display: flex;
  gap: 1rem;
  padding: 0.75rem;
  border-radius: var(--radius-md);
  transition: background var(--transition-fast);
}

.activity-item:hover {
  background: var(--color-background-secondary);
}

.activity-icon {
  width: 2rem;
  height: 2rem;
  border-radius: var(--radius-full);
  background: var(--color-primary-light);
  background: rgba(0, 95, 115, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.activity-content {
  flex: 1;
}

.activity-text {
  font-size: 0.875rem;
  color: var(--color-text-primary);
  margin-bottom: 0.25rem;
}

.activity-time {
  font-size: 0.75rem;
  color: var(--color-text-secondary);
}

.meetings-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.meeting-item {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  align-items: center;
}

.meeting-date {
  width: 3rem;
  text-align: center;
  flex-shrink: 0;
}

.date-day {
  font-size: 1.5rem;
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
  line-height: 1;
}

.date-month {
  font-size: 0.75rem;
  color: var(--color-text-secondary);
  text-transform: uppercase;
}

.meeting-details {
  flex: 1;
}

.meeting-title {
  font-weight: var(--font-weight-semibold);
  margin-bottom: 0.25rem;
}

.meeting-location,
.meeting-time {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.meeting-item-simple {
  padding: 0.75rem;
  border-left: 3px solid var(--color-primary);
  background: var(--color-background-secondary);
  border-radius: var(--radius-sm);
  margin-bottom: 0.75rem;
}

.budget-chart {
  max-width: 300px;
  margin: 0 auto;
  padding: 1rem 0;
}

.budget-summary {
  border-top: 1px solid var(--color-border);
  padding-top: 1rem;
  margin-top: 1rem;
}

.budget-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.budget-label {
  color: var(--color-text-secondary);
}

.budget-amount {
  font-size: 1.25rem;
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
}

.association-info {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
}

.info-label {
  color: var(--color-text-secondary);
  font-size: 0.875rem;
}

.info-value {
  font-weight: var(--font-weight-medium);
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.documents-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.document-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: var(--radius-md);
  background: var(--color-background-secondary);
}

.association-table {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.table-row {
  display: grid;
  grid-template-columns: 2fr 2fr 1fr 1fr;
  gap: 1rem;
  padding: 1rem;
}

.table-header {
  background: var(--color-background-secondary);
  font-weight: var(--font-weight-semibold);
  border-bottom: 1px solid var(--color-border);
}

.table-row:not(.table-header):hover {
  background: var(--color-background-secondary);
}
</style>
