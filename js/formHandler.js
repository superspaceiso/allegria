document.addEventListener("DOMContentLoaded", function() {

  //Get JS date
  let date = new Date();
  //Format date into ISO8601 YYYY-MM-DD format.
  let todaysDate = date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString().padStart(2, 0) + '-' + date.getDate().toString().padStart(2, 0);

  //Get form input fields.
  let dateSelector = document.querySelector('input[type="date"]');
  let timeSelector = document.querySelector('input[type="time"]');
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

    //Changes the min and max values of the time field to prevent reservations outside of opening hours.
    if(day > 0 && day < 6){
      timeSelector.min = "17:00";
      timeSelector.max = "21:00";
    } else {
      timeSelector.min = "12:00";
      timeSelector.max = "21:00";
    }
  }

  //Gets the form
  const reservationForm = document.querySelector("form");

  //Listens for the form to obe submitted.
  reservationForm.addEventListener('submit', (e) => {
    //Prevents the form from firing by default.
    e.preventDefault();
    //creates a formdata object
    new FormData(reservationForm);
  });

  //waits for the form data
  reservationForm.addEventListener('formdata', (e) => {
    // Get the form data from the event object
    let data = e.formData;

    //submit the data via XHR
    let request = new XMLHttpRequest();

    request.onload = function () {
      //Gets div with ID notification.
      const notification = document.getElementById("notification");
      //Creates the P tag in the div.
      const notificationText = document.createElement("p");
      //Switch statement that checks the status of the form request.
      switch (request.status) {
        case 200:
          const notification200 = document.createTextNode("Message sent, we'll get back to you as soon as possible to confirm your reservation.");
          notificationText.appendChild(notification200);
          //Check if the p tag has already been created so on repeat entries of the form it doesn't add more text to the notification.
          if (!(notification.hasChildNodes())) {
            notification.appendChild(notification200);
          }
          //displays the div
          notification.style.display = "block";
          //div background colour
          notification.style.backgroundColor = "#3A8278";
          //sets a time out of the div to disappear after 30 seconds
          setTimeout(function(){notification.style.display = "none"; }, 30000);
          break;
        case 400:
          const notification400 = document.createTextNode("Message was unable to be sent please contact us directly through email or by telephone.");
          notificationText.appendChild(notification400);
          if (!(notification.hasChildNodes())) {
            notification.appendChild(notification400);
          }
          notification.style.display = "block";
          notification.style.backgroundColor = "#f70000";
          setTimeout(function(){notification.style.display = "none"; }, 30000);
          break;
        case 500:
          const notification500 = document.createTextNode("Message was unable to be sent please contact us through email or by telephone.");
          notificationText.appendChild(notification500);
          if (!(notification.hasChildNodes())) {
            notification.appendChild(notification500);
          }
          notification.style.display = "block";
          notification.style.backgroundColor = "#f70000";
          setTimeout(function(){notification.style.display = "none"; }, 30000);
          break;
      }
    };
    //initialises the send request with a post method and directs it to a PHP script that sends the email message
    request.open("POST", "mailer.php");
    //sends data
    request.send(data);
    //Resets the form inputs.
    reservationForm.reset();
    //Inserts the date after the form has been reset.
    dateSelector.value = todaysDate;
  });
});
