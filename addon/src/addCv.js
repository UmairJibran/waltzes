
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    
    form.addEventListener("submit", async (event) => {
      event.preventDefault(); 
  
      const fileInput = document.querySelector("input[type='file']");
      const file = fileInput.files[0];
  
      if (!file) {
        alert("Please select a file to upload.");
        return;
      }
  
      const formData = new FormData();
      formData.append("resume", file);
      const BASE_URL = localStorage.getItem("host") || "http://localhost:5000"
      try {
        const response = await fetch(`${BASE_URL}/upload`, {
          method: "POST",
          body: formData
        });
  
        if (response.ok) {
          alert("File uploaded successfully!");
        } else {
          alert("Failed to upload file.");
        }
      } catch (error) {
        console.error("Error uploading file:", error);
        alert("An error occurred while uploading the file.");
      }
    });
  });
  