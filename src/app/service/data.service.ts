import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }

  getData() {
    return this.http.get('https://api.github.com/search/repositories?q=created:>2020-02-04&sort=stars&order=desc')
  }
}
