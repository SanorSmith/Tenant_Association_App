<template>
  <MainLayout>
    <div class="budget-view">
      <div class="budget-header">
        <h1 class="text-3xl font-bold text-text-primary">Budget 2025</h1>
        <BaseButton variant="outline" @click="showCreateModal = true">
          <Plus class="w-4 h-4" />
          Ny budgetpost
        </BaseButton>
      </div>

      <div class="budget-overview">
        <BaseCard title="Budgetöversikt">
          <div class="overview-stats">
            <div class="stat-item">
              <p class="stat-label">Total budget</p>
              <p class="stat-value">{{ formatCurrency(totalBudget) }}</p>
            </div>
            <div class="stat-item">
              <p class="stat-label">Antal poster</p>
              <p class="stat-value">{{ budgetItems.length }}</p>
            </div>
            <div class="stat-item">
              <p class="stat-label">Kategorier</p>
              <p class="stat-value">{{ categories.length }}</p>
            </div>
          </div>
        </BaseCard>
      </div>

      <div class="budget-charts">
        <BaseCard title="Budget per kategori">
          <div class="chart-container">
            <canvas ref="categoryChartCanvas"></canvas>
          </div>
        </BaseCard>

        <BaseCard title="Fördelning">
          <div class="chart-container">
            <canvas ref="pieChartCanvas"></canvas>
          </div>
        </BaseCard>
      </div>

      <BaseCard title="Budgetposter">
        <div class="budget-filters">
          <BaseSelect
            v-model="selectedCategory"
            :options="categoryOptions"
            placeholder="Alla kategorier"
          />
          <BaseSelect
            v-model="selectedYear"
            :options="yearOptions"
            placeholder="Välj år"
          />
        </div>

        <div class="budget-table">
          <div class="table-header">
            <div>Kategori</div>
            <div>Beskrivning</div>
            <div>Belopp</div>
            <div>Aktivitet</div>
            <div>Åtgärder</div>
          </div>
          <div
            v-for="item in filteredBudgetItems"
            :key="item.id"
            class="table-row"
          >
            <div>
              <Badge variant="primary">{{ item.category }}</Badge>
            </div>
            <div>{{ item.description }}</div>
            <div class="amount">{{ formatCurrency(item.amount) }}</div>
            <div>
              <Badge v-if="item.activityId" variant="success">
                {{ getActivityName(item.activityId) }}
              </Badge>
              <span v-else class="text-text-tertiary">-</span>
            </div>
            <div class="actions">
              <IconButton
                :icon="Edit"
                variant="default"
                size="sm"
                aria-label="Redigera"
                @click="editBudgetItem(item)"
              />
              <IconButton
                :icon="Trash2"
                variant="danger"
                size="sm"
                aria-label="Ta bort"
                @click="deleteBudgetItem(item.id)"
              />
            </div>
          </div>
        </div>
      </BaseCard>
    </div>

    <CreateBudgetItemModal
      v-model="showCreateModal"
      :budget-item="editingItem"
      @budget-item-saved="handleBudgetItemSaved"
    />
  </MainLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { Plus, Edit, Trash2 } from 'lucide-vue-next';
import { Chart, registerables } from 'chart.js';
import MainLayout from '../../components/layout/MainLayout.vue';
import BaseCard from '../../components/common/BaseCard.vue';
import BaseButton from '../../components/common/BaseButton.vue';
import BaseSelect from '../../components/common/BaseSelect.vue';
import Badge from '../../components/ui/Badge.vue';
import IconButton from '../../components/ui/IconButton.vue';
import CreateBudgetItemModal from '../../components/modals/CreateBudgetItemModal.vue';
import { useMockDataStore } from '../../stores/mockData';
import type { BudgetItem } from '../../types';

Chart.register(...registerables);

const mockDataStore = useMockDataStore();
const { budgetItems, activities } = storeToRefs(mockDataStore);

const categoryChartCanvas = ref<HTMLCanvasElement | null>(null);
const pieChartCanvas = ref<HTMLCanvasElement | null>(null);
const showCreateModal = ref(false);
const editingItem = ref<BudgetItem | null>(null);
const selectedCategory = ref('');
const selectedYear = ref('2025');

const totalBudget = computed(() => {
  return budgetItems.value.reduce((sum, item) => sum + item.amount, 0);
});

const categories = computed(() => {
  return [...new Set(budgetItems.value.map(item => item.category))];
});

const categoryOptions = computed(() => {
  return [
    { value: '', label: 'Alla kategorier' },
    ...categories.value.map(cat => ({ value: cat, label: cat })),
  ];
});

const yearOptions = [
  { value: '2024', label: '2024' },
  { value: '2025', label: '2025' },
  { value: '2026', label: '2026' },
];

const filteredBudgetItems = computed(() => {
  return budgetItems.value.filter(item => {
    if (selectedCategory.value && item.category !== selectedCategory.value) {
      return false;
    }
    if (selectedYear.value && item.budgetYear.toString() !== selectedYear.value) {
      return false;
    }
    return true;
  });
});

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('sv-SE', { style: 'currency', currency: 'SEK' }).format(amount);
};

const getActivityName = (activityId: string) => {
  const activity = activities.value.find(a => a.id === activityId);
  return activity ? activity.title : 'Okänd aktivitet';
};

const editBudgetItem = (item: BudgetItem) => {
  editingItem.value = item;
  showCreateModal.value = true;
};

const deleteBudgetItem = (itemId: string) => {
  if (confirm('Är du säker på att du vill ta bort denna budgetpost?')) {
    const index = budgetItems.value.findIndex(i => i.id === itemId);
    if (index > -1) {
      budgetItems.value.splice(index, 1);
    }
  }
};

const handleBudgetItemSaved = () => {
  showCreateModal.value = false;
  editingItem.value = null;
};

onMounted(() => {
  if (categoryChartCanvas.value) {
    const ctx = categoryChartCanvas.value.getContext('2d');
    if (ctx) {
      const categoryData = categories.value.map(category => {
        return budgetItems.value
          .filter(item => item.category === category)
          .reduce((sum, item) => sum + item.amount, 0);
      });

      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: categories.value,
          datasets: [{
            label: 'Budget (SEK)',
            data: categoryData,
            backgroundColor: 'rgba(0, 95, 115, 0.8)',
            borderWidth: 0,
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                font: {
                  size: 12,
                },
              },
            },
            x: {
              ticks: {
                font: {
                  size: 12,
                },
              },
            },
          },
        },
      });
    }
  }

  if (pieChartCanvas.value) {
    const ctx = pieChartCanvas.value.getContext('2d');
    if (ctx) {
      const categoryData = categories.value.map(category => {
        return budgetItems.value
          .filter(item => item.category === category)
          .reduce((sum, item) => sum + item.amount, 0);
      });

      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: categories.value,
          datasets: [{
            data: categoryData,
            backgroundColor: [
              'rgba(0, 95, 115, 0.8)',
              'rgba(10, 147, 150, 0.8)',
              'rgba(148, 210, 189, 0.8)',
              'rgba(233, 216, 166, 0.8)',
            ],
            borderWidth: 0,
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                font: {
                  size: 12,
                },
                padding: 10,
              },
            },
          },
        },
      });
    }
  }
});
</script>

<style scoped>
.budget-view {
  width: 100%;
}

.budget-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.budget-overview {
  margin-bottom: 2rem;
}

.overview-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
}

.stat-item {
  text-align: center;
}

.stat-label {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  margin-bottom: 0.5rem;
}

.stat-value {
  font-size: 2rem;
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
}

.budget-charts {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

@media (max-width: 768px) {
  .budget-charts {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}

.chart-container {
  position: relative;
  height: 300px;
  padding: 1rem;
  width: 100%;
}

@media (max-width: 768px) {
  .chart-container {
    height: 250px;
    padding: 0.5rem;
  }
}

.budget-filters {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.budget-filters > * {
  flex: 1;
  max-width: 300px;
}

.budget-table {
  width: 100%;
}

.table-header,
.table-row {
  display: grid;
  grid-template-columns: 1.5fr 2fr 1.5fr 1.5fr 1fr;
  gap: 1rem;
  padding: 1rem;
  align-items: center;
}

.table-header {
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-secondary);
  border-bottom: 2px solid var(--color-border);
}

.table-row {
  border-bottom: 1px solid var(--color-border);
  transition: background var(--transition-fast);
}

.table-row:hover {
  background: var(--color-background-secondary);
}

.amount {
  font-weight: var(--font-weight-semibold);
  color: var(--color-success);
}

.actions {
  display: flex;
  gap: 0.5rem;
}

@media (max-width: 768px) {
  .budget-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .budget-charts {
    grid-template-columns: 1fr;
  }

  .budget-filters {
    flex-direction: column;
  }

  .budget-filters > * {
    max-width: 100%;
  }

  .table-header,
  .table-row {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }

  .table-header {
    display: none;
  }

  .table-row > div::before {
    content: attr(data-label);
    font-weight: var(--font-weight-semibold);
    margin-right: 0.5rem;
  }
}
</style>
