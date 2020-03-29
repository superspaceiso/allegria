document.addEventListener("DOMContentLoaded", function(){
  console.log('DOM fully loaded and parsed');

  let requestURL = './menu.json';

  let request = new XMLHttpRequest();
  request.open('GET', requestURL);
  request.responseType = 'json';
  request.send();

  request.onload = function() {
    const menu = request.response;
    console.log(menu);

    const section = menu['menuSection'];

    section.forEach(key => {

      //Create Subheader Div
      let headDiv = document.createElement("div");
      headDiv.setAttribute("class", "subHead");

      //
      let mainDiv = document.getElementById("mainDiv");
      mainDiv.appendChild(headDiv);

      //Create Subheader H2
      let subHeader = document.createElement("h2");
      let node = document.createTextNode(key.name);
      subHeader.appendChild(node);

      //
      let headText = document.getElementsByClassName("subHead");

      for(i=0;i< headText.length; i++) {
        headText[i].appendChild(subHeader);
      }

      key['menuItem'].forEach(thing =>{
        let name = thing.head;
        let price = " \u20AC" + thing.price;
        let name_price = name + price;


        let itemDiv = document.createElement("div");
        itemDiv.setAttribute("class", "item");

        let athing = document.getElementById("mainDiv");
        athing.appendChild(itemDiv);


        //Create P tag
        var para = document.createElement("p");
        var info = document.createTextNode(name_price);
        para.appendChild(info);

        var desc = document.createElement("p");
        var desc_txt = document.createTextNode(thing.description);
        desc.appendChild(desc_txt);


        var element = document.getElementsByClassName("item");
        //itemDiv.appendChild(para);

        for(i=0;i< element.length; i++) {
          element[i].appendChild(para);
          element[i].appendChild(desc);
        }

      });

      console.log(key.name);
    });


  }

});
