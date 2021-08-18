import { Router } from '@angular/router';
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
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent implements OnInit {

  constructor(private dialog: MatDialog, private fb: FormBuilder, private cs: CustomerService , private route: Router) {}

   customer: FormGroup;
   address: FormGroup;
   length = 0;
   words = [];
   gender = ['male' , 'female' ];
   nameField = '[a-zA-Z ]*';
   phoneNumber = '^[1-9][0-9]*';

   ngOnInit(): void{
     this.customer = new FormGroup({
      firstname : new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern(this.nameField)]),
      lastname : new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern(this.nameField)]),
      mobile : new FormControl('', [Validators.required, Validators.pattern(this.phoneNumber)]),
      email : new FormControl('', [Validators.required, Validators.email]),
     });
   }


  addAddress(): any {
    return this.fb.group({
      doorno : new FormControl('', [Validators.required, Validators.minLength(3)]),
      street : new FormControl('', [Validators.required, Validators.minLength(3)]),
      town : new FormControl('', Validators.required),
      city : new FormControl('', [Validators.required, Validators.minLength(3)]),
      postal : new FormControl('', [Validators.required, Validators.pattern(this.phoneNumber)]),
      state : new FormControl('', [Validators.required, Validators.minLength(3)])
    });
  }
  newAddress(): any {
    const control = this.customer.controls.address as FormArray;
    control.push(this.addAddress());
  }
  removeAddress(index): any {
    const control = this.customer.controls.address as FormArray;
    control.removeAt(index);
  }
   save(data): void {
     console.log(data);
     this.cs.createCustomer(data);
     this.route.navigate(['/home/all-customers']);
     this.customer.reset();
   }

}

