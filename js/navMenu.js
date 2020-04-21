$(function() {
  $(".toggle").on("click", function() {
    if ($(".item").hasClass("active")) {
      $(".item").removeClass("active");
      $(this).find("a").html("<i class='fas fa-bars'></i>");
      return false;
    } else {
      $(".item").addClass("active");
      $(this).find("a").html("<i class='fas fa-bars'></i>");
      return false;
    }
  });
});
