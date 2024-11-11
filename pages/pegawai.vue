<template lang="">
  <div>
    <AdminLayouts>
      <AdminBottom
        :title="'Employee Management Data'"
        :titleButton="'Add Employee'"
        :onClick="openModal"
      >
      <PegawaiView :employeeList="employeeList" @dataSaved="handleDataSaved" @unitKerjaChanged="handleUnitKerjaChanged" @searchQuery="handleSearchQuery"/>
      </AdminBottom>
    </AdminLayouts>

    <!-- Modal component with v-if for conditional rendering -->
    <ModalLayouts v-if="showModal" @close="closeModal">
      <FormTambahPegawai @dataSaved="handleDataSaved"/>
    </ModalLayouts>
  </div>
</template>

<script>
import AdminLayouts from '../components/Layouts/AdminLayouts.vue';
import AdminBottom from '../components/Layouts/AdminBottom.vue';
import ModalLayouts from '../components/Layouts/ModalLayouts.vue';
import FormTambahPegawai from '../components/Fragments/FormTambahPegawai.vue';
import PegawaiView from '../components/Fragments/PegawaiView.vue';
import { fetchPegawai } from '../../Fetching/pegawai.js';

export default {
  components: {
    AdminLayouts,
    AdminBottom,
    ModalLayouts,
    FormTambahPegawai,
    PegawaiView
  },
  data() {
    return {
      showModal: false,
      employeeList: [],
      selectedUnitKerja: ""  // Add a data property to hold the selected Unit_Kerja
      , searchQuery: ""
    };
  },
  mounted() {
    this.loadPegawaiData();
  },
  methods: {
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    async loadPegawaiData(IDPenugasan = this.selectedUnitKerja, searchQuery = this.searchQuery) {
      try {
        const response = await fetchPegawai(IDPenugasan, searchQuery);      
        this.employeeList = response.data;
        console.log(response);
      } catch (error) {
        console.error('Error loading pegawai data:', error);
      }
    },
    handleDataSaved() {
      this.loadPegawaiData()
      this.showModal = false;
    },
    handleUnitKerjaChanged(unitKerja) {
  
      this.selectedUnitKerja = unitKerja;
      console.log('Selected Unit Kerja:', unitKerja);
    
    },
    handleSearchQuery(searchQuery) {
      this.searchQuery = searchQuery;
      console.log('Search Query:', searchQuery);
 
    },
  }
};
</script>
