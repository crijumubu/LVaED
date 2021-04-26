class Circle{
    subNodes = [];
    allPos = [];
    indx = 0;
    constructor(xpos,ypos,radius,text,color){
        this.xpos = xpos;
        this.ypos = ypos;
        this.radius = radius;
        this.text = text;
        this.color = color;
        this.calPosSubnodes();

    }

    calPosSubnodes(){
        var ang = 0,
        rad = 50,
        limite = 0;

        if(600-this.xpos < 0 && 600-this.ypos > 0){ //Primer cuadrante
            //this.allPos.push([200+this.xpos,this.ypos]);
            limite = 90;
        }
        else if(600-this.xpos > 0 && 600-this.ypos>0){ //Segundo cuadrante
            //this.allPos.push([rad*Math.cos(180)+this.xpos,rad*Math.sin(180)+this.ypos])
            //this.allPos.push([this.xpos-200,this.ypos]);
            ang = 90;
            limite = 180;
        }
        else if(600-this.xpos >0 && 600-this.ypos<0) { //Tercer cuadrante
            //this.allPos.push([rad*Math.cos(90)+this.xpos,rad*Math.sin(90)+this.ypos])
            //this.allPos.push([this.xpos-200,this.ypos]);
            
            ang = 180;
            limite = 270;
        }
        else{ //Cuarto cuadrante
            //this.allPos.push([200+this.xpos,this.ypos]);
            ang = 270;
            limite = 360;
        }
        while(!(ang==limite)){
            this.allPos.push([rad*Math.cos(ang)+this.xpos,rad*Math.sin(ang)+this.ypos]); //
            
            ang += 30;
        }
    }

    draw(context){
        context.beginPath();

        context.fillStyle = this.color;
        context.font = "15px Arial Black";
        context.txtAlign = "center";
        context.textBaseline = 'middle';
        //context.fillText = (this.text,100,200);
        context.lineWidth = 2;
        context.arc(this.xpos,this.ypos,this.radius,0,Math.PI*2,false);

        
        context.fill();
        
        context.fillStyle = "black";
        //context.fillText(this.text, this.xpos,this.ypos);
        context.closePath();

        
    }
    posNextNode(){
    
        var nxpos, nypos  ;

        if(this.indx < this.allPos.length){
            nxpos = this.allPos[ this.indx][0];
            nypos = this.allPos[ this.indx][1]; 
            this.indx +=1;
            
        }
        else{
            alert("No mas nodos");
            console.log("No mas nodos");
        }
        
        
        return [nxpos,nypos];

    }

    drawSubNode(context,txtName){

        this.calPosSubnodes();
        var newPos = this.posNextNode();
        
        var nposx = newPos[0],
            nposy = newPos[1],
            nrad = 15;

        
        context.beginPath();
        context.moveTo(this.xpos, this.ypos);
    
        context.lineTo(nposx, nposy );
        context.strokeStyle = "gray";
        context.stroke();

        let circle = new Circle(nposx,nposy,nrad,txtName,"#eff97f");
        circle.draw(context);
        
        //context.clearRect(0,0,width,height);

        this.draw(context);
        console.log(this.allPos);
        this.subNodes.push(circle);
    }

    mouseOver(xmouse, ymouse){
        const distance = Math.sqrt(((xmouse-this.xpos)*(xmouse-this.xpos)) + 
        ((ymouse-this.ypos)* (ymouse-this.ypos)));
        if(distance<this.radius){
            return true;
        }
        else{
            return false;
        }
    }
}


class Graph{
    //dis = 150;
    //lastpos = [350,350];
    allPos = [];
    methodsLinked = [];
    atributesLinked = [];


    constructor(xpos,ypos,radius,text,color){
        this.xpos = xpos;
        this.ypos = ypos;
        this.radius = radius;
        this.text = text;
        this.color = color;
        
        this.posC = []; //[[1,0],[0,-1],[0,1],[-1,0],[-1,1],[1,-1],[1,1],[-1,-1]]
        this.indx = 0;

        var ang = 0,
        rad = 300;


        while(!(ang==360)){
            this.allPos.push([rad*Math.cos(ang)+600,rad*Math.sin(ang)+600,ang])
            
            ang += 15;
            
        }
    }

    clearGraph(){
        this.xpos = null;
        this.ypos = null;
        this.radius = null;
        this.text = null;
        this.color = null;
        //this.dis = 150;
        //this.lastpos = [350,350];
        this.allPos = [];
        this.methodsLinked = [];
        this.atributesLinked = [];
    }

    drawCircle(context){
        context.beginPath();

        context.fillStyle = this.color;
        context.font = "15px Arial Black";
        context.textAlign = "center";
        context.textBaseline = 'middle';
        //context.fillText = (this.text,100,200);
        context.lineWidth = 2;
        context.arc(this.xpos,this.ypos,this.radius,0,Math.PI*2,false);

        
        context.fill();
        
        context.fillStyle = "black";
        context.fillText(this.text, this.xpos,this.ypos);
        context.closePath();

        
       //for(int i = 0;)

    }

    posNextNode(){
        var nxpos, nypos  ;
        if(this.indx < this.allPos.length){
            nxpos = this.allPos[ this.indx][0];
            nypos = this.allPos[ this.indx][1]; 
            this.indx +=1;
            
        }
        else{
            alert("No mas nodos");
        }
        
        return [nxpos,nypos];

    }

    drawAtribute(context,txtName){

        console.log(this.allPos.length);
        //txtName = ["Atributo",txtName]
        //txtName = "Atributo\nNombre:" + txtName;
        var newCirc = this.posNextNode();
        
        var nposx = newCirc[0],
            nposy = newCirc[1],
            nrad = 20;
        
        context.beginPath();
        context.moveTo(this.xpos, this.ypos);
    
        context.lineTo(nposx, nposy );
        context.strokeStyle = "gray";
        context.stroke();

        let circle = new Circle(nposx,nposy,nrad,txtName,"#6d94ff");
        circle.draw(context);
        
        //context.clearRect(0,0,width,height);

        this.drawCircle(context);

        this.atributesLinked.push(circle);
    }

    drawMethod(context,txtName,parameters){
        var newPos = this.posNextNode();

        var nposx = newPos[0],
            nposy = newPos[1],
            nrad = 20;

        var metodo = new Circle(nposx,nposy,nrad,txtName,"#cd6155");
        
        if(parameters != undefined){
            parameters.forEach(element =>{
                metodo.drawSubNode(context, element);
            })
            
        
        }
        
        //PARA HACER METODO CREAR CLASE Graph
        
        
        context.beginPath();
        context.moveTo(this.xpos, this.ypos);
        
        context.lineTo(nposx, nposy );
        context.strokeStyle = "gray";
        context.stroke();
        
        
        
        //context.clearRect(0,0,width,height);
        
        metodo.draw(context);
        this.drawCircle(context);

        this.methodsLinked.push(metodo);
    }
}


var drawtoCOde = "";
const showCode = document.getElementById("code");
const showCodTXT = document.getElementById("outputCode");

let canvas  = document.getElementById("lienzo");
let context = canvas.getContext("2d");

var width = 1200,
    height = 1200;
canvas.width = width;
canvas.height = height;


var rectInfoX = width-300,
    rectInfoY = height-100




//Circulo centro, clase
var node = new Graph();
var className = "",
atributes = [],
metodos = [],
paramL = [];

const txtAreaClase = document.getElementById("claseName");
const crearClase = document.getElementById("clase");
//crearClase.addEventListener("va")
crearClase.addEventListener("click",()=>{
    var txtClase = txtAreaClase.value;
    
    //crearClase.onin
    if(txtClase == ""){
        alert("Por favor ingresar el nombre de la clase.");
    }

    else if(validateInput(txtClase)){
        alert("Por favor ingresar un nombre valido para la clase.");
    }
    else{
        node = new Graph(canvas.width/2,canvas.height/2,50,txtClase,"#c9ffb5");
        node.drawCircle(context);
        className = txtClase;
        //drawtoCOde += "class " + txtClase + "():\n";  
        document.getElementById("outputCode").value = drawtoCOde;
        
        crearClase.disabled = true;
        txtAreaClase.disabled = true;
        graphToCode();
        //showCode.value = graphToCode();

    }

});

const crearAtributo = document.getElementById("atributo");
const txtAtributo = document.getElementById("atributoName");
crearAtributo.addEventListener("click",()=>{
    let name = txtAtributo.value;
    console.log(node.allPos);
    
    if(txtAreaClase.disabled != true ){
        alert("Antes de crear un atributo se debe crear la clase.");
    }
    else if(name==""){
        alert("Por favor ingresar el nombre del atributo.");
    }
    else if(validateInput(name)){
        alert("Por favor ingresar un nombre valido para el atributo.");
    }
    else{
        node.drawAtribute(context,name);
        console.log(node.atributesLinked);
        atributes.push(name);
        graphToCode();
        txtAtributo.value = "";  
    }
    
});

const crearMetodo = document.getElementById("metodo");
const txtMetodo = document.getElementById("metodoName"),
    txtParametro1  = document.getElementById("parametro1"),
    txtParametro2  = document.getElementById("parametro2"),
    txtParametro3  = document.getElementById("parametro3");

txtParametro1.addEventListener("input",()=>{
    if(txtParametro1.value.length == 0 && txtParametro3.value=="" && txtParametro2.value==""){
        txtParametro2.style.visibility = "hidden";
        txtParametro3.style.visibility = "hidden";
    }
    else if(txtParametro1.value.length == 0 && txtParametro3.value!=""){
        txtParametro2.style.visibility = "visible";
    }
    else if(txtParametro1.value.length == 0 && txtParametro2.value==""){
        txtParametro2.style.visibility = "hidden";
    }
    
    else{
        txtParametro2.style.visibility = "visible";
    }
    
});


txtParametro2.addEventListener("input",()=>{
    if(txtParametro2.value.length == 0 && txtParametro3.value==""){
        txtParametro3.style.visibility = "hidden";
    }
    
    else{
        txtParametro3.style.visibility = "visible";
    }
    
});

txtParametro3.addEventListener("input",()=>{
    if(txtParametro3.value.length == 0 && txtParametro1.value=="" && txtParametro2.value==""){
        txtParametro2.style.visibility = "hidden";
        txtParametro3.style.visibility = "hidden";
    }

});


crearMetodo.addEventListener('click',()=>{
    var nameMetodo = txtMetodo.value,
        parametros = [];


        parametros.push(txtParametro1.value);
        parametros.push(txtParametro2.value);
        parametros.push(txtParametro3.value);

    if(txtAreaClase.disabled != true){
        alert("Antes de crear un metodo se debe crear la clase.");
    }
    else if(nameMetodo==""){
        alert("Por favor ingresar el nombre del metodo.");
    }
    else if(validateInput(nameMetodo)){
        alert("Por favor ingresar un nombre valido para el metodo.");
    }
    else{
        
        
        if(((parametros[0]=="" )&& (parametros[1]=="" )&&(parametros[2]=="" ))&& confirm("Desea crear un metodo sin parametros")==true){
            node.drawMethod(context,nameMetodo);
            metodos.push(nameMetodo);
            paramL.push([""]);
            //metodos.push();
            txtMetodo.value = txtMetodo.defaultValue;
            showCode.value = graphToCode();
        }
        else{
            var parm = [];
            var noError = true;
            for(let i = 0; i<3;i++){
                //console.log("{"+ parametros[i]+"}");
                if(parametros[i]!="" ){
                    if(validateInput(parametros[0])){
                        alert("Por favor ingresar un nombre valido para el "+ (i+1) +" parametro.");
                        noError = false;
                        continue;
                    }
                    parm.push(parametros[i]);
                    
                }
            }
            


            if(noError){
                metodos.push(nameMetodo);
                paramL.push(parm);
                node.drawMethod(context,nameMetodo,parm);
                graphToCode();
                txtMetodo.value = txtMetodo.defaultValue;
                txtParametro1.value = txtParametro1.defaultValue;
                txtParametro2.value = txtParametro2.defaultValue;
                txtParametro3.value = txtParametro3.defaultValue;
                txtParametro2.style.visibility = "hidden";
                txtParametro3.style.visibility = "hidden"; 
            }
            
        }
        
    }
    
});

const deleteGraph = document.getElementById("btnDeleteG");
deleteGraph.addEventListener("click",()=>{
    context.clearRect(0,0,width,height);
    node.clearGraph();
    className = "";
    atributes = [];
    metodos = [];
    paramL = [];
    crearClase.disabled = false;
    txtAreaClase.value = txtAreaClase.defaultValue;
    txtAreaClase.disabled = false;
});

canvas.addEventListener('click',(event)=>{
    const rect = canvas.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    var txtName = "",
    type = "";

    node.atributesLinked.forEach(element => {
        if(element.mouseOver(x,y)){
            txtName = element.text;
            type = "Atributo";
        }
    });

    node.methodsLinked.forEach(element =>{
        console.log(element.subNodes.length);
        console.log(element.subNodes);
        if(element.mouseOver(x,y)){
            txtName = element.text;
            type = "Método";
        }
        else if(element.subNodes.length!=0){
            element.subNodes.forEach(element =>{
                if(element.mouseOver(x,y)){
                    txtName = element.text;
                    type = "Parametro";
                }
            })
        }
    })

    if(txtName != ""){
        //alert("mouse over, type: "+ type + ", nombre: " +txtName);
        context.clearRect(rectInfoX,rectInfoY,300,100);
        //console.log(element.text);
        context.beginPath();
        context.strokeRect(rectInfoX,rectInfoY,300,100);
        context.font = "20px Arial ";
        context.textAlign = "center";
        context.textBaseline = 'middle';
        
        context.fillStyle = "black";
        context.fillText("Tipo: "+type, rectInfoX+150,rectInfoY+30);
        context.fillText("Nombre: "+txtName, rectInfoX+150,rectInfoY+70);
        context.closePath();
    }
    
});

function validateInput(cadena){
    var charASCII = '';

    for (let i = 0; i < cadena.length; i++) {
        
        charASCII = cadena.charCodeAt(i);

        if(i==0){
            if(charASCII==96 ||charASCII>= 64 || 91 <= charASCII || charASCII>= 94||123 <= charASCII){
                return false;
            }
        }
        else{
            if(charASCII==96 || charASCII >=47 || 58 <= charASCII||charASCII>= 64 || 91 <= charASCII||charASCII>= 94||123 <= charASCII){
                return false;
            }
        }
        
    }
    return true;

}

function graphToCode(){
    var output = "\n";

    output = "class " + className + "():\n";
    
    atributes.forEach(element =>{
        output += "\t" + element + " = None\n";
    });

    var inx = 0;
    var parametros = "";
    console.log(metodos);
    console.log(paramL);
    metodos.forEach(element =>{
        
        if(paramL[inx][0]==""){
            output += "\tdef " + element + "(self):\n\t\tpass\n";
        }
        else{
            paramL[inx].forEach(element =>{
                if(element!=""){
                    parametros += ", " + element ;
                }
            });
            output += "\tdef " + element + "(self" + parametros +"):\n\t\tpass\n";
            parametros = "";
        }
        inx ++;
    });
    showCodTXT.value = output;
    showCode.innerHTML = output;
    //return output;
}
