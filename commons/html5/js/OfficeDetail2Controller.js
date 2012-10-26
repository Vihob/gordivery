/*
 Dependencies:
  - jquery-1.8.2.js
  - literals.js
  - utils.js
*/
var officeDetail2Controller = function (){

    var viewLoaded = function(){

      //Load literals prior to any action
      L.loadLiterals(function(){

        //Select spanish as default language
        L.setCurrentLanguage('es');

        //Initialize mainController
        officeDetail2Controller.viewWillAppear();

      },
      function(){
        //DO NOTHING
      });
        
    }

    var viewWillAppear = function(){

      utils.showActivityView();

      //Get office info with index 1
      restConsumer.getOfficeInfo(onGetOffice, onGetOfficeError, 1);
    }

    //--------------------------------------------------------------
    /**
    * Create a view with an office detail
    * @param officeInfo {Json} Office information in json format
    */
    function createOfficeDetailView ( officeInfo ){

      var page = $("#offices_page2");
      //Clearing page on reload
      page.html(null);

      //Title and description
      $(page).append('<div class="officeName">'+ officeInfo.name +'</div>');
      $(page).append('<div class="officeDescription">'+ officeInfo.description +'</div>');

      //Common html class and containers
      var containerClass = 'office_bloc_container';
      var officeCommonTitleClass = 'officeCommonTitle';
      var office_bloc_iconClass = 'office_bloc_icon';
      var officeCommonDescriptionClass = 'officeCommonDescription';
      var office_bloc_lineContainer = '<div class="office_bloc_line"></div>';

      //Telefones
      for (var index = 0; index < officeInfo.phones.length; index++) {
        var phone = officeInfo.phones[index];

        //Add href container to make call
        $(page).append('<div id="office_phone_'+index+'" class="'+containerClass+'"></div>');
        $("#office_phone_"+index).append('<div class="'+officeCommonTitleClass+'">'+ phone.name +'</div>');
        
        for(var phoneNumberIndex = 0; phoneNumberIndex < phone.phoneNumbers.length; phoneNumberIndex++) {
          var phoneNumber = phone.phoneNumbers[phoneNumberIndex];
          $("#office_phone_"+index).append('<a id="office_phone_call_'+index+phoneNumberIndex+'" class="office_phone_ahref" href="tel:'+phoneNumber+'"></a>');
          $("#office_phone_call_"+index+phoneNumberIndex).append('<div class="'+office_bloc_iconClass+' office_bloc_icon_phone"></div>');
          $("#office_phone_call_"+index+phoneNumberIndex).append('<div class="'+officeCommonDescriptionClass+'">'+ phoneNumber +'</div>');
          if (phoneNumberIndex < phone.phoneNumbers.length-1) {
            //Add <br> to all elements until last
            $("#office_phone_call_"+index+phoneNumberIndex).append('<br/>');
          }
        }
        
        $("#office_phone_"+index).append(office_bloc_lineContainer);
      }

      //Fax
      $(page).append('<div id="office_fax" class="'+containerClass+'"></div>');
      $("#office_fax").append('<div class="'+officeCommonTitleClass+'">'+ officeInfo.fax.name +'</div>');
      $("#office_fax").append('<div class="'+office_bloc_iconClass+' office_bloc_icon_fax"></div>');
      $("#office_fax").append('<div class="'+officeCommonDescriptionClass+'">'+ officeInfo.fax.description +'</div>');
      $("#office_fax").append(office_bloc_lineContainer);

      //Email
      $(page).append('<a id="office_email_send" class="office_mail_ahref" href="mailto:'+officeInfo.email.description+'"></a>');
      $("#office_email_send").append('<div id="office_email" class="'+containerClass+'"></div>');
      $("#office_email").append('<div class="'+officeCommonTitleClass+'">'+ officeInfo.email.name +'</div>');
      $("#office_email").append('<div class="'+office_bloc_iconClass+' office_bloc_icon_email"></div>');
      $("#office_email").append('<div class="'+officeCommonDescriptionClass+'">'+ officeInfo.email.description +'</div>');
      $("#office_email").append(office_bloc_lineContainer);

      //Schedules
      for (var index = 0; index < officeInfo.horariosSedes.length; index++) {
        var sede = officeInfo.horariosSedes[index];
        $(page).append('<div id="office_schedule_'+index+'" class="'+containerClass+'"></div>');
        $("#office_schedule_"+index).append('<div class="'+officeCommonTitleClass+'">'+ sede.cabecera +'</div>');
        $("#office_schedule_"+index).append('<div class="'+office_bloc_iconClass+' office_bloc_icon_schedule"></div>');
        for (var departmentIndex = 0; departmentIndex < sede.departments.length; departmentIndex++) {
          var department = sede.departments[departmentIndex];
          $("#office_schedule_"+index).append('<div class="'+officeCommonDescriptionClass+'">'+ department.title +'</div>');
          for (var scheduleIndex = 0; scheduleIndex < department.schedules.length; scheduleIndex++) {
            var schedule = department.schedules[scheduleIndex];
            $("#office_schedule_"+index).append('<div class="officeShceduleDescription">'+
            '<span class="schedule_name">'+schedule.name+'</span>' +
            ' '+ 
            '<span class="schedule_description">'+schedule.description+'</span>' +
             '</div>');
          }
        }        
        $("#office_schedule_"+index).append(office_bloc_lineContainer);
      }

      //Direction
      $(page).append('<div id="office_direction" class="'+containerClass+'"></div>');
      $("#office_direction").append('<div class="'+officeCommonTitleClass+'">'+ officeInfo.direction.name +'</div>');
      $("#office_direction").append('<div class="'+office_bloc_iconClass+' office_bloc_icon_direction"></div>');
      $("#office_direction").append('<div class="'+officeCommonDescriptionClass+'">'+ officeInfo.direction.description +'</div><br/>');

      //Map
      var systemPlatformConstant = "systemPlatformConstant";
      var latitude = officeInfo.direction.latitude;
      var longitude = officeInfo.direction.longitude;
      var coords = (officeInfo.direction.latitude + ',' + officeInfo.direction.longitude);
      var mapUrl = 'http://maps.googleapis.com/maps/api/staticmap?center='+latitude+','+longitude+'&zoom=15&size=640x640&maptype=roadmap&markers=color:blue%7Clabel:%7C'+latitude+','+longitude+'&sensor=true';
      $(page).append('<a id="office_open_map" class="office_map_ahref" href="maps:http://maps.'+systemPlatformConstant+'.com/maps?saddr='+k_USER_LOCATION_KEY+'+&daddr='+coords+'"></a>');
      $("#office_open_map").append(' <div class="office_map_image" style="background:url('+mapUrl+') center center no-repeat">' +
                        ' <div class="office_map_mark"></div>' +
                      ' </div>');

    }

    //--------------------------------------------------------------
    // Rest callbacks
    //--------------------------------------------------------------
    function onGetOffice(data, statusCode){
      if (data) {
        createOfficeDetailView ( data );
        saveStoredInfo(data);
      }
      utils.hideActivityView();
    }

    //--------------------------------------------------------------
    function onGetOfficeError(){      
      //Check if stored info exist
      loadStoredInfo();

      utils.hideActivityView();
    }

    //--------------------------------------------------------------
    // Store methods
    //--------------------------------------------------------------

    function saveStoredInfo(data){
      localStorage.setItem( k_OFFICES2_STORED_DATA_KEY, JSON.stringify( data ));
    }

    function loadStoredInfo(){

      var storedData = utils.retriveJSONParseWithLocalStorageKey( k_OFFICES2_STORED_DATA_KEY );
      if (storedData) {
        createOfficeDetailView ( storedData );
      } else {
        var page = $("#offices_page2");
        page.html(null);
        $(page).append('<div id="no_info" class="no_info">No info! TODO...</div>');
      };
    }


    //Functions or variables returned here will be public (accessing like officeDetail1Controller.viewLoaded())
    return {
      viewLoaded : viewLoaded,
      viewWillAppear : viewWillAppear
    };

}();