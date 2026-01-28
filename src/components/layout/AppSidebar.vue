<template>
  <aside :class="['app-sidebar', { 'sidebar-open': isOpen }]">
    <div class="sidebar-header">
      <h2 class="text-lg font-semibold text-text-primary">{{ currentAssociation.name }}</h2>
      <button
        class="close-button md:hidden"
        @click="$emit('close')"
        aria-label="Stäng meny"
      >
        <X class="w-6 h-6" />
      </button>
    </div>
    
    <nav class="sidebar-nav">
      <router-link to="/dashboard" class="nav-item">
        <LayoutDashboard class="w-5 h-5" />
        <span>Översikt</span>
      </router-link>
      
      <router-link to="/meetings" class="nav-item">
        <Calendar class="w-5 h-5" />
        <span>Möten</span>
      </router-link>
      
      <router-link to="/documents" class="nav-item">
        <FileText class="w-5 h-5" />
        <span>Dokument</span>
      </router-link>
      
      <router-link to="/budget" class="nav-item">
        <DollarSign class="w-5 h-5" />
        <span>Budget</span>
      </router-link>
      
      <router-link to="/activities" class="nav-item">
        <Activity class="w-5 h-5" />
        <span>Aktiviteter</span>
      </router-link>
      
      <router-link to="/premises" class="nav-item">
        <Building class="w-5 h-5" />
        <span>Lokaler</span>
      </router-link>
      
      <router-link to="/bookings" class="nav-item">
        <CalendarCheck class="w-5 h-5" />
        <span>Bokningar</span>
      </router-link>
      
      <div class="nav-divider"></div>
      
      <router-link to="/login" class="nav-item login-nav-item">
        <Lock class="w-5 h-5" />
        <span>Logga in</span>
      </router-link>
      
      <router-link to="/settings" class="nav-item">
        <Settings class="w-5 h-5" />
        <span>Inställningar</span>
      </router-link>
    </nav>
    
    <div class="sidebar-footer">
      <div class="user-info">
        <div class="user-avatar">
          <User class="w-5 h-5" />
        </div>
        <div class="user-details">
          <p class="user-name">{{ currentUser.fullName }}</p>
          <p class="user-role">{{ getRoleLabel(currentUser.role) }}</p>
        </div>
      </div>
    </div>
  </aside>
  
  <div
    v-if="isOpen"
    class="sidebar-overlay md:hidden"
    @click="$emit('close')"
  ></div>
</template>

<script setup lang="ts">
import { LayoutDashboard, Calendar, FileText, DollarSign, Activity, Building, CalendarCheck, Settings, User, X, Lock } from 'lucide-vue-next';
import { useMockDataStore } from '../../stores/mockData';
import type { UserRole } from '../../types';

interface Props {
  isOpen?: boolean;
}

withDefaults(defineProps<Props>(), {
  isOpen: false,
});

defineEmits<{
  close: [];
}>();

const mockDataStore = useMockDataStore();
const currentUser = mockDataStore.currentUser;
const currentAssociation = mockDataStore.currentAssociation;

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
</script>

<style scoped>
.app-sidebar {
  position: fixed;
  top: 4rem;
  left: 0;
  bottom: 0;
  width: 280px;
  background: var(--hgf-blue-dark);
  border-right: 1px solid var(--hgf-blue);
  display: flex;
  flex-direction: column;
  z-index: var(--z-fixed);
  transform: translateX(-100%);
  transition: transform var(--transition-base);
}

.sidebar-open {
  transform: translateX(0);
}

@media (min-width: 768px) {
  .app-sidebar {
    transform: translateX(0);
  }
}

.sidebar-header {
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.sidebar-header h2 {
  color: white !important;
}

.close-button {
  padding: 0.5rem;
  border: none;
  background: transparent;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.8);
  transition: color var(--transition-fast);
}

.close-button:hover {
  color: white;
}

.sidebar-nav {
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
  font-weight: var(--font-weight-medium);
  margin-bottom: 0.25rem;
}

.nav-item:hover {
  color: white;
  background: var(--hgf-blue);
}

.nav-item.router-link-active {
  color: white;
  background: var(--hgf-blue);
  font-weight: var(--font-weight-semibold);
}

/* Special styling for login item */
.login-nav-item {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.login-nav-item:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.3);
}

.nav-divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
  margin: 1rem 0;
}

.sidebar-footer {
  padding: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.user-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.user-avatar {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: var(--radius-full);
  background: var(--hgf-blue);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-details {
  flex: 1;
  min-width: 0;
}

.user-name {
  font-weight: var(--font-weight-medium);
  color: white;
  font-size: 0.875rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-role {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.7);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.sidebar-overlay {
  position: fixed;
  top: 4rem;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: calc(var(--z-fixed) - 1);
}
</style>
