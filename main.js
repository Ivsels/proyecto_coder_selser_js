
alert("Por favor lea las intrucciones sobre el uso de este aplicativo.");

const dolarOficial = 365.5; // Valor fijado por el Bco. Central
const pais = 30;
const ganancias = 45;
const bienesPersonales = 25;
const dolarMEP = 850; // Valor con AL30D
const dolarCCL = 950; // Valor con CEADERS

let correcto = false;
let montoDolar

do {
    let tipoDolar = prompt("Indique el tipo de dolar que desea utilizar (turista, Qatar, MEP, CCL): ").toLowerCase();
    console.log(tipoDolar);

    if (tipoDolar === "qatar" || tipoDolar === "turista" || tipoDolar === "mep" || tipoDolar === "ccl") {

        correcto = true;
        let cuadrito = document.getElementById("cuadroTexto");

        do{
            montoDolar = parseFloat(prompt("Indique el valor en dolares U$D que quiere convertir a pesos: "));
        }while (montoDolar == NaN);

        if (tipoDolar === "qatar") {
            let valorBase = dolarOficial * montoDolar;
            let impPais = valorBase * pais / 100;
            let impGanancias = valorBase * ganancias / 100;
            let impBienesPers = valorBase * bienesPersonales / 100;
            let total = valorBase + impPais + impGanancias + impBienesPers;
            textoFinal = "CALCULO DOLAR vs. PESOS (Qatar)\n\nDolares: " + montoDolar + " U$D\n\nDolar Oficial: $" + valorBase + "\nImpuesto PAIS (30%): $" + impPais + "\nImpuesto Ganancias (45%): $" + impGanancias + "\nImpuesto Bienes Pers. (25%): $" + impBienesPers + "\n\nTOTAL: $" + total;
            cuadrito.value = textoFinal;
            correcto = true;
        }

        else if (tipoDolar === "turista") {
            let valorBase = dolarOficial * montoDolar;
            let impPais = valorBase * pais / 100;
            let impGanancias = valorBase * ganancias / 100;
            let total = valorBase + impPais + impGanancias;
            textoFinal = "CALCULO DOLAR vs. PESOS (Turista/Tarjeta)\n\nDolares: " + montoDolar + " U$D\n\nDolar Oficial: $" + valorBase + "\nImpuesto PAIS (30%): $" + impPais + "\nImpuesto Ganancias (45%): $" + impGanancias + "\n\nTOTAL: $" + total;
            cuadrito.value = textoFinal;
            correcto = true;
        }

        else if (tipoDolar === "mep") {
            console.log()
            let valorBase = dolarOficial * montoDolar;
            let impPais = valorBase * pais / 100;
            let impGanancias = valorBase * ganancias / 100;
            let total = valorBase + impPais + impGanancias;
            textoFinal = "CALCULO DOLAR vs. PESOS (Turista/Tarjeta)\n\nDolares: " + montoDolar + " U$D\n\nDolar Oficial: $" + valorBase + "\nImpuesto PAIS (30%): $" + impPais + "\nImpuesto Ganancias (45%): $" + impGanancias + "\n\nTOTAL: $" + total;
            cuadrito.value = textoFinal;
            correcto = true;
        }

        else  { // CCL
            console.log("ccl");
            correcto = true;
        }
    }
    else {
        console.log("error");
        alert("Elija un dolar válido!!!")
    }
} while (correcto == false);  // Si no elige un dolar valido, se vuelve a preguntar.

