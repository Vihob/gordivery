/*
 Dependencies:
  - jquery-1.8.2.js
  - literals.js
*/
var transactionController = function (){
	
	var comercId;

    var viewLoaded = function(){

        //Load literals prior to any action
        L.loadLiterals(function(){

        //Select spanish as default language
        L.setCurrentLanguage('es'); 

        //Load disclaimerInfo stored data
        loadStoredData();

        //Initialize mainController
        transactionController.viewWillAppear();

      },
      function(){
        //DO NOTHING
      });

    }

    var viewWillAppear = function(){

      utils.showActivityView();

      setupView();

      //restConsumer.getTransactionsList(comercId,onPayTokenReceived,onPayTokenError);
    }

    function loadStoredData(){
      //Get disclaimerInfo from localStorage
      comercId =  localStorage.getItem( k_COMERC_IDENT );
    }

    function setupView () {
      //Setup initial view and buttons
    }

    //--------------------------------------------------------------
    // Rest callbacks
    //--------------------------------------------------------------

    function onPayTokenReceived(data, statusCode){        
        if (data) {          
           //TODO: call to pay? waiting for reciving pay?
        } 

        utils.hideActivityView();
    }

    function onPayTokenError(){
        utils.showAlertCallWithTitleAndMessage(L.get('_connectionError'),L.get('_checkNetworkSettings'));
        utils.hideActivityView();
    }


    //Functions or variables returned here will be public (accessing like transactionController.viewLoaded())
    return {
      viewLoaded : viewLoaded,
      viewWillAppear : viewWillAppear
    };

}();