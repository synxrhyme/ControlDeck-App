var loader_wrapper = document.getElementById("loader-wrapper")
var loader_left_bg = document.getElementById("loader-section-left")
var loader_right_bg = document.getElementById("loader-section-right")
var loader = document.getElementById("loader")

function init() {
    setTimeout(() => {
        loader_wrapper.classList.add("loaded")
        loader.classList.add("loaded")
        loader_left_bg.classList.add("loaded")
        loader_right_bg.classList.add("loaded")
    }, 50)

    setTimeout(() => {
        loader_wrapper.style.zIndex = 1000
        loader.style.zIndex = 1000
        loader_left_bg.style.zIndex = 1000
        loader_right_bg.style.zIndex = 1000
    }, 700)
}

window.onload = init()