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
}

function notSupported(title) {
  const div = document.createElement("div");
  div.innerHTML = `<div>
    <p><code>${title}</code> is not "yet" supported</p>
  </div>`;
  document.body.appendChild(div);
}

function acknowledgeUser(bestMatchSection) {
  const div = document.createElement("div");
  div.innerHTML = `<div>
    <p>Best match section: ${bestMatchSection}</p>
    <p>Cover letter copied to clipboard</p>
  </div>`;
  document.body.appendChild(div);
}

document.getElementById("btn").addEventListener("click", async function () {
  const currentTab = await getCurrentTab();
  // TODO: Fetch base url from local storage (dynamic url based on user's input)
  const baseUrl = "http:/localhost:5000/job-details";
  const jobBoard = "";
  if (currentTab.url.includes("greenhouse")) jobBoard = "greenhouse";

  if (!jobBoard) notSupported(currentTab.title);
  const url = `${baseUrl}/${jobBoard}?url=${currentTab.url}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
  });

  if (response.ok) {
    const data = await response.json();
    // COPY TO CLIPBOARD
    copyToClipboard(data.coverLetter);
    acknowledgeUser(data.bestMatchSection);
  } else {
    console.error("Network response was not ok.");
  }
});
