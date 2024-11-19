const generateCLButton = document.getElementById("btn");

async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

function copyToClipboard(text) {
  const copyText = document.createElement("textarea");
  copyText.value = text;
  document.body.appendChild(copyText);
  copyText.select();
  document.execCommand("copy");
  document.body.removeChild(copyText);

  const div = document.createElement("div");
  div.id = "copied";
  div.innerHTML = `<div class="mt-2">
    <small><code>Copied to your clipboard</code></small>
  </div>`;

  const mainDiv = document.getElementById("popup");
  mainDiv.appendChild(div);
}

function notSupported(title, url) {
  const div = document.createElement("div");
  div.id = "not-supported";
  div.innerHTML = `<div class="mt-2">
    <p><code>${title}</code> is not <em>yet</em> supported</p>
    <a href="https://github.com/UmairJibran/waltzes/issues/new?title=${title}&body=${url}" target="_blank">Request support</a>
  </div>`;
  const mainDiv = document.getElementById("popup");
  mainDiv.appendChild(div);
}

function acknowledgeUser(bestMatchSection) {
  const div = document.createElement("div");
  div.id = "acknowledgement";
  div.innerHTML = `<div class="mt-2">
    <p>Cover Letter created based on: <span class="font-monospace">${bestMatchSection}</span></p>
  </div>`;

  const mainDiv = document.getElementById("popup");
  mainDiv.appendChild(div);
}

function showCoverLetter(coverLetter) {
  const copyButton = document.createElement("button");
  copyButton.innerHTML = "Copy to Clipboard";
  copyButton.classList.add("btn", "btn-primary", "mt-2");
  const div = document.createElement("div");
  div.innerHTML = `<div class="mt-2">
    <p>Cover Letter:</p>
  </div>`;

  const clArea = document.createElement("textarea");
  clArea.value = coverLetter;
  clArea.rows = 10;
  clArea.style.width = "100%";
  clArea.style.resize = "none";
  copyButton.onclick = function () {
    copyToClipboard(clArea.value);
  };

  const mainDiv = document.getElementById("popup");
  mainDiv.appendChild(copyButton);
  copyButton.id = "copy-button";
  mainDiv.appendChild(div);
  div.id = "cover-letter";
  mainDiv.appendChild(clArea);
  clArea.id = "cl-area";
}

generateCLButton.addEventListener("click", async function () {
  [
    "not-supported",
    "acknowledgement",
    "cover-letter",
    "copy-button",
    "cl-area",
    "copied",
  ].forEach((id) => {
    const element = document.getElementById(id);
    if (element) element.remove();
  });

  const loader = document.getElementById("loader");
  const customJd = document.getElementById("custom-job-description");
  const savedHost = localStorage.getItem("host") || "http://localhost:5000";
  const baseUrl = [savedHost, "job-details"].join("/");
  let url = "";
  if (customJd && customJd.value) {
    url = `${baseUrl}/custom-jd`;
  } else {
    const currentTab = await getCurrentTab();
    let jobBoard = "";
    if (currentTab.url.includes("greenhouse")) jobBoard = "greenhouse";
    if (currentTab.url.includes("lever")) jobBoard = "lever";

    if (!jobBoard) {
      notSupported(currentTab.title, currentTab.url);
      return;
    }
    url = `${baseUrl}/${jobBoard}?url=${currentTab.url}`;
  }

  const openAiKey = localStorage.getItem("openAiKey");
  if (openAiKey) url += `&openAiKey=${openAiKey}`;

  generateCLButton.disabled = true;
  loader.hidden = false;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...(customJd && { customJd: customJd.value }),
    }),
    mode: "cors",
  });

  generateCLButton.disabled = false;
  loader.hidden = true;
  if (response.ok) {
    const data = await response.json();
    acknowledgeUser(data.bestMatchSection);
    showCoverLetter(data.coverLetter);
  } else {
    console.error("Network response was not ok.");
  }
});
