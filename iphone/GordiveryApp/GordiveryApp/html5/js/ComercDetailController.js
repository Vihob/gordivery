/*
 Dependencies:
  - jquery-1.8.2.js
  - literals.js
*/
var comercDetailController = function (){
	
	var comercInfo;

    var viewLoaded = function(){

        //Load literals prior to any action
        L.loadLiterals(function(){

        //Select spanish as default language
        L.setCurrentLanguage('es'); 

      //Load disclaimerInfo stored data
      loadStoredData();

        //Initialize mainController
        comercDetailController.viewWillAppear();

      },
      function(){
        //DO NOTHING
      });

    }

    var viewWillAppear = function(){

		loadDetail();
		loadMap();
    }

    function loadStoredData(){
      //Get disclaimerInfo from localStorage
      comercInfo =  utils.retriveJSONParseWithLocalStorageKey( K_COMERC_DETAIL_OBJECT );
    }

	
	function onBuyClick( cellInfo) {

		window.location("push:"+"ComercDetail");
	}
	
	function loadDetail() {
		if (comercInfo.data.address != null) {
			$("#detail_location_adress").html(comercInfo.data.address.street +","+ comercInfo.data.address.number);
		}
	}
	
	function loadMap () {
		    var position = new google.maps.LatLng(comercInfo.data.location[0], comercInfo.data.location[1]);
		    var myOptions = {
		      zoom: 10,
		      center: position,
		      mapTypeId: google.maps.MapTypeId.ROADMAP
		    };
		    var map = new google.maps.Map(
		        document.getElementById("map_canvas"),
		        myOptions);

		    var marker = new google.maps.Marker({
		        position: position,
		        map: map,
		        title:""
		    });
	}


    //Functions or variables returned here will be public (accessing like comercController.viewLoaded())
    return {
      viewLoaded : viewLoaded,
      viewWillAppear : viewWillAppear
    };

}();