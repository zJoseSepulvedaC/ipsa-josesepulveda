<template>
  <div class="search-bar">
    <input
      type="text"
      v-model="searchQuery"
      placeholder="Buscar instrumento..."
      @input="onSearch"
    />
  </div>
</template>

<script>
import { ref } from "vue";
import { useInstrumentsStore } from "../store/useInstrumentsStore";

export default {
  setup() {
    const store = useInstrumentsStore();
    const searchQuery = ref("");

    const onSearch = () => {
      store.searchQuery = searchQuery.value.toLowerCase();
    };

    return { searchQuery, onSearch };
  },
};
</script>

<style scoped>
.search-bar {
  padding: 10px;
  text-align: center;
}
.search-bar input {
  width: 80%;
  padding: 8px;
  font-size: 1rem;
  border-radius: 4px;
  border: 1px solid #ccc;
}
</style>
