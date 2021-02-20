import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-skeleton-card',
  templateUrl: './skeleton-card.component.html',
  styleUrls: ['./skeleton-card.component.scss']
})
export class SkeletonCardComponent implements OnInit {

  @Input('cantidad') cantidad:number=5;

  constructor() {

    this.cantidadSkeleton = new Array(this.cantidad).fill({});
   }

  public cantidadSkeleton:number[];

  ngOnInit(): void {
  }

}
