const chapters = {
  benchmarks: [
    [0, "CartPole balancing"], [10.8, "Ant locomotion"], [21, "Humanoid locomotion"],
    [31.5, "Franka reaching"], [42, "Franka lifting"]
  ],
  variants: [
    [0, "Diagonal CartPole"], [4.3, "Jumping Ant"], [8.3, "Ant rotation"],
    [12.3, "Jumping Humanoid"], [16.3, "Pick-and-place"]
  ]
};
const reels = [...document.querySelectorAll(".reel")];
const selectors = [...document.querySelectorAll("[data-target]")];
const phone = window.matchMedia("(max-width: 760px)");
if (phone.matches && window.matchMedia("(orientation: portrait)").matches) {
  const comparison = document.querySelector("#benchmarks");
  const video = comparison.querySelector("video");
  video.src = "media/benchmarks-portrait.mp4";
  video.poster = "media/benchmarks-portrait.jpg";
  video.classList.add("portrait-cut");
  comparison.querySelector(".video-file").href = video.src;
}
function showReel(id) {
  for (const reel of reels) {
    reel.hidden = reel.id !== id;
    if (reel.hidden) reel.querySelector("video").pause();
  }
  for (const selector of selectors) {
    selector.setAttribute("aria-pressed", String(selector.dataset.target === id));
  }
}
function playAt(reel, seconds) {
  const video = reel.querySelector("video");
  video.currentTime = seconds;
  video.play().catch(() => { video.focus(); });
}
for (const reel of reels) {
  const video = reel.querySelector("video");
  const list = reel.querySelector(".chapters");
  const entries = chapters[reel.id];
  const buttons = entries.map(([seconds, name]) => {
    const button = document.createElement("button");
    button.type = "button";
    const label = document.createElement("span");
    label.textContent = name;
    const time = document.createElement("time");
    time.textContent = "0:" + String(Math.floor(seconds)).padStart(2, "0");
    time.dateTime = "PT" + seconds + "S";
    button.append(label, time);
    button.addEventListener("click", () => {
      playAt(reel, seconds);
      if (phone.matches && video.getBoundingClientRect().top < document.querySelector(".header").offsetHeight) {
        video.scrollIntoView({block: "start"});
      }
    });
    list.append(button);
    return button;
  });
  function markChapter() {
    const now = video.currentTime + 0.04;
    buttons.forEach((button, index) => {
      const active = entries[index][0] <= now && (index + 1 === entries.length || entries[index + 1][0] > now);
      button.setAttribute("aria-current", String(active));
    });
  }
  video.addEventListener("timeupdate", markChapter);
  markChapter();
  list.hidden = false;
}
for (const selector of selectors) {
  selector.addEventListener("click", () => showReel(selector.dataset.target));
}
document.querySelector(".switches").hidden = false;
showReel(location.hash === "#variants" ? "variants" : "benchmarks");
const mdpTabs = document.querySelector(".mdp-tabs");
if (mdpTabs) {
  const panels = [...document.querySelectorAll(".mdp-panel")];
  const tabs = panels.map(panel => {
    const button = document.createElement("button");
    button.type = "button";
    button.id = panel.id + "-tab";
    button.textContent = panel.querySelector("h3").textContent;
    button.setAttribute("role", "tab");
    button.setAttribute("aria-controls", panel.id);
    panel.setAttribute("role", "tabpanel");
    panel.setAttribute("aria-labelledby", button.id);
    panel.tabIndex = 0;
    mdpTabs.append(button);
    return button;
  });
  function selectTask(index) {
    tabs.forEach((button, i) => {
      const selected = i === index;
      button.setAttribute("aria-selected", String(selected));
      button.tabIndex = selected ? 0 : -1;
      panels[i].hidden = !selected;
    });
  }
  tabs.forEach((button, index) => {
    button.addEventListener("click", () => selectTask(index));
    button.addEventListener("keydown", event => {
      const next = {
        ArrowRight: (index + 1) % tabs.length,
        ArrowLeft: (index + tabs.length - 1) % tabs.length,
        Home: 0,
        End: tabs.length - 1
      }[event.key];
      if (next === undefined) return;
      event.preventDefault();
      selectTask(next);
      tabs[next].focus();
    });
  });
  selectTask(0);
  mdpTabs.hidden = false;
}
for (const link of document.querySelectorAll(".rollout-link")) {
  link.addEventListener("click", event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    showReel("benchmarks");
    const reel = document.getElementById("benchmarks");
    reel.querySelector("video").scrollIntoView({block: "start"});
    playAt(reel, Number(link.hash.slice(3)));
  });
}
document.querySelector(".primary").addEventListener("click", event => {
  event.preventDefault();
  const reel = reels.find(item => !item.hidden);
  reel.querySelector("video").scrollIntoView({block: "start"});
  reel.querySelector("video").play().catch(() => reel.querySelector("video").focus());
});
document.querySelector(".hero-shot").addEventListener("click", event => {
  event.preventDefault();
  showReel("variants");
  document.getElementById("demos").scrollIntoView();
  playAt(document.getElementById("variants"), Number(event.currentTarget.dataset.scene));
});

const figureView = document.querySelector(".figure-view");
if (typeof figureView.showModal === "function") {
  const image = figureView.querySelector("img");
  const pan = figureView.querySelector(".figure-pan");
  const zoom = figureView.querySelector(".zoom");
  function sizeFigure(enlarged) {
    pan.classList.toggle("enlarged", enlarged);
    zoom.textContent = enlarged ? "Fit to screen" : "Zoom in";
    pan.scrollTo(0, 0);
  }
  zoom.addEventListener("click", () => sizeFigure(!pan.classList.contains("enlarged")));
  for (const link of document.querySelectorAll(".plot")) {
    const preview = link.querySelector("img");
    const name = link.closest(".result")?.querySelector("h3").textContent || "ARPG framework";
    link.setAttribute("aria-label", "Enlarge figure: " + name);
    link.setAttribute("aria-haspopup", "dialog");
    link.addEventListener("click", event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      image.src = link.href;
      image.alt = preview.alt;
      figureView.querySelector("#figure-name").textContent = name;
      figureView.showModal();
      sizeFigure(phone.matches);
    });
  }
}
