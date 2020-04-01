/// <reference types="@types/googlemaps" />
import { Injectable } from '@angular/core';
import { MapService } from './map.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class RestaurantService {
    public placesService;

    public initService(map) {
        this.placesService = new google.maps.places.PlacesService(map);
    }

    public initRestaurants(center, radius): Observable<any> {
        const request = {
            location: center,
            radius,
            type: ['restaurant']
        };

        return Observable.create((observer) => {
            this.placesService.nearbySearch(request, (results, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    observer.next(results);
                }
            });
        });
    }
}
