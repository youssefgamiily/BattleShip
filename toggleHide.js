const toggleHide = (elemArr) => {
    for (let elem of elemArr) {
        elem.classList.toggle("hide")
    }
}

export {toggleHide}