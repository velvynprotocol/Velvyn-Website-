
const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// Mobile navigation menu
const menuToggle = document.getElementById("menu-toggle");
const siteNav = document.getElementById("site-nav");

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu"
    );
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      siteNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");
    }
  });
}

// Dark and light theme
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const themeColor = document.querySelector('meta[name="theme-color"]');

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;

  const isDark = theme === "dark";

  if (themeIcon) {
    themeIcon.textContent = isDark ? "☼" : "☾";
  }

  if (themeToggle) {
    themeToggle.setAttribute(
      "aria-label",
      isDark ? "Switch to light theme" : "Switch to dark theme"
    );
    themeToggle.title = isDark ? "Switch to light theme" : "Switch to dark theme";
  }

  if (themeColor) {
    themeColor.setAttribute(
      "content",
      isDark ? "#070711" : "#f5f5fc"
    );
  }
}

let savedTheme = "dark";

try {
  const storedTheme = localStorage.getItem("velvyn-theme");

  if (storedTheme === "dark" || storedTheme === "light") {
    savedTheme = storedTheme;
  }
} catch (error) {
  // Continue with the default theme if storage is unavailable.
}

applyTheme(savedTheme);

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const nextTheme =
      document.documentElement.dataset.theme === "dark" ? "light" : "dark";

    applyTheme(nextTheme);

    try {
      localStorage.setItem("velvyn-theme", nextTheme);
    } catch (error) {
      // The theme still works for this page view if storage is unavailable.
    }
  });
}

console.log("Velvyn Protocol website is running!");
// Live Clock & System Status
const liveTime = document.getElementById("live-time");
const liveDate = document.getElementById("live-date");
const liveTimezone = document.getElementById("live-timezone");
const connectionStatus = document.getElementById("connection-status");

function updateLiveClock() {
  const now = new Date();

  if (liveTime) {
    liveTime.textContent = new Intl.DateTimeFormat(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false
    }).format(now);
  }

  if (liveDate) {
    liveDate.textContent = new Intl.DateTimeFormat(undefined, {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    }).format(now);
  }
}

if (liveTimezone) {
  liveTimezone.textContent =
    Intl.DateTimeFormat().resolvedOptions().timeZone || "Unavailable";
}

function updateConnectionStatus() {
  if (connectionStatus) {
    const online = navigator.onLine;
    connectionStatus.textContent = online ? "ONLINE" : "OFFLINE";
    connectionStatus.style.color = online ? "var(--cyan)" : "#ff6b81";
  }
}

updateLiveClock();
setInterval(updateLiveClock, 1000);

updateConnectionStatus();
window.addEventListener("online", updateConnectionStatus);
window.addEventListener("offline", updateConnectionStatus);
