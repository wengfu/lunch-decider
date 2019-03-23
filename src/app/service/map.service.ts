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

    public setMarker(position, iconType?: string) {
        let icon;
        if (iconType) {
            icon = {
                url: `../../assets/icons/${iconType}.png`,
                scaledSize: new google.maps.Size(23, 32)
            };
        }
        return new google.maps.Marker({
            position: position,
            map: this._map,
            icon: icon
        });
    };
}