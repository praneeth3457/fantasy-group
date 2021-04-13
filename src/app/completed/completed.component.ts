import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import {MatAccordion} from '@angular/material/expansion';

@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html',
  styleUrls: ['./completed.component.css']
})
export class CompletedComponent implements OnInit {

  @ViewChild(MatAccordion) accordion: MatAccordion;

  matches;
  user;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.completedMatches().subscribe((matches: any) => {
      if(matches.data && matches.data.length) {
        this.matches = matches.data.map(m => {
          m['homeImg'] = this.getTeamImg(m.homeTeam);
          m['awayImg'] = this.getTeamImg(m.awayTeam);

          let userKeys = Object.keys(m.users);
          m['users2'] = userKeys.map(k => m.users[k]);
          return m;
        });
      }
    });

    this.apiService.user.subscribe(user => {
      this.user = user;
    });
  }

  getTeamImg(team): string {
    let imgName;
    switch (team) {
      case "Chennai Super Kings":
        imgName = "csk.png";
        break;
      case "Delhi Capitals":
        imgName = "dc.png";
        break;
      case "Kolkata Knight Riders":
        imgName = "kkr.png";
        break;
      case "Mumbai Indians":
        imgName = "mi.png";
        break;
      case "Punjab Kings":
        imgName = "pk.png";
        break;
      case "Royal Challengers Bangalore":
        imgName = "rcb.png";
        break;
      case "Rajasthan Royals":
        imgName = "rr.png";
        break;
      case "Sunrisers Hyderabad":
        imgName = "srh.png";
        break;
      default:
        imgName = "ipl.png";
    }

    return imgName;
  }

  isSelected(match, selectedTeam) {
    if(match && match.users && match.users[this.user.userId] && match.users[this.user.userId].selected == selectedTeam) {
      return true;
    }
    return false;
  }

  isWinner(match, selectedTeam) {
    if(match && match.result == selectedTeam) {
      return true;
    }
    return false;
  }

}
