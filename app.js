var elems = document.getElementsByClassName("skill")
var string = "UI/UX"
var skillsWrapper = document.getElementById("skills-wrapper");
var lastSkill = document.getElementsByClassName("skill end").item(0);
/**
 * @type {HTMLCollectionOf<HTMLImageElement>}
 */
var images = document.getElementsByClassName("im");
var isLargeImageViewOpen = false;
/**
 * @type {HTMLDivElement}
 */
var largImageView = document.getElementsByClassName("large-image-view").item(0)
//# images enlarging feature (experimental)
window.addEventListener("keydown", (ev) => {
    if (ev.key == "Escape") {
        if (isLargeImageViewOpen) {
            closeLargeImageView()
        }
    }
})
function closeLargeImageView() {
    largImageView.classList.remove("open")
    largImageView.innerHTML = ""
    isLargeImageViewOpen = false;
}
largImageView.onclick = (ev) => {
    closeLargeImageView();
}
for (let i = 0; i < images.length; i++) {
    const img = images.item(i);
    img.addEventListener("click", ev => {
        isLargeImageViewOpen = true;

        largImageView.classList.add("open")
        /**
         * @type {HTMLImageElement}
         */
        let imgClone = img.cloneNode()
        imgClone.classList.remove("im")
        imgClone.classList.add("img-clone")
        imgClone.classList.add("exp-enlarged")
        imgClone.addEventListener("click", ev => {
            ev.stopPropagation()
        })


        let largImgWrapper = document.createElement("div")
        largImgWrapper.className = "large-image-wrapper"
        largImgWrapper.appendChild(imgClone)
        largImageView.appendChild(largImgWrapper)
        let closeLargeImageButton = document.createElement("div")
        closeLargeImageButton.className = "image-viewer-button close-large-image-button"
        closeLargeImageButton.addEventListener("click", () => {
            closeLargeImageView();
        })
        closeLargeImageButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/> </svg>'
        let openImageInNewTabButton = document.createElement("div")
        openImageInNewTabButton.className = "image-viewer-button open-image-in-new-tab-button"
        openImageInNewTabButton.addEventListener("click", () => {
            window.open(img.src, "_blank");
        })
        openImageInNewTabButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" class="bi bi-box-arrow-up-right" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5"/><path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z"/></svg>'
        largImgWrapper.appendChild(openImageInNewTabButton)
        largImgWrapper.appendChild(closeLargeImageButton)
        setTimeout(() => {
            largImgWrapper.classList.add("show")

        })

        img.classList.add("exp-enlarged")
    })

}
//# endof images enlarging feature (experimental)

for (var i = 0; i < elems.length; i++) {
    const elem = elems.item(i);
    elem.setst
    if (elem.classList.contains("skill0")) {
        startCsAnimation(elem, 0.85, 1, 0.8);
    }
    else if (elem.classList.contains("skill1")) {
        startCsAnimation(elem, 0.125, 0.8, 0.6);
    }
    else {
        startCsAnimation(elem, 0.45, 0.9, 0.6);
    }
}
/**
 * obsolete (using css animation with a random delay)
 */
function startStrong(elem, freq, max, min) {
    var time = Math.random() * 100;
    var period = 1 / freq;
    setInterval(() => {
        time += 0.016;

        brightness = (((Math.cos(time * freq * 2 * Math.PI) + 1) / 2) * (max - min)) + min;
        elem.style.opacity = brightness

    }, 16);
}
/**
 * @param {HTMLElement} elem 
 */
function reset_animation(elem) {
    elem.style.animation = 'none';
    elem.offsetHeight;
    elem.style.animation = null;
}
/**
 * @param {HTMLElement} elem 
 */
function startCsAnimation(elem, freq, max, min) {
    var period = 1 / freq;
    var time = Math.random() * period;

    brightness = (((Math.cos(-time * freq * 2 * Math.PI) + 1) / 2) * (max - min)) + min;
    elem.style.opacity = brightness
    setTimeout(() => {
        reset_animation(elem);
    }, time * 1000);


}
document.addEventListener('keydown', hndlKeyDown);
/**
 * 
 * @param  {KeyboardEvent} ev 
 */
function hndlKeyDown(ev) {
    if (ev.getModifierState('Control')) return;
    if (string.length && (ev.key === ';' || ev.key === 'Enter')) {
        var newSkill = lastSkill.cloneNode(true);
        lastSkill.classList.remove("end");
        string = ""
        newSkill.innerText = string;
        skillsWrapper.append(newSkill);
        lastSkill = newSkill;
        startStrong(lastSkill, 0.45, 0.9, 0.6);
        ev.preventDefault();
    }
    else if (ev.key == 'Backspace') {
        if (string.length > 0) {
            string = string.slice(0, string.length - 1)
            lastSkill.innerText = string;
            ev.preventDefault();
        }
    }
    else if (ev.key.length == 1 && !ev.key.includes('\n')) {
        string += ev.key
        lastSkill.innerText = string;
        ev.preventDefault();
    }
}
const fadeInSection = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target);
        }
    });
};
const observer = new IntersectionObserver(fadeInSection, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', function () {

    const cardElems = document.getElementsByClassName('experience-card');
    for (let i = 0; i < cardElems.length; i++) {
        const elem = cardElems.item(i);
        observer.observe(elem);
    }
    const projectElems = document.getElementsByClassName('project-item');
    for (let i = 0; i < projectElems.length; i++) {
        const elem = projectElems.item(i);
        observer.observe(elem);
    }
    const linkElems = document.getElementsByClassName('link');
    for (let i = 0; i < linkElems.length; i++) {
        const elem = linkElems.item(i);
        observer.observe(elem);
    }
});