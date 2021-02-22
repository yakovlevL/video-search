import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  youtUrl = 'https://www.googleapis.com/youtube/v3/search?';
  apiKey = 'AIzaSyAgj4J2qQpeTl6HXxaFBUqTMB1Ui3PU91M';
  maxResult = '20';
  constructor(private http: HttpClient) {
  }

  getVideo(search: string): Observable<any> {
    return this.http.get(`${this.youtUrl}part=snippet&q=${search}&maxResults=${this.maxResult}&key=${this.apiKey}`);
  }
}
