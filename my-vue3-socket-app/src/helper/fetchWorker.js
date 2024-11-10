self.onmessage = async (event) => {
    if (event.data.url) {
      try {
        const response = await fetch(event.data.url, event.data.options);
        const data = await response.json();
        postMessage({ success: true, data });
      } catch (error) {
        postMessage({ success: false, error: error.message });
      }
    }
  
    if (event.data === 'close') {
      self.close(); // Close the worker when requested
    }
  };