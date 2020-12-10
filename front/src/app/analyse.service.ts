import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnalyseService {
  img: any;
  file: File;
  constructor() { }

  publishFiles(files: File[]) {
    this.file = files[0];
  }

  getFiles() {
    return this.file;
  }
}
