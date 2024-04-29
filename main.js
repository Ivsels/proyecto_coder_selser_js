let saldo = 0; // Empezas con 100 pe
let ultimosNumeros = [];  // Sera un Array de Objetos
const inputArray = []; // Array de los inputs de Apuesta
const coloresNums = ["verde", "rojo", "negro", "rojo", "negro", "rojo", "negro", "rojo", "negro", "rojo", "negro", "negro", "rojo", "negro",
    "rojo", "negro", "rojo", "negro", "rojo", "rojo", "negro", "rojo", "negro", "rojo", "negro", "rojo", "negro", "rojo", "negro",
    "negro", "rojo", "negro", "rojo", "negro", "rojo", "negro", "rojo"];
const numerosRuleta = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36]
let regex = /^[a-zA-Z]+$/;  // Expresión regular que acepta solo letras sin espacios ni números

let user = {
    usuario: "",
    ultimosNumeros: [],
    saldo: 0
};

class numeroDeLaRuleta {  // Clase para generar objetos "numero" que van saliendo en la Ruleta
    constructor(numero, color, saldoInicial, apuesta, ganancias, resultado) {
        this.numero = numero;  // el numero q salio en la ruleta
        this.color = color;
        this.hora = Date.now();
        this.saldoInicial = saldoInicial;  // cuanta plata tenia el usuario cuando salio el numero
        this.ganancias = ganancias; // cuanto gano
        this.saldoFinal = saldoInicial + ganancias - apuesta;  // cuanto le quedo
        this.apuesta = apuesta; // cuanto apostó 
        this.resultado = resultado; // true ganó, false si perdió
    }

    static revivir(data) {
        return new numeroDeLaRuleta(data.numero, data.color, data.saldoInicial, data.apuesta, data.ganancias, data.resultado);
    }
}

function isFloat(n) {
    return n === +n && n !== (n | 0);
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
    guardarUsuario();
}

function limpiarCampos() {   // Limpiar inputs de apuestas
    for (i = 0; i <= 36; i++) {
        document.getElementById("num" + (i)).value = "";
    }
    document.getElementById("todoRojo").value = "";
    document.getElementById("todoNegro").value = "";
}

function obtenerNumero() {
    return Math.floor(Math.random() * (37 - 0));
}

function agregarUltimoNumero(nuevoNumero, ultimosNumeros, coloresNums, apuestaTotal, ultimoSaldo, ganancias, resultado) {
    const ULTIMOSNUMS_MAX = 15;
    if (ultimosNumeros.length > ULTIMOSNUMS_MAX) { ultimosNumeros.pop(); }
    ultimosNumeros.unshift(new numeroDeLaRuleta(nuevoNumero, coloresNums[parseInt(nuevoNumero)], ultimoSaldo, apuestaTotal, ganancias, resultado)); // true ganador, false perdedor
    console.log(ultimosNumeros);
}

function mostrarUltimosNums(ultimosNumeros, coloresNums) {
    texto = " Ultimos Numeros: \n\n";
    for (i = 0; i < ultimosNumeros.length; i++) {
        numerito = parseInt(ultimosNumeros[i].numero);
        color = coloresNums[numerito];
        resultado = ultimosNumeros[i].resultado;
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
    document.getElementById("botonGirar").disabled = true;
    document.getElementById("botonSaldo").disabled = true;

    sleep(4000).then(() => {  // Deshabilito botones para que el usuario no haga c***das
        mostrarUltimosNums(ultimosNumeros, coloresNums);
        actualizarSaldo();
        reacomodarRuleta(0, 500);
        sleep(600).then(() => {
            document.getElementById("botonGirar").disabled = false;
            document.getElementById("botonSaldo").disabled = false;
        });
    });

    guardarUsuario();
}

const numerosYGrados = [
    { numero: 0, grados: 354 }, { numero: 32, grados: 6 }, { numero: 15, grados: 15 }, { numero: 19, grados: 25 },
    { numero: 4, grados: 35 }, { numero: 21, grados: 45 }, { numero: 2, grados: 55 }, { numero: 25, grados: 65 },
    { numero: 17, grados: 75 }, { numero: 34, grados: 85 }, { numero: 6, grados: 95 }, { numero: 27, grados: 105 },
    { numero: 13, grados: 114 }, { numero: 36, grados: 124 }, { numero: 11, grados: 133 }, { numero: 30, grados: 142 },
    { numero: 8, grados: 151 }, { numero: 23, grados: 161 }, { numero: 10, grados: 171 }, { numero: 5, grados: 181 },
    { numero: 24, grados: 190 }, { numero: 16, grados: 199 }, { numero: 33, grados: 209 }, { numero: 1, grados: 218 },
    { numero: 20, grados: 227 }, { numero: 14, grados: 236 }, { numero: 31, grados: 246 }, { numero: 9, grados: 256 },
    { numero: 22, grados: 266 }, { numero: 18, grados: 276 }, { numero: 29, grados: 286 }, { numero: 7, grados: 296 },
    { numero: 28, grados: 306 }, { numero: 12, grados: 315 }, { numero: 35, grados: 324 }, { numero: 3, grados: 334 },
    { numero: 26, grados: 344 }
]

const numerosYGradosNegativos = numerosYGrados.map(item => {  // Para volver la ruleta a posición original
    return {
        numero: item.numero,
        grados: item.grados + 366
    };
});

function animarRuleta(numeroGanador, duration) {
    const resultado = numerosYGrados.find(item => item.numero === numeroGanador);
    const image = document.getElementById('imgRuleta');
    image.style.transition = `transform ${duration / 1000}s ease-in-out`;
    image.style.transform = `rotate(${720 - resultado.grados}deg)`;
}

function reacomodarRuleta(numeroGanador, duration) {
    const resultado = numerosYGradosNegativos.find(item => item.numero === numeroGanador);
    const image = document.getElementById('imgRuleta');
    image.style.transition = `transform ${duration / 1000}s ease-in-out`;
    image.style.transform = `rotate(${resultado.grados - 720}deg)`;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function guardarUsuario() {
    let data = {
        usuario: usuario,
        ultimosNumeros: ultimosNumeros.map(num => ({
            numero: num.numero,
            color: num.color,
            hora: num.hora,
            saldoInicial: num.saldoInicial,
            ganancias: num.ganancias,
            saldoFinal: num.saldoFinal,
            apuesta: num.apuesta,
            resultado: num.resultado
        })),
        saldo: saldo
    };
    localStorage.setItem(usuario, JSON.stringify(data));
}

function cargarUsuario(usuario) {
    const data = JSON.parse(localStorage.getItem(usuario));
    if (data) {
        user.usuario = data.usuario;
        ultimosNumeros.splice(0, ultimosNumeros.length, ...data.ultimosNumeros.map(item => numeroDeLaRuleta.revivir(item)));
        saldo = data.saldo;
    }
}

// ESTO SE EJECUTA APENAS CARGA LA WEB

function elegirUsuario() {
    do {
        usuario = prompt("Indique su nombre de usuario para guardar/recuperar su progreso:\n(Ej: Pedro, Maria, Diego, etc.)");
    } while (usuario == null || usuario == "" || regex.test(usuario) == false);

    datosUsuarioLS = localStorage.getItem(usuario);
    if (datosUsuarioLS !== null) {
        cargarUsuario(usuario);
        actualizarSaldo();
        limpiarCampos();
        mostrarUltimosNums(ultimosNumeros, coloresNums);
        alert("Datos recuperados!");
    } else {
        saldo = 0;
        user.saldo = saldo;
        user.usuario = usuario;
        ultimosNumeros.length=0;
        limpiarCampos();
        actualizarSaldo();
        mostrarUltimosNums(ultimosNumeros, coloresNums);
        guardarUsuario();
        alert("Nuevo usuario creado!");
    }

    let cuadroUsuario = document.getElementById("cuadroUsuario");
    cuadroUsuario.value = " Usuario: " + usuario;
}

elegirUsuario();