import { AnalyseService } from './../analyse.service';
import { AnnonceService } from './../annonce.service';
import { DetectimgComponent } from './../detectimg/detectimg.component';
import { EventEmitter, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Annonce } from '../annonce';


@Component({
  selector: 'app-dropzone',
  templateUrl: './dropzone.component.html',
  styleUrls: ['./dropzone.component.scss']
})
export class DropzoneComponent implements OnInit {
  img: Annonce;
  constructor(private fileService: AnalyseService) { }

  ngOnInit(): void {   
  }
  files: File[] = [];

  onSelect(event) {
    console.log(event);
    if(this.files.length === 1) {
      this.files = [];
    }
    this.files.push(...event.addedFiles);
    this.fileService.publishFiles(this.files);
  }
  
  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
}
