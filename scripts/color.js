"use strict"

let root = document.documentElement;

// Updates the css variable colors of whatever document it is in
function update_colors(color) {
    switch (color) {
        case "default":
            root.style.setProperty('--base-color', "#535353");
            root.style.setProperty('--text-color', "#ffffff");
            break;
        case "dark":
            root.style.setProperty('--base-color', "#dbdbdb");
            root.style.setProperty('--text-color', "#1f1f1f");
            break;
        case "colored":
            break;
    }
}