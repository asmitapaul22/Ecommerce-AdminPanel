import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  customerData = [{ id: 1,
  firstname: 'name1', lastname: 'lastname1', mobile: 'mobile1', email: 'user1@gmail.com', status: 1 , address : [{
    doorno : 'doorno',
    street : 'street',
    town : 'town',
    city : 'city',
    postal : '12345',
    state : 'state'
  }, {
    doorno : 'doorno',
    street : 'street',
    town : 'town',
    city : 'city',
    postal : '12345',
    state : 'state'
  }],
  orders: ['order1', 'order2']},
  { id: 2,
   firstname: 'name2', lastname: 'lastname2', mobile: 'mobile2', email: 'user2@gmail.com', status: 1, address : [{
    doorno : 'doorno',
    street : 'street',
    town : 'town',
    city : 'city',
    postal : '12345',
    state : 'state'
  }, {
    doorno : 'doorno',
    street : 'street',
    town : 'town',
    city : 'city',
    postal : '12345',
    state : 'state'
  }],
  orders: ['order1', 'order2']},
  {id: 3,
  firstname: 'name3', lastname: 'lastname3', mobile: 'mobile3', email: 'user3@gmail.com', status: 0, address : [{
    doorno : 'doorno',
    street : 'street',
    town : 'town',
    city : 'city',
    postal : '12345',
    state : 'state'
  }, {
    doorno : 'doorno',
    street : 'street',
    town : 'town',
    city : 'city',
    postal : '12345',
    state : 'state'
  }],
  orders: ['order1', 'order2']},
  {id: 4,
   firstname: 'name4', lastname: 'lastname4', mobile: 'mobile4', email: 'user4@gmail.com', status: 0, address : [{
    doorno : 'doorno',
    street : 'street',
    town : 'town',
    city : 'city',
    postal : '12345',
    state : 'state'
  }, {
    doorno : 'doorno',
    street : 'street',
    town : 'town',
    city : 'city',
    postal : '12345',
    state : 'state'
  }],
  orders: ['order1', 'order2']},
  {id: 5,
   firstname: 'name5', lastname: 'lastname5', mobile: 'mobile5', email: 'user5@gmail.com', status: 1, address : [{
    doorno : 'doorno',
    street : 'street',
    town : 'town',
    city : 'city',
    postal : '12345',
    state : 'state'
  }, {
    doorno : 'doorno',
    street : 'street',
    town : 'town',
    city : 'city',
    postal : '12345',
    state : 'state'
  }],
  orders: ['order1', 'order2']},
  {id: 6,
   firstname: 'name6', lastname: 'lastname6', mobile: 'mobile6', email: 'user6@gmail.com', status: 1, address : [{
    doorno : 'doorno',
    street : 'street',
    town : 'town',
    city : 'city',
    postal : '12345',
    state : 'state'
  }, {
    doorno : 'doorno',
    street : 'street',
    town : 'town',
    city : 'city',
    postal : '12345',
    state : 'state'
  }],
  orders: ['order1', 'order2']}
  ];
  constructor() { }
  getData(): any{
    return this.customerData;
  }

  getItemData(num: number): any{
    return this.customerData[num - 1];
  }

  editItemData( num: number, data: any): any
  {
    this.customerData[num - 1].firstname = data.firstname;
    this.customerData[num - 1].lastname = data.lastname;
    this.customerData[num - 1].mobile = data.mobileno;
    this.customerData[num - 1].email = data.email;
    if (data.status === false){
      this.customerData[num - 1].status = 0;
    }
    else{
      this.customerData[num - 1].status = 1;
    }
    console.log(this.customerData);
  }

  editItemAddress(data: any, num: number , addno: number): any{
    this.customerData[num - 1].address[addno - 1].doorno = data.doorno;
    this.customerData[num - 1].address[addno - 1].street = data.street;
    this.customerData[num - 1].address[addno - 1].town = data.town;
    this.customerData[num - 1].address[addno - 1].city = data.city;
    this.customerData[num - 1].address[addno - 1].postal = data.postal;
    this.customerData[num - 1].address[addno - 1].state = data.state;
  }

  deleteAddress( num: number , addno: number): any{

    this.customerData[num - 1].address.splice(addno, 1);
  }

  addAddress(data: any, num: number): any{
    this.customerData[num - 1].address.push(data);
  }

  createCustomer(data: any): any{
    const l = this.customerData.length;
    data = {...data, id: l + 1 , status: 1 , orders: [] , address: []};
    console.log(data);
    this.customerData.push(data);
  }
}
