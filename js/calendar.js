var month, year="2020", daysArray = [31, 0, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

var equinoccio = new Date("03/19/2020"); // TO DO fx() //pendiente
var accum = true, fullmoon = new Date("01/10/2020"); // acumalado .5


calculateCalendar = () => {
    daysArray[1] = es_bisiesto(year)?29:28;
    var months = [];
    for (let i = 0; i < 12; i++) {
        months[i] = [];
        for (let j = 0; j < daysArray[i]; j++) {
            // TO DO calcular si es festivo aquí mismo
            months[i][j] = false
        }
    }
    fullMoonEaster = getEaster(equinoccio);
    sundayEaster = setSunday(fullMoonEaster);

    months = setHolidays(months, sundayEaster)
    console.log(months)
}

calculateCalendar();



/*
 TO DO GENERALES
 
 * Comprobar distintas zonas horarias


*/