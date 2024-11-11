<template lang="">
  <div>
    <AdminLayouts>
      <AdminBottom
        :title="'Position Master Data'"
        :titleButton="'Add Positions'"
        :onClick="openModal"
      >
      <JabatanView :jabatanList="jabatanList" @dataSaved="handleDataSaved"/>
      </AdminBottom>
    </AdminLayouts>

    <!-- Modal component with v-if for conditional rendering -->
    <ModalLayouts v-if="showModal" @close="closeModal">
      <FormTambahJabatan @dataSaved="handleDataSaved"/>
    </ModalLayouts>
  </div>
</template>

<script>
import AdminLayouts from '../components/Layouts/AdminLayouts.vue';
import AdminBottom from '../components/Layouts/AdminBottom.vue';
import ModalLayouts from '../components/Layouts/ModalLayouts.vue';
import FormTambahJabatan from '../components/Fragments/FormTambahJabatan.vue';
import JabatanView from '../components/Fragments/JabatanView.vue';
import { fetchJabatan } from '../../Fetching/jabatan.js';

export default {
  components: {
    AdminLayouts,
    AdminBottom,
    ModalLayouts,
    FormTambahJabatan,
    JabatanView
  },
  data() {
    return {
      showModal: false,
      jabatanList: [] // Add a jabatanList to hold the data
    };
  },
  mounted() {
    this.loadJabatanData();
  },
  methods: {
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    async loadJabatanData() {
      try {
        const data = await fetchJabatan();
        this.jabatanList = data; // Update the list with the fetched data
      } catch (error) {
        console.error('Error loading jabatan data:', error);
      }
    },

    handleDataSaved() {
      this.loadJabatanData();
      this.showModal = false;
    }
  }
};
</script>
