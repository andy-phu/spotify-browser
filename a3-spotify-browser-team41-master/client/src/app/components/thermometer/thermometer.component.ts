import { Component, OnInit, Input } from '@angular/core';
import { TrackFeature } from '../../data/track-feature';

@Component({
  selector: 'app-thermometer',
  templateUrl: './thermometer.component.html',
  styleUrls: ['./thermometer.component.css']
})
export class ThermometerComponent implements OnInit {
  //TODO: define Input fields and bind them to the template.
  @Input() track:TrackFeature;

  constructor() { }

  ngOnInit() {
  }

  getProperties() {
    return 'width: '+this.track.percentageString+'; background-color: '+this.track.color;
  }

}
