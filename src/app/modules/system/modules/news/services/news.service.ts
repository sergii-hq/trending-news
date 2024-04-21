import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { INewsItem } from '../interfaces/news.interface';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private readonly apiUrl = 'https://hacker-news.firebaseio.com/v0';

  constructor(private http: HttpClient) {}

  getNews(): Observable<number[]> {
    return this.http.get<number[]>(`${this.apiUrl}/topstories.json`);
  }

  getNewsItem(itemId: number): Observable<INewsItem> {
    return this.http.get<INewsItem>(`${this.apiUrl}/item/${itemId}.json`);
  }
}
