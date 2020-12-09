import { AnnonceService } from './../annonce.service';
import { Component, Input, OnInit } from '@angular/core';
import { Annonce } from '../annonce';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-annonce',
  templateUrl: './annonce.component.html',
  styleUrls: ['./annonce.component.scss']
})
export class AnnonceComponent implements OnInit {

  @Input() annonceId: string;
  @Output() statusChanged: EventEmitter<boolean> = new EventEmitter();
  annonce: Annonce;

  constructor(private annonceService: AnnonceService) { }

  ngOnInit(): void {
    this.annonceService.getAnnonce(this.annonceId).subscribe(result => {
      this.annonce= result["result"];
    })
  }

  deleteAnnonce(): void {
    this.annonceService.deleteAnnonce(this.annonceId).subscribe(result => {
      this.statusChanged.emit(true);
    });
  }

  updateAnnonce(): void {
    this.annonceService.updateAnnonce(this.annonce).subscribe(result => {
      this.statusChanged.emit(true);
    })
  }

  back(): void {
    this.statusChanged.emit(true);
  }

}
