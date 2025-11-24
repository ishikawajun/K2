<script setup lang="ts">
import { performance } from '../../stores/performance'
import { watch } from 'vue'
import { FwbSpinner } from 'flowbite-vue'
import { date } from '../../stores/date'
import { formatMoney } from '../../util/utility'
import { storeToRefs } from 'pinia'

const dateStore = date()
const { year, month } = storeToRefs(dateStore)

const performanceStore = performance()
const { performance: performanceRows, isLoading } = storeToRefs(performanceStore)

watch([year, month], ([selectedYear, selectedMonth]) => {
    performanceStore.getPerformanceFunc(selectedYear, selectedMonth)
}, { immediate: true })

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
                        Achievement Amount
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Balance Amount
                    </th>
                </tr>
            </thead>
            <tbody>
                <FwbSpinner v-if="isLoading" size="12" />
                <tr v-else v-for="performance, i in performanceRows"
                    :class="{ 'bg-white border-b': i % 2 === 0, 'bg-gray-50 border-b': i % 2 !== 0 }"
                    :key="performance.account">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {{ performance.account }}
                    </th>
                    <td class="px-6 py-4">
                        {{ formatMoney(performance.amount) }}円
                    </td>
                    <td :class="{ 'text-red-500': performance.balance < 0 }" class="px-6 py-4">
                        {{ formatMoney(performance.balance) }}円
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

