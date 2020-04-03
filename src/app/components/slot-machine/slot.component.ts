import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Restaurant } from '../../models/restaurant.interface';

@Component({
    selector: 'slot-machine',
    templateUrl: './slot.component.html',
    styleUrls: ['./slot.component.scss'],
})

export class SlotMachineComponent implements OnInit {
    public spinResult: Restaurant = null;

    @Input() itemArray: Restaurant[] = [];
    @Output() onHoverItem: EventEmitter<Restaurant> = new EventEmitter<Restaurant>();
    @Output() onLeaveItem: EventEmitter<Restaurant> = new EventEmitter<Restaurant>();

    ngOnInit(): void {}

    public spinRoulette() {
        this.spinResult = this.itemArray[Math.floor(Math.random() * this.itemArray.length)];
    }

    public onHover(r: Restaurant) {
        this.onHoverItem.emit(r);
    }

    public onLeave(r: Restaurant) {
        this.onLeaveItem.emit(r);
    }
}
