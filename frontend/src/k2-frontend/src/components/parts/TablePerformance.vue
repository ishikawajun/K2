<script setup lang="ts">
import { performance } from '../../stores/performance'
import type { Performance } from '../../stores/interface';
import { computed, watchEffect } from 'vue'
import { Spinner } from 'flowbite-vue'
import { date } from '../../stores/date'

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

const performanceStore = performance()
watchEffect(
    (): void => {
        performanceStore.getPerformanceFunc(year.value, month.value)
    }
)
const isLoading = computed(
    (): boolean => {
        return performanceStore.isLoading
    }
)
const getPerformance = computed(
    (): Performance[] => {
        return performanceStore.performance
    }
)

</script>

<template>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700">
                <tr>
                    <th scope="col" class="px-6 py-3">
                        Account Subject
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Achievement Ammount
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Balance Ammount
                    </th>
                </tr>
            </thead>
            <tbody>
                <Spinner v-if="isLoading" size="12" />
                <tr v-else v-for="performance, i in getPerformance"
                    :class="{ 'bg-white border-b': i % 2 === 0, 'bg-gray-50 border-b': i % 2 !== 0 }"
                    :key="performance.account">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {{ performance.account }}
                    </th>
                    <td class="px-6 py-4">
                        {{ performance.amount }}円
                    </td>
                    <td :class="{ 'text-red-500': performance.balance < 0 }" class="px-6 py-4">
                        {{ performance.balance }}円
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

