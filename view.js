(function () {
    var viewNames = ["projects", "certificates"];
    var views = document.querySelectorAll("[data-view]");
    var switches = document.querySelectorAll("[data-view-switch]");

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

        switches.forEach(function (viewSwitch) {
            viewSwitch.hidden = viewSwitch.dataset.viewSwitch === activeView;
        });

        document.title = activeView === "certificates"
            ? "creasac - certifs"
            : "creasac - projects";
    }

    window.addEventListener("hashchange", showView);
    showView();
}());
