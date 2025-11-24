<script setup lang="ts">
import { budget } from '../../stores/budget'
import { master } from '../../stores/accountMaster'
import { computed, watch } from 'vue'
import { FwbSpinner } from 'flowbite-vue'
import { date } from '../../stores/date'
import { storeToRefs } from 'pinia'

const dateStore = date()
const { year, month } = storeToRefs(dateStore)

const budgetStore = budget()
const { budget: budgets, isLoading } = storeToRefs(budgetStore)

const accountMasterStore = master()
const { accountMaster } = storeToRefs(accountMasterStore)

const currentMonth = new Date()
const currentMonthFloor = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1)

const ensureAccountMasterLoaded = async () => {
    if (!accountMaster.value.length) {
        await accountMasterStore.getAccountMasterFunc()
    }
}

const isFutureMonth = (targetYear: number, targetMonth: number) => {
    const selectedMonth = new Date(targetYear, targetMonth - 1, 1)
    return selectedMonth > currentMonthFloor
}

const setFutureBudget = () => {
    if (accountMaster.value.length) {
        budgetStore.setFutureData(accountMaster.value)
    }
}

const loadBudget = async (targetYear: number, targetMonth: number) => {
    await ensureAccountMasterLoaded()
    if (!accountMaster.value.length) {
        return
    }
    if (isFutureMonth(targetYear, targetMonth)) {
        setFutureBudget()
        return
    }
    await budgetStore.getBudgetFunc(targetYear, targetMonth)
    if (!budgetStore.budget.length) {
        setFutureBudget()
    }
}

watch([year, month], async ([selectedYear, selectedMonth]) => {
    await loadBudget(selectedYear, selectedMonth)
}, { immediate: true })

const getBudget = computed(() => budgets.value)

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
                <tr v-else v-for="budget, i in getBudget"
                    :class="{ 'bg-white border-b': i % 2 === 0, 'bg-gray-50 border-b': i % 2 !== 0 }"
                    :key="budget.account">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {{ budget.account }}
                    </th>
                    <td class="px-6 py-4">
                        <input type="number" class="no-spin h-4" v-model="budget.amount">円
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<style scoped>
.no-spin::-webkit-inner-spin-button,
.no-spin::-webkit-outer-spin-button {
    -webkit-appearance: none !important;
    margin: 0 !important;
}
</style>
