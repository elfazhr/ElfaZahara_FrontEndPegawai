<template lang="html">
  <div class="flex-col h-[calc(148vh-80px)] relative">
    <div class="flex flex-row justify-between mb-2">
      <!-- Search -->
      <div class="flex flex-row gap-2">
        <div class="ml-4 py-2 flex items-center gap-2">
          <label for="search" class="text-sm font-semibold block"
            >Search :</label
          >
          <input
            type="text"
            id="search"
            v-model="searchQuery"
            @input="searchEmployees"
            class="border p-1.5 rounded w-64 outline-blue-600 text-sm"
            placeholder="Cari pegawai berdasarkan nama"
          />
        </div>

        <!-- Download Data PDF -->
        <div class="flex items-center">
          <button
            @click="downloadPDF"
            class="px-4 py-1.5 text-sm bg-blue-500 text-white rounded"
          >
            Download Data
          </button>
        </div>
      </div>

      <!-- End Search -->

      <!-- Dropdown filter unit kerja -->
      <div class="px-4 py-2 flex items-center gap-2">
        <label for="unitKerja" class="text-sm font-semibold block"
          >Filter Unit Kerja:</label
        >
        <div>
          <ComboBox
            fetchURL="/penugasanOption"
            label="Penugasan"
            @update:selectedValue="handlePenugasanSelection"
          />
        </div>
      </div>
    </div>

    <div class="overflow-x-auto px-4">
      <table class="min-w-max table-auto">
        <thead class="bg-gray-100">
          <tr>
            <th class="px-4 py-2 border text-left text-sm">No</th>
            <th class="px-4 py-2 border text-left text-sm">Foto</th>
            <th class="px-4 py-2 border text-left text-sm">NIP</th>
            <th class="px-4 py-2 border text-left text-sm">Nama</th>
            <th class="px-4 py-2 border text-left text-sm">Alamat</th>
            <th class="px-4 py-2 border text-left text-sm">Jenis Kelamin</th>
            <th class="px-4 py-2 border text-left text-sm">Tempat Lahir</th>
            <th class="px-4 py-2 border text-left text-sm">Tanggal Lahir</th>
            <th class="px-4 py-2 border text-left text-sm">Agama</th>
            <th class="px-4 py-2 border text-left text-sm">NPWP</th>
            <th class="px-4 py-2 border text-left text-sm">Jabatan</th>
            <th class="px-4 py-2 border text-left text-sm">Golongan</th>
            <th class="px-4 py-2 border text-left text-sm">Eselon</th>
            <th class="px-4 py-2 border text-left text-sm">Tempat Tugas</th>
            <th class="px-4 py-2 border text-left text-sm">Unit Kerja</th>
            <th class="px-4 py-2 border text-left text-sm">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(pegawai, index) in paginatedPegawaiList" :key="index">
            <td class="px-4 py-2 border text-sm">
              {{ (currentPage - 1) * pageSize + index + 1 }}
            </td>
            <td class="px-4 py-2 border text-sm">
              <img
                class="w-10 h-10 rounded-full"
                :src="pegawai.Foto"
                alt="Foto Pegawai"
              />
            </td>
            <td class="px-4 py-2 border text-sm">{{ pegawai.NIP }}</td>
            <td class="px-4 py-2 border text-sm">{{ pegawai.Nama }}</td>
            <td class="px-4 py-2 border text-sm">{{ pegawai.Alamat }}</td>
            <td class="px-4 py-2 border text-sm">
              {{ pegawai.Jenis_Kelamin }}
            </td>
            <td class="px-4 py-2 border text-sm">{{ pegawai.Tempat_Lahir }}</td>
            <td class="px-4 py-2 border text-sm">
              {{ pegawai.Tanggal_Lahir }}
            </td>
            <td class="px-4 py-2 border text-sm">{{ pegawai.Agama }}</td>
            <td class="px-4 py-2 border text-sm">{{ pegawai.NPWP }}</td>
            <td class="px-4 py-2 border text-sm">{{ pegawai.Jabatan }}</td>
            <td class="px-4 py-2 border text-sm">{{ pegawai.Golongan }}</td>
            <td class="px-4 py-2 border text-sm">{{ pegawai.Eselon }}</td>
            <td class="px-4 py-2 border text-sm">{{ pegawai.Tempat_Tugas }}</td>
            <td class="px-4 py-2 border text-sm">{{ pegawai.Unit_Kerja }}</td>

            <td class="px-4 py-2 border text-sm">
              <button
                @click="openEditModal(pegawai)"
                class="text-blue-500 hover:underline"
              >
                Edit
              </button>
              <button
                @click="deletePegawaiID(pegawai.NIP)"
                class="text-red-500 hover:underline ml-2"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination Controls -->
    <div class="absolute bottom-0 right-4 flex space-x-2">
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
        :class="{
          'bg-blue-500 text-white': page === currentPage,
          'bg-gray-200': page !== currentPage,
        }"
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
      <FormEditPegawai
        :pegawai="selectedPegawai"
        @dataSaved="handleDataSaved"
      />
    </ModalLayouts>
  </div>
</template>
<script>
import { deletePegawai } from "../../Fetching/pegawai";
import ComboBox from "../Elements/Input/ComboBox.vue";
import FormEditPegawai from "../Fragments/FormEditPegawai.vue"; // Import the FormEditJabatan component
import ModalLayouts from "../Layouts/ModalLayouts.vue";
import jsPDF from "jspdf";
import "jspdf-autotable";
export default {
  components: {
    ComboBox,
    FormEditPegawai,
    ModalLayouts,
  },
  props: {
    employeeList: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      selectedUnitKerja: "",
      selectedPegawai: null,
      searchQuery: "", // Store the search term
      filteredEmployeeListData: [], // Tempat penyimpanan utama hasil filter
      showEditModal: false, // Control the visibility of the modal
    };
  },
  computed: {
    // Computed property for filtered employee list based on searchQuery
    filteredEmployeeList() {
      if (!this.searchQuery) {
        return this.employeeList;
      }
      return this.employeeList.filter((employee) =>
        employee.Nama.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    paginatedPegawaiList() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.filteredEmployeeList.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.filteredEmployeeList.length / this.pageSize);
    },
  },
  watch: {
    selectedUnitKerja(newValue) {
      this.fetchPegawaiByUnitKerja(newValue);
    },
  },

  methods: {
    searchEmployees() {
      // Panggil API untuk memfilter pegawai berdasarkan pencarian
      this.$emit("search", this.searchQuery); // Kirim pencarian ke parent atau langsung fetch data
    },
    handlePenugasanSelection(selected) {
      this.selectedUnitKerja = selected;
      this.$emit("unitKerjaChanged", selected);
    },
    fetchPegawaiByUnitKerja() {
      // Filter data berdasarkan selectedUnitKerja dan simpan di filteredEmployeeListData
      if (this.selectedUnitKerja) {
        this.filteredEmployeeListData = this.employeeList.filter(
          (pegawai) => pegawai.Unit_Kerja === this.selectedUnitKerja
        );
      } else {
        this.filteredEmployeeListData = [...this.employeeList];
      }
      this.$emit("dataSaved");
    },

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
  
    async deletePegawaiID(nip) {
      try {
        await deletePegawai(nip);
        this.$emit("dataSaved");
      } catch (error) {
        console.error("Error deleting penugasan:", error);
      }
    },
    downloadPDF() {
      const doc = new jsPDF("landscape");
      const data = this.filteredEmployeeList;

      // Define columns and rows for the PDF table
      const columns = [
        { header: "No", dataKey: "no" },
        { header: "NIP", dataKey: "NIP" },
        { header: "Nama", dataKey: "Nama" },
        { header: "Alamat", dataKey: "Alamat" },
        { header: "Jenis Kelamin", dataKey: "Jenis_Kelamin" },
        { header: "Tempat Lahir", dataKey: "Tempat_Lahir" },
        { header: "Tanggal Lahir", dataKey: "Tanggal_Lahir" },
        { header: "Agama", dataKey: "Agama" },
        { header: "NPWP", dataKey: "NPWP" },
        { header: "Jabatan", dataKey: "Jabatan" },
        { header: "Golongan", dataKey: "Golongan" },
        { header: "Eselon", dataKey: "Eselon" },
        { header: "Tempat Tugas", dataKey: "Tempat_Tugas" },
        { header: "Unit Kerja", dataKey: "Unit_Kerja" },
      ];

      // Map the data to fit the table structure
      const rows = data.map((pegawai, index) => ({
        no: (this.currentPage - 1) * this.pageSize + index + 1,
        ...pegawai,
      }));

      // Add title to the PDF
      doc.text("Data Pegawai", 14, 10);
      // Generate the table in the PDF
      doc.autoTable({
        columns: columns,
        body: rows,
        startY: 20,
        theme: "striped",
        headStyles: { fillColor: [22, 160, 133] },
        styles: { fontSize: 8 },
        margin: { top: 10, left: 10, right: 10 },
        didDrawCell: (data) => {
          if (data.column.dataKey === "Foto" && data.row.raw.Foto) {
            // Menambahkan foto jika data tersedia
            const imgUrl = data.row.raw.Foto;
            doc.addImage(
              imgUrl,
              "JPEG",
              data.cell.x + 2,
              data.cell.y + 2,
              10,
              10
            );
          }
        },
      });

      // Save the PDF
      doc.save("Data_Pegawai.pdf");
    },
    openEditModal(pegawai) {
      this.selectedPegawai = { ...pegawai }; // Create a copy of jabatan for editing
      this.showEditModal = true;
    },
    // Close the modal for editing
    closeEditModal() {
      this.showEditModal = false;
    },
    // Handle the event when data is saved after editing
    handleDataSaved() {
      this.$emit("dataSaved");
      this.showEditModal = false;
    },
  },
};
</script>
