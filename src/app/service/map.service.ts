/// <reference types="@types/googlemaps" />
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class MapService {
    public _map: google.maps.Map;

    public initMap(mapContainerElement, defaultCenter) {
        this._map = new google.maps.Map(
            mapContainerElement,
            {
                center: defaultCenter,
                zoom: 16
            }
        );
    };

    public getMap() {
        return this._map;
    };

    public setMarker(position) {
        return new google.maps.Marker({
            position: position,
            map: this._map,
            // icon: {
            //     url: "http://maps.google.com/mapfiles/ms/icons/restaurant.png"
            // }
        });
    };
}