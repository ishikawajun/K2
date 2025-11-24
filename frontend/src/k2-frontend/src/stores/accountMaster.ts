import { defineStore } from 'pinia'
import type { AccountMaster } from './interface'
import axios from 'axios'

interface AccountMasterResponse {
    account_data: AccountMaster[]
}

interface AccountMasterState {
    accountMaster: AccountMaster[]
    isLoading: boolean
    postMessage: string
}

interface PostAccoutMaster {
    account_data: AccountMaster[]
}

export const master = defineStore({
    id: 'accountMaster',
    state: (): AccountMasterState => ({
        accountMaster: [],
        isLoading: false,
        postMessage: ''
    }),
    actions: {
        async getAccountMasterFunc() {
            this.isLoading = true
            try {
                const url = `http://${import.meta.env.VITE_BACKEND_URI}:60001/account_master`
                const { data } = await axios.get<AccountMasterResponse>(url)
                this.accountMaster = data.account_data ?? []
            } catch (error) {
                this.accountMaster = []
                console.error(error)
            } finally {
                this.isLoading = false
            }
        },
        async getAccountMastergetFunc() {
            await this.getAccountMasterFunc()
        },
        async postAccountMasterFunc() {
            this.postMessage = ''
            try {
                const postAcountMaster: PostAccoutMaster = { account_data: [] }
                for (const masterData of this.accountMaster) {
                    if (masterData.isEdit) {
                        postAcountMaster.account_data.push({
                            account_en: masterData.account_en,
                            account_jp: masterData.account_jp
                        })
                        masterData.isEdit = false
                    }
                }
                if (!postAcountMaster.account_data.length) {
                    return
                }
                const url = `http://${import.meta.env.VITE_BACKEND_URI}:60001/account_master`
                const { status } = await axios.post(url, postAcountMaster)
                this.postMessage = String(status)
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    this.postMessage = error.message
                } else {
                    this.postMessage = String(error)
                }
                console.error(error)
            }
        }
    }
})
