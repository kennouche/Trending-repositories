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

  //table of type repo (repository) 
  public repositories: Repo[] = [];

  constructor(private dataService: DataService,private datepipe: DatePipe) { }

  ngOnInit() {
    this.getRepos()
  }
  getRepos() {
    this.dataService.getData().subscribe(
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

  getSubmissionsDays(date:Date):number{
    let createdDate=this.datepipe.transform(date,'MM/dd/yyyy');
    let currentDate = this.datepipe.transform(new Date(),'MM/dd/yyyy');
    let submissionDays = ((new Date(currentDate).getTime()-new Date(createdDate).getTime())/(1000 * 3600 * 24)).toFixed();
    return +submissionDays
  }
  handleError(error: any): void {
    throw new Error("Method not implemented.");
  }

  
}
