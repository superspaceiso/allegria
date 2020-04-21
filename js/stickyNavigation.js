document.addEventListener("DOMContentLoaded", function() {
  window.onscroll = function() {addSticky()};

  function addSticky() {
    const navigation = document.getElementById("navArea");

    if (window.pageYOffset > 10) {
      navigation.style.position = "sticky";
      navigation.style.top = "0";
      navigation.style.borderBottom = "1px solid black";
      navigation.style.boxShadow = "0px 1px 5px 3px rgba(0,0,0,0.1)";
    } else {
      navigation.style.borderBottom = "none";
    }
  }
});
