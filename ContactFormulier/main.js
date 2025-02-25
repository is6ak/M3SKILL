document.addEventListener("DOMContentLoaded", function() {
    const logoButton = document.getElementById("topbar-cornerlogo");
    const topBar = document.getElementById("topBar");

    logoButton.addEventListener("click", function() {
        if (topBar.classList.contains("topbar-visible")) {
            logoButton.classList.remove("logoButtonRotateTwo", "rotated");
            logoButton.classList.add("logoButtonRotateOne", "not-rotated");
            topBar.classList.remove("topbar-visible");
            topBar.classList.add("topbar-hidden");
        } else {
            logoButton.classList.remove("logoButtonRotateOne", "not-rotated");
            logoButton.classList.add("logoButtonRotateTwo", "rotated");
            topBar.classList.add("topbar-visible");
            topBar.classList.remove("topbar-hidden");
        }
    });
});
