//JSON file with menu contents.
let requestURL = './menu.json';

const request = new XMLHttpRequest();
request.open("GET", requestURL, true);
request.onload = function (e) {
  if (request.readyState === 4) {
    if (request.status === 200) {
      console.log(request.responseText);
    } else {
      console.error(request.statusText);
    }
  }
};
request.onerror = function (e) {
  console.error(request.statusText);
};
request.responseType = 'json';
request.send();

document.addEventListener("DOMContentLoaded", function(){

  request.onload = function() {
    //Get JSON from the response.
    const menu = request.response;

    //Select menu array.
    const section = menu['menuSection'];

    //Loop through the menu array.
    section.forEach(menuSection => {

      //Create Subheader Div
      let subHeaderDiv = document.createElement("div");
      subHeaderDiv.setAttribute("class", "subHeader");

      //Attach subheader div to section div
      let mainDiv = document.getElementById("menuDiv");
      mainDiv.appendChild(subHeaderDiv);

      //Create Subheader H3
      let subHeader = document.createElement("h3");
      let node = document.createTextNode(menuSection.name);
      subHeader.appendChild(node);

      //Get all subHeader divs by class name
      let getSubheaderDivHead = document.getElementsByClassName("subHeader");

      //Loop through all subHeader divs and attach subheader names
      for(let i=0;i< getSubheaderDivHead.length; i++) {
        getSubheaderDivHead[i].appendChild(subHeader);
      }

      //Create Menu Wrapper
      let menuWrapper = document.createElement("div");
      menuWrapper.setAttribute("class", "menuWrapper");

      let getSubheaderDivWrap = document.getElementById("menuDiv");
      getSubheaderDivWrap.appendChild(menuWrapper);

      //Loop through each item in a menu section.
      menuSection['menuItem'].forEach(menuItem =>{

        //Item name.
        let name = menuItem.head;
        //Is item vegetarian.
        let vegetarian = menuItem.vegetarian;
        //Item price.
        let price = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(menuItem.price);
        //Item subheading.
        let subHeading = menuItem.subhead;
        //Item description.
        let description = menuItem.description;

        //Create menu item div
        let itemDiv = document.createElement("div");
        itemDiv.setAttribute("class", "menuItem");

        //Get menu wrapper
        let getMenuWrapper = document.getElementsByClassName("menuWrapper");

        //Attach menu item div to menu wrapper
        for(let i=0;i< getMenuWrapper.length; i++) {
          getMenuWrapper[i].appendChild(itemDiv);
        }

        //Create menu item wrapper
        let menuItemWrapper = document.createElement("div");
        menuItemWrapper.setAttribute("class", "menuItemWrapper");

        //Get menu item divs
        let getMenuItem = document.getElementsByClassName("menuItem");

        for(let i=0;i< getMenuItem.length; i++) {
          getMenuItem[i].appendChild(menuItemWrapper);
        }

        //Create menu item divs
        //Header
        let menuItemHeaderDiv = document.createElement("div");
        menuItemHeaderDiv.setAttribute("class", "menuItemHeader");
        //Price
        let menuItemPriceDiv = document.createElement("div");
        menuItemPriceDiv.setAttribute("class", "menuItemPrice");
        //Description
        let menuItemDescriptionDiv = document.createElement("div");
        menuItemDescriptionDiv.setAttribute("class", "menuItemDescription");

        //Get menu item divs
        let getMenuItemWrapper = document.getElementsByClassName("menuItemWrapper");

        for(let i=0;i< getMenuItemWrapper.length; i++) {
          getMenuItemWrapper[i].appendChild(menuItemHeaderDiv);
          getMenuItemWrapper[i].appendChild(menuItemPriceDiv);
          getMenuItemWrapper[i].appendChild(menuItemDescriptionDiv);
        }

        let menuItemHeaderH4 = document.createElement('h4');

        ///checks if menu item is vegetarian or not and applies a symbol if it is
        if(vegetarian){
          var menuItemHeaderText = document.createTextNode(name + " \t\ud83e\udd6c");
        } else {
          var menuItemHeaderText = document.createTextNode(name);
        }

        menuItemHeaderH4.appendChild(menuItemHeaderText);

        let getMenuItemHeaderH4 = document.getElementsByClassName('menuItemHeader');

        for(let i=0;i< getMenuItemHeaderH4.length; i++) {
          getMenuItemHeaderH4[i].appendChild(menuItemHeaderH4);
        }

        let menuItemPrice = document.createElement('p');
        let menuItemPriceText = document.createTextNode(price);
        menuItemPrice.appendChild(menuItemPriceText);

        let getMenuItemPrice = document.getElementsByClassName('menuItemPrice');

        for(let i=0;i< getMenuItemPrice.length; i++) {
          getMenuItemPrice[i].appendChild(menuItemPrice);
        }

        let menuItemDescription = document.createElement('p');
        let menuItemDescriptionText = document.createTextNode(description);
        menuItemDescription.appendChild(menuItemDescriptionText);

        let getMenuItemDescription = document.getElementsByClassName('menuItemDescription');

        for(let i=0;i< getMenuItemDescription.length; i++) {
          getMenuItemDescription[i].appendChild(menuItemDescription);
        }
      });

    });

    //Create allergens notice div
    let allergensDiv = document.createElement("div");
    allergensDiv.setAttribute("id", "menuFooter");

    let mainDiv = document.getElementById("menuDiv");
    mainDiv.appendChild(allergensDiv);

    let allergensHead = document.createElement("h4");
    let allergensHeadText = document.createTextNode("Important Notice - Allergens");
    allergensHead.appendChild(allergensHeadText);

    let allergensDivP = document.createElement("p");
    let allergensDivPText = document.createTextNode("Please be advised despite our best efforts we cannot guarantee that our food is free from traces of, or free from environmental contaminations of allergens. (Including cereals containing gluten, peanuts, nuts, milk, soya, mustard, lupin, eggs, fish, crustaceans, molluscs, sesame seeds, celery, sulphur dioxide)");
    allergensDivP.appendChild(allergensDivPText);

    allergensDiv.appendChild(allergensHead);
    allergensDiv.appendChild(allergensDivP);

  }
});
