import { defineStore } from 'pinia'
import { AggregationType } from './interface'
import axios from 'axios'

interface State {
    aggregation: AggregationType
    isLoading: boolean
}

export const aggregation = defineStore({
    id: "aggregation",
    state: (): State => {
        return {
            aggregation: {
                budget: 0,
                consum: 0,
                balance: 0
            },
            isLoading: true
        };
    },
    getters: {

    },
    actions: {
        async getAggregationFunc(year: number, month: number) {
            const url = `http://${import.meta.env.VITE_BACKEND_URI}:60001/aggregation?year=${year}&month=${month}`
            const response = await axios.get(url)
            this.aggregation = response.data
            this.isLoading = false
        }
    }
})