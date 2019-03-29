import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { GeocodeService } from './geocode.service';
import { Location } from './location-model';
import { } from 'googlemaps';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
})
export class AppComponent {
  @ViewChild('gmap') gmapElement: any;
  loading: boolean;
  public map: google.maps.Map;

  isTracking = false;
  distance: any;
  currentLat: any;
  currentLong: any;
  address: any;
  marker: google.maps.Marker;

  constructor(
    private geocodeService: GeocodeService,
    private ref: ChangeDetectorRef,
  ) { }

  showPosition(position) {
    this.currentLat = position.coords.latitude;
    this.currentLong = position.coords.longitude;

    let location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    var google_maps_geocoder = new google.maps.Geocoder();
   
    google_maps_geocoder.geocode(
      {'location': location},
      function (results, status) {
        if (status == google.maps.GeocoderStatus.OK && results[0]) {
          this.address = results[0].formatted_address;
          console.log(results[0].formatted_address);
        }
      }
    );

    //Calculate the distance from your address to any address
    const jacksonville = new google.maps.LatLng(40.730610, -73.935242);
    var distance = google.maps.geometry.spherical.computeDistanceBetween(location, jacksonville);
    console.log(distance);

    if (!this.marker) {
      this.marker = new google.maps.Marker({
        position: location,
        map: this.map,
        title: 'Got you!'
      });
    }
    else {
      this.marker.setPosition(location);
    }
  }

  trackMe() {
    if (navigator.geolocation) {
      this.isTracking = true;
      navigator.geolocation.watchPosition((position) => {
        this.showTrackingPosition(position);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  showTrackingPosition(position) {
    console.log(`tracking postion:  ${position.coords.latitude} - ${position.coords.longitude}`);
    this.currentLat = position.coords.latitude;
    this.currentLong = position.coords.longitude;

    let location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    this.map.panTo(location);

    if (!this.marker) {
      this.marker = new google.maps.Marker({
        position: location,
        map: this.map,
        title: 'Got you!'
      });
    }
    else {
      this.marker.setPosition(location);
    }
  }

  findMe() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.showPosition(position);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }


  ngOnInit() {
    this.findMe();
  }

  

  // showLocation() {
  //   this.addressToCoordinates();
  // }

  // addressToCoordinates() {
  //   this.loading = true;
  //   this.geocodeService.geocodeAddress(this.address)
  //   .subscribe((location: Location) => {
  //       this.location = location;
  //       this.loading = false;
  //       this.ref.detectChanges();  
  //     }      
  //   );     
  // }

}