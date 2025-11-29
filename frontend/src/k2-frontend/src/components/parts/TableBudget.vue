<script setup lang="ts">
import { budget } from '../../stores/budget'
import { watch } from 'vue'
import { FwbSpinner } from 'flowbite-vue'
import { date } from '../../stores/date'
import { formatMoney } from '../../util/utility'
import { storeToRefs } from 'pinia'

const dateStore = date()
const { year, month } = storeToRefs(dateStore)

const budgetStore = budget()
const { budget: budgets, isLoading } = storeToRefs(budgetStore)

watch([year, month], ([selectedYear, selectedMonth]) => {
    console.log('watch', selectedYear, selectedMonth)
    budgetStore.getBudgetFunc(selectedYear, selectedMonth)
}, { immediate: true })

</script>

<template>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                    <th scope="col" class="px-6 py-3">
                        Account Subject
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Budget Amount
                    </th>
                </tr>
            </thead>
            <tbody>
                <FwbSpinner v-if="isLoading" size="12" />
                <tr v-else v-for="budget, i in budgets"
                    :class="{ 'bg-white border-b': i % 2 === 0, 'bg-gray-50 border-b': i % 2 !== 0 }" :key="budget.account">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {{ budget.account }}
                    </th>
                    <td class="px-6 py-4">
                        {{ formatMoney(budget.amount) }}円
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
