<template>
  <div class="test-view p-8">
    <h1 class="text-2xl font-bold mb-6">Feature Testing Page</h1>
    
    <!-- Chart.js Test -->
    <div class="mb-8">
      <h2 class="text-xl font-semibold mb-4">Chart.js Budget Visualization Test</h2>
      <div class="bg-white p-6 rounded-lg shadow max-w-md">
        <canvas ref="testChartCanvas"></canvas>
        <div class="mt-4">
          <p class="text-sm text-gray-600">Total: {{ formatCurrency(totalBudget) }}</p>
        </div>
      </div>
      <div class="mt-4">
        <p v-if="chartRendered" class="text-green-600">✅ Chart rendered successfully!</p>
        <p v-else class="text-red-600">❌ Chart failed to render</p>
      </div>
    </div>
    
    <!-- Board Member Management Test -->
    <div class="mb-8">
      <h2 class="text-xl font-semibold mb-4">Board Member Management Test</h2>
      <div class="bg-white p-6 rounded-lg shadow">
        <div class="mb-4">
          <h3 class="font-semibold mb-2">Current Members ({{ boardMembers.length }})</h3>
          <ul class="space-y-2">
            <li v-for="member in boardMembers" :key="member.id" class="flex justify-between items-center p-2 bg-gray-50 rounded">
              <span>{{ member.fullName }} - {{ member.email }}</span>
              <button 
                @click="testRemoveMember(member.id)"
                class="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
              >
                Remove
              </button>
            </li>
          </ul>
        </div>
        
        <div class="border-t pt-4">
          <h3 class="font-semibold mb-2">Add Test Member</h3>
          <button 
            @click="testAddMember"
            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add Test Member
          </button>
        </div>
        
        <div class="mt-4">
          <p v-if="memberTestResult" :class="memberTestResult.success ? 'text-green-600' : 'text-red-600'">
            {{ memberTestResult.message }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { Chart, registerables } from 'chart.js';
import { useMockDataStore } from '../stores/mockData';

Chart.register(...registerables);

const mockDataStore = useMockDataStore();
const { boardMembers, budgetItems } = storeToRefs(mockDataStore);

const testChartCanvas = ref<HTMLCanvasElement | null>(null);
const chartRendered = ref(false);
const memberTestResult = ref<{ success: boolean; message: string } | null>(null);

const totalBudget = computed(() => {
  return budgetItems.value.reduce((sum, item) => sum + item.amount, 0);
});

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('sv-SE', { style: 'currency', currency: 'SEK' }).format(amount);
};

const testAddMember = () => {
  try {
    const testMember = {
      id: `test-${Date.now()}`,
      fullName: 'Test Testsson',
      email: 'test@example.se',
      phone: '+46701234567',
      role: 'board_member' as const,
      notificationPreference: 'email' as const,
    };
    
    mockDataStore.addBoardMember(testMember);
    memberTestResult.value = {
      success: true,
      message: '✅ Member added successfully! Check the list above.'
    };
  } catch (error) {
    memberTestResult.value = {
      success: false,
      message: `❌ Failed to add member: ${error}`
    };
  }
};

const testRemoveMember = (memberId: string) => {
  try {
    mockDataStore.removeBoardMember(memberId);
    memberTestResult.value = {
      success: true,
      message: '✅ Member removed successfully!'
    };
  } catch (error) {
    memberTestResult.value = {
      success: false,
      message: `❌ Failed to remove member: ${error}`
    };
  }
};

onMounted(() => {
  if (testChartCanvas.value) {
    try {
      const ctx = testChartCanvas.value.getContext('2d');
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
        chartRendered.value = true;
      }
    } catch (error) {
      console.error('Chart rendering error:', error);
      chartRendered.value = false;
    }
  }
});
</script>

<style scoped>
.test-view {
  min-height: 100vh;
  background: #f5f5f5;
}
</style>
