// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
let map, infoWindow;

let SCU = { lat: 37.3496, lng: -121.9390 }
const buildings = [
  {name: "Adobe Lodge", coord: [37.348644,-121.941811]},
  {name: "St. Clare Hall", coord: [37.352474,-121.94191]},
  {name: "Alumni Science Hall", coord: [37.35088,-121.940682]},
  {name: "Benson Center", coord: [37.347714,-121.939362]},
  {name: "SCDI: Bergin", coord: [37.348713,-121.939323]},
  {name: "Bronco Corner Bookstore", coord: [37.347767,-121.938797]},
  {name: "Stevens Stadium Buck Shaw Field", coord: [37.350563,-121.93647]},
  {name: "475 El Camino Real", coord: [37.351509,-121.935982]},
  {name: "Campisi Residence Hall", coord: [37.348023,-121.936531]},
  {name: "Casa Italiana Residence Hall", coord: [37.346912,-121.934998]},
  {name: "Vari Hall", coord: [37.350494,-121.939301]},
  {name: "Cowell Center", coord: [37.348225,-121.935623]},
  {name: "Physics Building", coord: [37.350311,-121.941284]},
  {name: "De Saisset Museum", coord: [37.350006,-121.940643]},
  {name: "Bannan Alumni House", coord: [37.348141,-121.940559]},
  {name: "Dunne Residence Hall", coord: [37.346775,-121.94101]},
  {name: "Facilities Building", coord: [37.346348,-121.93457]},
  {name: "Alameda Hall", coord: [37.346672,-121.936821]},
  {name: "Jesuit Community Residence", coord: [37.350887,-121.942444]},
  {name: "SCDI: Heafey", coord: [37.349087,-121.939514]},
  {name: "Kenna Hall", coord: [37.348362,-121.93985]},
  {name: "Kids on Campus", coord: [37.34676,-121.938194]},
  {name: "Leavey Center", coord: [37.349205,-121.93499]},
  {name: "Malley Center", coord: [37.348583,-121.936684]},
  {name: "Mayer Theatre", coord: [37.349693,-121.942528]},
  {name: "McLaughlin Residence Hall", coord: [37.347645,-121.940537]},
  {name: "Mission Church", coord: [37.349236,-121.941574]},
  {name: "MCC-Shapell Lounge", coord: [37.348106,-121.938988]},
  {name: "Music and Dance Facility", coord: [37.350086,-121.942513]},
  {name: "Nobili Residence Hall", coord: [37.349079,-121.942314]},
  {name: "O'Connor Hall", coord: [37.34993,-121.941521]},
  {name: "B-E - Main Parking structure ", coord: [37.3494,-121.937408]},
  {name: "Ricard Observatory", coord: [37.347851,-121.941025]},
  {name: "Sanfilippo Residence Hall", coord: [37.347542,-121.935944]},
  {name: "Swig Residence Hall", coord: [37.347084,-121.940033]},
  {name: "Walsh Administration Building", coord: [37.349369,-121.9403]},
  {name: "Walsh Residence Hall", coord: [37.347321,-121.9412]},
  {name: "St. Joseph's Hall", coord: [37.348705,-121.940903]},
  {name: "Varsi Hall", coord: [37.348156,-121.941414]},
  {name: "Kerr Alumni Park", coord: [37.350227,-121.934898]},
  {name: "Chemistry Building", coord: [37.350552,-121.940468]},
  {name: "Daly Science 200", coord: [37.350433,-121.940834]},
  {name: "Kennedy Mall", coord: [37.34734,-121.940323]},
  {name: "Tennis Center", coord: [37.348332,-121.935005]},
  {name: "Stanton Field", coord: [37.349693,-121.93631]},
  {name: "Mission Gardens", coord: [37.348789,-121.941284]},
  {name: "Sobrato Residence Hall", coord: [37.346878,-121.936134]},
  {name: "Santa Clara Mall", coord: [37.348023,-121.939674]},
  {name: "Sobrato Hall B", coord: [37.346539,-121.936073]},
  {name: "Bellomy Field", coord: [37.347576,-121.933838]},
  {name: "Schott Stadium", coord: [37.348644,-121.931702]},
  {name: "Loyola Hall", coord: [37.345802,-121.933197]},
  {name: "Main Entrance", coord: [37.35186,-121.93734]},
  {name: "Bellarmine Hall", coord: [37.34512,-121.935288]},
  {name: "Aquatic Center", coord: [37.348721,-121.935921]},
  {name: "Caltrain Station and Transit Center", coord: [37.353241,-121.93644]},
  {name: "832 Market Street", coord: [37.346684,-121.940064]},
  {name: "862 Market Street", coord: [37.346478,-121.940613]},
  {name: "553 Franklin Street", coord: [37.352241,-121.938143]},
  {name: "Learning Commons and Library", coord: [37.348438,-121.937805]},
  {name: "852 Market Street", coord: [37.346588,-121.940338]},
  {name: "Lucas Hall", coord: [37.35117,-121.939491]},
  {name: "Locatelli Center", coord: [37.34993,-121.935043]},
  {name: "CN-CW - Varsi Lot", coord: [37.348007,-121.941879]},
  {name: "B - Benson Lot", coord: [37.347084,-121.938576]},
  {name: "B - 874 Lafayette Building Lot", coord: [37.348568,-121.942993]},
  {name: "B - Old Alameda Lot", coord: [37.350857,-121.940239]},
  {name: "B - Cowell Lot", coord: [37.347778,-121.935356]},
  {name: "B - Facilities", coord: [37.346737,-121.934166]},
  {name: "B - Sobrato Lot", coord: [37.34576,-121.93573]},
  {name: "C - Casa Italiana Lot", coord: [37.347126,-121.934807]},
  {name: "C - Accolti Way", coord: [37.347977,-121.934372]},
  {name: "CW - Benson CW Lot", coord: [37.347054,-121.939026]},
  {name: "CW - Dunne Lot", coord: [37.346237,-121.940888]},
  {name: "F - Accolti Way", coord: [37.349182,-121.93367]},
  {name: "F - Leavey Center Lot", coord: [37.349487,-121.934197]},
  {name: "F - Loyola Hall Lot", coord: [37.346336,-121.932686]},
  {name: "B - Schott Stadium Lot", coord: [37.349217,-121.932304]},
  {name: "F - 990 Benton Lot", coord: [37.350689,-121.944161]},
  {name: "Solar Decathlon House, 2007", coord: [37.352207,-121.939041]},
  {name: "Solar Decathlon House, 2009", coord: [37.348801,-121.937203]},
  {name: "University Villas", coord: [37.349785,-121.931831]},
  {name: "Admission & Enrollment Services", coord: [37.349964,-121.938705]},
  {name: "Graham Hall", coord: [37.34734,-121.937325]},
  {name: "890 Benton Street", coord: [37.351021,-121.943596]},
  {name: "B-E - North Campus Garage", coord: [37.351509,-121.941658]},
  {name: "Forge Garden", coord: [37.352818,-121.939346]},
  {name: "V - Main Visitor Lot", coord: [37.350151,-121.938141]},
  {name: "D-V - University Villas Lot", coord: [37.350082,-121.932327]},
  {name: "B - O'Connor Lot", coord: [37.35038,-121.941979]},
  {name: "F - Schott Stadium South Lot", coord: [37.348026,-121.930359]},
  {name: "D-V - University Villas Visitor Parking", coord: [37.349754,-121.932427]},
  {name: "Soccer Training Center", coord: [37.350159,-121.935555]},
  {name: "Edward M. Dowd Art and Art History", coord: [37.351131,-121.941391]},
  {name: "Softball Field", coord: [37.348957,-121.933106]},
  {name: "Guadalupe Hall", coord: [37.350605,-121.934204]},
  {name: "Charney Hall", coord: [37.351273,-121.938644]},
  {name: "Alviso Mall", coord: [37.349361,-121.941055]},
  {name: "990 Benton Street", coord: [37.350662,-121.944717]},
  {name: "Finn Residence Hall", coord: [37.346077,-121.935753]},
  {name: "The Garage", coord: [37.352272,-121.941368]},
  {name: "Sobrato Campus for Discovery and Innovation", coord: [37.349068,-121.938545]},
  {name: "Athletic Excellence Center", coord: [37.348675,-121.934425]},
  {name: "Abby Sobrato Mall", coord: [37.349953,-121.939667]},
  {name: "St. Ignatius Lawn", coord: [37.348713,-121.940285]},
]

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: new google.maps.LatLng(SCU.lat,SCU.lng),
    zoom: 15,
  });

  // The marker, positioned at SCU, Santa Clara
  for (let i = 0; i < buildings.length; i++) {
    let marker = new google.maps.Marker({
      position: new google.maps.LatLng(buildings[i].coord[0],buildings[i].coord[1]),
      map: map,
      title: buildings[i].name
    });
  }
  infoWindow = new google.maps.InfoWindow();

  const locationButton = document.createElement("button");

  locationButton.textContent = "Pan to Current Location";
  locationButton.classList.add("custom-map-control-button");
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
  locationButton.addEventListener("click", () => {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          infoWindow.setPosition(pos);
          infoWindow.setContent("Location found.");
          infoWindow.open(map);
          map.setCenter(pos);
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}

window.initMap = initMap;