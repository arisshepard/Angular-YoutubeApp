import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';
import { YoutubeResponse, Video, Item } from '../models/youtube.models';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class YoutubeService {
  private youtubeURL = 'https://www.googleapis.com/youtube/v3';
  private playList = 'UUuaPTYj15JSkETGnEseaFFg';
  private nextPageToken = '';
  private key = 'AIzaSyAyy61KupVXmG8hL_Sb319FAaCo3VidJOI';

  constructor(private http: HttpClient) {}

  getVideos(): Observable<Video[]> {
    const httpParams: HttpParams = new HttpParams()
      .set('part', 'snippet')
      .set('maxResults', '10')
      .set('playlistId', this.playList)
      .set('key', this.key)
      .set('pageToken', this.nextPageToken);

    // const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });

    const url = `${this.youtubeURL}/playlistItems`;

    return this.http
      .get<YoutubeResponse>(url, { params: httpParams })
      .pipe(
        map((respuesta: YoutubeResponse) => {
          this.nextPageToken = respuesta.nextPageToken;
          return respuesta.items;
        }),
        map((items) => {
          return items.map((video) => video.snippet);
        })
      );
  }
}
