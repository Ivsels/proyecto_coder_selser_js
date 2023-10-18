function calculaDolar(tipoDolar, montoDolar) {
    const dolarOficial = 365.5; 
    const pais = 30;
    const ganancias = 45;
    const bienesPersonales = 25;
    const dolarMEP = 850; 
    const dolarCCL = 950; 
    let textoFinal = "Error en el Calculo";

    if (tipoDolar === "qatar") {
        console.log("Qatar");
        let valorBase = dolarOficial * montoDolar;
        let impPais = valorBase * pais / 100;
        let impGanancias = valorBase * ganancias / 100;
        let impBienesPers = valorBase * bienesPersonales / 100;
        let total = valorBase + impPais + impGanancias + impBienesPers;
        textoFinal = "CALCULO DOLAR vs. PESOS (Qatar)\n\nDolares: " + montoDolar + " U$D\n\nDolar Oficial: $" + valorBase + "\nImpuesto PAIS (30%): $" + impPais + "\nImpuesto Ganancias (45%): $" + impGanancias + "\nImpuesto Bienes Pers. (25%): $" + impBienesPers + "\n\nTOTAL: $" + total;
    }

    else if (tipoDolar === "turista") {
        console.log("Turista");
        let valorBase = dolarOficial * montoDolar;
        let impPais = valorBase * pais / 100;
        let impGanancias = valorBase * ganancias / 100;
        let total = valorBase + impPais + impGanancias;
        textoFinal = "CALCULO DOLAR vs. PESOS (Turista/Tarjeta)\n\nDolares: " + montoDolar + " U$D\n\nDolar Oficial: $" + valorBase + "\nImpuesto PAIS (30%): $" + impPais + "\nImpuesto Ganancias (45%): $" + impGanancias + "\n\nTOTAL: $" + total;
    }

    else if (tipoDolar === "mep") {
        console.log("MEP");
        let valorFinal = dolarMEP * montoDolar;
        textoFinal = "CALCULO DOLAR vs. PESOS (MEP)\n\nDolares: " + montoDolar + " U$D\n\nCotización MEP: $" + dolarMEP + "\nBono operado: AL30" + "\n\nTOTAL: $" + valorFinal;
    }

    else { // CCL
        console.log("CCL");
        let valorFinal = dolarCCL * montoDolar;
        textoFinal = "CALCULO DOLAR vs. PESOS (CCL)\n\nDolares: " + montoDolar + " U$D\n\nCotización CCL: $" + dolarCCL + "\nBono operado: GD30" + "\n\nTOTAL: $" + valorFinal;
    }
    return textoFinal;
}

alert(`Por favor lea las intrucciones sobre el uso de este aplicativo.

1- Elija el tipo de Dolar (U$D) que desea utilizar.
2- Indique el monto, en Dolares (U$D), a convertir en su valor en Pesos ($).
3- Los cálculos aparecerán en la caja de texto.`);

let correcto = false;
let montoDolar

do {
    let tipoDolar = prompt("Indique el tipo de dolar que desea utilizar (turista, Qatar, MEP, CCL): ").toLowerCase();
    console.log(tipoDolar);

    if (tipoDolar === "qatar" || tipoDolar === "turista" || tipoDolar === "mep" || tipoDolar === "ccl") {

        correcto = true;

        do {
            montoDolar = parseFloat(prompt("Indique el valor en dolares U$D que quiere convertir a pesos: "));
        } while (isNaN(montoDolar));

        let cuadrito = document.getElementById("cuadroTexto");
        cuadrito.value = calculaDolar(tipoDolar, montoDolar);
    }
    else {
        console.log("error");
        alert("Elija un dolar válido!!!")
    }
} while (correcto == false); 

