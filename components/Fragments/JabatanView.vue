<template lang="">
    <div class="flex flex-col h-[calc(85vh-80px)] relative"> <!-- Tambahkan 'relative' -->
        <div class='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            <div
                v-for="jabatan in paginatedJabatanList"
                :key="jabatan.ID_Jabatan"
                class="w-full flex flex-col bg-white rounded-lg shadow"
            >
                <div class='w-full flex flex-row bg-white px-3 mt-3 space-x-2 items-center'>
                    <div class='p-2 bg-gray-100 rounded-lg'>
                        <font-awesome-icon v-if="isClient" :icon="['fas', 'layer-group']" color="gray" />
                    </div>
                    <p class='text-sm font-semibold'>{{ jabatan.Jabatan }}</p>
                </div>
                <div class='w-full flex flex-col p-3 space-y-2'>
                    <div class='w-full flex flex-row gap-2'>
                        <p class="text-xs font-semibold">Golongan : </p>
                        <p class="text-xs">{{ jabatan.Golongan }}</p>
                    </div>
                    <div class='w-full flex flex-row gap-2'>
                        <p class="text-xs font-semibold">Eselon : </p>
                        <p class="text-xs">{{ jabatan.Eselon }}</p>
                    </div>
                </div>
                <div class='w-full flex flex-row justify-between'>
                    <div class='w-1/2' @click="deleteJabatan(jabatan.ID_Jabatan)">
                        <p class='text-xs font-semibold text-center text-red-600 capitalize tracking-wide border py-2 border-red-500 rounded-bl-md cursor-pointer hover:text-white hover:bg-red-600'>Hapus</p>
                    </div>
                    <div class='w-1/2' @click="openEditModal(jabatan)">
                        <p class='text-xs font-semibold text-center text-blue-600 capitalize tracking-wide border py-2 border-blue-500 rounded-br-md cursor-pointer hover:text-white hover:bg-blue-600'>Edit</p>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Pagination Controls -->
        <div class="absolute bottom-4 right-4 flex space-x-2"> <!-- Tambahkan kelas absolute positioning -->
            <!-- Tombol Previous -->
            <button
                @click="prevPage"
                :disabled="currentPage === 1"
                class="text-sm bg-gray-200 rounded-md px-4 py-2"
            >
                Prev
            </button>
            
            <!-- Nomor Halaman -->
            <button
                v-for="page in totalPages"
                :key="page"
                :class="{'bg-blue-500 text-white': page === currentPage, 'bg-gray-200': page !== currentPage}"
                class="text-sm rounded-md px-4 py-2"
            >
                {{ page }}
            </button>
            
            <!-- Tombol Next -->
            <button
                @click="nextPage"
                :disabled="currentPage === totalPages"
                class="text-sm bg-gray-200 rounded-md px-4 py-2"
            >
                Next
            </button>
        </div>
        <!-- Edit Jabatan Modal -->
    <ModalLayouts v-if="showEditModal" @close="closeEditModal">
      <FormEditJabatan :jabatan="selectedJabatan" @dataSaved="handleDataSaved" />
    </ModalLayouts>
    </div>
</template>


<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { deleteJabatan } from '../../Fetching/jabatan.js';
import FormEditJabatan from '../Fragments/FormEditJabatan.vue'; // Import the FormEditJabatan component
import ModalLayouts from '../Layouts/ModalLayouts.vue';

library.add(faLayerGroup);

export default {
    props: {
        jabatanList: {
            type: Array,
            required: true
        },
    },
    components: {
        FontAwesomeIcon,
        FormEditJabatan,
        ModalLayouts
    },


    data() {
        return {
            isClient: false,
            currentPage: 1, // Halaman saat ini
            pageSize: 8,// Jumlah item per halaman
            selectedJabatan: null, // Store the selected jabatan for editing
            showEditModal: false, // Control the visibility of the modal
        };
    },
    computed: {
        paginatedJabatanList() {
            const start = (this.currentPage - 1) * this.pageSize;
            const end = start + this.pageSize;
            return this.jabatanList.slice(start, end);
        },
        totalPages() {
            return Math.ceil(this.jabatanList.length / this.pageSize);
        }
    },
    mounted() {
        if (process.client) {
            this.isClient = true;
        }
    },
   
    methods: {
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },
        async deleteJabatan(id) {
            try {
                await deleteJabatan(id);
                this.$emit('dataSaved');
            } catch (error) {
                console.error('Error deleting jabatan:', error);
            }
        },
        // Open the modal for editing
        openEditModal(jabatan) {
            this.selectedJabatan = { ...jabatan }; // Create a copy of jabatan for editing
            this.showEditModal = true;
        },
        // Close the modal for editing
        closeEditModal() {
            this.showEditModal = false;
        },
        // Handle the event when data is saved after editing
        handleDataSaved() {
            this.$emit('dataSaved');
            this.showEditModal = false;
        }
    }
};
</script>