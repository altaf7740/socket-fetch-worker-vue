<template>
  <div class="app">
    <h3>Random Data from WebSocket</h3>
    <h2>{{ latestData }}</h2>

    <h3>Fetched Data</h3>
    <button @click="loadData">Fetch Data</button>
    <div v-if="isLoading">Loading...</div>
    <div v-else-if="error">Error: {{ error }}</div>
    <pre v-else>{{ fetchedData }}</pre>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useSocket, useFetch } from './helper';

const { latestData } = useSocket();
const { data: fetchedData, error, isLoading, fetchData } = useFetch();

const loadData = () => {
  fetchData('https://jsonplaceholder.typicode.com/posts/1'); // Trigger fetch when button is clicked
};
</script>

<style scoped>
.app {
  text-align: center;
  padding: 20px;
  font-family: Arial, sans-serif;
}
</style>