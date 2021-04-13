import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  constructor(private apiSerice: ApiService, private router: Router) { }

  isSignin = true;
  errorMsg = '';

  ngOnInit(): void {
  }

  register(form: NgForm) {
    if(form.value.registerName != '' && form.value.registerUsername != '' && form.value.registerPassword != '') {
      this.apiSerice.register({name: form.value.registerName, username: form.value.registerUsername, password: form.value.registerPassword}).subscribe(res => {
        this.isSignin = true;
      });
    }
  }

  signin(form: NgForm) {
    if(form.value.loginUsername != '' && form.value.loginPassword != '') {
      this.apiSerice.login({username: form.value.loginUsername, password: form.value.loginPassword}).subscribe(res => {
        if(res.statusCode == 200){
          this.router.navigate(['/matches']);
        } else if (res.statusCode == 500){
          this.errorMsg = res.status;
        }

      });
    }
  }

}
