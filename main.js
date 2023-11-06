let saldo = 0;
const ultimosNumeros = [];
const ultimosNumeros2 = [];
const inputArray = [];
const coloresNums = ["verde", "rojo", "negro", "rojo", "negro", "rojo", "negro", "rojo", "negro", "rojo", "negro", "negro", "rojo", "negro",
    "rojo", "negro", "rojo", "negro", "rojo", "rojo", "negro", "rojo", "negro", "rojo", "negro", "rojo", "negro", "rojo", "negro",
    "negro", "rojo", "negro", "rojo", "negro", "rojo", "negro", "rojo"];
const numerosRuleta = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36]
const numerosYGrados = [
    { numero: 0, grados: 0 }, { numero: 32, grados: 10 }, { numero: 15, grados: 20 }, { numero: 19, grados: 30 },
    { numero: 4, grados: 40 }, { numero: 21, grados: 50 }, { numero: 2, grados: 60 }, { numero: 25, grados: 70 },
    { numero: 17, grados: 80 }, { numero: 34, grados: 90 }, { numero: 6, grados: 100 }, { numero: 27, grados: 110 },
    { numero: 13, grados: 120 }, { numero: 36, grados: 130 }, { numero: 11, grados: 140 }, { numero: 30, grados: 150 },
    { numero: 8, grados: 160 }, { numero: 23, grados: 170 }, { numero: 10, grados: 180 }, { numero: 5, grados: 190 },
    { numero: 24, grados: 200 }, { numero: 16, grados: 210 }, { numero: 33, grados: 220 }, { numero: 1, grados: 230 },
    { numero: 20, grados: 240 }, { numero: 14, grados: 250 }, { numero: 31, grados: 260 }, { numero: 9, grados: 270 },
    { numero: 22, grados: 280 }, { numero: 18, grados: 290 }, { numero: 29, grados: 300 }, { numero: 7, grados: 310 },
    { numero: 28, grados: 320 }, { numero: 12, grados: 330 }, { numero: 35, grados: 340 }, { numero: 3, grados: 350 },
].map(item => ({ ...item, grados: item.grados - 374 }));

class numeroDeLaRuleta {
    constructor(numero, color, saldoInicial, apuesta, ganancias, resultado) {
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

function limpiarCampos() {
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

        if (numerito <= 9) { texto += "  " + numerito + "\t"; }
        else { texto += "  " + numerito + "\t"; }

        if (color === "rojo") { texto += color + "\t\t"; }
        else { texto += color + "\t"; }

        if (resultado) { texto += "\tG\n"; }
        else { texto += "\tP\n"; }
    }
    let cuadroUltimosNums = document.getElementById("cuadroUltimosNums");
    cuadroUltimosNums.value = texto;
}

function controlDeMontos(inputArray) {
    inputArray.splice(0, inputArray.length)
    for (i = 0; i <= 38; i++) {

        if (i <= 36) { valor = document.getElementById("num" + (i)).value; }  // levanta valores de numeros
        else if (i === 37) { valor = document.getElementById("todoRojo").value; }  // valor de Rojo
        else if (i === 38) { valor = document.getElementById("todoNegro").value; } // valor de Negro
        else { console.log("ERROR"); }

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

    if (numerosRuleta.filter(x => coloresNums[parseInt(x)] === "rojo").includes(parseInt(numero))) {
        ganancia += inputArray[37] * 2;
    }
    else if (numerosRuleta.filter(x => coloresNums[parseInt(x)] === "negro").includes(parseInt(numero))) {
        ganancia += inputArray[38] * 2;
    }
    else { }

    return ganancia;
}

function girarRuleta() {
    let cantidadApostada = controlDeMontos(inputArray);
    if (cantidadApostada === false) { return; }
    let numero = obtenerNumero();
    animarRuleta(numero, 2000);
    ganancias = calcularGanancias(numero, inputArray);
    agregarUltimoNumero(numero, ultimosNumeros, coloresNums, cantidadApostada, saldo, ganancias, ganancias > 0);
    saldo = saldo - cantidadApostada + ganancias;
    mostrarUltimosNums(ultimosNumeros, coloresNums);
    actualizarSaldo();
    document.getElementById("botonGirar").disabled = true;
    document.getElementById("botonSaldo").disabled = true;

    sleep(4000).then(() => {
        reacomodarRuleta(0, 500);
        sleep(2000).then(() => {
            document.getElementById("botonGirar").disabled = false;
            document.getElementById("botonSaldo").disabled = false;
        });
    });
}
/*
function animarRuleta() {
    const rotated = document.getElementById("imgRuleta");
    rotated.style.transform = "rotate(900deg)";
}*/

function animarRuleta(numeroGanador, duration) {
    const resultado = numerosYGrados.find(item => item.numero === numeroGanador);

    const image = document.getElementById('imgRuleta');
    image.style.transition = `transform ${duration / 1000}s ease-in-out`;
    image.style.transform = `rotate(${720 - resultado.grados}deg)`;
}

function reacomodarRuleta(numeroGanador, duration) {
    const resultado = numerosYGrados.find(item => item.numero === numeroGanador);

    const image = document.getElementById('imgRuleta');
    image.style.transition = `transform ${duration / 1000}s ease-in-out`;
    image.style.transform = `rotate(${374 + resultado.grados}deg)`;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
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