import { defineStore } from 'pinia'
import { Performance } from './interface'
import axios from 'axios'

interface State {
    performance: Performance[];
    isLoading: boolean;
}

export const performance = defineStore({
    id: "performance",
    state: (): State => {
        return {
            performance: [],
            isLoading: true
        };
    },
    getters: {

    },
    actions: {
        async getPerformanceFunc(year: number, month: number) {
            const url = `http://${import.meta.env.VITE_BACKEND_URI}:60001/performance?year=${year}&month=${month}`
            const response = await axios.get(url)
            this.performance = response.data
            this.isLoading = false
        }
    }
})