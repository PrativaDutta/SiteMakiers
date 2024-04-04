import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-transaction-failure',
  templateUrl: './transaction-failure.component.html',
  styleUrls: ['./transaction-failure.component.css']
})
export class TransactionFailureComponent implements OnInit {
  paymentStatus:any=1;
  transanctionId:any;
  token:any;
  header:any;
  constructor(private route: ActivatedRoute, private titleService: Title) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.header = {
      headers: {
        "Authorization": "Bearer " + this.token,
      }
    }
    this.route.data.subscribe(data => {
      // Set the title based on the data from the route
      this.titleService.setTitle(data.title);
    });
  }

}
