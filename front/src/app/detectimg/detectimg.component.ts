import { AnnonceService } from './../annonce.service';
import { AnalyseService } from './../analyse.service';
import { DropzoneComponent } from './../dropzone/dropzone.component';
import { Component, Input, OnInit } from '@angular/core';
import * as coco from '@tensorflow-models/coco-ssd';
import * as tf from '@tensorflow/tfjs';
import * as backend from '@tensorflow/tfjs-backend-cpu';
import { NgxSpinnerService } from 'ngx-spinner';
import { ListeAnnoncesComponent } from '../liste-annonces/liste-annonces.component';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-detectimg',
  templateUrl: './detectimg.component.html',
  styleUrls: ['./detectimg.component.scss'],
  providers:[ListeAnnoncesComponent]
})
export class DetectimgComponent implements OnInit {
  detectionFinished = false;
  imageSrc = "localhost:4200/images/racoon.jpg"
  predictions = []; 
  file: File;
  constructor(
    private spinner: NgxSpinnerService, 
    private service: AnnonceService, 
    private fileService: AnalyseService,
    private annonceComp: ListeAnnoncesComponent
    ) { }

  async ngOnInit(): Promise<void> {
  }

  async detect() {
    const img = document.getElementsByTagName("img")[0] as HTMLImageElement;
    this.detectionFinished = false;
    this.spinner.show();
    tf.setBackend("cpu");

    // Load the model.
    const model = await coco.load();

    // Classify the image.
    const predictions = await model.detect(img);
    this.file = this.fileService.getFiles();
    this.service.getGIF(predictions[0].class).subscribe(result => console.log(result.data[0].embed_url));
    this.detectionFinished = true;
    this.spinner.hide();
    this.predictions = predictions;
  }

  save() {
    const date = new Date();
    this.service.saveImg({
      name: this.file.name,
      size: this.file.size,
      analyse: `${this.predictions[0].class} - ${Math.round((this.predictions[0].score * 100) * 100) / 100}%`,
      date: formatDate(date, 'yyyy-MM-dd', "en-US"),
      _id:null
    }).subscribe(result => {
      window.location.reload();
    })
  }

}
