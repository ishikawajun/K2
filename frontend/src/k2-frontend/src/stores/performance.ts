import { defineStore } from 'pinia'
import type { Performance } from './interface'
import axios from 'axios'

interface State {
    performance: Performance[];
    isLoading: boolean;
}

export const performance = defineStore("performance", {
    state: (): State => ({
        performance: [],
        isLoading: false
    }),
    actions: {
        async getPerformanceFunc(year: number, month: number) {
            this.isLoading = true
            try {
                const url = `http://${import.meta.env.VITE_BACKEND_URI}:60001/performance?year=${year}&month=${month}`
                const { data } = await axios.get<Performance[]>(url)
                this.performance = data ?? []
            } catch (error) {
                this.performance = []
                console.error(error)
            } finally {
                this.isLoading = false
            }
        }
    }
})