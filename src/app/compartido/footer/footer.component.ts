import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor() {
    this.anio= new Date().getFullYear();
  }

  public anio:number;

  ngOnInit(): void {
  }

}
