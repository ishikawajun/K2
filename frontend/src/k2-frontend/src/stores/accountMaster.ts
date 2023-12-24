import { defineStore } from 'pinia'
import { AccountMaster } from './interface'
import axios from 'axios'

interface State {
    accountMaster: AccountMaster[];
    isLoading: boolean;
}

export const accountMaster = defineStore({
    id: "accountMaster",
    state: (): State => {
        return {
            accountMaster: [],
            isLoading: true
        };
    },
    getters: {

    },
    actions: {
        async getAccountMastergetFunc() {
            const url = `http://${import.meta.env.VITE_BACKEND_URI}:60001/account_master`
            const response = await axios.get(url)
            this.accountMaster = response.data
            this.isLoading = false
        }
    }
})