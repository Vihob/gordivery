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

      //Load disclaimerInfo stored data
      loadStoredData();

        //Initialize mainController
        comercController.viewWillAppear();

      },
      function(){
        //DO NOTHING
      });

    }

    var viewWillAppear = function(){

		loadDetail();
    }

    function loadStoredData(){
      //Get disclaimerInfo from localStorage
      comercInfo =  utils.retriveJSONParseWithLocalStorageKey( K_COMERC_DETAIL_OBJECT );
    }

	
	function onBuyClick( cellInfo) {

		window.location("push:"+"ComercDetail");
	}
	
	function loadDetail() {
		if (comercInfo.data.address != null)
		$("#detail_location_adress").innerHTML( comercInfo.data.address.street +","+ comercInfo.data.address.number);
	}


    //Functions or variables returned here will be public (accessing like comercController.viewLoaded())
    return {
      viewLoaded : viewLoaded,
      viewWillAppear : viewWillAppear
    };

}();