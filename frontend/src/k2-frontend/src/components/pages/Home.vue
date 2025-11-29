<script setup lang="ts">
import Aggregation from '../parts/Aggregations.vue';
import TableBudget from '../parts/TableBudget.vue';
import TablePerformance from '../parts/TablePerformance.vue';
import DateDropDwon from '../parts/DateDropDown.vue';
import { date } from '../../stores/date'

const dateStore = date()

</script>

<template>
    <div class="container mx-auto">
        <Aggregation />
        <div class="flex flex-row-reverse flex-wrap p-3 pb-5">
            <DateDropDwon />
        </div>
        <div class="flex flex-row flex-wrap">
            <div class="p-3 overflow-x-auto">
                <h2 class="p-2 text-xl font-medium mb-4">{{ dateStore.year }}年{{ dateStore.month }}月 予算表</h2>
                <TableBudget />
            </div>
            <div class="p-3 overflow-x-auto mb-5">
                <h2 class="p-2 text-xl font-medium mb-4">{{ dateStore.year }}年{{ dateStore.month }}月 実績表</h2>
                <TablePerformance />
            </div>
        </div>
    </div>
</template>