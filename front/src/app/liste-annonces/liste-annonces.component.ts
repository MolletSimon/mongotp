import { Component, OnInit } from '@angular/core';
import { Annonce } from '../annonce';
import { Annonces } from '../mock-annonces';

@Component({
  selector: 'app-liste-annonces',
  templateUrl: './liste-annonces.component.html',
  styleUrls: ['./liste-annonces.component.scss']
})
export class ListeAnnoncesComponent implements OnInit {
  annonces: Annonce[];

  constructor() { }

  ngOnInit(): void {
    this.getAnnonces();
  }

  getAnnonces(): void {
    this.annonces = Annonces;
  }
}
