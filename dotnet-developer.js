
/**
 * @typedef {"Error"|"Warning"} ErrorDecoratorType
 * @typedef {{start:number,end:number,type:ErrorDecoratorType}} ErrorDecorator
 * @typedef  {{text:string,cursorPos:number,errorDecorators:ErrorDecorator[]}} RichText
 */
/**
 * @type {RichText}
 */
var currentText = {text:"Dotnet Developer",cursorPos:0,errorDecorators:[]}
var random = "ÿþB0€j¤íÈ¥Ð-]j‰A5ãLQ¦°ÉÉ]!¡ÍŠZxKÊR6MÜê¬0|uÀ0‰Äœ¨¡W§ÒS¡ôuÒÛB!ÍDøÑÔð§þþÐ¾r€ÿö8”ó”ÛcGvÝu“ªÑÝÙzÏ¾LwP#œþÌsQ5çq†Ú£¹%jÖÈ°B"
var encriptedSet="~\`!@#$%^&*()-_=+[{]}\|;:\'\",<.>/?0123456789ABCDEF"
var encriptedSet2="aBcDeFgHiJkLmNpQrStUvWxYz0123456789!@$%^&*()_+[]{}|;:',.<>?/~`"
var errors = ["CS0818: Implicitly typed locals must be initialized"]
/**
 * extend or shrink decorators as neccesarry after a character deletion or insertion
 * @returns {string}
 * @param {RichText} rt 
 * @param {boolean} removedOrInserted true if removed 
 * @param {string} ix ix (for removed, the previous char ix, for inserted the new ix)
 */
function extendDecorators(rt,removedOrInserted,ix){
    
        if(rt.errorDecorators.length>0){
            for (let i = 0; i < rt.errorDecorators.length; i++) {
                const decorator = rt.errorDecorators[i];
                if(decorator.start<=ix&&decorator.end>ix){
                    if(removedOrInserted){                    
                        decorator.end--;
                    }
                    else{
                        decorator.end++;
                    }
                }
            }
            rt.errorDecorators = rt.errorDecorators.filter(d=>d.end>d.start)
        }
   
}
/**
 * adds the <span class=err>
 * @returns {string}
 * @param {RichText} rt 
 * @param {string} innerHtmlBeforeDecorators 
 */
function applyDecoratorsToInerHtml(rt, innerHtmlBeforeDecorators){
    var res = innerHtmlBeforeDecorators;
    if(rt.errorDecorators.length>0){
        for (let i = 0; i < rt.errorDecorators.length; i++) {
            const decorator = rt.errorDecorators[i];
            var strToReplace = rt.text.slice(decorator.start,decorator.end);
            res = res.replace(strToReplace,`<span class="err">${strToReplace}</span>`);
        }
    }
    return res.replace(/\b(Typescript)|(Dotnet)\b/,(r,n)=>`<span class='keyword'>${r}</span>`)
    return res;
}
/**
 * @returns {string}
 * @param {RichText} rt 
 */
function renderRichText(rt){
    if(!rt.text.length) return "";
    var initStr = rt.text;
    if(rt.cursorPos==-1) return applyDecoratorsToInerHtml(rt,initStr) ;
    if(rt.cursorPos>initStr.length) return applyDecoratorsToInerHtml(rt,initStr) ;
    if(rt.cursorPos==initStr.length) return  applyDecoratorsToInerHtml(rt,initStr + "<c>&nbsp;</c>")  
   var res =    initStr.slice(0,rt.cursorPos)+"<c>"+initStr[rt.cursorPos]+"</c>" +
   ( initStr.length>rt.cursorPos+1? initStr.slice(rt.cursorPos+1) : "");
   res = res.replace(/ /g,"&nbsp;")
   res = applyDecoratorsToInerHtml(rt,res);
   return res;
}

/**
 * @type {HTMLHeadingElement}
 */
var title = document.getElementsByClassName("title").item(0);
function delay(ms,rndPer=0.5) {
    if(ms===undefined) ms = 120
    return new Promise(resolve => setTimeout(resolve, ms + (Math.random()*2-1)*ms*rndPer));
}
/**
 * 
 * @param {string} inputString 
 * @param {number} ix 
 * @param {string} newChar 
 * @returns 
 */
function alterCharAtIndex(inputString,ix, newChar) {
    if(inputString.length==0) return "";
    if (inputString.length <= ix) {
      return inputString;
    }
   if(inputString.length==ix+1) return inputString.substring(0, ix) + newChar;
    return inputString.substring(0, ix) + newChar +  inputString.substring(ix+1);
  }
function removeCharAtIndex(inputString, index) {
    if (index < 0 || index >= inputString.length) {
      return inputString;
    }
    return inputString.substring(0, index) + inputString.substring(index + 1);
  }
  /**
   * the result has the passed chat at the specified index
   * @param {string} inputString 
   * @param {number} index 
   * @param {string} charToInsert 
   * @returns 
   */
  function insertCharAtIndex(inputString, index, charToInsert) {
    if (index < 0 || index > inputString.length) {
      return inputString;
    }
    if(index==0 && inputString=='') return charToInsert;
  
    return inputString.substring(0, index) + charToInsert + inputString.substring(index);
  }
/**
 * 
 * @param {HTMLHeadingElement} elem 
 * @param {number} times 
 */
async function backslashWithCursor(elem,times,speed){
     if(currentText.cursorPos==-1 ) return;
     var cc=0;
     while (currentText.cursorPos>0){
         await delay(speed)
         currentText.text = removeCharAtIndex(currentText.text,currentText.cursorPos-1);
         extendDecorators(currentText,true,currentText.cursorPos-1)
         currentText.cursorPos = currentText.cursorPos-1;
         elem.innerHTML = renderRichText(currentText);
         cc++;
         if(cc==times) break;
     }
}
/**
 * 
 * @param {HTMLHeadingElement} elem 
 * @param {string} str 
 */
 async function writeWithCursor(elem,str,speed){
    if(currentText.cursorPos==-1 ) return;
    if(str==undefined) throw Error("cannot write undef")
    for(var i=0; i<str.length;i++){
        await delay(speed)
        currentText.text = insertCharAtIndex(currentText.text,currentText.cursorPos,str[i]);
        extendDecorators(currentText,false,currentText.cursorPos)

        currentText.cursorPos ++;
        elem.innerHTML = renderRichText(currentText);

    }
   
}
/**
 * 
 * @param {HTMLHeadingElement} elem 
 * @param {number} times 
 */
 async function moveCursorAndRandomize(elem,to,speed=120){
    var pos = currentText.cursorPos
    if(pos==-1) pos = currentText.text.length-1;
    currentText.cursorPos = pos;
    var inc = pos>to? -1: 1;
    while(pos!=to && (pos <currentText.text.length) ){
        console.log(currentText)
        await delay(speed)
        pos = pos+inc;
        currentText.cursorPos = pos;
        var randomChar =currentText.text[currentText.cursorPos]==' '?' ': random[Math.floor( Math.random()*(random.length-2))];
        currentText.text = alterCharAtIndex(currentText.text,currentText.cursorPos,randomChar)
        elem.innerHTML = renderRichText(currentText);
   
    }
}
/**
 * 
 * @param {HTMLHeadingElement} elem 
 * @param {number} times 
 */
 async function moveCursor(elem,to,speed=120){
    var pos = currentText.cursorPos
    if(pos==-1) pos = currentText.text.length-1;
   
    if(speed==0) {
        currentText.cursorPos = to;
        elem.innerHTML = renderRichText(currentText);
        return
    }
    var inc = pos>to? -1: 1;
    while(pos!=to){
        await delay(speed)
        pos = pos+inc;
        currentText.cursorPos = pos;
        elem.innerHTML = renderRichText(currentText);
    }
   }
/**
 * 
 * @param {HTMLHeadingElement} elem 
 */
function getCursorPos(elem){
    return elem.innerHTML.indexOf("<c>")
}
  
function clearWithCursor(){
    currentText = {cursorPos:0,errorDecorators:[],text:""}
    title.innerHTML = renderRichText(currentText)
}
function RandInt(a, b) {
    return Math.floor(Math.random() * (b - a + 1)) + a;
  }
/**
 * 
 * @param {HTMLHeadingElement} elem 
 */
async function  encryptDecrypt(elem,time){
    let initialStr = currentText.text;
    let encryptedStr = currentText.text;
    //# encrypt
    var indexes = Array.from({length:initialStr.length},(v,k)=>k);
    while(indexes.length){

        let ix = indexes.splice( RandInt(0,indexes.length-1),1)[0]
        encryptedStr = alterCharAtIndex(encryptedStr,ix, encriptedSet[RandInt(0,encriptedSet.length-1)] )
        currentText.text = encryptedStr;
        elem.innerHTML = renderRichText(currentText);
        await delay(time);
    }

    indexes = Array.from({length:initialStr.length},(v,k)=>k);
    while(indexes.length){

        let ix = indexes.splice( RandInt(0,indexes.length-1),1)[0]
        encryptedStr = alterCharAtIndex(encryptedStr,ix, initialStr[ix] )
        currentText.text = encryptedStr;
        elem.innerHTML = renderRichText(currentText)
        await delay(time);
    }
}

async function start(){
    var dec = 120;
    var reducedMotionCodePath = window.matchMedia("(preferes-reduced-motion: reduce)").matches
    var isFirstTime=true;
    var strr = "yassi io"
    console.log(alterCharAtIndex(strr,0,"9"))
    while (true) {
        if(isFirstTime){
            //await delay(1500,0);
            currentText = {text:"Dotnet Developer",cursorPos:16,errorDecorators:[]}
            title.innerHTML = renderRichText(currentText);
            await delay(3000,0);
        } 
        currentText = {text:"Dotnet Developer",cursorPos:16,errorDecorators:[]}

        isFirstTime=false;
    
        title.innerHTML = renderRichText(currentText);
        await moveCursor(title,6);
        await delay(330)
        await backslashWithCursor(title,6)
        await delay(120)
        await writeWithCursor(title,"Software")
        await delay(2000);
        await moveCursor(title,18,0);
        await delay(1000);
        await writeWithCursor(title,";")
        await delay(800);

        await delay(100);
 
        
        currentText.errorDecorators.push({start:0,end:8,type:"Error"})
        title.innerHTML = renderRichText(currentText);
        await delay(1000);
        if(reducedMotionCodePath){
            await backslashWithCursor(title,20,300)
            
        }
        if(!reducedMotionCodePath){
            await moveCursor(title,8,60);
            await backslashWithCursor(title,2,300)
            await backslashWithCursor(title,6,60)
            await writeWithCursor(title,"var",400)
            await delay(1);
            title.innerHTML = "<span class='keyword' >var<c>&nbsp;</c></span>Developer;"
            await delay(3500);
            title.innerHTML = `<span class='keyword' >var<c>&nbsp;</c></span>Developer; <span class='inline-error show'>${errors[0]}</span>`
            await delay(300);
            
            if(Math.random()>0.99){
                title.innerHTML = `<span class='keyword' >v@<c>&nbsp;</c></span> Developer; <span class='inline-error show'>${errors[0]}</span>`
                await delay(300);
    
                title.innerHTML = `<span class='keyword' >ÿ<c>@</c>r</span> DþBeloperB  <span class='inline-error show'>${errors[0]}</span>`
                await delay(300);
    
                title.innerHTML = `<span class='keyword' ><c>ÿ</c>þB€j¤íÈ¥]</span> ${errors[0]}`
                await delay(300);
    
                title.innerHTML = `<span class='keyword' ><c>ÿ</c>þB€j¤íÈ¥]</span> ${errors[0]}`
                await delay(100);
                title.innerHTML = `<span><c>ÿ</c>þB€j¤íÈ¥]</span> ${errors[0]}`
                await delay(100);
                currentText = {cursorPos:0,errorDecorators:[],text:`ÿþB€j¤íÈ¥] ${errors[0]}`};
                title.innerHTML = renderRichText(currentText);
                await moveCursor(title,1,50);
                await moveCursorAndRandomize(title,30,10);
                await moveCursorAndRandomize(title,35,30);
                await moveCursorAndRandomize(title,37,100);
                await delay(500,0)
            }
            else{
                currentText = {cursorPos:0,errorDecorators:[],text:`var Developer ${errors[0]}`};
                title.innerHTML = renderRichText(currentText);
                await delay(800);
                await encryptDecrypt(title,10);
                await delay(800);
                
                //await encryptDecrypt(title,10);
                //await delay(800);

            }
           
            //await backslashWithCursor(title,500,0);
            clearWithCursor();
            //title.classList.remove("code")
        }
        
        await delay(1000);

        currentText = {cursorPos:1,errorDecorators:[],text:"U"};
        title.innerHTML = renderRichText(currentText);
        await writeWithCursor(title,"I/UX Designer",230);

        await delay(10000);
        await backslashWithCursor(title,16,80);
        await delay(500,0)
        await writeWithCursor(title, "C# Developer")

        await delay(3000,0);
        await backslashWithCursor(title,16,50);
        await delay(500,0)
        await writeWithCursor(title, "WPF Developer")

        await delay(3000,0);
        await backslashWithCursor(title,16,50);
        await delay(500,0)
        await writeWithCursor(title, "Typescript Developer")

        await delay(3000,0);
        await backslashWithCursor(title,24,50);
        await delay(500,0)
        await writeWithCursor(title, "Dotnet Developer")
        await delay(3000,0);

    }

}

start();