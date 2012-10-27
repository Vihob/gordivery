/*
 Dependencies:
  - jquery-1.8.2.js
  - literals.js
*/
var transactionsTagsController = function (){
	


    var viewLoaded = function(){

        //Load literals prior to any action
        L.loadLiterals(function(){

        //Select spanish as default language
        L.setCurrentLanguage('es'); 

        //Initialize mainController
        transactionsTagsController.viewWillAppear();
		utils.showAlertCallWithTitleAndMessage("Su compra se ha realizado con éxito","Ha ganado 150 puntos");
      },
      function(){
        //DO NOTHING
      });

    }

    var viewWillAppear = function(){
		setupView();
        utils.showActivityView();

    }

    //--------------------------------------------------------------
    // Private methods
    //--------------------------------------------------------------

    function setupView () {
		$("#tags_save_btn").click( function(){ onSaveClick() } );

    }


    function onSaveClick() {
      window.location = "closeModal:";
    }

    //--------------------------------------------------------------
    // Rest callbacks
    //--------------------------------------------------------------

    function onListReceived(data, statusCode){        
        if (data) {          
	         setupView(data);
        } 

        utils.hideActivityView();
    }

    function onListError(){
        utils.showAlertCallWithTitleAndMessage(L.get('_connectionError'),L.get('_checkNetworkSettings'));
        utils.hideActivityView();
    }

    //Functions or variables returned here will be public (accessing like transactionsListController.viewLoaded())
    return {
      viewLoaded : viewLoaded,
      viewWillAppear : viewWillAppear
    };

}();