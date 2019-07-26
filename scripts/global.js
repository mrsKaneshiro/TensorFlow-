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
        insertAfter(p,img);
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
function isFilled(elem) {
    /*用于检测required的input是否已经输入
    * 有时候浏览器不能判断的时候可以使用这个方法
    * */
    if(elem.value.replace(" ","").length==0)
        return false;
    var placeholder=elem.placeholder||elem.getAttribute("placeholder");
    return (elem.value!=placeholder)
    //返回一个布尔值 如果输入了，返回true
}
function isEmail(elem) {
    return( elem.value.indexOf("@")!=-1 && elem.value.indexOf(".")!=-1);
    // 返回一个布尔值，如果输入了@ 和. 则认为用户已经输入
}
function validateForm() {
    /***
     * 检测表单填写的是否正确
     * 用JS做了简单的处理，验证一些页面
     * 本项目中的form表单就一个，所以没有用参数的形式传递
     */
    var form=document.querySelector("form")
    //遍历这个form
    for(var i=0;i<form.elements.length;i++){
        var elem=form.elements[i];
        if(elem.hasAttribute("required")){
            //console.log(elem.hasAttribute("required"));
            if(!isFilled(elem)){
                alert("表单没有输入完整")
                return false
            }
            if(elem.type="email"){
                if(!isEmail(elem)){
                    alert("Email没有输入完整")
                    return false
                }
            }
        }
        console.log("validateForm执行完成")
    }
    return true;
}
function focusLabels(){
    /**
     * 点击label标签会让对应的input自动获取焦点
     * 当浏览器不具有这种默认行为的时候。
     */
    var label=document.querySelectorAll("label");
    for(var i=0;i<label.length;i++){
        label[i].onclick=function () {
            var id=this.getAttribute("for");
            var elem=document.getElementById(id);
            elem.focus();
        }
    }
    console.log("focusLabels执行结束")
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
function getHTTPObject() {
    /*
    简历XMLHtttpRequset对象的通用方法
     */
    if(typeof XMLHttpRequest=='undefined'){
        XMLHttpRequest=function(){
            try{
                return  new ActiveXObject("Msxml2.XMLHTTP.6.0");
            }catch (e) {

            }
            try {
                return  new ActiveXObject("Msxml2.XMLHTTP.3.0");
            }catch (e) {

            }
            try {
                return  new ActiveXObject("Msxml2.XMLHTTP");
            }catch (e) {

            }
            return false;
        }
    }
    console.log("getHTTPObject-----执行完成")
    return new XMLHttpRequest()
}
function displayAjaxLoading(element) {
    //动态在elememnt下面，创建一个IMG 标签
    while(element.hasChileNodes()){
        element.removeChild(element.lastChild);
    }
    var content=document.createElement("img");
    content.setAttribute("src","images/loading.jpg");
    content.setAttribute("alt","Loading");
    element.appendChild(content)

}
//添加动画的moveElement
function slide() {
    if(document.getElementById("slideshow")){
        var links=document.getElementsByTagName("a");
        var destination;
        for(var i=0;i<links.length;i++){
            links[i].onmouseover=function () {
                destination=this.getAttribute("href");
                if(destination.indexOf('index.html')!==-1){
                    moveElement('preview',0,0,5);
                }
                if(destination.indexOf('about.html')!==-1){
                    moveElement('preview',-214,0,5);
                }
                if(destination.indexOf('photos.html')!==-1){
                    moveElement('preview',-214*2,0,5);
                }
                if(destination.indexOf('live.html')!==-1){
                    moveElement('preview',-214*3,0,5);
                }
                if(destination.indexOf('contact.html')!==-1){
                    moveElement('preview',-214*4,0,5);
                }
            }
        }
    }
}

function moveElement (elementID,final_x,final_y,interval) {
    //移动的函数

    var elem=document.getElementById(elementID);
    if(elem.movement){
        clearTimeout(elem.movement);
    }
    if(!elem.style.top){
        elem.style.top='0px';
    }
    if(!elem.style.left){
        elem.style.left='0px';
    }

    var xpos=parseInt(elem.style.left);
    var ypos=parseInt(elem.style.top);
    if(xpos==final_x && ypos==final_y){
        return true;
    }

    if(xpos<final_x){
        //var dist=Math.ceil((final_x-xpos)/10);
        xpos=xpos+10;
    }
    if(xpos>final_x){
        //var dist=Math.ceil((final_x-xpos)/10);
        xpos=xpos-10;
    }
    if(ypos<final_y){
        //var dist=Math.ceil((final_y-ypos)/10);
        ypos=dist+10;
    }
    if(ypos>final_y){
        //var dist=Math.ceil((final_y-ypos)/10);
        ypos=dist-10;
    }

    elem.style.left=xpos+"px";
    elem.style.top=ypos+"px";

    var repeat="moveElement('"+elementID+"',"+final_x+","+final_y+","+interval+")";
    elem.movement=setTimeout(repeat,interval);
}

addLoadEvent(highLightPage);
addLoadEvent(stripe);
addLoadEvent(focusLabels)
addLoadEvent(prepareInternalnav);
addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);
addLoadEvent(highlight);
addLoadEvent(slide);
addLoadEvent(displayAbbreviations) ;