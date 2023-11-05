let saldo = 0;
const ultimosNumeros = [];
const ultimosNumeros2 = [];
const inputArray = [];
const coloresNums = ["verde", "rojo", "negro", "rojo", "negro", "rojo", "negro", "rojo", "negro", "rojo", "negro", "negro", "rojo", "negro",
    "rojo", "negro", "rojo", "negro", "rojo", "rojo", "negro", "rojo", "negro", "rojo", "negro", "rojo", "negro", "rojo", "negro",
    "negro", "rojo", "negro", "rojo", "negro", "rojo", "negro", "rojo"];
const numerosRuleta = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36]

class numeroDeLaRuleta{
    constructor(numero, color, saldoInicial, apuesta, ganancias, resultado){
        this.numero = numero;
        this.color = color;
        this.hora = Date.now();
        this.saldoInicial = saldoInicial;
        this.ganancias = ganancias;
        this.saldoFinal = saldoInicial + ganancias - apuesta;
        this.apuesta = apuesta; // cuanto apostó
        this.resultado = resultado; // true ganó, false si perdió
    }
}

function isFloat(n) {
    return n === +n && n !== (n | 0);
}

function limpiarCampos(){
    for (i = 0; i <= 36; i++) {
        document.getElementById("num" + (i)).value = "";
    }
    document.getElementById("todoRojo").value = "";
    document.getElementById("todoNegro").value = "";
}

function pedirSaldo(viejoSaldo) {
    do {
        nuevoSaldo = prompt("¿Cuanto dinero quiere agregar?");
        if (nuevoSaldo === null) {
            nuevoSaldo = 0;
        }
    } while (isNaN(nuevoSaldo) || isFloat(parseFloat(nuevoSaldo)) || nuevoSaldo < 0);
    return viejoSaldo += parseInt(nuevoSaldo);
}

function actualizarSaldo() {
    let cuadroSaldo = document.getElementById("cuadroSaldo");
    cuadroSaldo.value = " SALDO:  $ " + saldo;
}

function agregarSaldo() {
    saldo = pedirSaldo(saldo);
    actualizarSaldo();
}

function obtenerNumero() {
    return Math.floor(Math.random() * (37 - 0));
}

function agregarUltimoNumero(nuevoNumero, ultimosNumeros, coloresNums, apuestaTotal, ultimoSaldo, ganancias, resultado) {
    const ULTIMOSNUMS_MAX = 15;
    if (ultimosNumeros.length > ULTIMOSNUMS_MAX) { ultimosNumeros.pop(); }
    ultimosNumeros.unshift([nuevoNumero, resultado]); // true ganador, false perdedor

    if (ultimosNumeros2.length > ULTIMOSNUMS_MAX) { ultimosNumeros2.pop(); }
    ultimosNumeros2.unshift([new numeroDeLaRuleta(nuevoNumero, coloresNums[parseInt(nuevoNumero)], ultimoSaldo, apuestaTotal, ganancias, resultado)]); // true ganador, false perdedor
    console.log(ultimosNumeros2);
}

function mostrarUltimosNums(ultimosNumeros, coloresNums) {
    texto = " Ultimos Numeros: \n\n";
    for (i = 0; i < ultimosNumeros.length; i++) {
        numerito = parseInt(ultimosNumeros[i][0]);
        color = coloresNums[numerito];
        resultado = ultimosNumeros[i][1];
        textoMostrar = "  ";

        if(numerito <= 9){texto += "  " + numerito + "\t";}
        else{texto += "  " + numerito + "\t";}

        if(color === "rojo"){texto += color + "\t\t";}
        else{texto += color + "\t";}

        if(resultado){texto += "\tG\n";}
        else{texto += "\tP\n";}
    }
    let cuadroUltimosNums = document.getElementById("cuadroUltimosNums");
    cuadroUltimosNums.value = texto;
}

function controlDeMontos(inputArray) {
    inputArray.splice(0, inputArray.length)
    for (i = 0; i <= 38; i++) {
        
        if(i<=36){valor = document.getElementById("num" + (i)).value;}  // levanta valores de numeros
        else if(i===37){valor = document.getElementById("todoRojo").value;}  // valor de Rojo
        else if(i===38){valor = document.getElementById("todoNegro").value;} // valor de Negro
        else{console.log("ERROR");}

        if (valor === "") {
            inputArray.push(0);
        }
        else if (isNaN(valor)) {
            alert("Debe ingresar montos en pesos: numeros enteros, sin punto decimal ni caracteres especiales");
            return false;
        }
        else if (isFloat(parseFloat(valor))) {
            alert("Debe ingresar montos en pesos: numeros enteros positivos, sin punto decimal ni caracteres especiales");
            return false;
        }
        else if (valor < 0) {
            alert("Debe ingresar montos en pesos: numeros enteros positivos, sin punto decimal ni caracteres especiales");
            return false;
        }
        else {
            inputArray.push(parseInt(valor));
        }
    }
    montoApuesta = inputArray.reduce((prev, next) => prev + next, 0);
    console.log(montoApuesta);
    console.log(inputArray);

    if (montoApuesta > saldo) {
        alert("No te alcanza la plata!!");
        return false;
    }
    else if (montoApuesta === 0) {
        alert("Tenes que apostar...");
        return false;
    }
    else {
        return montoApuesta;
    }
}

function calcularGanancias(numero, inputArray) {
    let ganancia = 0;
    if (inputArray[numero] > 0) {
        ganancia = inputArray[numero] * 36;
    }

    if(numerosRuleta.filter( x => coloresNums[parseInt(x)] === "rojo" ).includes(parseInt(numero))  ){
        ganancia += inputArray[37] * 2;
    }
    else if(numerosRuleta.filter( x => coloresNums[parseInt(x)] === "negro" ).includes(parseInt(numero))){
        ganancia += inputArray[38] * 2;
    }
    else{}

    return ganancia;
}

function girarRuleta() {
    let cantidadApostada = controlDeMontos(inputArray);
    if (cantidadApostada === false) { return; }
    let numero = obtenerNumero();
    ganancias = calcularGanancias(numero, inputArray);
    agregarUltimoNumero(numero, ultimosNumeros, coloresNums, cantidadApostada, saldo, ganancias, false);
    saldo = saldo - cantidadApostada + ganancias;
    mostrarUltimosNums(ultimosNumeros, coloresNums);
    actualizarSaldo();
}

/*
var img = document.querySelector('img');
img.addEventListener('click', onClick, false);


function onClick() {
    this.removeAttribute('style');
    var deg = 0 + Math.round(Math.random() * 360);
    var css = '-webkit-transform: rotate(' + deg + 'deg);';
    this.setAttribute(
        'style', css
    );
}*/