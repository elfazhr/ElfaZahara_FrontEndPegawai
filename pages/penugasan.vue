<template lang="">
  <div>
    <AdminLayouts>
      <AdminBottom
        :title="'Placements Master Data'"
        :titleButton="'Add Placements'"
        :onClick="openModal"
      >
      <PenugasanView :penugasanList="penugasanList" @dataSaved="handleDataSaved"/>
      </AdminBottom>
    </AdminLayouts>

    <!-- Modal component with v-if for conditional rendering -->
    <ModalLayouts v-if="showModal" @close="closeModal">
      <FormTambahPenugasan @dataSaved="handleDataSaved"/>
    </ModalLayouts>
  </div>
</template>

<script>
import AdminLayouts from '../components/Layouts/AdminLayouts.vue';
import AdminBottom from '../components/Layouts/AdminBottom.vue';
import ModalLayouts from '../components/Layouts/ModalLayouts.vue';
import FormTambahPenugasan from '../components/Fragments/FormTambahPenugasan.vue';
import PenugasanView from '../components/Fragments/PenugasanView.vue';
import { fetchPenugasan } from '../../Fetching/penugasan.js';

export default {
  components: {
    AdminLayouts,
    AdminBottom,
    ModalLayouts,
    FormTambahPenugasan,
    PenugasanView
  },
  data() {
    return {
      showModal: false,
      penugasanList: [] 
    };
  },
  mounted() {
    this.loadPenugasanData();
  },
  methods: {
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    async loadPenugasanData() {
      try {
        const data = await fetchPenugasan();
        this.penugasanList = data; // Update the list with the fetched data
      } catch (error) {
        console.error('Error loading penugasan data:', error);
      }
    },
    handleDataSaved() {
      this.loadPenugasanData();
      this.showModal = false;
    }
  }
};
</script>
