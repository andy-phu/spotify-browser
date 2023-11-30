import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ArtistData } from '../data/artist-data';
import { AlbumData } from '../data/album-data';
import { TrackData } from '../data/track-data';
import { ResourceData } from '../data/resource-data';
import { ProfileData } from '../data/profile-data';
import { TrackFeature } from '../data/track-feature';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
	expressBaseUrl:string = 'http://localhost:8888';

  constructor(private http:HttpClient) { }

  private sendRequestToExpress(endpoint:string):Promise<any> {
    //TODO: use the injected http Service to make a get request to the Express endpoint and return the response.
    //the http service works similarly to fetch(). It may be useful to call .toPromise() on any responses.
    //update the return to instead return a Promise with the data from the Express server
    //Note: toPromise() is a deprecated function that will be removed in the future.
    //It's possible to do the assignment using lastValueFrom, but we recommend using toPromise() for now as we haven't
    //yet talked about Observables. https://indepth.dev/posts/1287/rxjs-heads-up-topromise-is-being-deprecated
    return firstValueFrom(this.http.get(this.expressBaseUrl + endpoint)).then((response) => {
        return response;
      }, (err) => {
        return err;
      });
  }

  aboutMe():Promise<ProfileData> {
    //This line is sending a request to express, which returns a promise with some data. We're then parsing the data 
    return this.sendRequestToExpress('/me').then((data) => {
      return new ProfileData(data);
    });
  }

  searchFor(category:string, resource:string):Promise<ResourceData[]> {
    //TODO: identify the search endpoint in the express webserver (routes/index.js) and send the request to express.
    //Make sure you're encoding the resource with encodeURIComponent().
    //Depending on the category (artist, track, album), return an array of that type of data.
    //JavaScript's "map" function might be useful for this, but there are other ways of building the array.
    let encodedResource: string = encodeURIComponent(resource);

    return this.sendRequestToExpress(`/search/${category}/${encodedResource}`).then((data) =>{ 
        if (category === "artist"){
          return data.artists.items.map((d: any) => new ArtistData(d));
        }
        else if (category === "track"){
          return data.tracks.items.map((d: any) => new TrackData(d));
        }
        else if (category === "album"){
          return data.albums.items.map((d: any) => new AlbumData(d));
        }
        console.log(data);
    }).catch((error)=>{
      console.error(error);
      return [];
    });
    

  }

  getArtist(artistId:string):Promise<ArtistData> {
    //TODO: use the artist endpoint to make a request to express.
    //Again, you may need to encode the artistId.

    let encodedArtistId: string = encodeURIComponent(artistId);
    //sends request to express server to the get artistID api and using that data to create
    //an artistData object

    return this.sendRequestToExpress(`/artist/${encodedArtistId}`).then((data) =>{
      return new ArtistData(data);
    }).catch((error) => {
      console.error(error);
      return null;
    });

  }

  getRelatedArtists(artistId:string):Promise<ArtistData[]> {
    //TODO: use the related artist endpoint to make a request to express and return an array of artist data.
    let encodedArtistId: string = encodeURIComponent(artistId);
    
    //returns an array of artist-related-artists ArtistData objects
    return this.sendRequestToExpress(`/artist-related-artists/${encodedArtistId}`).then((data)=>{
      return data.artists.map((d: any)=>new ArtistData(d));
    }).catch((error)=>{
      console.error(error);
      return []
    });
  }

  getTopTracksForArtist(artistId:string):Promise<TrackData[]> {
    //TODO: use the top tracks endpoint to make a request to express.
    let encodedArtistId: string = encodeURIComponent(artistId);

    //returns an array of artist-top-tracks Track objects

    return this.sendRequestToExpress(`/artist-top-tracks/${encodedArtistId}`).then((data) =>{
      return data.tracks.map((d: any)=>new TrackData(d));

    }).catch((error)=>{
      console.error(error);
      return []
    });

  }

  getAlbumsForArtist(artistId:string):Promise<AlbumData[]> {
    let encodedArtistId: string = encodeURIComponent(artistId);

    //TODO: use the albums for an artist endpoint to make a request to express.
    return this.sendRequestToExpress(`/artist-albums/${encodedArtistId}`).then((data) =>{
      console.log(data);
      return data.items.map((d: any)=>new AlbumData(d));
    }).catch((error)=>{
      console.error(error);
      return []
    });
  }

  getAlbum(albumId:string):Promise<AlbumData> {
    //TODO: use the album endpoint to make a request to express.
    let encodedAlbumId: string = encodeURIComponent(albumId);

    return this.sendRequestToExpress(`/album/${encodedAlbumId}`).then((data) =>{
      return new AlbumData(data);
    }).catch((error)=>{
      console.error(error);
      return null;
    });

  }

  getTracksForAlbum(albumId:string):Promise<TrackData[]> {
    //TODO: use the tracks for album endpoint to make a request to express.
    let encodedAlbumId: string = encodeURIComponent(albumId);

    return this.sendRequestToExpress(`/album-tracks/${encodedAlbumId}`).then((data) =>{
      return data.items.map((d: any)=>new TrackData(d));

    }).catch((error)=>{
      console.error(error);
      return [];
    });
  }

  getTrack(trackId:string):Promise<TrackData> {
    //TODO: use the track endpoint to make a request to express.

    let encodedTrackId: string = encodeURIComponent(trackId);

    return this.sendRequestToExpress(`/track/${encodedTrackId}`).then((data) =>{
      return new TrackData(data);
    }).catch((error)=>{
      console.error(error);
      return null;
    });

  }

  getAudioFeaturesForTrack(trackId:string):Promise<TrackFeature[]> {
    //TODO: use the audio features for track endpoint to make a request to express.
    let encodedTrackId: string = encodeURIComponent(trackId);

    return this.sendRequestToExpress(`/track-audio-features/${encodedTrackId}`).then((data) =>{
      let tracks = [];
      for (let i=0; i<TrackFeature.FeatureTypes.length; i++) {
        let feature = TrackFeature.FeatureTypes[i];
        let hold = new TrackFeature(feature, data[feature]);
        tracks.push(hold);
      }
      return tracks;
    });

  }
}