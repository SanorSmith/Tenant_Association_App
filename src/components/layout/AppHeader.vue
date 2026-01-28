<template>
  <nav class="navbar">
    <div class="navbar-content">
      <!-- Left side - Brand Header -->
      <div class="navbar-left">
        <button
          class="mobile-menu-toggle md:hidden"
          @click="$emit('toggle-sidebar')"
          aria-label="Toggle menu"
        >
          <Menu class="w-6 h-6" />
        </button>
        <router-link to="/" class="brand-header">
          <Building2 :size="48" class="brand-icon" />
          <h1 class="brand-title">Grannskapet</h1>
        </router-link>
      </div>
      
      <!-- Right side - Navigation Links -->
      <div class="navbar-right">
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
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { Menu, Bell, User, ChevronDown, Settings, LogOut, Building2 } from 'lucide-vue-next';
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
/* Navbar Styles - Same as LandingPage */
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
  width: 100%;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.navbar-left {
  display: flex;
  align-items: center;
}

.brand-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  text-decoration: none;
  color: inherit;
}

.brand-icon {
  color: var(--hgf-blue);
}

.brand-title {
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

.mobile-menu-toggle {
  padding: 0.5rem;
  border: none;
  background: transparent;
  cursor: pointer;
  color: var(--hgf-blue);
  transition: color var(--transition-fast);
}

.mobile-menu-toggle:hover {
  color: var(--hgf-blue-dark);
}

.notification-wrapper {
  position: relative;
}

.notification-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  background: var(--hgf-red);
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.125rem 0.375rem;
  border-radius: 9999px;
  min-width: 1.25rem;
  text-align: center;
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
  color: var(--hgf-gray-dark);
  border-radius: 8px;
  transition: background 0.2s ease;
}

@media (min-width: 768px) {
  .user-button {
    padding: 0.5rem 0.75rem;
  }
}

.user-button:hover {
  background: var(--hgf-gray-bg);
}

.user-dropdown {
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  min-width: 200px;
  background: white;
  border: 1px solid var(--hgf-gray-light);
  border-radius: 8px;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  padding: 0.5rem;
  z-index: 1000;
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
  color: var(--hgf-gray-dark);
  text-decoration: none;
  border-radius: 4px;
  transition: background 0.2s ease;
  font-size: 0.875rem;
}

.dropdown-item:hover {
  background: var(--hgf-gray-bg);
}

.dropdown-divider {
  height: 1px;
  background: var(--hgf-gray-light);
  margin: 0.5rem 0;
}

/* Responsive */
@media (max-width: 768px) {
  .navbar-content {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }
  
  .navbar-right {
    width: 100%;
    justify-content: space-between;
  }
}
</style>
