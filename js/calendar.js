let search = window.location.search.substring(6);
var year = new Date().getFullYear();
if (search) year = window.location.search.substring(6);

console.log(year);
var month,
  daysArray = [31, 0, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

calculateCalendar = () => {
  daysArray[1] = es_bisiesto(year) ? 29 : 28;
  var months = [];
  for (let i = 0; i < 12; i++) {
    months[i] = [];
    for (let j = 0; j < daysArray[i]; j++) {
      // TO DO calcular si es festivo aquí mismo
      months[i][j] = false;
    }
  }

  sundayEaster = getSundayEaster(year);

  months = setHolidays(months, sundayEaster);

  var calendar = document.getElementById("calendar");

  let weekNames = document.createElement("ul");
  let dayNames = ["Lu", "Ma", "Mi", "Ju", "Vi", "Sá", "Do"];
  for (name of dayNames) {
    let dayName = document.createElement("li");
    dayName.innerHTML = name;
    weekNames.appendChild(dayName);
  }

  for (monthI in months) {
    let monthD = document.createElement("div");
    monthD.classList.add("month");
    monthD.appendChild(weekNames.cloneNode(true));
    calendar.appendChild(monthD);

    let day = new Date(`${parseInt(monthI) + 1}/01/${year}`);

    let ul = document.createElement("ul");
    var firstDay = day.getDay();
    if (!firstDay) firstDay = 6;
    for (var i = 0; i < firstDay - 1; i++)
      ul.appendChild(document.createElement("li"));

    for (dayI in months[monthI]) {
      let li = document.createElement("li");
      li.innerHTML = parseInt(dayI) + 1;
      if (months[monthI][dayI]) li.classList.add("holiday");
      ul.appendChild(li);
      if (
        new Date(
          `${parseInt(monthI) + 1}/${parseInt(dayI) + 1}/${year}`
        ).getDay() == 0
      ) {
        monthD.appendChild(ul.cloneNode(true));
        ul = document.createElement("ul");
      }
    }
    while (ul.childElementCount < 7)
      ul.appendChild(document.createElement("li"));
    monthD.appendChild(ul);
  }

  var selectYear = document.getElementsByName("year")[0];
  for (let i = 2020; i < 2101; i++) {
    let option = document.createElement("option");
    option.innerHTML = i;
    if (i == year) option.selected = "true";
    selectYear.appendChild(option);
  }

  var moreYears = document.getElementById("more-years").children[1];
  let rangeYear = parseInt(year);
  if (rangeYear < 2023) rangeYear = 2023;
  for (let i = rangeYear - 3; i < rangeYear + 4; i++) {
    let anotherYear = document.createElement("a");
    anotherYear.innerHTML = i;
    anotherYear.rel = i > rangeYear ? "next" : "prev";
    anotherYear.href = `?year=${i}`;
    moreYears.appendChild(anotherYear);
  }
};

calculateCalendar();

/*
 TO DO GENERALES
 
 * Select año
 * Comprobar distintos años
 * Comprobar distintas zonas horarias
 

*/
