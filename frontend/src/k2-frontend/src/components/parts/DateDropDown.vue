<script setup lang="ts">
import { date } from '../../stores/date'
import { computed } from 'vue'
import { storeToRefs } from 'pinia'

const dateStore = date()
const { year, month } = storeToRefs(dateStore)

const nowDate = new Date()
const thisYear = nowDate.getFullYear()
const startYear = 2019

const yearList = computed(() => {
    const years: number[] = []
    for (let targetYear = startYear; targetYear <= thisYear + 1; targetYear++) {
        years.push(targetYear)
    }
    return years
})

const monthList = computed(() => Array.from({ length: 12 }, (_, index) => index + 1))
</script>

<template>
    <select v-model.number="month">
        <option v-for="monthFor in monthList" :key="monthFor" :value="monthFor">{{ monthFor }}月</option>
    </select>
    <select v-model.number="year">
        <option v-for="yearFor in yearList" :key="yearFor" :value="yearFor">{{ yearFor }}年</option>
    </select>
</template>
