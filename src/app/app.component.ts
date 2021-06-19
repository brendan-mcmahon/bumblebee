import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private router: Router, public dataService: DataService){}

  ngOnInit(): void {
    // if (!this.userType) this.router.navigate(['']);
  }

  navigate(userType: string) {
    this.dataService.userType = userType;
    this.router.navigate([userType])
  }
}
