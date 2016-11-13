var initMap = function(){

  map = new google.maps.Map(document.getElementById('map'),
    { center: {lat: 42.012763,  lng: -87.666944 },
    zoom:12

  });
};




var Model = function() {

var map;
};


var ViewModel = {

currentModel = ko.observable(new Model());

initMap();

};
