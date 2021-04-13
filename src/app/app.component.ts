import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ipl-fantasy';

  constructor(private apiService: ApiService, private router: Router){ }

  ngOnInit(): void {
    this.apiService.autoLogin();
    if(this.router.url === '/') {
      this.router.navigate(['/matches']);
    }
  }

  logout() {
    this.apiService.removeUser();
    this.router.navigate(['/authenticate']);
  }
}
