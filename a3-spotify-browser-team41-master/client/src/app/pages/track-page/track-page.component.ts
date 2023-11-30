import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistData } from '../../data/artist-data';
import { TrackData } from '../../data/track-data';
import { AlbumData } from '../../data/album-data';
import { TrackFeature } from '../../data/track-feature';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-track-page',
  templateUrl: './track-page.component.html',
  styleUrls: ['./track-page.component.css']
})
export class TrackPageComponent implements OnInit {
	trackId:string;
	track:TrackData;
  audioFeatures:TrackFeature[];

  constructor(private route: ActivatedRoute, private spotifyService:SpotifyService) { }

  ngOnInit() {
  	this.trackId = this.route.snapshot.paramMap.get('id');
  	//TODO: Inject the spotifyService and use it to get the track data and it's audio features
    this.spotifyService.getTrack(this.trackId).then((res)=> {
      this.track = res;
    });
    this.spotifyService.getAudioFeaturesForTrack(this.trackId).then((res)=> {
      console.log(res);
      this.audioFeatures = res;
    });
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
