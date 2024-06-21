import { defineStore } from 'pinia'
import { AccountMaster } from './interface'
import { Ref, ref } from 'vue';
import axios from 'axios'

interface AccountMasterState {
    accountMaster: Ref<AccountMaster[]>;
    isLoading: Ref<boolean>;
    postMessage: Ref<string>;
}

interface PostAccoutMaster {
    account_data: AccountMaster[]
}

export const master = defineStore({
    id: "accountMaster",
    state: (): AccountMasterState => {
        return {
            accountMaster: ref([]),
            isLoading: ref(true),
            postMessage: ref("")
        };
    },
    getters: {

    },
    actions: {
        async getAccountMastergetFunc() {
            const url = `http://${import.meta.env.VITE_BACKEND_URI}:60001/account_master`
            const response = await axios.get(url)
            this.accountMaster = response.data.account_data
            this.isLoading = false
        },
        async postAccountMasterFunc() {
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
                const url = `http://${import.meta.env.VITE_BACKEND_URI}:60001/account_master`
                const response = await axios.post(url, postAcountMaster)
                this.postMessage = String(response.status)
            } catch (e) {
                if (axios.isAxiosError(e)) {
                    this.postMessage = e.message
                } else {
                    this.postMessage = String(e)
                }
            }
        }
    }
})