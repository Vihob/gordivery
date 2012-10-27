/*
 Dependencies:
  - jquery-1.8.2.js
  - literals.js
*/
var transactionsListController = function (){
	
	var comercList = [];

    var viewLoaded = function(){

        //Load literals prior to any action
        L.loadLiterals(function(){

        //Select spanish as default language
        L.setCurrentLanguage('es'); 

        //Initialize mainController
        transactionsListController.viewWillAppear();

      },
      function(){
        //DO NOTHING
      });

    }

    var viewWillAppear = function(){

        utils.showActivityView();

        var categoryIdent = localStorage.getItem( k_CATEGORY_IDENT );

        restConsumer.getTransactionsList(categoryIdent,onListReceived,onListError);
    }

    //--------------------------------------------------------------
    // Private methods
    //--------------------------------------------------------------

    function setupView (view_info) {

      var header = $('<li class="man_detail_header" id="man_detail_header"></li>');

      var headBox = $('<div class="man_det_head_box" id="man_det_head_box"></div>');
      var icon = $('<div class="man_det_box_icon" id="man_det_box_icon"></div>');
      var title = $('<div class="man_det_box_title" id="man_det_box_title">'+L.get('_gastosAcumulados')+'</div>');
      var subtitle = $('<div class="man_det_box_subtitle" id="man_det_box_subtitle">'+view_info.title+'</div>'); 
      var amount = $('<div class="man_det_box_num" id="man_det_box_num">'+view_info.amount+'</div>');
      headBox.append(icon);
      headBox.append(title);
      headBox.append(subtitle);
      headBox.append(amount);

      header.append(headBox);

      $("#man_detail_list").append(header);

      for (var i=0; i<view_info.list.length; i++){
        var cellInfo = view_info.list[i];
        $("#man_detail_list").append( setupCell(cellInfo) );
      }

    }

    function setupCell( cellInfo ){
	
  	  var cell = $('<li class="man_det_list_item" id="man_det_list_item"></li>');

      var date = $('<div class="man_det_li_date" id="man_det_li_date" >'+cellInfo.date+'</div>');
      var name = $('<div class="man_det_li_name" id="man_det_li_name">'+cellInfo.name+'</div>');
      var num = $('<div class="man_det_li_num" id="man_det_li_num" >'+cellInfo.amoun+'</div>');
      var points = $('<div class="man_det_li_points" id="man_det_li_points" >'+cellInfo.points+' '+L.get('_puntos')+'</div>');

      cell.append(date).append(name).append(num).append(points);

      return cell;
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