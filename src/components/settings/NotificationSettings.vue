<template>
  <BaseCard title="Notifieringsinställningar">
    <form @submit.prevent="handleSave" class="notification-form">
      <div class="form-section">
        <h3 class="section-title">Hur vill du ta emot notifieringar?</h3>
        <div class="radio-group">
          <label class="radio-label">
            <input
              v-model="preferences.type"
              type="radio"
              value="email"
              class="radio-input"
            />
            <div class="radio-content">
              <Mail class="w-5 h-5" />
              <div>
                <p class="radio-title">E-post</p>
                <p class="radio-description">Få notifieringar via e-post</p>
              </div>
            </div>
          </label>

          <label class="radio-label">
            <input
              v-model="preferences.type"
              type="radio"
              value="sms"
              class="radio-input"
            />
            <div class="radio-content">
              <MessageSquare class="w-5 h-5" />
              <div>
                <p class="radio-title">SMS</p>
                <p class="radio-description">Få notifieringar via SMS</p>
              </div>
            </div>
          </label>

          <label class="radio-label">
            <input
              v-model="preferences.type"
              type="radio"
              value="both"
              class="radio-input"
            />
            <div class="radio-content">
              <Bell class="w-5 h-5" />
              <div>
                <p class="radio-title">Båda</p>
                <p class="radio-description">Få notifieringar via både e-post och SMS</p>
              </div>
            </div>
          </label>
        </div>
      </div>

      <div class="form-section">
        <h3 class="section-title">Du kommer att få notifieringar om:</h3>
        <ul class="notification-list">
          <li class="notification-item">
            <Calendar class="w-4 h-4 text-primary" />
            <span>Möteinbjudningar och påminnelser</span>
          </li>
          <li class="notification-item">
            <FileText class="w-4 h-4 text-primary" />
            <span>Dokumentfinalisering och godkännanden</span>
          </li>
          <li class="notification-item">
            <Building class="w-4 h-4 text-primary" />
            <span>Bokningsbekräftelser och avslag</span>
          </li>
          <li class="notification-item">
            <AlertCircle class="w-4 h-4 text-primary" />
            <span>Viktiga meddelanden från styrelsen</span>
          </li>
        </ul>
      </div>

      <div class="info-box">
        <Info class="w-5 h-5 text-info" />
        <p class="info-text">
          Du kan när som helst ändra dina notifieringsinställningar. 
          Vissa kritiska notifieringar skickas alltid via e-post.
        </p>
      </div>

      <div class="form-actions">
        <BaseButton
          type="submit"
          variant="primary"
          :loading="saving"
        >
          Spara inställningar
        </BaseButton>
      </div>
    </form>
  </BaseCard>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { Mail, MessageSquare, Bell, Calendar, FileText, Building, AlertCircle, Info } from 'lucide-vue-next';
import BaseCard from '../common/BaseCard.vue';
import BaseButton from '../common/BaseButton.vue';
import type { NotificationType } from '../../services/mockNotifications.service';

const saving = ref(false);

const preferences = reactive({
  type: 'both' as NotificationType,
});

onMounted(() => {
  const saved = localStorage.getItem('notificationPreferences');
  if (saved) {
    const parsed = JSON.parse(saved);
    preferences.type = parsed.type;
  }
});

const handleSave = async () => {
  saving.value = true;
  
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    localStorage.setItem('notificationPreferences', JSON.stringify(preferences));
    
    alert('✅ Notifieringsinställningar sparade!');
  } finally {
    saving.value = false;
  }
};
</script>

<style scoped>
.notification-form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.form-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.section-title {
  font-size: 1.125rem;
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0;
}

.radio-group {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.radio-label {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border: 2px solid var(--color-border);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.radio-label:hover {
  border-color: var(--color-primary);
  background: var(--color-background-secondary);
}

.radio-label:has(.radio-input:checked) {
  border-color: var(--color-primary);
  background: var(--color-primary-light);
}

.radio-input {
  width: 1.25rem;
  height: 1.25rem;
  cursor: pointer;
  flex-shrink: 0;
}

.radio-content {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
}

.radio-title {
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0;
}

.radio-description {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  margin: 0;
}

.notification-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.notification-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: var(--color-background-secondary);
  border-radius: var(--radius-md);
}

.info-box {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: var(--color-info-light);
  border-radius: var(--radius-md);
  border-left: 4px solid var(--color-info);
}

.info-text {
  color: var(--color-text-secondary);
  font-size: 0.875rem;
  line-height: 1.6;
  margin: 0;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
}
</style>
