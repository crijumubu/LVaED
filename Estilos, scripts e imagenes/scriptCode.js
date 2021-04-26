var x;
var y;
var a;
var b;

function IngresarYEnviar(){

    let input = document.querySelector('input');
    let context = document.getElementById('lienzo');
    let codigo = document.getElementById('inputCode');
    context.width = "1200";
    context.height = "1200";
    lienzo = context.getContext('2d');
    let content;
    
    //Cargar documento

    input.addEventListener('change', () => {
        let files = input.files;
    
        if (files.length == 0) return;
    
        const file = files[0];
    
        let reader = new FileReader();
    
        reader.onload = (e) => {
            const file = e.target.result;
            const lines = file.split(/\r\n|\n/);
            content = lines.join('\n')
            codigo.innerHTML = content;
            lienzo.fillStyle = "#ffffff";
            lienzo.fillRect(0,0,context.width,context.height);
            alert("Su código se ha cargado correctamente! ");
        };
    
        reader.onerror = (e) => alert(e.target.console.error.name);
    
        reader.readAsText(file);
    });

    //Enviar documento y realizar grafo

    const btnEnviar = document.getElementById('btnEnviar');
    btnEnviar.addEventListener('click', () => {
        alert('Su código se ha enviado correctamente!');

        var textoEnLinea = content.split('\n');;
        var x = 600;
        var y = 600;
        var a = 612;
        var b = 500;
        let circleClass;
        let hallamosAtributos = false;
        let contAtributos = 0;

        for (var i=0; i<textoEnLinea.length; i++){
            if (textoEnLinea[i] != undefined){

                if (textoEnLinea[i].includes("class")){
                    circleClass = new Circle(x,y,50,(textoEnLinea[i].replace('class', '')).replace(':', ''),"#C9FFB4");
                    y = 50;  
                    x = 150;
                    circleClass.drawLine(lienzo, 600, 600, x, y);   
                    hallamosAtributos = true;          
                }
                else if(textoEnLinea[i].includes("def ")){

                    let c = new Circle(x,y,25,cleanMethod(textoEnLinea[i]),"#CD6155");
                    c.drawLine(lienzo, 600, 600, x, y);  
                    c.draw(lienzo);

                    if (y+50 >= 1200){

                        x = 1000;
                        y = 50;
                    }
                    else if (x==670 && y+160 >= 920){

                        x = 200;
                        y = 135;
                    }
                    else{

                        y += 100;
                    }  
                    hallamosAtributos = false;
                }
                else if ((textoEnLinea[i].includes("=")) && (textoEnLinea[i].includes("__") || hallamosAtributos==true)){

                    if (textoEnLinea[i].includes("self")){

                    }else{
                        switch(contAtributos){
                            case 1:
                                b += 380; 
                                break;
                            case 2:
                                a+=150;
                                b+=100;
                                break;
                            case 3:
                                b = Math.abs(b-920);
                                break;
                            case 4:
                                a-=300;
                                break;
                            case 5:
                                b = 780;
                                break;
                        }
                        let c = new Circle(a,b,20,cleanAttribute(textoEnLinea[i]),"#6D93FE");
                        c.drawLine(lienzo, 600, 600, a, b);  
                        c.draw(lienzo);
                        b += 70;
                        contAtributos++;
                    }
                }
            }
        }

        circleClass.draw(lienzo);
        codigo.innerHTML = "";
    });
}

//Funcion para eliminar todo lo no relevante que se encuentre en la línea en donde se delcara el metodo de la clase

function cleanMethod(method){

    var cleanmeth = "";
    //var parametro = "";
    var empezar = false;
    var empezarparametro = false;

    for (var i=0; i<method.length; i++){

        var char = method.charAt(i);
        if (char == 'd'){
            empezar = true;
            cleanmeth += char;
            continue;
        }
        else if (char == ':'){

            empezar = false;
            break;
        }
        else if (empezar != false && empezarparametro!=true){
            cleanmeth += char;
        }
    }
    
    return cleanmeth.replace('def', '');
}

//Funcion para eliminar todo lo no relevante que se encuentre en la línea en donde se delcara e instancia el atributo de la clase

function cleanAttribute(attribute){
    
    var cleanattri = "";
    var empezar = false;

    for (var i=0; i<attribute.length; i++){

        var char = attribute.charAt(i);
        if ((char == '_' || char != ' ') && (char != '#' && char != '=' )){
            empezar = true;
            cleanattri += char;

        }
        else if (char == '#'){
            empezar = false;
            break;
        }
        else if (char == '='){
            empezar = false;
            break;
        }
        else if (empezar != false){
            cleanattri += char;
        }else if (empezar == true && char == ' '){
            break;
        }
    }

    return cleanattri;
}

//Clase circulo

class Circle{

    constructor(xpos,ypos,radius,text,color){
        this.xpos = xpos;
        this.ypos = ypos;
        this.radius = radius;
        this.text = text;
        this.color = color;
    }

    draw(context){
        context.beginPath();
        context.fillStyle = this.color;
        context.arc(this.xpos,this.ypos,this.radius,0,Math.PI*2,false);
        context.fill();
        context.closePath();
        context.font = '15px Arial';
        context.fillStyle = 'black';
        if (this.radius == 50){
            context.fillText(this.text,this.xpos-50,this.ypos);
        }
        else if (this.radius == 25){
            context.fillText(this.text,this.xpos-27,this.ypos);
        }
        else{
            context.fillText(this.text,this.xpos-18,this.ypos);
        }
    }

    drawLine(context, xinit, yinit, xfin, yfin){
        context.strokeStyle = "black";
        context.beginPath()
        context.moveTo(xinit, yinit);
        context.lineTo(xfin, yfin);
        context.closePath();
        context.stroke();
    }
}

IngresarYEnviar();