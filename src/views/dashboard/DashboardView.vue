<template>
  <MainLayout>
    <div class="dashboard-view">
      <div class="dashboard-header">
        <div>
          <h1 style="color: var(--hgf-red) !important;" class="text-3xl font-bold">Översikt</h1>
          <p class="text-text-secondary mt-2">Välkommen tillbaka, {{ currentUser.fullName }}!</p>
        </div>
      </div>
      <div>
        <p>Dashboard is loading correctly!</p>
      </div>
    </div>
  </MainLayout>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import MainLayout from '../../components/layout/MainLayout.vue';
import { useMockDataStore } from '../../stores/mockData';

const mockDataStore = useMockDataStore();
const { currentUser } = storeToRefs(mockDataStore);
</script>

<style scoped>
.dashboard-view {
  padding: 2rem;
}

.dashboard-header {
  margin-bottom: 2rem;
}
</style>
