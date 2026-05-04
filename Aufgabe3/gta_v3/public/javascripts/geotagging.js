// File origin: VS1LAB A2

/* eslint-disable no-unused-vars */

// This script is executed when the browser loads index.html.

// "console.log" writes to the browser's console. 
// The console window must be opened explicitly in the browser.
// Try to find this output in the browser...
console.log("The geoTagging script is going to start...");

let tlongitude;
let tlatitude;
let dlongitude;
let dlatitude;

// Wait for the page to fully load its DOM content, then call updateLocation
document.addEventListener("DOMContentLoaded", () => {
    tlongitude = document.getElementById("tagging_longitude_input");
    tlatitude = document.getElementById("tagging_latitude_input");
    dlongitude = document.getElementById("discovery_longitude_input");
    dlatitude = document.getElementById("discovery_latitude_input");

    if(!tlongitude.value && !tlatitude.value) {
        alert("Updating Location");
        LocationHelper.findLocation(updateLocation);
    }
});

/**
 * TODO: 'updateLocation'
 * A function to retrieve the current location and update the page.
 * It is called once the page has been fully loaded.
 */
// ... your code here ...
function updateLocation(location) {
    const long = location.longitude;
    const lat = location.latitude;
    
    tlongitude.value = long;
    tlatitude.value = lat;
    dlongitude.value = long;
    dlatitude.value = lat;


    const mapManager = new MapManager();
    mapManager.initMap(location.latitude, location.longitude);

    const taglist_json = document.getElementById("map").dataset.tags;
    
    const taglist = JSON.parse(taglist_json);

    mapManager.updateMarkers(location.latitude, location.longitude, taglist);

    const image = document.getElementById("mapView");
    image.remove();

    const placeholder = document.getElementById("mapPlaceholder");
    placeholder.remove();
}