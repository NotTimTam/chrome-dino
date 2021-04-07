"use strict"

let colors = {
    colorBank: {
        "default": {
            primary: "#ffffff",
            secondary: "#535353",
        },
        night: {
            primary: "#535353",
            secondary: "#ffffff",
        },
        color: {
            primary: "#ff00aa",
            secondary: "#aa00ff",
        },
    },

    update_document: function (theme) {
        let root = document.documentElement;
        switch (theme) {
            case "default":
                root.style.setProperty('--base-color', colors.colorBank["default"].primary);
                root.style.setProperty('--text-color', colors.colorBank["default"].secondary);
                break;
            case "night":
                root.style.setProperty('--base-color', colors.colorBank.night.primary);
                root.style.setProperty('--text-color', colors.colorBank.night.secondary);
                break;
            case "colored":
                break;
            default: break;
        }
    }
}


// Updates the css variable colors of whatever document it is in
function update_colors(color) {
    
}