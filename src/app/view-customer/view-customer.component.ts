import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CustomerService } from './../../services/customer.service';

@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.css']
})
export class ViewCustomerComponent implements OnInit {


  id: any = ' ';
  constructor( private activeroute: ActivatedRoute , private cs: CustomerService) {
  }
  loading = false;
  res: any;
  panelOpenState = false;

  customerData: any;

  ngOnInit(): void {
    this.loading = true;
    this.activeroute.params.subscribe((params) => {
      this.id = params['id'];
      this.res = this.cs.getItemData(this.id);
      console.log(this.res);
      this.customerData = this.res;
      this.loading = false;
      console.log(this.id);
    }, err => {
      console.log(err);
    });
  }

  deleteAddress(add: any): any{
    console.log(this.id);
    this.cs.deleteAddress(this.id, add);
    this.ngOnInit();
  }

}
