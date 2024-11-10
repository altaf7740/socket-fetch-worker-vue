import { ref, onMounted, onUnmounted } from 'vue';

const latestData = ref('nnnn');
let worker = null;

function initWorker() {
  if (window.Worker && !worker) {
    // Create the worker using Vite's URL import syntax
    worker = new Worker(new URL('./socketWorker.js', import.meta.url), { type: 'module' });

    worker.onmessage = (event) => {
      latestData.value = `Value: ${event.data.value.toFixed(2)}`;
    };

    worker.onerror = (err) => {
      console.error('Worker error:', err);
    };
  }
}

function terminateWorker() {
  if (worker) {
    worker.postMessage('close');
    worker.terminate();
    worker = null;
  }
}

export function useSocket() {
  onMounted(() => {
    initWorker();
  });

  onUnmounted(() => {
    terminateWorker();
  });

  return { latestData };
}