import { AnnonceService } from './../annonce.service';
import { Component, Input, OnInit } from '@angular/core';
import { Annonce } from '../annonce';

@Component({
  selector: 'app-liste-annonces',
  templateUrl: './liste-annonces.component.html',
  styleUrls: ['./liste-annonces.component.scss']
})
export class ListeAnnoncesComponent implements OnInit {
  annonces: Annonce[];
  page = 1;
  sort = "asc";
  singleAnnonce = false;
  annonceId = "";
  date= "";
  finished = true;

  constructor(private annonceService: AnnonceService) { }

  ngOnInit(): void {
    this.getAnnonces();
  }

  getAnnonces(): void {
    this.annonceService.getAnnoncesPage(this.page, this.sort).subscribe(result => {
      this.annonces = result["result"];
    })
  }

  changePage(page: number): void {
    this.page += page;
    if(this.page <= 0)
      this.page = 1;
    this.getAnnonces();
  }

  changeStatus(sort: string): void {
    this.sort = sort;
    this.page = 1;
    this.getAnnonces();
  }

  changeDate(date: string): void {
    if (date) {
      this.annonceService.getAnnoncesByDate(date).subscribe(result => {
        this.annonces = result["result"];
      })
    } else {
      this.getAnnonces();
    }
  }

  viewAnnonce(annonce: Annonce) {
    this.annonceId = annonce._id;
    this.finished = false;
    document.getElementsByTagName("table")[0].style.display = "none"
    this.singleAnnonce = !this.singleAnnonce;
  }

  statusChangedHandler(status: boolean) {
    this.finished = status;
    this.singleAnnonce = !this.singleAnnonce;
    this.getAnnonces();
  }
  
  delete(annonce: Annonce) {
    this.annonceService.deleteAnnonce(annonce._id).subscribe(result => this.getAnnonces())
  } 
}
