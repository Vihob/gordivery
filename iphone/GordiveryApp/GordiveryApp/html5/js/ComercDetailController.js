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
    localStorage.setItem( k_COMERC_IDENT , cellInfo.comercInfo.commercID );
		window.location("push:"+"TransactionView");
	}
	
	function loadDetail() {

    $("#detail_logo_name").html(comercInfo.data.publicName);

		if (comercInfo.data.address != null) {
			$("#detail_location_adress").html(comercInfo.data.address.street +","+ comercInfo.data.address.number);
		}
	}
	
	function loadMap () {
      var latitude = comercInfo.data.location[0];
      var longitude = comercInfo.data.location[1];
      var coords = (latitude + ',' + longitude);
      var mapUrl = 'http://maps.googleapis.com/maps/api/staticmap?center='+latitude+','+longitude+'&zoom=15&size=600x600&maptype=roadmap&markers=color:blue%7Clabel:%7C'+latitude+','+longitude+'&sensor=true';

	$('#detail_location_map').attr('style', 'background:url('+mapUrl+') center center no-repeat');

	}


    //Functions or variables returned here will be public (accessing like comercController.viewLoaded())
    return {
      viewLoaded : viewLoaded,
      viewWillAppear : viewWillAppear
    };

}();