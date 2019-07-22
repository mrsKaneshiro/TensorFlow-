function preparePlaceholder(){
    var img=document.createElement("img");
    img.setAttribute("id","placeholder");
    img.setAttribute("src","images/e.jpg");
    img.setAttribute("alt","无法显示-占位置图片");
    var p=document.createElement("p");
    p.setAttribute("id","description");
    var text=document.createTextNode("choose a picture");
    p.appendChild(text);
    try{
        var ul=document.getElementById("imagegallery");
        insertAfter(img,ul);
        console.log("img")
        insertAfter(p,img);
        console.log("p")
    }catch (e) {
        var ul=document.querySelector("ul")
    }
}

function prepareGallery(){
    if(!document.getElementsByTagName) return false;
    if(!document.getElementById) return false;
    try{
        var as=document.getElementById("imagegallery");
        var links=as.getElementsByTagName("a");
    }catch (e) {
        var as=document.querySelector("ul")
        console.log(as);
        var links=as.getElementsByTagName("a");
    }

    for (var i=0;i<links.length;i++){
        links[i].onmouseover=function()
        {
            return !showPic(this)
        }
        // links[i].onkeypress=links[i].onclick;
    }
}

function showPic(whichPic) {
    //添加检查
    if(!document.getElementById("placeholder")) return false;
    var source =whichPic.getAttribute("href");
    var img=document.getElementById("placeholder");
    img.setAttribute("src",source);
    //添加检查 如果des不存在可以不必改变，下面的标题
    if(document.getElementById("description")){
        var text=whichPic.getAttribute("title");
        var p=document.getElementById("description");
        p.firstChild.nodeValue=text;
    }
    return true;
}

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
    var parent=targetElement.parentElement;
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
        }
    }
}

function prepareInternalnav() {
    var section=document.querySelectorAll("section");
    for(var j=0;j<section.length;j++){
        section[j].style.display="none";
    }
    var artical=document.querySelector("article")
    var a=artical.querySelectorAll("a")
    var art_a_id= new Array();
    for(var i=0;i<a.length;i++){
        art_a_id[i]=a[i].getAttribute("href").split("#")[1];
        a[i].quanjuID=art_a_id[i];
        a[i].onclick=function () {
            showSection(this.quanjuID);
            return false
        }
    }
}

function showSection(id) {
    var section = document.querySelectorAll("section");
    for(var i=0;i<section.length;i++) {
        if(id==section[i].getAttribute("id")) {
            section[i].style.display = "block";
        }else {
            section[i].style.display = "none";
        }
    }

}
function displayAbbreviations() {
    /*
    用于动态的把<attr>中title展示出来
    但是没有修改样式
     */
    var attr=document.querySelectorAll("attr");
    var attr_title=new Array();
    var attr_key=new Array();
    var div=document.createElement("div");
    div.innerText="";
    for (var i=0;i<attr.length;i++){
        attr_title[i]=attr[i].getAttribute("title");
        attr_key[i]=attr[i].innerHTML;
        var temp=attr_key[i]+" "+attr_title[i];
        div.innerText+="    "+temp;
    }
    var h3=document.createElement("h3");
    h3.innerText="Abbreviations"
    try{
        var article=document.getElementById("live_article");
        article.appendChild(h3);
        article.appendChild(div);
    }catch (e) {
        return
    }
}
function stripe() {
    /*
    颜色不知道为什么没改过来？
    中间一条的背景色应该是白色；
     */
    if(!document.getElementsByTagName) return false
    var table=document.getElementsByTagName("table");
    var odd,row;
    for(var i=0;i<table.length;i++){
        odd=false;
        rows=document.getElementsByTagName("tr");
        for (var j=0;j<rows.length;j++){
            if(odd==true){
                odd=false;
            }
            else {
                rows[j].style.backgroundColor='white';
                odd=true;
            }
        }
    }
}
function highlight () {
    var row=document.getElementsByTagName("tr");
    for (var j=0;j<row.length;j++){
        row[j].onmouseover=function () {
            this.style.fontWeight = "bold";
        }
        row[j].onmouseout=function () {
            this.style.fontWeight="normal";
        }
    }
}
addLoadEvent(highLightPage);
addLoadEvent(stripe);
addLoadEvent(prepareInternalnav);
addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);
addLoadEvent(highlight);
addLoadEvent(displayAbbreviations) ;