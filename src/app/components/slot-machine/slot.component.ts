import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Restaurant } from '../../models/restaurant.interface';

const ITEM_HEIGHT = 24;
const MIN_SPIN = 5;

@Component({
    selector: 'slot-machine',
    templateUrl: './slot.component.html',
    styleUrls: ['./slot.component.scss'],
    animations: [
        trigger('scroll', [
            transition('void => *', []),
            transition('* => *', [
                animate('0.5s'),
                style({
                    top: '{{ scrollHeight }}px'
                })
            ],
                {
                    params: {
                        scrollHeight: 0
                    }
                })
        ])
    ]
})

export class SlotMachineComponent implements OnInit, OnChanges {
    public itemHeight = ITEM_HEIGHT;
    public spinCount = 0;
    public extendedItemArray: Restaurant[] = [];
    public scrollHeight = 0;
    public state = true;

    @Input() itemArray: Restaurant[] = [];
    @Output() onHoverItem: EventEmitter<Restaurant> = new EventEmitter<Restaurant>();
    @Output() onLeaveItem: EventEmitter<Restaurant> = new EventEmitter<Restaurant>();

    ngOnInit(): void {
        this.generateList();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.itemArray) {
            this.generateList();
        }
    }

    public spinIt() {
        this.spinCount = Math.floor(Math.random() * this.itemArray.length) + MIN_SPIN;
        this.scrollHeight = -this.spinCount * this.itemHeight;
        this.state = !this.state;
    }

    public rotateItemArray() {
        const temp = this.extendedItemArray.splice(0, this.spinCount);
        this.extendedItemArray = this.extendedItemArray.concat(temp);
    }

    public onHover(r: Restaurant) {
        this.onHoverItem.emit(r);
    }

    public onLeave(r: Restaurant) {
        this.onLeaveItem.emit(r);
    }

    private generateList() {
        this.extendedItemArray = [...this.itemArray, ...this.itemArray];
    }
}
