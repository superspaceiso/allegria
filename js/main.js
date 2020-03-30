document.addEventListener("DOMContentLoaded", function(){
  let requestURL = './menu.json';

  let request = new XMLHttpRequest();
  request.open('GET', requestURL);
  request.responseType = 'json';
  request.send();

  request.onload = function() {
    const menu = request.response;
    console.log(menu);

    const section = menu['menuSection'];

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

      menuSection['menuItem'].forEach(menuItem =>{

        let name = menuItem.head;
        let vegetarian = menuItem.vegetarian;
        let price = "\u00A3" + menuItem.price;
        let subHeading = menuItem.subhead;
        let description = menuItem.description;

        if(vegetarian){
          console.log(name);
        }

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
        let menuItemHeaderDiv = document.createElement("div");
        menuItemHeaderDiv.setAttribute("class", "menuItemHeader");

        let menuItemPriceDiv = document.createElement("div");
        menuItemPriceDiv.setAttribute("class", "menuItemPrice");

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
        let menuItemHeaderText = document.createTextNode(name);
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
  }
});
