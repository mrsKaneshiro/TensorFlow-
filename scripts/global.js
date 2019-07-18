function addLoadEvent(func) {
    /**
     * 创建了一个函数执行队列
     */
    var oldonload=window.onload;
    if(typeof window.onload!='function'){
        window.onload=func;
    }else{
        window.onload=function () {
            oldonload();
            func();
        }
    }
}

function insertAfter(newElement,targetElement) {
    var parent=targetElement.parentNode;
    if(parent.lastChild==targetElement){
        parent.appendChild(newElement);
    }else {
        //targetElement.nextElementSibling=newElement;
        parent.insertBefore(newElement,targetElement.nextSibling);
    }
}
function addClass(element,value) {
    if(!element.className){
        element.className=value;
    }else {
        newClassName=element.className;
        newClassName+="";
        newClassName+=value;
        element.className=newClassName;
    }
}

function highLightPage() {
    var links=document.querySelectorAll("a");
    var linkURL;
    for(var i=0;i<links.length;i++) {
        linkURL = links[i].href;
        if (window.location.href.indexOf(linkURL) != -1) {
            links[i].className = "here";
            var linksText = links[i].innerText.toLowerCase();
            document.body.id = linksText;
            console.log(document.body);
        }
    }
}

addLoadEvent(highLightPage);