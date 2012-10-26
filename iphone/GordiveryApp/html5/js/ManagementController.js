/*
 Dependencies:
  - jquery-1.8.2.js
  - literals.js
*/
var managementController = function (){

    var viewLoaded = function(){

        //Load literals prior to any action
        L.loadLiterals(function(){

        //Select spanish as default language
        L.setCurrentLanguage('es'); 

        //Initialize mainController
        managementController.viewWillAppear();

      },
      function(){
        //DO NOTHING
      });

    }

    var viewWillAppear = function(){

    }

    //--------------------------------------------------------------
    // Private methods
    //--------------------------------------------------------------
    

    //--------------------------------------------------------------
    // Rest callbacks
    //--------------------------------------------------------------

    function onSampleDone(data, statusCode){        
        if (data) {          
          
        } 

        utils.hideActivityView();
    }

    function onSampleError(){
        utils.showAlertCallWithTitleAndMessage(L.get('_connectionError'),L.get('_checkNetworkSettings'));
        utils.hideActivityView();
    }

    //Functions or variables returned here will be public (accessing like managementController.viewLoaded())
    return {
      viewLoaded : viewLoaded,
      viewWillAppear : viewWillAppear
    };

}();