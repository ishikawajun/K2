<script setup lang="ts">
import Card from '../parts/Card.vue'
import { aggregation } from '../../stores/aggregation'
import { budget } from '../../stores/budget'
import { computed, watch } from 'vue'
import { FwbSpinner } from 'flowbite-vue'
import { date } from '../../stores/date'
import { storeToRefs } from 'pinia'

interface Props {
    isEdit?: boolean
}

const props = withDefaults(
    defineProps<Props>(),
    { isEdit: false }
)

const dateStore = date()
const { year, month } = storeToRefs(dateStore)

const aggregationStore = aggregation()
const { aggregation: aggregationData, isLoading } = storeToRefs(aggregationStore)

watch([year, month], ([selectedYear, selectedMonth]) => {
    aggregationStore.getAggregationFunc(selectedYear, selectedMonth)
}, { immediate: true })

const budgetStore = budget()
const { budget: editableBudget } = storeToRefs(budgetStore)

const budgetAmount = computed(() => {
    if (!props.isEdit) {
        return 0
    }
    return editableBudget.value.reduce((total, item) => total + Number(item.amount ?? 0), 0)
})
</script>

<template>
    <div class="flex flex-row space-x-4 space-x overflow-x-auto p-2">
        <div class="py-5">
            <FwbSpinner v-if="isLoading" size="8" />
            <Card v-else-if="isEdit" title="予算金額" :content="budgetAmount" />
            <Card v-else title="予算金額" :content="aggregationData.budget" />
        </div>
        <div class="py-5">
            <FwbSpinner v-if="isLoading" size="8" />
            <Card v-else title="消費金額" :content="aggregationData.consum" />
        </div>
        <div class="py-5">
            <FwbSpinner v-if="isLoading" size="8" />
            <Card v-else title="予算残高" :content="aggregationData.balance" />
        </div>
    </div>
</template>
