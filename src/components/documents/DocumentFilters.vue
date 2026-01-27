<template>
  <div class="document-filters">
    <BaseInput
      :model-value="search"
      type="search"
      placeholder="Sök dokument..."
      @update:model-value="$emit('update:search', $event)"
    />

    <BaseSelect
      :model-value="status"
      :options="statusOptions"
      placeholder="Alla statusar"
      @update:model-value="$emit('update:status', $event)"
    />

    <BaseSelect
      :model-value="type"
      :options="typeOptions"
      placeholder="Alla typer"
      @update:model-value="$emit('update:type', $event)"
    />

    <BaseButton
      variant="outline"
      size="sm"
      @click="$emit('clear')"
    >
      Rensa filter
    </BaseButton>
  </div>
</template>

<script setup lang="ts">
import BaseInput from '../common/BaseInput.vue';
import BaseSelect from '../common/BaseSelect.vue';
import BaseButton from '../common/BaseButton.vue';

interface Props {
  search: string;
  status: string;
  type: string;
}

defineProps<Props>();

defineEmits<{
  'update:search': [value: string];
  'update:status': [value: string];
  'update:type': [value: string];
  'clear': [];
}>();

const statusOptions = [
  { value: '', label: 'Alla statusar' },
  { value: 'draft', label: 'Utkast' },
  { value: 'finalized', label: 'Slutförd' },
  { value: 'archived', label: 'Arkiverad' },
];

const typeOptions = [
  { value: '', label: 'Alla typer' },
  { value: 'agenda', label: 'Dagordning' },
  { value: 'minutes', label: 'Protokoll' },
  { value: 'annual_minutes', label: 'Årsmötesprotokoll' },
  { value: 'annual_report', label: 'Årsrapport' },
];
</script>

<style scoped>
.document-filters {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.document-filters > * {
  flex: 1;
  min-width: 200px;
}

@media (max-width: 768px) {
  .document-filters {
    flex-direction: column;
  }

  .document-filters > * {
    width: 100%;
  }
}
</style>
