<script setup lang="ts">
import { budget } from '../../stores/budget'
import type { Budget } from '../../stores/interface';
import { computed, watchEffect } from 'vue'
import { FwbSpinner } from 'flowbite-vue'
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

const budgetStore = budget()
watchEffect(
    (): void => {
        budgetStore.getBudgetFunc(year.value, month.value)
    }
)
const isLoading = computed(
    (): boolean => {
        return budgetStore.isLoading
    }
)
const getBudget = computed(
    (): Budget[] => {
        return budgetStore.budget
    }
)

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
                        Budget Ammount
                    </th>
                </tr>
            </thead>
            <tbody>
                <FwbSpinner v-if="isLoading" size="12" />
                <tr v-else v-for="budget, i in getBudget"
                    :class="{ 'bg-white border-b': i % 2 === 0, 'bg-gray-50 border-b': i % 2 !== 0 }" :key="budget.account">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {{ budget.account }}
                    </th>
                    <td class="px-6 py-4">
                        {{ budget.amount }}円
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
