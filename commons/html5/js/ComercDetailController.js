/*
 Dependencies:
  - jquery-1.8.2.js
  - literals.js
*/
var comercController = function (){
	
	var comercList = [];

    var viewLoaded = function(){

        //Load literals prior to any action
        L.loadLiterals(function(){

        //Select spanish as default language
        L.setCurrentLanguage('es'); 

        //Initialize mainController
        comercController.viewWillAppear();

      },
      function(){
        //DO NOTHING
      });

    }

    var viewWillAppear = function(){

        //Check is user logged
        var user_token = localStorage.getItem( k_USER_LOGIN_TOKEN );
        if (! utils.isNotEmptyLocalStorageStringKey( user_token ) ) {
            utils.showActivityView();
            //Call rest method
			restConsumer.getComerces(41.402391,2.194765,onListReceived,onListError);
        } else {
            //Show LoginView
            window.location = "push:"+k_LOGINL_VIEW_PATH;
        };

    }

    //--------------------------------------------------------------
    // Private methods
    //--------------------------------------------------------------
    function setupCell( cellInfo )
    {
	
	  var cell = $("<li class=near_list_element> </li>");
	  var img = $("<div class=\"near_li_img\" id=\"near_li_img\"><img src=\"../imgs/starbucks_cafe.png\"></div>");
      var comercName = $("<div class=\"near_li_name\">" + cellInfo.data.publicName + "</div>"); 
	  var address = "";
      if ( cellInfo.data.address != null ) {
		var address = cellInfo.data.address.street +","+ cellInfo.data.address.number;
	  }
      var addressLabel = $("<div class=\"near_li_description\">" + address + "</div>");
	  var distance = lineDistance(41.402391,2.194765,cellInfo.data.location[0],cellInfo.data.location[1]);
	  distance = parseFloat(distance)
      var distanceLabel = $("<div class=\"near_li_distance\"> "+distance.toFixed(0)+ "m" + "</div>");
      


      cell.append (img).append(comercName).append(addressLabel).append(distanceLabel);
      cell.click( function(){ onCommercCellClick( cellInfo ) } );

      return cell;
    }
    
	function lineDistance( lat1,lon1, lat2,lon2 )
	{
		//http://www.geodatasource.com/developers/javascript
		var radlat1 = Math.PI * lat1/180
		var radlat2 = Math.PI * lat2/180
		var radlon1 = Math.PI * lon1/180
		var radlon2 = Math.PI * lon2/180
		var theta = lon1-lon2
		var radtheta = Math.PI * theta/180
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		dist = Math.acos(dist)
		dist = dist * 180/Math.PI
		dist = dist * 60 * 1.1515
		dist = dist * 1609.344

		return dist
	}
	
	function onBuyClick( cellInfo) {

		window.location("push:"+"ComercDetail");
	}


    //Functions or variables returned here will be public (accessing like comercController.viewLoaded())
    return {
      viewLoaded : viewLoaded,
      viewWillAppear : viewWillAppear
    };

}();