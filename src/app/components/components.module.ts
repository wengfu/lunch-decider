import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        HeaderComponent,
        MainComponent
    ],
    exports: [
        HeaderComponent,
        MainComponent
    ],
    entryComponents: [],
})

export class ComponentsModule {}