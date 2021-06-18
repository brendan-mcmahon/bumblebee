import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  userType: string;

  constructor(private router: Router){}

  ngOnInit(): void {
    if (!this.userType) this.router.navigate(['']);
  }

  navigate(userType: string) {
    this.userType = userType;
    this.router.navigate([userType])
  }
}
