<template>
  <MainLayout>
    <div class="meeting-details-view">
      <div class="details-header">
        <BaseButton variant="outline" @click="$router.back()">
          <ArrowLeft class="w-4 h-4" />
          Tillbaka
        </BaseButton>
        <div class="header-actions">
          <BaseButton
            v-if="meeting && meeting.status === 'scheduled'"
            variant="primary"
            @click="createAgenda"
          >
            <FileText class="w-4 h-4" />
            Skapa dagordning
          </BaseButton>
          <BaseButton
            v-if="canEdit"
            variant="outline"
            @click="editMeeting"
          >
            <Edit class="w-4 h-4" />
            Redigera
          </BaseButton>
        </div>
      </div>

      <div v-if="meeting" class="meeting-content">
        <BaseCard>
          <h1 class="meeting-title">{{ meeting.title }}</h1>
          <div class="meeting-meta">
            <Badge :variant="getTypeVariant(meeting.type)">
              {{ getTypeLabel(meeting.type) }}
            </Badge>
            <Badge :variant="getStatusVariant(meeting.status)">
              {{ getStatusLabel(meeting.status) }}
            </Badge>
          </div>

          <div class="meeting-info">
            <div class="info-item">
              <Calendar class="w-5 h-5" />
              <div>
                <p class="info-label">Datum och tid</p>
                <p class="info-value">{{ formatDate(meeting.date) }}</p>
              </div>
            </div>
            <div class="info-item">
              <MapPin class="w-5 h-5" />
              <div>
                <p class="info-label">Plats</p>
                <p class="info-value">{{ meeting.location }}</p>
              </div>
            </div>
            <div class="info-item">
              <Users class="w-5 h-5" />
              <div>
                <p class="info-label">Deltagare</p>
                <p class="info-value">{{ meeting.attendees.length }} personer</p>
              </div>
            </div>
          </div>

          <div v-if="meeting.description" class="meeting-description">
            <h3>Beskrivning</h3>
            <p>{{ meeting.description }}</p>
          </div>
        </BaseCard>

        <BaseCard title="Deltagare">
          <div class="attendees-list">
            <div
              v-for="attendee in attendeeDetails"
              :key="attendee.id"
              class="attendee-item"
            >
              <div class="attendee-avatar">
                <User class="w-5 h-5" />
              </div>
              <div class="attendee-info">
                <p class="attendee-name">{{ attendee.fullName }}</p>
                <p class="attendee-role">{{ getRoleLabel(attendee.role) }}</p>
              </div>
              <Badge variant="success">Kommer</Badge>
            </div>
          </div>
        </BaseCard>

        <BaseCard title="Relaterade dokument">
          <div v-if="relatedDocuments.length === 0" class="empty-state">
            <FileText class="w-8 h-8 text-text-tertiary" />
            <p class="text-text-secondary">Inga dokument än</p>
          </div>
          <div v-else class="documents-list">
            <div
              v-for="doc in relatedDocuments"
              :key="doc.id"
              class="document-item"
              @click="viewDocument(doc.id)"
            >
              <FileText class="w-5 h-5" />
              <div class="document-info">
                <p class="document-title">{{ doc.title }}</p>
                <Badge :variant="doc.status === 'finalized' ? 'success' : 'warning'">
                  {{ doc.status === 'finalized' ? 'Slutförd' : 'Utkast' }}
                </Badge>
              </div>
            </div>
          </div>
        </BaseCard>
      </div>

      <div v-else class="loading-state">
        <p>Laddar möte...</p>
      </div>
    </div>
  </MainLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { ArrowLeft, Calendar, MapPin, Users, User, FileText, Edit } from 'lucide-vue-next';
import { format } from 'date-fns';
import { sv } from 'date-fns/locale';
import MainLayout from '../../components/layout/MainLayout.vue';
import BaseCard from '../../components/common/BaseCard.vue';
import BaseButton from '../../components/common/BaseButton.vue';
import Badge from '../../components/ui/Badge.vue';
import { useMockDataStore } from '../../stores/mockData';
import type { Meeting, UserRole } from '../../types';

const route = useRoute();
const router = useRouter();
const mockDataStore = useMockDataStore();
const { meetings, documents, boardMembers, currentUser } = storeToRefs(mockDataStore);

const meeting = ref<Meeting | null>(null);

const canEdit = computed(() => currentUser.value.role === 'administrator');

const attendeeDetails = computed(() => {
  if (!meeting.value) return [];
  return boardMembers.value.filter(member => 
    meeting.value!.attendees.includes(member.id)
  );
});

const relatedDocuments = computed(() => {
  if (!meeting.value) return [];
  return documents.value.filter(doc => doc.meetingId === meeting.value!.id);
});

onMounted(() => {
  const meetingId = route.params.id as string;
  meeting.value = meetings.value.find(m => m.id === meetingId) || null;
});

const formatDate = (date: Date) => {
  return format(new Date(date), 'PPP \'kl.\' HH:mm', { locale: sv });
};

const getTypeLabel = (type: string) => {
  const labels: Record<string, string> = {
    board_meeting: 'Styrelsemöte',
    annual_meeting: 'Årsmöte',
    extraordinary_meeting: 'Extra möte',
  };
  return labels[type] || type;
};

const getTypeVariant = (type: string) => {
  const variants: Record<string, 'primary' | 'success' | 'warning'> = {
    board_meeting: 'primary',
    annual_meeting: 'success',
    extraordinary_meeting: 'warning',
  };
  return variants[type] || 'primary';
};

const getStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    scheduled: 'Planerat',
    completed: 'Genomfört',
    cancelled: 'Inställt',
  };
  return labels[status] || status;
};

const getStatusVariant = (status: string) => {
  const variants: Record<string, 'default' | 'success' | 'error'> = {
    scheduled: 'default',
    completed: 'success',
    cancelled: 'error',
  };
  return variants[status] || 'default';
};

const getRoleLabel = (role: UserRole) => {
  const labels: Record<UserRole, string> = {
    administrator: 'Administratör',
    board_member: 'Styrelsemedlem',
    secretary: 'Sekreterare',
    treasurer: 'Kassör',
    official: 'Funktionär',
  };
  return labels[role];
};

const createAgenda = () => {
  router.push(`/documents/create?type=agenda&meetingId=${meeting.value!.id}`);
};

const editMeeting = () => {
  // Would open edit modal
  console.log('Edit meeting:', meeting.value!.id);
};

const viewDocument = (documentId: string) => {
  router.push(`/documents/${documentId}`);
};
</script>

<style scoped>
.meeting-details-view {
  width: 100%;
}

.details-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.header-actions {
  display: flex;
  gap: 0.5rem;
}

.meeting-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.meeting-title {
  font-size: 2rem;
  font-weight: var(--font-weight-bold);
  margin: 0 0 1rem 0;
}

.meeting-meta {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.meeting-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.info-item {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.info-label {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  margin: 0 0 0.25rem 0;
}

.info-value {
  font-weight: var(--font-weight-medium);
  margin: 0;
}

.meeting-description h3 {
  margin: 0 0 0.5rem 0;
}

.attendees-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.attendee-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: var(--color-background-secondary);
  border-radius: var(--radius-md);
}

.attendee-avatar {
  width: 2.5rem;
  height: 2.5rem;
  background: var(--color-primary-light);
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
}

.attendee-info {
  flex: 1;
}

.attendee-name {
  font-weight: var(--font-weight-medium);
  margin: 0 0 0.25rem 0;
}

.attendee-role {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  margin: 0;
}

.documents-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.document-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: var(--color-background-secondary);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: background var(--transition-fast);
}

.document-item:hover {
  background: var(--color-background);
}

.document-info {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.document-title {
  font-weight: var(--font-weight-medium);
  margin: 0;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 2rem;
}

.loading-state {
  display: flex;
  justify-content: center;
  padding: 4rem;
}

@media (max-width: 768px) {
  .details-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .meeting-info {
    grid-template-columns: 1fr;
  }
}
</style>
