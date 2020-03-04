import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient,private datepipe: DatePipe) { }

  //execute request to github api
  //the first page is 1, also you get the fisr page even if you dont add &page=1
  getData(pageNum: number) {
    let api: string = `https://api.github.com/search/repositories?q=created:>${this.last30date()}&sort=stars&order=desc&page=${pageNum}`
    return this.http.get(api)
  }

   //subtract 30 days from current date
  last30date():string{
    let  date = new Date();
    date.setDate(date.getDate()-30);
    return this.datepipe.transform(date,'yyyy-MM-dd')
  }
}
