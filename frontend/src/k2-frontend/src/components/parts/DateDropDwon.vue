<script setup lang="ts">
import { ref } from 'vue'
import { date } from '../../stores/date'

const dateStore = date()

const nowDate = new Date()
const year = ref(nowDate.getFullYear())
const month = ref(nowDate.getMonth() + 1)

const yearList: number[] = []
for (let i = 5; i > 0; i--) {
    yearList.push(year.value - i)
}
yearList.push(year.value, year.value + 1)

const monthList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

const changeYear = (selectedYear: number): void => {
    dateStore.setYear(selectedYear)
}

const changeMonth = (selectedMonth: number): void => {
    dateStore.setMonth(selectedMonth)
}

</script>

<template>
    <select v-model="month" @change="changeMonth(month)">
        <option v-for="monthFor in monthList" :key="monthFor" :value="monthFor">{{ monthFor }}月</option>
    </select>
    <select v-model="year" @change="changeYear(year)">
        <option v-for="yearFor in yearList" :key="yearFor" :value="yearFor">{{ yearFor }}年</option>
    </select>
</template>
