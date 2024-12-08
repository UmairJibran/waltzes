const generateCLButton = document.getElementById("btn");

function sanitize(text) {
  return text.replace(/[^a-zA-Z0-9]/g, "_");
}

function getBaseUrl() {
  return localStorage.getItem("host") || "http://localhost:5000";
}

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

function showCoverLetter({ coverLetter, companyName, role, applicantName }) {
  const copyButton = document.createElement("button");
  copyButton.innerHTML = "Copy to Clipboard";
  copyButton.classList.add("btn", "btn-primary", "mt-2");

  const dlButton = document.createElement("button");
  dlButton.innerHTML = "Download as PDF";
  dlButton.classList.add("btn", "btn-primary", "mt-2");

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
  dlButton.onclick = async function () {
    dlButton.disabled = true;
    const baseUrl = getBaseUrl();
    const response = await fetch([baseUrl, "create-pdf"].join("/"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: clArea.value,
        title: [applicantName, companyName].join(" - "),
      }),
      mode: "cors",
    });

    dlButton.disabled = false;
    if (response.ok) {
      const pdfData = await response.arrayBuffer();
      const blob = new Blob([pdfData], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download =
        [
          sanitize(applicantName),
          "cover_letter",
          sanitize(companyName),
          sanitize(role),
        ].join("_") + ".pdf";
      link.download = link.download.replace(/_+/g, "_");
      link.click();
      window.URL.revokeObjectURL(url);
      link.remove();
    } else {
      console.error(`Network response was not ok. Status: ${response.status} ${response.statusText}`);
    }
  };

  const mainDiv = document.getElementById("popup");
  mainDiv.appendChild(copyButton);
  mainDiv.appendChild(dlButton);
  copyButton.id = "copy-button";
  dlButton.id = "download-button";
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
    "download-button",
  ].forEach((id) => {
    const element = document.getElementById(id);
    if (element) element.remove();
  });

  const loader = document.getElementById("loader");
  const customJd = document.getElementById("custom-job-description");
  const baseUrl = [getBaseUrl(), "job-details"].join("/");
  let url = "";
  if (customJd && customJd.value) {
    url = `${baseUrl}/custom-jd`;
  } else {
    const currentTab = await getCurrentTab();
    let jobBoard = "";
    if (currentTab.url.includes("greenhouse")) jobBoard = "greenhouse";
    if (currentTab.url.includes("lever")) jobBoard = "lever";

    if (!jobBoard) {
      jobBoard = "unknown";
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
    const {
      cover_letter: coverLetter,
      company_name: companyName,
      role,
      applicant_name: applicantName,
    } = JSON.parse(data.coverLetter);
    showCoverLetter({ coverLetter, companyName, role, applicantName });
  } else {
    console.error("Network response was not ok.");
  }
});
