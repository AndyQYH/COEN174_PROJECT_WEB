// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let labelIndex = 0;
const SCU = { lat: 37.3496, lng: -121.9390 }
 
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script
// src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">


function initMap() {
  console.log("initMap")
  const map = new google
  .maps.Map(document.getElementById("map"), {
    mapTypeControl: false,
    center: SCU,
    zoom: 15,
  });

  // The marker, positioned at SCU, Santa Clara
  const markerSCU = new google.maps.Marker({
    position: SCU,
    label:"SCU",
    map: map,
  });

  // The marker, positioned at SCU, Santa Clara
  
  var i = 0
  var infowindow = new google.maps.InfoWindow();
  var buildingInfo = document.getElementById(`building${i}`);
  let directionsService = new google.maps.DirectionsService();
  let directionsRenderer = new google.maps.DirectionsRenderer();
  directionsRenderer.setMap(map);
  while (buildingInfo !== null) {
    console.log(buildingInfo.innerText)
    var building = JSON.parse(buildingInfo.innerText)
    console.log(building)
    const marker = new google.maps.Marker({
      position: {lat:Object.values(building)[0][0], lng:Object.values(building)[0][1]},
      map: map,
      label: labels[labelIndex++ % labels.length]
    });
    makeInfoWindowEvent(map, infowindow,Object.keys(building)[0], marker, markerSCU, directionsService, directionsRenderer);
    i++
    buildingInfo = document.getElementById(`building${i}`)
  }

  new AutocompleteDirectionsHandler(map);
}

function makeInfoWindowEvent(map, infowindow, contentString, marker, SCU, directionsService, directionsRenderer) {
  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(contentString);
    infowindow.open(map, marker);
    calcRoute(marker,SCU, directionsService, directionsRenderer)
  });
}

class AutocompleteDirectionsHandler {
  map;
  originPlaceId;
  destinationPlaceId;
  travelMode;
  directionsService;
  directionsRenderer;
  constructor(map) {
    this.map = map;
    this.originPlaceId = "";
    this.destinationPlaceId = "";
    this.travelMode = google.maps.TravelMode.DRIVING;
    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer();
    this.directionsRenderer.setMap(map);

    const originInput = document.getElementById("origin-input");
    const destinationInput = document.getElementById("destination-input");
    const modeSelector = document.getElementById("mode-selector");
    // Specify just the place data fields that you need.
    const originAutocomplete = new google.maps.places.Autocomplete(
      originInput,
      { fields: ["place_id"] }
    );
    // Specify just the place data fields that you need.
    const destinationAutocomplete = new google.maps.places.Autocomplete(
      destinationInput,
      { fields: ["place_id"] }
    );

    this.setupClickListener(
      "changemode-walking",
      google.maps.TravelMode.WALKING
    );
    this.setupClickListener(
      "changemode-transit",
      google.maps.TravelMode.TRANSIT
    );
    this.setupClickListener(
      "changemode-driving",
      google.maps.TravelMode.DRIVING
    );
    this.setupPlaceChangedListener(originAutocomplete, "ORIG");
    this.setupPlaceChangedListener(destinationAutocomplete, "DEST");
    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(originInput);
    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(
      destinationInput
    );
    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(modeSelector);
  }
  // Sets a listener on a radio button to change the filter type on Places
  // Autocomplete.
  setupClickListener(id, mode) {
    const radioButton = document.getElementById(id);

    radioButton.addEventListener("click", () => {
      this.travelMode = mode;
      this.route();
    });
  }
  setupPlaceChangedListener(autocomplete, mode) {
    autocomplete.bindTo("bounds", this.map);
    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();

      if (!place.place_id) {
        window.alert("Please select an option from the dropdown list.");
        return;
      }

      if (mode === "ORIG") {
        this.originPlaceId = place.place_id;
      } else {
        this.destinationPlaceId = place.place_id;
      }

      this.route();
    });
  }
  route() {
    if (!this.originPlaceId || !this.destinationPlaceId) {
      return;
    }

    const me = this;

    this.directionsService.route(
      {
        origin: { placeId: this.originPlaceId },
        destination: { placeId: this.destinationPlaceId },
        travelMode: this.travelMode,
      },
      (response, status) => {
        if (status === "OK") {
          me.directionsRenderer.setDirections(response);
        } else {
          window.alert("Directions request failed due to " + status);
        }
      }
    );
  }
}



function calcRoute(marker, SCU, directionsService, directionsRenderer) {

  var request = {
    origin:SCU.getPosition(),
    destination:marker.getPosition(),
    travelMode: google.maps.TravelMode.WALKING
  }

  directionsService.route(request, (response, status)=>{
    if(status == 'OK'){
      directionsRenderer.setDirections(response);
    }else {
      window.alert("Directions request failed due to " + status);
    }
  })
}

window.initMap = initMap









