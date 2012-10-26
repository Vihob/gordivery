/*
 Dependencies:
  - jquery-1.8.2.js
  - literals.js
*/
var comercController = function (){

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
        if ( utils.isNotEmptyLocalStorageStringKey( user_token ) ) {
            utils.showActivityView();
            //Call rest method
        } else {
            //Show LoginView
            window.location = "push:"+k_LOGINL_VIEW_PATH;
        };

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

    //Functions or variables returned here will be public (accessing like comercController.viewLoaded())
    return {
      viewLoaded : viewLoaded,
      viewWillAppear : viewWillAppear
    };

}();