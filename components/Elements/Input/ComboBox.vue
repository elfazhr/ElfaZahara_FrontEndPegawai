<template>
  <div class="relative w-full">
    <div class="relative">
      <select
        v-model="selectedValue"
        @change="handleSelectionChange"
        class="w-full px-4 py-2 pr-8 bg-white border border-gray-300 rounded-lg text-sm shadow-sm appearance-none focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition ease-in-out duration-200"
      >
        <option disabled value="" class="text-sm">
          -- Pilih {{ label }} --
        </option>
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
          class="text-sm"
        >
          {{ option.label }}
        </option>
      </select>

      <!-- Dropdown arrow icon -->
      <div
        class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
      >
        <svg
          class="w-4 h-4 text-gray-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
    </div>

  </div>
</template>

<script>
import api, { buildURL } from "../../../Fetching/api";

export default {
  props: {
    fetchURL: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: "Jabatan",
    },
    initialValue: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      selectedValue: this.initialValue || '',
      options: [],
      
    };
  },
  mounted() {
    this.fetchOptions();
  },
  methods: {
    async fetchOptions() {
      try {
        const response = await api.get(buildURL(this.fetchURL));
        this.options = response.data;
      } catch (error) {
        console.error(`Failed to fetch ${this.label} options:`, error);
      }
    },
    handleSelectionChange() {
      this.$emit("update:selectedValue", this.selectedValue); // Emit the selected value to parent
    },
  },
};
</script>
