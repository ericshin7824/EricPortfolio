"use strict";

const menuList = document.getElementById("shin-nav-menu-list");
const menuOverlay = document.getElementById("shin-menu-overlay");
const psToggleMenu = function () {
    menuList.classList.toggle("shin-open");
    menuOverlay.classList.toggle("shin-open");
};

menuOverlay.addEventListener("click", () => {
    menuList.classList.remove("shin-open");
    menuOverlay.classList.remove("shin-open");
});
