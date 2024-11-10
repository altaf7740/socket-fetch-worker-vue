import { ref, onUnmounted } from 'vue';

let fetchWorker = null; // Declare the worker variable
let workerInitialized = false; // Flag to track worker initialization
const data = ref(null);
const error = ref(null);
const isLoading = ref(false);

function initFetchWorker() {
  if (workerInitialized) return; // Avoid re-initializing the worker if it's already initialized

  if (window.Worker) {
    fetchWorker = new Worker(new URL('./fetchWorker.js', import.meta.url), { type: 'module' });

    fetchWorker.onmessage = (event) => {
      isLoading.value = false;
      if (event.data.success) {
        data.value = event.data.data;
      } else {
        error.value = event.data.error;
      }
    };

    fetchWorker.onerror = (err) => {
      console.error('Fetch Worker error:', err);
      isLoading.value = false;
      error.value = err.message;
    };

    workerInitialized = true; // Mark the worker as initialized
  }
}

function terminateFetchWorker() {
  if (fetchWorker) {
    fetchWorker.terminate();
    fetchWorker = null;
    workerInitialized = false;
  }
}

// Function to call fetch from worker
function fetchData(url, options = {}) {
  if (!workerInitialized) {
    initFetchWorker(); // Initialize worker if it's not initialized
  }

  isLoading.value = true;
  fetchWorker.postMessage({ url, options }); // Send message to worker for API call
}

onUnmounted(() => {
  terminateFetchWorker(); // Cleanup worker when component unmounts
});

export function useFetch() {
  return { data, error, isLoading, fetchData };
}