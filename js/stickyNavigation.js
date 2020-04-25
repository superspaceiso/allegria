document.addEventListener("DOMContentLoaded", function() {
  //When window scrolls add sticky to navigation.
  window.onscroll = function() {addSticky()};

  function addSticky() {
    //Get navigation
    const navigation = document.getElementById("navArea");

    //When window scrolls more than 10 pixels add sticky position to nav div or remove it when the scroll position returns to the top.
    if (window.pageYOffset > 10) {
      navigation.style.position = "sticky";
      navigation.style.top = "0";
      navigation.style.borderBottom = "1px solid black";
      navigation.style.boxShadow = "0px 1px 5px 3px rgba(0,0,0,0.1)";
    } else {
      navigation.style.borderBottom = "none";
      navigation.style.boxShadow = "none";
    }
  }
});
