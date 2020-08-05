es_bisiesto = (year) => {
  // TODO revisar lógica
  return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
};

function getSundayEaster(year) {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const n = h + l - 7 * m + 114;
  var mes = Math.floor(n / 31);
  var dia = 1 + (n % 31);

  var fme = new Date(`${mes}/${dia}/${year}`);

  return fme;
}

setHoliday = (date, months) => {
  months[date.getMonth()][date.getDate() - 1] = true;
  return months;
};

getNextMonday = (date) => {
  // Funcion si no es lunes, obtener Lunes proximo
  while (date.getDay() != 1) {
    date.setDate(date.getDate() + 1);
  }
  return date;
};

setHolidays = (months, sunday) => {
  let mondays = [
    "01/06/",
    "03/19/",
    "06/29/",
    "08/15/",
    "10/12/",
    "11/01/",
    "11/11/",
  ];
  for (monday of mondays)
    months = setHoliday(getNextMonday(new Date(monday + year)), months);

  let easter = [-3, -2, 43, 64, 71];
  for (e of easter) {
    let tmp = new Date(new Date(sunday).setDate(sunday.getDate() + e));
    months = setHoliday(tmp, months);
  }

  let fixD = ["01/01/", "05/01/", "07/20/", "08/07/", "12/08/", "12/25/"];
  for (day of fixD) months = setHoliday(new Date(day + year), months);

  return months;
};

goToYear = () => {
  let year = document.getElementById("year").children[1].value;
  console.log("Year: ", year);
  window.location.replace(`?year=${year}`);
};
