import { Component, OnInit } from '@angular/core';
import { Repo } from '../service/repo';
import { DataService } from '../service/data.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.css']
})
export class RepositoryComponent implements OnInit {

  public repositories: Repo[] = []; //table of type repo (repository) will contain the result of request api
  public pageNum =1 // the page number of the API link

  constructor(private dataService: DataService,private datepipe: DatePipe) { }

  ngOnInit() {
    this.getRepos(this.pageNum)
  }

  //onScroll is triggered when you scroll down the page
  onScroll(){
    this.getRepos(++this.pageNum)
  }
  
  //get the repositories from the api given the page number
  getRepos(pageNum:number) {
    this.dataService.getData(pageNum).subscribe(
      response => this.handleResponse(response),
      error => this.handleError(error)
    )
  }

  handleResponse(response: any): void {
    for (let i in response.items) {
      let repo = response.items[i];

      this.repositories.push({
        owner: repo.owner.login,
        avatar: repo.owner.avatar_url,
        name: repo.name,
        description: repo.description,
        stars: repo.stargazers_count,
        issues: repo.open_issues,
        submission: this.getSubmissionsDays(response.items[i].created_at),
      })
    }
  }

  //calculate the submissions days of the repo, by subtracting current date from creatd date of the repo
  getSubmissionsDays(date:Date):number{
    let createdDate=this.datepipe.transform(date,'MM/dd/yyyy');
    let currentDate = this.datepipe.transform(new Date(),'MM/dd/yyyy');
    let submissionDays = ((new Date(currentDate).getTime()-new Date(createdDate).getTime())/(1000 * 3600 * 24)).toFixed();
    return +submissionDays
  }
  handleError(error: any): void {
    console.log("Ops! API Problem : the page dosen't exist or you did much request to the API")
  }
}
