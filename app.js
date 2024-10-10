


import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getFirestore, doc, setDoc, addDoc, collection, serverTimestamp, deleteDoc } from "https://www.gstatic.com/firebasejs/10.14/firebase-firestore.js";


var elems = document.getElementsByClassName("skill")
var string = "UI/UX"
var skillsWrapper = document.getElementById("skills-wrapper");
var lastSkill = document.getElementsByClassName("skill end").item(0);
const sendMessageForm = document.getElementById("send-message")
const sendButton = document.getElementById("send-button")
const messageCard = document.getElementById("message-card")
const mainButtonIcon = document.getElementById("main-button-icon")
const closeMessageCardButton = document.getElementById("closeBtn")
const emailInput = document.getElementById("email-input")
const messageSent = document.getElementById("message-sent")
const sendingMessageDiv = document.getElementById("sending-message")
const messageNotSentDiv = document.getElementById("not-sent")

setVisibility(sendingMessageDiv, false);
sendingMessageDiv.classList.toggle("initHide", false)
setVisibility(sendMessageForm, true)
setVisibility(messageNotSentDiv, false)
setVisibility(messageSent, false)
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

        let brightness = (((Math.cos(time * freq * 2 * Math.PI) + 1) / 2) * (max - min)) + min;
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

    let brightness = (((Math.cos(-time * freq * 2 * Math.PI) + 1) / 2) * (max - min)) + min;
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

var isSendingMessage = false;
var isSendMessageCardOpen = false;

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



    sendMessageForm.addEventListener("submit", async function (ev) {

        ev.preventDefault();
        var msg = getCurrentFormMessage()

        //# validating input

        if (!msg.email) {

            //todo highlight missing field
            return
        }
        if (!msg.message) {
            //todo highlight missing field
            return
        }
        //# submit
        try {
            setVisibility(sendingMessageDiv, true);
            setVisibility(mainButtonIcon, false);
            sendButton.classList.toggle("force-active", true)
            isSendingMessage = true
            await submitMessage(msg.email, msg.message)

            setVisibility(messageSent, true)
        } catch (error) {
            setVisibility(messageNotSentDiv, true)
            setVisibility(sendMessageForm, false)
            isInRetryMode = true;
            console.error(error)
            return;
        }
        finally {
            sendButton.classList.toggle("force-active", false)

            isSendingMessage = false;
            setVisibility(sendingMessageDiv, false);
            setVisibility(mainButtonIcon, true);
        }
        console.log("submit msg:", msg)
        clearForm()
        showMessageSentAnimation()

    })
    sendMessageForm.addEventListener("keydown", function (ev) {
        ev.stopPropagation()
    })

    sendButton.addEventListener("click", function (ev) {

        if (!isSendMessageCardOpen) {
            if (isSendingMessage) {
                return
            }
            sendButton.blur()

            setVisibility(sendMessageForm, true)
            setVisibility(messageSent, false)
            sendMessageForm.classList.toggle("hidden", false)
            messageSent.classList.toggle("hidden", true)
            setTimeout(() => {
                emailInput.focus()
            }, 200);

            setMessageCardVisibility(true);
        }
        else {
            sendMessageForm.dispatchEvent(new Event('submit'))
        }
    })
    closeMessageCardButton.addEventListener("click", function (ev) {
        clearForm()
        setMessageCardVisibility(false)
    })

    initDb();
});
function clearForm() {
    sendMessageForm.reset()
}
/**
 * @typedef {{senderEmail:string,message:string,subject:string}} MessageDoc 
 */
/**
 * 
 * @param {*} senderEmail 
 * @param {*} body 
 */
async function submitMessage(senderEmail, body, subject) {

    var dtStart = Date.now()
    /**
     * @type {MessageDoc}
     */
    if (!window._db) {
        throw new Error("message not sent :( please consider using another messaging method.")
    }
    var msgDoc = {
        message: body, senderEmail: senderEmail, subject: null, sentAt: window._db.serverTimestamp()
    }
    lastSentMessageRef = await window._db.addDoc("messages", msgDoc)
    let minWait = 500;
    var remaining = Math.max(0, minWait - (Date.now() - dtStart))
    await delayC(remaining)
}
function setMessageCardVisibility(isVisible) {
    if (ac) {
        ac.abort()
    }
    setVisibility(messageSent, false)
    setVisibility(sendingMessageDiv, false)
    setVisibility(messageNotSentDiv, false)
    isSendMessageCardOpen = isVisible
    messageCard.classList.toggle("hidden", !isSendMessageCardOpen)
    mainButtonIcon.innerText = isSendMessageCardOpen ? "send" : "chat_bubble"
    sendButton.title = isSendMessageCardOpen ? "Send" : "Direct Message"
    sendButton.classList.toggle("hidden", false)

}
function getCurrentFormMessage() {
    var formData = new FormData(sendMessageForm)
    let msg = {}
    formData.forEach((value, key) => {
        msg[key] = value;
    });
    return msg;
}
function isFormDirty() {
    var msg = getCurrentFormMessage();
    return msg.email && msg.message
}
window.addEventListener('beforeunload', (event) => {
    if (isFormDirty()) {
        const message = "You have unsaved changes. Are you sure you want to leave?";
        event.preventDefault(); // For most browsers
        event.returnValue = message; // For some browsers
        return message; // For others
    }
});

var lastSentMessageRef = null
async function unsendLastMessage() {
    if (!window._db) {
        console.error("database not initialized");
        return;
    }
    if (lastSentMessageRef) {
        try {
            await window._db.deleteDoc(lastSentMessageRef)
            lastSentMessageRef = null
        }
        catch (err) {
            console.error(err)
        }
    }
}

/**
 * @type {AbortController}
 */
var ac

/**
 * 
 * @param {number} ms 
 * @param {AbortSignal} signal 
 * @returns 
 */
async function delayC(ms, signal) {

    return new Promise((res, rej) => {
        signal?.addEventListener("abort", function () {
            rej();
        })
        setTimeout(res, ms)
    })
}
var isInRetryMode = false;
function showMessageSentAnimation() {
    if (ac) {
        ac.abort()
    }
    ac = new AbortController()
    sendMessageForm.classList.toggle("hidden", true)
    messageSent.classList.toggle("hidden", false)
    sendButton.classList.toggle("hidden", true)
    delayC(2000, ac.signal).then(() => {
        clearForm()
        setMessageCardVisibility(false)
    })
        .catch(() => {

        })
        .finally(() => {
            ac = null
        })

}

function setVisibility(elem, visible) {
    if (elem) {
        elem.style.display = !visible ? "none" : ""
    }
}
var isInitializingDb = false;

async function initDb() {
    const firebaseConfig = {
        apiKey: "AIzaSyCa96fsUk7-n73AiWTo7GDwPAycDAiTI8s",
        authDomain: "yassinmi.firebaseapp.com",
        projectId: "yassinmi",
        storageBucket: "yassinmi.appspot.com",
        messagingSenderId: "665916145431",
        appId: "1:665916145431:web:5da4af37ad97a1da954152"
    };

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    window._db = {
        addDoc: async (collectionName, doc) => {

            const docRef = await addDoc(collection(db, collectionName), doc);
            return docRef
        },
        deleteDoc,
        serverTimestamp
    }

}
