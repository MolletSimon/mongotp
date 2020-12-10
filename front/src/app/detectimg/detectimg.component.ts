import { Component, OnInit } from '@angular/core';
import * as coco from '@tensorflow-models/coco-ssd';
import * as tf from '@tensorflow/tfjs';
import * as backend from '@tensorflow/tfjs-backend-cpu';

@Component({
  selector: 'app-detectimg',
  templateUrl: './detectimg.component.html',
  styleUrls: ['./detectimg.component.scss']
})
export class DetectimgComponent implements OnInit {
  imageSrc = "localhost:4200/images/racoon.jpg"
  constructor() { }

  async ngOnInit(): Promise<void> {
    await this.detect()
  }

  async detect() {
    tf.setBackend("cpu");
    const img = document.getElementById('img') as HTMLImageElement;

    // Load the model.
    const model = await coco.load();

    // Classify the image.
    const predictions = await model.detect(img);

    console.log('Predictions: ');
    console.log(predictions);
  }

  

}
