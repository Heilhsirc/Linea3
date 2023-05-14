import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-noauth',
  templateUrl: './noauth.component.html',
  styleUrls: ['./noauth.component.css']
})
export class NoauthComponent implements OnInit {

  constructor(public router : Router) { }

  ngOnInit(): void {
  }

}
