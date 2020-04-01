/// <reference types="@types/googlemaps" />

export interface Restaurant {
    id: number;
    place: any;
    marker?: google.maps.Marker;
    selected?: boolean;
}
