import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-points',
  templateUrl: './points.component.html',
  styleUrls: ['./points.component.css']
})
export class PointsComponent implements OnInit {

  constructor(private apiSerice: ApiService) { }

  points = [];

  ngOnInit(): void {
    this.apiSerice.getPoints().subscribe((points: any) => {
      if(points.statusCode == 200) {
        this.points = points.result;
      }
    })
  }

}
