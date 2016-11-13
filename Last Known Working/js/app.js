
//Model
var map;
var markers = [];
// Map Locations
var locations = [
{title: 'El Famous Burrito', location: {lat: 42.149870, lng: -87.915673}, city: 'Wheeling'},
{title: 'Rocky\'s Tacos', location: {lat: 42.011598, lng: -87.663256}, city: 'Chicago'},
{title: 'Taco Nano!', location: {lat: 42.100821, lng: -87.768499},city: 'Northfield'},
{title: 'Burrito House', location: {lat: 42.040016, lng: -87.826469},city: 'Niles'},
{title: 'Tacos El Norte', location: {lat: 42.207408, lng: -87.812835},city: 'Highwood'}
];
//Sets up side menu
var menu = document.querySelector('#menu');
var main = document.querySelector('main');
var drawer = document.querySelector('#drawer');








//View
function initMap(){
  // Intilaizing the Google map
map = new google.maps.Map(document.getElementById('map'),
  { center: {lat: 42.012763,  lng: -87.666944 },
  zoom:12
});


// Declaring Knockout.JS observables and applying bindings
var vm = {
  array: ko.observableArray(),
  citys: ko.observableArray(),
  dropDown: ko.observable(),
  display: ko.observable(true)


};
ko.applyBindings(vm);




var largeInfowindow = new google.maps.InfoWindow();

var bounds = new google.maps.LatLngBounds();

// This loop sets up all map locations and drops markers
for(var i=0; i < locations.length; i++) {

  var position = locations[i].location;

  var title = locations[i].title;
// adding locations to array
vm.array.push(locations[i].title);
// adding city names to array
vm.citys.push(locations[i].city);

var marker = new google.maps.Marker({
    position: position,
    title: title,
    animation: google.maps.Animation.DROP,
    id: i
  });

    markers.push(marker);
    markers[i].setMap(map);
    bounds.extend(markers[i].position);

    marker.addListener('click', function() {
      populateInfoWindow(this, largeInfowindow);
    });
    map.fitBounds(bounds);
//drop marker
}

function populateInfoWindow(marker, infowindow) {
   //Check to make sure the infowindow is not already opened on this marker.
   if(infowindow.marker != marker) {
      infowindow.marker = marker;
      infowindow.setContent('<div>' + marker.title + '</div>');
      infowindow.open(map, marker);
      //Make sure the marker property is cleared if the infowindow is closed.
      infowindow.addListener('closeclick', function(){
         infowindow.setMarker(null);
      });
   }
}

















//ViewModel
// This checks what part of the drop down menu is selected

vm.dropDown.subscribe(function(selection){




// This checks if the "Choose City" element is selected in the drop down
if(vm.citys().indexOf(selection) === -1){

  for(var b = 0; b < markers.length; b++){
    markers[b].setMap(map);
  }
    vm.array.removeAll();

      for(var b =0;b < locations.length; b ++){
        vm.array.push(locations[b].title);
}
}

// This checks what city is selected in the drop down
if (vm.citys().indexOf(selection) > -1){

  for(var i = 0; i < markers.length; i++){
    markers[i].setMap(null);
  }

    vm.array.removeAll();

    vm.array.push(locations[vm.citys().indexOf(selection)].title);
    markers[vm.citys().indexOf(selection)].setMap(map);

}



});





}




// These are fuctions to control the side menu

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}
