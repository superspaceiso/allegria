document.addEventListener("DOMContentLoaded", function() {

  //Get JS date
  let date = new Date();
  //Format date into ISO8601 YYYY-MM-DD format.
  let todaysDate = date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString().padStart(2, 0) + '-' + date.getDate().toString().padStart(2, 0);

  //Get date input field.
  let dateSelector = document.querySelector('input[type="date"]');
  //Update values and the min date to the current date.
  dateSelector.value = todaysDate;
  dateSelector.min = todaysDate;

  //Check if date field has changed.
  dateSelector.onchange = dateChange;

  function dateChange(e) {
    //Convert field date into JS date.
    let dateValue = new Date(e.target.value);
    //Get the day of the week from the date.
    let day = dateValue.getDay();
    //Select time field.
    let timeSelector = document.querySelector('input[type="time"]');
    //Changes the min and max values of the time field to prevent reservations outside of opening hours.
    if(day > 0 && day < 6){
      timeSelector.min = "17:00";
      timeSelector.max = "22:00";
    } else {
      timeSelector.min = "12:00";
      timeSelector.max = "22:00";
    }
  }

});
