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
  div.innerHTML = `<div class="mt-2">
    <small><code>Coppied to your clipboard</code></small>
  </div>`;

  const mainDiv = document.getElementById("popup");
  mainDiv.appendChild(div);
}

function notSupported(title, url) {
  const div = document.createElement("div");
  div.innerHTML = `<div class="mt-2">
    <p><code>${title}</code> is not <em>yet</em> supported</p>
    <a href="https://github.com/UmairJibran/waltzes/issues/new?title=${title}&body=${url}" target="_blank">Request support</a>
  </div>`;
  const mainDiv = document.getElementById("popup");
  mainDiv.appendChild(div);
}

function acknowledgeUser(bestMatchSection) {
  const div = document.createElement("div");
  div.innerHTML = `<div class="mt-2">
    <p>Cover Letter created based on: <span class="font-monospace">${bestMatchSection}</span></p>
  </div>`;

  const mainDiv = document.getElementById("popup");
  mainDiv.appendChild(div);
}

function showCoverLetter(coverLetter) {
  const div = document.createElement("div");
  div.innerHTML = `<div class="mt-2">
    <p>Cover Letter:</p>
    <p class="font-monospace">${coverLetter}</p>
  </div>`;
  const mainDiv = document.getElementById("popup");
  mainDiv.appendChild(div);
}

generateCLButton.addEventListener("click", async function () {
  const loader = document.getElementById("loader");
  const currentTab = await getCurrentTab();
  // TODO: Fetch base url from local storage (dynamic url based on user's input)
  const baseUrl = "http:/localhost:5000/job-details";
  let jobBoard = "";
  if (currentTab.url.includes("greenhouse")) jobBoard = "greenhouse";

  if (!jobBoard) {
    notSupported(currentTab.title, currentTab.url);
    return;
  }
  const url = `${baseUrl}/${jobBoard}?url=${currentTab.url}`;

  generateCLButton.disabled = true;
  loader.hidden = false;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
  });

  generateCLButton.disabled = false;
  loader.hidden = true;
  if (response.ok) {
    const data = await response.json();
    // COPY TO CLIPBOARD
    acknowledgeUser(data.bestMatchSection);
    showCoverLetter(data.coverLetter);
    copyToClipboard(data.coverLetter);
  } else {
    console.error("Network response was not ok.");
  }
});
