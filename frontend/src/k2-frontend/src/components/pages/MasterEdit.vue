<script setup lang="ts">
import CalcuParamMaster from '../parts/CalcuParamMaster.vue';
import TableMaster from '../parts/TableAccountMaster.vue';
import MasterCard from '../parts/MasterCard.vue';
import { ref } from 'vue'
import { master } from '../../stores/accountMaster'


const showId = ref<string>()
const calucPramEdit = "calucPramEdit"

const showTable = (id: string) => {

    if (id === master.$id) showId.value = master.$id
    if (id === calucPramEdit) showId.value = calucPramEdit
}

</script>

<template>
    <div class="container mx-auto">
        <div class="flex flex-row space-x-4 space-x overflow-x-auto p-2">
            <div class="py-5">
                <MasterCard :id=master.$id title="勘定科目" @show-table="showTable" />
            </div>
            <div class="py-5">
                <MasterCard :id=calucPramEdit title="口座移動金額自動計算パレメータ編集" @show-table="showTable" />
            </div>
        </div>
        <div class="flex flex-row flex-wrap">
            <div class="p-3 overflow-x-auto">
                <TableMaster v-if="master.$id === showId" />
                <CalcuParamMaster v-else-if="calucPramEdit === showId" />
            </div>
        </div>
    </div>
</template>