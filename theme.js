(function () {
    var storageKey = "theme";
    var root = document.documentElement;
    var query = window.matchMedia("(prefers-color-scheme: dark)");
    var button = null;

    function getStoredTheme() {
        try {
            var theme = localStorage.getItem(storageKey);
            return theme === "light" || theme === "dark" ? theme : null;
        } catch (error) {
            return null;
        }
    }

    function setStoredTheme(theme) {
        try {
            localStorage.setItem(storageKey, theme);
        } catch (error) {
        }
    }

    function getEffectiveTheme() {
        return getStoredTheme() || (query.matches ? "dark" : "light");
    }

    function applyTheme() {
        var storedTheme = getStoredTheme();
        var effectiveTheme = getEffectiveTheme();

        if (storedTheme) {
            root.dataset.theme = storedTheme;
        } else {
            delete root.dataset.theme;
        }

        root.style.colorScheme = effectiveTheme;

        if (button) {
            button.textContent = "theme: " + effectiveTheme;
            button.setAttribute("aria-label", "switch to " + (effectiveTheme === "dark" ? "light" : "dark") + " theme");
        }
    }

    function toggleTheme() {
        setStoredTheme(getEffectiveTheme() === "dark" ? "light" : "dark");
        applyTheme();
    }

    function init() {
        button = document.querySelector("[data-theme-toggle]");
        if (button) {
            button.addEventListener("click", toggleTheme);
        }
        applyTheme();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }

    if (query.addEventListener) {
        query.addEventListener("change", function () {
            if (!getStoredTheme()) {
                applyTheme();
            }
        });
    } else if (query.addListener) {
        query.addListener(function () {
            if (!getStoredTheme()) {
                applyTheme();
            }
        });
    }
}());
