<template>
  <header class="app-header">
    <div class="header-container">
      <div class="header-left">
        <button
          class="mobile-menu-toggle md:hidden"
          @click="$emit('toggle-sidebar')"
          aria-label="Toggle menu"
        >
          <Menu class="w-6 h-6" />
        </button>
        <router-link to="/" class="logo">
          <h1 class="text-2xl font-bold text-primary">Grannskapet</h1>
        </router-link>
      </div>
      
            
      <div class="header-right">
        <div class="notification-wrapper">
          <IconButton
            :icon="Bell"
            variant="ghost"
            aria-label="Notifieringar"
            @click="showNotifications = !showNotifications"
          />
          <span v-if="notificationCount > 0" class="notification-badge">{{ notificationCount }}</span>
        </div>
        
        <div class="user-menu">
          <button
            class="user-button"
            @click="showUserMenu = !showUserMenu"
          >
            <User class="w-5 h-5" />
            <span class="hidden md:inline ml-2">{{ currentUser.fullName }}</span>
            <ChevronDown class="w-4 h-4 ml-1" />
          </button>
          
          <div v-if="showUserMenu" class="user-dropdown">
            <router-link to="/profile" class="dropdown-item">
              <User class="w-4 h-4" />
              <span>Min profil</span>
            </router-link>
            <router-link to="/settings" class="dropdown-item">
              <Settings class="w-4 h-4" />
              <span>Inställningar</span>
            </router-link>
            <div class="dropdown-divider"></div>
            <button class="dropdown-item" @click="handleLogout">
              <LogOut class="w-4 h-4" />
              <span>Logga ut</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { Menu, Bell, User, ChevronDown, Settings, LogOut } from 'lucide-vue-next';
import IconButton from '../ui/IconButton.vue';
import { useMockDataStore } from '../../stores/mockData';

defineEmits<{
  'toggle-sidebar': [];
}>();

const mockDataStore = useMockDataStore();
const { currentUser } = storeToRefs(mockDataStore);

const showNotifications = ref(false);
const showUserMenu = ref(false);

const notificationCount = ref(3);

const handleLogout = () => {
  mockDataStore.mockLogout();
  window.location.href = '/login';
};
</script>

<style scoped>
.app-header {
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  position: sticky;
  top: 0;
  z-index: var(--z-sticky);
}

.header-container {
  margin: 0 auto;
  padding: 0 0.75rem;
  height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

@media (min-width: 768px) {
  .header-container {
    padding: 0 1rem;
    height: 4rem;
    gap: 1rem;
  }
}

.header-left {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 1;
  min-width: 0;
}

@media (min-width: 768px) {
  .header-left {
    gap: 1rem;
  }
}

.mobile-menu-toggle {
  padding: 0.5rem;
  border: none;
  background: transparent;
  cursor: pointer;
  color: var(--color-text-secondary);
  transition: color var(--transition-fast);
}

.mobile-menu-toggle:hover {
  color: var(--color-text-primary);
}

.logo {
  text-decoration: none;
  flex: 1;
  min-width: 0;
}

.logo h1 {
  font-size: 1.25rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (min-width: 768px) {
  .logo h1 {
    font-size: 1.5rem;
  }
}

@media (min-width: 1024px) {
  .logo h1 {
    font-size: 2rem;
  }
}


.header-right {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  flex-shrink: 0;
}

@media (min-width: 768px) {
  .header-right {
    gap: 0.5rem;
  }
}

.user-menu {
  position: relative;
}

.user-button {
  display: flex;
  align-items: center;
  padding: 0.5rem;
  border: none;
  background: transparent;
  cursor: pointer;
  color: var(--color-text-primary);
  border-radius: var(--radius-md);
  transition: background var(--transition-fast);
}

@media (min-width: 768px) {
  .user-button {
    padding: 0.5rem 0.75rem;
  }
}

.user-button:hover {
  background: var(--color-background-secondary);
}

.user-dropdown {
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  min-width: 200px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  padding: 0.5rem;
  z-index: var(--z-dropdown);
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.75rem;
  border: none;
  background: transparent;
  cursor: pointer;
  color: var(--color-text-primary);
  text-decoration: none;
  border-radius: var(--radius-sm);
  transition: background var(--transition-fast);
  font-size: 0.875rem;
}

.dropdown-item:hover {
  background: var(--color-background-secondary);
}

.dropdown-divider {
  height: 1px;
  background: var(--color-border);
  margin: 0.5rem 0;
}

.notification-wrapper {
  position: relative;
}

.notification-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  background: var(--color-error);
  color: white;
  font-size: 0.75rem;
  font-weight: var(--font-weight-semibold);
  padding: 0.125rem 0.375rem;
  border-radius: var(--radius-full);
  min-width: 1.25rem;
  text-align: center;
}
</style>
