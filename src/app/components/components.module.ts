import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { SlotMachineComponent } from './slot-machine/slot.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        HeaderComponent,
        MainComponent,
        SlotMachineComponent
    ],
    exports: [
        HeaderComponent,
        MainComponent,
        SlotMachineComponent
    ],
    entryComponents: [],
})

export class ComponentsModule {}
