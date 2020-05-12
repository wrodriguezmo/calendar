es_bisiesto = (year) =>{
    // TODO revisar lógica 
    return year % 4 == 0 && year % 100 != 0 || year % 400 == 0;
}

getEaster = (equinoccio) =>{ 
    tmpFullMoon = new Date(fullmoon);
    while (tmpFullMoon < equinoccio) {
        tmpFullMoon.setDate(tmpFullMoon.getDate() + (accum ? 30 : 29));
        accum = !accum
    }
    return tmpFullMoon
}

setSunday = (fullMoonEaster) =>{ 
    var day = fullMoonEaster.getDay();
    if (day !== 7) {
        fullMoonEaster.setHours(24 * (7-day));
    }
    return fullMoonEaster;
}

setHoliday = (date, months) => {
    months[date.getMonth()][date.getDate() - 1] = true;
    return months;
}

getNextMonday = (date) =>{ // Funcion si no es lunes, obtener Lunes proximo 
    while (date.getDay() != 1) {
        date.setDate(date.getDate() + 1);
    }
    return date;
}

setHolidays = (months, sunday) => {
    let mondays = ["01/06/", "03/19/", "06/29/", "08/15/", "10/12/", "11/01/", "11/11/"];
    for(monday of mondays)
        months = setHoliday(getNextMonday(new Date(monday+year)),months);
    
    let easter = [-3, -2, 43, 64, 71];
    for(e of easter){
        let tmp = new Date((new Date(sunday)).setDate(sunday.getDate()+e));
        months = setHoliday(tmp,months);
    }

    let fixD = ["01/01/", "05/01/", "07/20/", "08/07/", "12/08/", "12/25/"];
    for(day of fixD)
        months = setHoliday(new Date(day+year),months);

    return months;
}
