/// <reference types="@types/googlemaps" />
import { Injectable } from '@angular/core';

const iconTemplate = {
    labelOrigin: new google.maps.Point(0, 15)
};

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
    }

    public getMap() {
        return this._map;
    }

    public setMarker(position: any, iconType?: string) {
        let icon;
        if (iconType) {
            icon = Object.create(iconTemplate);
            Object.assign(icon, {
                url: `../../assets/icons/${iconType}.png`,
                scaledSize: new google.maps.Size(23, 32)
            });
        }
        return new google.maps.Marker({
            position: position,
            map: this._map,
            icon: icon
        });
    }

    public setIcon(marker: google.maps.Marker, iconType: string, large?: boolean) {
        let scaledSize: google.maps.Size;
        if (large) {
            scaledSize = new google.maps.Size(28, 40);
        } else {
            scaledSize = new google.maps.Size(23, 32);
        }
        const icon = Object.create(iconTemplate);
        Object.assign(icon, {
            url: `../../assets/icons/${iconType}.png`,
            scaledSize: scaledSize
        });
        marker.setIcon(icon);
    }
    
    // public setLabel(marker: google.maps.Marker, label: string) {
    //     if (label) {
    //         const icon = marker.getIcon();
    //         marker.setIcon(Object.assign(icon, {
    //             labelOrigin: new google.maps.Point(this.originOffsetOf(label.length), 15)
    //         }));
    //         marker.setLabel({
    //             color: '#d54930',
    //             text: label
    //         });
    //     } else {
    //         marker.setLabel(null);
    //     }
    // }

    // private originOffsetOf(length: number): number {}
}