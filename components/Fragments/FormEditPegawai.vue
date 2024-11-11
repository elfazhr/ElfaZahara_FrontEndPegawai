<template lang="">
  <div class="flex flex-col w-full">
    <div
      class="flex items-center justify-between p-4 md:p-5 border-b rounded-t"
    >
      <h3 class="text-lg font-semibold text-gray-900 uppercase">
        Form Edit Data Pegawai
      </h3>
    </div>
    <form class="p-5 flex flex-row gap-4" @submit.prevent="updatePegawai">
      <div class="w-full space-y-4">
        <!-- Image Preview Section -->
        <div
          class="h-[200px] w-full bg-gray-100 rounded-md flex items-center justify-center relative"
        >
          <div
            v-if="Gambar"
            @click="deleteGambar"
            class="absolute top-2 right-2 px-4 py-2 rounded-md bg-red-100 cursor-pointer hover:bg-red-300"
          >
            <font-awesome-icon :icon="['fas', 'trash']" :color="'gray'" />
          </div>
          <div v-if="Gambar" class="h-full w-full">
            <img
              :src="Gambar"
              alt="Preview Gambar"
              class="h-full w-full object-cover rounded-md"
            />
          </div>
          <div v-else class="border-2 border-gray-400 rounded-md px-4 py-2">
            <label :for="'Gambar'" class="cursor-pointer">
              <input
                :type="'file'"
                :id="'Gambar'"
                :name="'Gambar'"
                :accept="'image/jpg, image/jpeg, image/png'"
                class="hidden"
                @change="handleGambarChange"
              />
              <font-awesome-icon :icon="['fas', 'fa-image']" :color="'gray'" />
            </label>
          </div>
        </div>

        <InputForm
          :type="'text'"
          :name="'NIP'"
          :placeholder="'Masukkan NIP'"
          :judulLabel="'NIP'"
          :value="NIP"
          :onChange="handleInputChange"
        >
          <p class="text-red-600 text-xs">*</p>
        </InputForm>
        <InputForm
          :type="'text'"
          :name="'Nama'"
          :placeholder="'Masukkan Nama'"
          :judulLabel="'Nama'"
          :value="Nama"
          :onChange="handleInputChange"
        >
          <p class="text-red-600 text-xs">*</p>
        </InputForm>
        <InputForm
          :type="'text'"
          :name="'Tempat_Lahir'"
          :placeholder="'Masukkan Tempat Lahir'"
          :judulLabel="'Tempat Lahir'"
          :value="Tempat_Lahir"
          :onChange="handleInputChange"
        >
          <p class="text-red-600 text-xs">*</p>
        </InputForm>
        <InputForm
          :type="'date'"
          :name="'Tanggal_Lahir'"
          :placeholder="'Masukkan Tanggal Lahir'"
          :judulLabel="'Tanggal Lahir'"
          :value="Tanggal_Lahir"
          :onChange="handleInputChange"
        >
          <p class="text-red-600 text-xs">*</p>
        </InputForm>
      </div>
      <div class="w-full space-y-6">
        <InputForm
          :type="'text'"
          :name="'Alamat'"
          :placeholder="'Masukkan Alamat'"
          :judulLabel="'Alamat'"
          :value="Alamat"
          :onChange="handleInputChange"
        >
          <p class="text-red-600 text-xs">*</p>
        </InputForm>
        <Label :name="'Jenis_Kelamin'"
          >Jenis Kelamin <span class="text-red-600">*</span></Label
        >
        <RadioButton v-model="Jenis_Kelamin" />
        <InputForm
          :type="'text'"
          :name="'Agama'"
          :placeholder="'Masukkan Agama'"
          :judulLabel="'Agama'"
          :value="Agama"
          :onChange="handleInputChange"
        >
          <p class="text-red-600 text-xs">*</p>
        </InputForm>
        <InputForm
          :type="'text'"
          :name="'NPWP'"
          :placeholder="'Masukkan NPWP'"
          :judulLabel="'NPWP'"
          :value="NPWP"
          :onChange="handleInputChange"
        >
          <p class="text-red-600 text-xs">*</p>
        </InputForm>
        <div>
          <Label :name="'Jabatan'"
            >Jabatan <span class="text-red-600">*</span></Label
          >
          <ComboBox
            :fetchURL="'/jabatanOption'"
            label="Jabatan"
            :initialValue="pegawai.ID_Jabatan"
            @update:selectedValue="handleJabatanSelection"
          />
        </div>

        <div>
          <Label :name="'Penugasan'"
            >Penugasan <span class="text-red-600">*</span></Label
          >
          <ComboBox
            fetchURL="/penugasanOption"
            :initialValue="pegawai.ID_Penugasan"
            label="Penugasan"
            @update:selectedValue="handlePenugasanSelection"
          />
        </div>

        <div class="w-full flex justify-end mt-8">
          <Button
            :bgColor="'h-9 px-6 font-normal text-sm bg-blue-600 hover:bg-blue-800 transition-colors'"
            :type="'submit'"
          >
            Simpan
          </Button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import InputForm from "../Elements/Input/InputForm.vue";
import Button from "../Elements/Button/index.vue";
import Label from "../Elements/Input/Label.vue";
import { updatePegawai } from "../../Fetching/pegawai.js";
import RadioButton from "../Elements/Input/RadioButton.vue";
import ComboBox from "../Elements/Input/ComboBox.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faImage, faTrash } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import api, { buildURL } from "../../../Fetching/api";
import Swal from "sweetalert2"; // Import SweetAlert2
library.add(faImage, faTrash);

export default {
  components: {
    InputForm,
    Button,
    FontAwesomeIcon,
    RadioButton,
    Label,
    ComboBox,
  },
  props: {
    pegawai: Object, // Receive jabatan data for editing
  },
  data() {
    return {
      NIP: this.pegawai.NIP,
      Nama: this.pegawai.Nama,
      Tempat_Lahir: this.pegawai.Tempat_Lahir,
      Tanggal_Lahir: this.pegawai.Tanggal_Lahir,
      Alamat: this.pegawai.Alamat,
      Jenis_Kelamin: this.pegawai.Jenis_Kelamin,
      Agama: this.pegawai.Agama,
      NPWP: this.pegawai.NPWP,
      Foto: this.pegawai.Foto,
      Jabatan: this.pegawai.ID_Jabatan,
      Penugasan: this.pegawai.ID_Penugasan,
      Gambar: this.pegawai.Foto, // Store the base64 image data
    };
  },
  mounted() {
    if (process.client) {
      this.isClient = true; // Menandakan bahwa kita di sisi klien
    }
  },
  methods: {
    handleJabatanSelection(selected) {
      this.Jabatan = selected; // Simpan data jabatan pada state
    },

    handlePenugasanSelection(selected) {
      this.Penugasan = selected;
    },
    handleInputChange(event) {
      const { name, value } = event.target;
      this[name] = value;
    },
    handleGambarChange(event) {
      const file = event.target.files[0];
      if (file && file.size <= 2 * 1024 * 1024) {
        this.Foto = file;
        const reader = new FileReader();
        reader.onload = (e) => {
          this.Gambar = e.target.result; // Store the base64 image data
        };
        reader.readAsDataURL(file);
      } else if (file && file.size > 2 * 1024 * 1024) {
        Swal.fire({
          title: "Warning!",
          icon: "warning",
          text: "Ukuran gambar tidak boleh lebih dari 2 MB",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    },
    deleteGambar() {
      if (!this.Gambar) {
        Swal.fire(
          "Error",
          "Pilih gambar terlebih dahulu sebelum menghapus",
          "error"
        );
      } else {
        Swal.fire({
          title: "Yakin ingin menghapus gambar?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          confirmButtonText: "Hapus",
        }).then((result) => {
          if (result.isConfirmed) {
            this.Gambar = ""; // Menghapus gambar yang sudah dipilih
          }
        });
      }
    },

    async updatePegawai() {
      if (
        !this.NIP ||
        !this.Nama ||
        !this.Tempat_Lahir ||
        !this.Tanggal_Lahir ||
        !this.Alamat ||
        !this.Jenis_Kelamin ||
        !this.Agama ||
        !this.NPWP ||
        !this.Jabatan ||
        !this.Penugasan ||
        !this.Foto
      ) {
        Swal.fire({
          icon: "error",
          title: "Data Tidak Boleh Kosong",
          text: "Mohon lengkapi semua data",
          showConfirmButton: false,
          timer: 1500,
        });
        return;
      }

      try {
        // Menambahkan data pegawai
        // Siapkan data form
        const formData = new FormData();
        formData.append("NIP", this.NIP);
        formData.append("Nama", this.Nama);
        formData.append("Tempat_Lahir", this.Tempat_Lahir);
        formData.append("Tanggal_Lahir", this.Tanggal_Lahir);
        formData.append("Alamat", this.Alamat);
        formData.append("Jenis_Kelamin", this.Jenis_Kelamin);
        formData.append("Agama", this.Agama);
        formData.append("NPWP", this.NPWP);
        formData.append("Foto", this.Foto);
        formData.append("_method", "PUT");

        // Kirim data pegawai ke API
        const pegawaiResponse = await updatePegawai({
          NIP: this.NIP,
          updatedData: formData,
        });
        // Jika pegawai berhasil ditambahkan, tambahkan jabatan dan unit kerja
      } catch (error) {
        console.error("Error submitting form:", error);
        Swal.fire("Error", "Terjadi kesalahan saat menyimpan data", "error");
      }
    },

    clearForm() {

      this.jabatan.Jabatan = "";
      this.jabatan.Golongan = "";
      this.jabatan.Eselon = "";
    },

    closeModal() {
      this.$emit("close"); // Close the modal or trigger any other required action
    },
  },
};
</script>
