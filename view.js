(function () {
    var viewNames = ["projects", "certificates"];
    var views = document.querySelectorAll("[data-view]");
    var links = document.querySelectorAll("[data-view-link]");

    function getViewName() {
        var name = window.location.hash.slice(1);
        return viewNames.indexOf(name) === -1 ? "projects" : name;
    }

    function showView() {
        var activeView = getViewName();

        views.forEach(function (view) {
            var isActive = view.dataset.view === activeView;
            view.classList.toggle("active-view", isActive);
            view.hidden = !isActive;
        });

        links.forEach(function (link) {
            if (link.dataset.viewLink === activeView) {
                link.setAttribute("aria-current", "page");
            } else {
                link.removeAttribute("aria-current");
            }
        });

        document.title = activeView === "certificates"
            ? "Creasac - Certificates"
            : "Creasac - Projects";
    }

    window.addEventListener("hashchange", showView);
    showView();
}());
