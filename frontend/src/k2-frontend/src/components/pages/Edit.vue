<script setup lang="ts">
import Aggregation from '../parts/Aggregations.vue';
import TableBudgetEdit from '../parts/TableBudgetEdit.vue';
import TablePerformance from '../parts/TablePerformance.vue';
import Modal from '../parts/Modal.vue';
import DateDropDwon from '../parts/DateDropDwon.vue';
import { computed } from 'vue'
import { date } from '../../stores/date'
import { budget } from '../../stores/budget'
import { Alert } from 'flowbite-vue'

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
const postBudget = (): void => {
    budgetStore.postBudgetFunc(year.value, month.value)
}

const postMessage = computed(
    (): string => {
        return budgetStore.postMessage
    }
)

const onClose = (): void => {
    budgetStore.postMessage = ''
}

</script>

<template>
    <Alert v-if="postMessage === '201'" type="success" closable @click="onClose()">予算テーブル更新成功</Alert>
    <Alert type="danger" v-else-if="postMessage !== ''" @click="onClose()" closable>予算テーブル更新失敗:{{ postMessage }}</Alert>
    <div class="container mx-auto">
        <Aggregation isEdit />
        <div class="flex flex-row-reverse flex-wrap p-3">
            <DateDropDwon />
        </div>
        <div class="flex flex-row flex-wrap">
            <div class="p-3 overflow-x-auto">
                <h2 class="p-2 text-xl font-medium mb-4">{{ year }}年{{ month }}月 予算表</h2>
                <TableBudgetEdit />
                <div class="p-2">
                    <Modal v-on:postAccountData="postBudget">Submit</Modal>
                </div>
            </div>
            <div class="p-3 overflow-x-auto">
                <h2 class="p-2 text-xl font-medium mb-4">{{ year }}年{{ month }}月 実績表</h2>
                <TablePerformance />
            </div>
        </div>
    </div>
</template>