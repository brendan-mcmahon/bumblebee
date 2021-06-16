import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocketService } from './socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  userType: string;

  constructor(private socketService: SocketService, private router: Router){}

  ngOnInit(): void {
    if (!this.userType) this.router.navigate(['']);
    this.socketService.hey();
  }

  navigate(userType: string) {
    this.userType = userType;
    this.router.navigate([userType])
  }
}
