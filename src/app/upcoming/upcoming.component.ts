import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { User } from '../user';

@Component({
  selector: 'app-upcoming',
  templateUrl: './upcoming.component.html',
  styleUrls: ['./upcoming.component.css']
})
export class UpcomingComponent implements OnInit {

  matches;
  user;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getMatches().subscribe((matches: any) => {
      if(matches.data && matches.data.length) {
        this.matches = matches.data.map(m => {
          m['homeImg'] = this.getTeamImg(m.homeTeam);
          m['awayImg'] = this.getTeamImg(m.awayTeam);
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

  saveTeam(match, selectedTeam) {
    if(this.user && this.user.userId) {

      const userObj = {
        _id: match._id.$oid,
        userId: this.user.userId,
        selected: selectedTeam
      }
      this.apiService.setUserMatch(userObj).subscribe(res => {
        this.matches.map(m => {
          if(m._id.$oid == match._id.$oid) {
            if(m.users && m.users[this.user.userId] && m.users[this.user.userId].selected) {

            }
            if(!m.users) m.users = {};
            if(!m.users[this.user.userId]) m.users[this.user.userId] = {};
            m.users[this.user.userId].selected = selectedTeam;
          }
          return m;
        });
      });
    }
  }

  isSelected(match, selectedTeam) {
    if(match && match.users && match.users[this.user.userId] && match.users[this.user.userId].selected == selectedTeam) {
      return true;
    }
    return false;
  }

}
