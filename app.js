var elems = document.getElementsByClassName("skill")
var string = "UI/UX"
var skillsWrapper = document.getElementById("skills-wrapper");
var lastSkill = document.getElementsByClassName("skill end").item(0);

for(var i=0; i<elems.length;i++){
    const elem = elems.item(i);
    console.log(elem);
    elem.setst
    if(elem.classList.contains("skill0")){
        startStrong(elem,0.85,1,0.8);
    }
    else if(elem.classList.contains("skill1")){
        startStrong(elem,0.125,0.8,0.6);
    }
    else{
        startStrong(elem,0.45,0.9,0.6);
    }
}

function startStrong(elem,freq,max,min){
    var time = Math.random()*100;
    var period = 1/freq;
    setInterval(() => {
        time+=0.016;

        brightness = (((Math.cos(time*freq*2*Math.PI)+1)/2)*(max-min))+min;
        elem.style.opacity=brightness

    }, 16);
}
document.addEventListener('keydown', hndlKeyDown);
/**
 * 
 * @param {KeyboardEvent} ev 
 */
function hndlKeyDown(ev){
    if(string.length &&( ev.key===';'||ev.key==='Enter')){
       var newSkill = lastSkill.cloneNode(true);
       lastSkill.classList.remove("end");
       string = ""
       newSkill.innerText = string;
       skillsWrapper.append(newSkill);
       lastSkill = newSkill;
       startStrong(lastSkill,0.45,0.9,0.6);
       ev.preventDefault();
    }
    else if(ev.key=='Backspace'){
        if(string.length>0){
            string = string.slice(0,string.length-1)
            lastSkill.innerText=string;
            ev.preventDefault();
        }
    }
    else if(ev.key.length==1&& !ev.key.includes('\n')) {
        string+=ev.key
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
  });