<script setup lang="ts">
import Card from '../parts/Card.vue'
import { aggregation } from '../../stores/aggregation';
import { budget } from '../../stores/budget';
import type { AggregationType, Budget } from '../../stores/interface'
import { computed, watchEffect, ref } from 'vue'
import { Spinner } from 'flowbite-vue'
import { date } from '../../stores/date'

interface Props {
    isEdit?: boolean
}

const props = withDefaults(
    defineProps<Props>(),
    { isEdit: false }
)

const dateStore = date()
const year = computed(
    (): number => {
        return dateStore.year
    }
)
const month = computed(
    (): number => {
        return dateStore.month
    }
)

const aggregationStore = aggregation()
const budgetStore = budget()
const editBudget = computed(
    (): Budget[] => {
        return budgetStore.budget
    }
)

watchEffect(
    (): void => {
        aggregationStore.getAggregationFunc(year.value, month.value)
    }
)
const isLoading = computed(
    (): boolean => {
        return aggregationStore.isLoading
    }
)
const getAggregation = computed(
    (): AggregationType => {
        return aggregationStore.aggregation
    }

)

const budgetAmount = ref(0)
if (props.isEdit) {
    watchEffect((): void => {
        let aggre = 0
        if(editBudget.value) {
        for (const item of editBudget.value) {
            aggre += Number(item.amount)
        }
        budgetAmount.value = aggre
    }
    }
    )
}


</script>

<template>
    <div class="flex flex-row space-x-4 space-x overflow-x-auto p-2">
        <div class="py-5">
            <Spinner v-if="isLoading" size="8" />
            <Card v-else-if="isEdit" title="予算金額" :content="budgetAmount" />
            <Card v-else title="予算金額" :content="getAggregation.budget" />
        </div>
        <div class="py-5">
            <Spinner v-if="isLoading" size="8" />
            <Card v-else title="消費金額" :content="getAggregation.consum" />
        </div>
        <div class="py-5">
            <Spinner v-if="isLoading" size="8" />
            <Card v-else title="予算残高" :content="getAggregation.balance" />
        </div>
    </div>
</template>