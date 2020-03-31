document.addEventListener("DOMContentLoaded", function() {

  let date = new Date();
  let todaysDate = date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString().padStart(2, 0) + '-' + date.getDate().toString().padStart(2, 0);

  let dateSelector = document.querySelector('input[type="date"]');
  dateSelector.value = todaysDate;
  dateSelector.min = todaysDate;

  dateSelector.onchange = dateChange;

  function dateChange(e) {

    let dateValue = new Date(e.target.value);
    let day = dateValue.getDay();

    let timeSelector = document.querySelector('input[type="time"]');
    if(day > 0 && day < 6){
      timeSelector.min = "17:00";
      timeSelector.max = "22:00";
    } else {
      timeSelector.min = "12:00";
      timeSelector.max = "22:00";
    }
  }

});
