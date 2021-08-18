import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from './../../services/customer.service';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import * as _ from 'lodash';




@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {

  constructor(private cs: CustomerService,  private fb: FormBuilder ,
              private activeroute: ActivatedRoute,
              private route: Router
    ) {}

   customer: FormGroup;
   address: FormGroup;
   length = 0;
   words = [];
   gender = ['male' , 'female' ];
   nameField = '[a-zA-Z ]*';
   phoneNumber = '^[1-9][0-9]*';
   res: any;
   customerData: any;
   id: any = ' ';
   loading = false;
   basic = true;
   addr = false;
   addAddr = false;
   edit = '';
   addno: any;
   isActive = 0;

   ngOnInit(): any{
    this.activeroute.queryParams.subscribe((params) => {
      this.id = params.id;
      this.edit = params.edit;
      console.log(this.id, this.edit);
      this.res = this.cs.getItemData(this.id);
      console.log(this.res);
      this.customerData = this.res;
      this.loading = false;
      this.isActive = this.res.status;
      if (this.edit === 'address'){
        this.basic = false;
        this.addr = true;
        this.addno = params.addno;
        this.address = new FormGroup({
          doorno : new FormControl('', [Validators.required, Validators.minLength(3)]),
          street : new FormControl('', [Validators.required, Validators.minLength(3)]),
          town : new FormControl('', Validators.required),
          city : new FormControl('', [Validators.required, Validators.minLength(3)]),
          postal : new FormControl('', [Validators.required, Validators.pattern(this.phoneNumber)]),
          state : new FormControl('', [Validators.required, Validators.minLength(3)])
        });
        const arr: [] = this.res.address;
        const data: any = arr[this.addno - 1];
        console.log(data);
        this.address.setValue({
          doorno: data.doorno,
          street: data.street,
          town: data.town,
          city: data.city,
          postal: data.postal,
          state: data.state
        });
      }
      else if (this.edit === 'add-address'){
        this.basic = false;
        this.addr = false;
        this.addAddr = true;
        this.address = new FormGroup({
          doorno : new FormControl('', [Validators.required, Validators.minLength(3)]),
          street : new FormControl('', [Validators.required, Validators.minLength(3)]),
          town : new FormControl('', Validators.required),
          city : new FormControl('', [Validators.required, Validators.minLength(3)]),
          postal : new FormControl('', [Validators.required, Validators.pattern(this.phoneNumber)]),
          state : new FormControl('', [Validators.required, Validators.minLength(3)])
        });
      }
    }, err => {
      console.log(err);
    });
    this.customer = new FormGroup({
      firstname : new FormControl('', [Validators.required, Validators.minLength(3)]),
      lastname : new FormControl('', [Validators.required, Validators.minLength(3)]),
      mobileno : new FormControl('', [Validators.required, Validators.pattern(this.phoneNumber)]),
      email : new FormControl('', [Validators.required, Validators.email]),
      status : new FormControl('', Validators.required)
     });
    this.customer.setValue({firstname: this.res.firstname
      , lastname: this.res.lastname,
      mobileno: this.res.mobile,
    email : this.res.email,
    status : this.res.status
    });
   }

   save(data): any {
     console.log(data);
     this.cs.editItemData(this.id, data);
     this.route.navigate(['/home/view-customer' , this.id]);
   }

   saveAddress(data): any{
    console.log(data);
    this.cs.editItemAddress(data, this.id , this.addno);
    this.route.navigate(['/home/view-customer' , this.id]);
   }

   addAddress(data: any): any {
    console.log(data);
    this.cs.addAddress(data, this.id);
    this.route.navigate(['/home/view-customer' , this.id]);
  }

}
