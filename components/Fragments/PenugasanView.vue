<template lang="">
    <div class="flex flex-col h-[calc(85vh-80px)] relative"> 
        <div class='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            <div
                v-for="penugasan in paginatedPenugasanList"
                :key="penugasan.ID_Penugasan"
                class="w-full flex flex-col bg-white rounded-lg shadow"
            >
                <div class='w-full flex flex-row bg-white px-3 mt-3 space-x-2 items-center'>
                    <div class='p-2 bg-gray-100 rounded-lg'>
                        <font-awesome-icon v-if="isClient" :icon="['fas', 'layer-group']" color="gray" />
                    </div>
                    <p class='text-sm font-semibold'>{{ penugasan.Tempat_Tugas }}</p>
                </div>
                <div class='w-full flex flex-col p-3'>
                    <div class='w-full flex flex-row gap-2'>
                        <p class="text-xs font-semibold">Unit Kerja : </p>
                        <p class="text-xs">{{ penugasan.Unit_Kerja }}</p>
                    </div>
                </div>
                <div class='w-full flex flex-row justify-between'>
                    <div class='w-1/2' @click="deletePenugasan(penugasan.ID_Penugasan)">
                        <p class='text-xs font-semibold text-center text-red-600 capitalize tracking-wide border py-2 border-red-500 rounded-bl-md cursor-pointer hover:text-white hover:bg-red-600'>Hapus</p>
                    </div>
                    <div class='w-1/2' @click="openEditModal(penugasan)">
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
    <ModalLayouts v-if="showEditModal" @close="closeEditModal">
      <FormEditPenugasan :penugasan="selectedPenugasan" @dataSaved="handleDataSaved" />
    </ModalLayouts>
    </div>
</template>


<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { deletePenugasan } from '../../Fetching/penugasan.js';
import FormEditPenugasan from '../Fragments/FormEditPenugasan.vue'; // Import the FormEditJabatan component
import ModalLayouts from '../Layouts/ModalLayouts.vue';

library.add(faLayerGroup);

export default {
    props: {
        penugasanList: {
            type: Array,
            required: true
        },
    },
    components: {
        FontAwesomeIcon,
        FormEditPenugasan,
        ModalLayouts
    },


    data() {
        return {
            isClient: false,
            currentPage: 1, // Halaman saat ini
            pageSize: 8,// Jumlah item per halaman
            selectedPenugasan: null, 
            showEditModal: false, 
        };
    },
    computed: {
        paginatedPenugasanList() {
            const start = (this.currentPage - 1) * this.pageSize;
            const end = start + this.pageSize;
            return this.penugasanList.slice(start, end);
        },
        totalPages() {
            return Math.ceil(this.penugasanList.length / this.pageSize);
        }
    },
    mounted() {
        if (process.client) {
            this.isClient = true;
        }
        // this.intervalId = setInterval(() => {
        //     this.loadJabatanData();
        // }, 10000);
    },
    // beforeDestroy() {
    //     if (this.intervalId) {
    //         clearInterval(this.intervalId);
    //     }
    // },
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
        async deletePenugasan(id) {
            try {
                await deletePenugasan(id);
                this.$emit('dataSaved');
            } catch (error) {
                console.error('Error deleting penugasan:', error);
            }
        },
        // Open the modal for editing
        openEditModal(penugasan) {
            this.selectedPenugasan = { ...penugasan }; 
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
