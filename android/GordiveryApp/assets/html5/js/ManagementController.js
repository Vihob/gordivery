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

        setupView();

    }

    //--------------------------------------------------------------
    // Private methods
    //--------------------------------------------------------------

    function setupView(){
        $("#manage_box_0").click( function(){ onCategoryClick(0) } );
        $("#manage_box_1").click( function(){ onCategoryClick(1) } );
        $("#manage_box_2").click( function(){ onCategoryClick(2) } );
        $("#manage_box_3").click( function(){ onCategoryClick(3) } );
        $("#manage_box_4").click( function(){ onCategoryClick(4) } );
    }

    function onCategoryClick(ident) {
        localStorage.setItem( k_CATEGORY_IDENT, ident);
        window.location = "push:"+"TransactionListView";
    }
    

    //Functions or variables returned here will be public (accessing like managementController.viewLoaded())
    return {
      viewLoaded : viewLoaded,
      viewWillAppear : viewWillAppear
    };

}();