const saveButton = document.getElementById("save");

saveButton.addEventListener("click", async function () {
  const host = document.getElementById("host").value;
  const openAiKey = document.getElementById("openAiKey").value;
  localStorage.setItem("host", host);
  localStorage.setItem("openAiKey", openAiKey);
  location.reload();
});

const host = localStorage.getItem("host");
if (host) {
  document.getElementById("host").value = host;
}

const openAiKey = localStorage.getItem("openAiKey");
if (openAiKey) {
  document.getElementById("openAiKey").value = openAiKey;
}
