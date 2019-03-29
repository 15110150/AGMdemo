import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import { AgmCoreModule } from '@agm/core';
import { GeocodeService } from './geocode.service';
import {} from 'googlemaps';
import { MapsAPILoader } from "@agm/core";

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'API_KEY',
      libraries: ['geometry']
    })
  ],
  providers: [GeocodeService],
  declarations: [ AppComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}