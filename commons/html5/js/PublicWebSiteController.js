/*
 Dependencies:
  - jquery-1.8.2.js
  - literals.js
*/
var publicWebSiteController = function (){

    var viewLoaded = function(){

      //Load literals prior to any action
      L.loadLiterals(function(){

      //Select spanish as default language
      L.setCurrentLanguage('es'); 

      //Initialize mainController
      publicWebSiteController.viewWillAppear();

    },
    function(){
      //DO NOTHING
    });

      $("#login_form").submit(function(event){
          //Prevent Default
          event.preventDefault();          

          window.location = "web:"+k_PUBLIC_WEBSITE;
        });

    }

    var viewWillAppear = function(){
      //set literals
      setupLiterals();
    }

    //--------------------------------------------------------------
    // Private methods
    //--------------------------------------------------------------
    
    function setupLiterals(){

      //text
      $("#public_web_text").html(L.get("_publicWebSiteText"));

      //submit
      $("#login_form_submit").attr("value",L.get("_openPublicWeb"));

    }

    //Functions or variables returned here will be public (accessing like publicWebSiteController.viewLoaded())
    return {
      viewLoaded : viewLoaded,
      viewWillAppear : viewWillAppear
    };

}();