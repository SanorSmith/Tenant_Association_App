<template>
  <MainLayout>
    <div class="settings-view">
      <div class="settings-header">
        <h1 class="text-3xl font-bold text-text-primary">Föreningsinställningar</h1>
        <p class="text-text-secondary mt-2">Hantera din förenings information och medlemmar</p>
      </div>
      
      <div class="settings-content">
        <BaseCard title="Föreningsinformation">
          <Alert v-if="successMessage" variant="success" :dismissible="true" @dismiss="successMessage = ''">
            {{ successMessage }}
          </Alert>
          
          <form @submit.prevent="handleSaveAssociation" class="association-form">
            <BaseInput
              v-model="formData.name"
              label="Föreningsnamn"
              placeholder="T.ex. Storvreta Hyresgäster"
              :error="errors.name"
              :disabled="currentUser.role !== 'administrator'"
              required
            />
            
            <BaseInput
              v-model="formData.address"
              label="Adress"
              placeholder="Stad eller område"
              :error="errors.address"
              :disabled="currentUser.role !== 'administrator'"
              required
            />
            
            <BaseInput
              v-model="formData.registrationNumber"
              label="Registreringsnummer"
              placeholder="HGF-XXXX-XXX"
              :disabled="currentUser.role !== 'administrator'"
            />
            
            <div class="flex items-center gap-2">
              <Badge v-if="currentAssociation.verified" variant="success">Verifierad</Badge>
              <Badge v-else variant="warning">Ej verifierad</Badge>
            </div>
            
            <div v-if="currentUser.role === 'administrator'" class="form-actions">
              <BaseButton type="submit" variant="primary" :loading="loading">
                Spara ändringar
              </BaseButton>
              <BaseButton type="button" variant="outline" @click="resetForm">
                Återställ
              </BaseButton>
            </div>
          </form>
        </BaseCard>
        
        <BaseCard title="Styrelsemedlemmar">
          <div class="board-members-header">
            <p class="text-text-secondary">Hantera styrelsemedlemmar och deras roller</p>
            <BaseButton
              v-if="currentUser.role === 'administrator'"
              variant="primary"
              size="sm"
              @click="showAddMemberModal = true"
            >
              <UserPlus class="w-4 h-4" />
              Lägg till medlem
            </BaseButton>
          </div>
          
          <div class="members-list">
            <div
              v-for="member in boardMembers"
              :key="member.id"
              class="member-item"
            >
              <div class="member-avatar">
                <User class="w-5 h-5" />
              </div>
              <div class="member-info">
                <p class="member-name">{{ member.fullName }}</p>
                <p class="member-email">{{ member.email }}</p>
                <p class="member-phone">{{ member.phone }}</p>
              </div>
              <div class="member-role">
                <Badge :variant="member.role === 'administrator' ? 'primary' : 'default'">
                  {{ getRoleLabel(member.role) }}
                </Badge>
              </div>
              <div class="member-actions">
                <IconButton
                  v-if="currentUser.role === 'administrator' && member.id !== currentUser.id"
                  :icon="Trash2"
                  variant="danger"
                  size="sm"
                  aria-label="Ta bort medlem"
                  @click="handleRemoveMember(member.id)"
                />
              </div>
            </div>
          </div>
        </BaseCard>
      </div>
      
      <AddBoardMemberModal
        v-model="showAddMemberModal"
        @member-added="handleMemberAdded"
      />
    </div>
  </MainLayout>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { User, UserPlus, Trash2 } from 'lucide-vue-next';
import MainLayout from '../../components/layout/MainLayout.vue';
import BaseCard from '../../components/common/BaseCard.vue';
import BaseInput from '../../components/common/BaseInput.vue';
import BaseButton from '../../components/common/BaseButton.vue';
import Badge from '../../components/ui/Badge.vue';
import IconButton from '../../components/ui/IconButton.vue';
import Alert from '../../components/ui/Alert.vue';
import AddBoardMemberModal from '../../components/modals/AddBoardMemberModal.vue';
import { useMockDataStore } from '../../stores/mockData';
import type { UserRole } from '../../types';

const mockDataStore = useMockDataStore();
const { currentUser, currentAssociation, boardMembers } = storeToRefs(mockDataStore);

const loading = ref(false);
const successMessage = ref('');
const showAddMemberModal = ref(false);

const formData = reactive({
  name: '',
  address: '',
  registrationNumber: '',
});

const errors = reactive({
  name: '',
  address: '',
});

const loadAssociationData = () => {
  formData.name = currentAssociation.value.name;
  formData.address = currentAssociation.value.address;
  formData.registrationNumber = currentAssociation.value.registrationNumber;
};

const resetForm = () => {
  loadAssociationData();
  Object.keys(errors).forEach(key => {
    errors[key as keyof typeof errors] = '';
  });
};

const validateForm = () => {
  let isValid = true;
  errors.name = '';
  errors.address = '';
  
  if (!formData.name) {
    errors.name = 'Föreningsnamn är obligatoriskt';
    isValid = false;
  }
  
  if (!formData.address) {
    errors.address = 'Adress är obligatorisk';
    isValid = false;
  }
  
  return isValid;
};

const handleSaveAssociation = async () => {
  if (!validateForm()) {
    return;
  }
  
  loading.value = true;
  
  setTimeout(() => {
    mockDataStore.updateAssociation({
      name: formData.name,
      address: formData.address,
      registrationNumber: formData.registrationNumber,
    });
    
    successMessage.value = 'Föreningsinformationen har uppdaterats';
    loading.value = false;
  }, 500);
};

const handleRemoveMember = (memberId: string) => {
  if (confirm('Är du säker på att du vill ta bort denna medlem?')) {
    mockDataStore.removeBoardMember(memberId);
    successMessage.value = 'Medlemmen har tagits bort';
  }
};

const handleMemberAdded = () => {
  successMessage.value = 'Ny medlem har lagts till';
};

const getRoleLabel = (role: UserRole): string => {
  const labels: Record<UserRole, string> = {
    administrator: 'Administratör',
    board_member: 'Styrelsemedlem',
    official: 'Funktionär',
    secretary: 'Sekreterare',
    treasurer: 'Kassör',
  };
  return labels[role];
};

onMounted(() => {
  loadAssociationData();
});
</script>

<style scoped>
.settings-view {
  width: 100%;
  max-width: 900px;
}

.settings-header {
  margin-bottom: 2rem;
}

.settings-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.association-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-actions {
  display: flex;
  gap: 1rem;
}

.board-members-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  gap: 1rem;
  flex-wrap: wrap;
}

.members-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.member-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  transition: background var(--transition-fast);
}

.member-item:hover {
  background: var(--color-background-secondary);
}

.member-avatar {
  width: 3rem;
  height: 3rem;
  border-radius: var(--radius-full);
  background: var(--color-primary-light);
  background: rgba(0, 95, 115, 0.1);
  color: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.member-info {
  flex: 1;
  min-width: 0;
}

.member-name {
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin-bottom: 0.25rem;
}

.member-email,
.member-phone {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
}

.member-role {
  flex-shrink: 0;
}

.member-actions {
  flex-shrink: 0;
}
</style>
