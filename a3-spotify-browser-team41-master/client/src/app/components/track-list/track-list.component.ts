import { Component, OnInit, Input } from '@angular/core';
import { TrackData } from '../../data/track-data';

@Component({
  selector: 'app-track-list',
  templateUrl: './track-list.component.html',
  styleUrls: ['./track-list.component.css']
})
export class TrackListComponent implements OnInit {
	@Input() tracks:TrackData[];
	@Input() hideArtist:boolean = false;
	@Input() hideAlbum:boolean = false;

  constructor() { }

  ngOnInit() {
  }

  createLink(category:string, id:any) {
    return category+'/'+id;
  }

  durationStr(ms:number):string {
		var minutes:number = ms / 60000; //60 sec/min * 100ms/sec
		var seconds:number = (ms) / 1000 % 60; // 100ms/sec, get remainder
		return minutes.toFixed(0) + ':' + seconds.toFixed(0).padStart(2, '0');
	}

}
