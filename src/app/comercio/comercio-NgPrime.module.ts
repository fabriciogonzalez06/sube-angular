import { NgModule } from "@angular/core";

import {CardModule} from 'primeng/card';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {SkeletonModule} from 'primeng/skeleton';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import { TagModule } from 'primeng/tag';
import {DialogModule} from 'primeng/dialog';
import { ChipModule } from 'primeng/chip';
import {DataViewModule} from 'primeng/dataview';
import {RatingModule} from 'primeng/rating';



@NgModule({
  imports:[
    CardModule,
    InputTextareaModule,
    InputTextModule,
    ButtonModule,
    SkeletonModule,
    OverlayPanelModule,
    TagModule,
    DialogModule,
    ChipModule,
    DataViewModule,
    RatingModule
  ],
  exports:[
    CardModule,
    InputTextareaModule,
    InputTextModule,
    ButtonModule,
    SkeletonModule,
    OverlayPanelModule,
    TagModule,
    DialogModule,
    ChipModule,
    DataViewModule,
    RatingModule
  ]
})
export class ComercioNgPrimeModule{}
