import { EditProductDetailsComponent } from './edit-product-details/edit-product-details.component';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import { ViewCustomerComponent } from './view-customer/view-customer.component';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { ViewAllUsersComponent } from './view-all-users/view-all-users.component';
import { ShowProductDetailsComponent } from './show-product-details/show-product-details.component';
import { AuthGuardGuard } from './../guards/auth-guard.guard';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { ShowAllProductsComponent } from './show-all-products/show-all-products.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddNewProductComponent } from './add-new-product/add-new-product.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';
import { AddNewCategoryComponent } from './add-new-category/add-new-category.component';
import { CategoryDetailsComponent } from './category-details/category-details.component';
import { ViewAllCustomersComponent } from './view-all-customers/view-all-customers.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { ShowAllCategoriesComponent } from './show-all-categories/show-all-categories.component';



const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginDialogComponent },
  { path: 'home/dashboard', component: DashboardComponent },

  // product management
  { path: 'home/product-management/add-new-product', component: AddNewProductComponent },
  { path: 'home/product-management/all-products', component: ShowAllProductsComponent },
  { path: 'home/product-management/product-detail/:id', component: ShowProductDetailsComponent },
  { path: 'home/product-management/edit-product-details/:id', component: EditProductDetailsComponent },

  // User management
  { path: 'home/user-management/add-user', component: AddUserComponent },
  { path: 'home/user-management/all-users', component: ViewAllUsersComponent },
  {path: 'home/add-user', component: AddUserComponent},
  {path:'userdetail',component:UserDetailsComponent },

  

  { path: 'home/product-management/all-products', component: ShowAllProductsComponent, canActivate : [AuthGuardGuard] },
  { path: 'home/product-management/product-detail/:id', component: ShowProductDetailsComponent, canActivate : [AuthGuardGuard] },
  {path: 'home/add-user', component: AddUserComponent},
{path: 'home/category-management/add-new-category', component: AddNewCategoryComponent, canActivate : [AuthGuardGuard]},
{path: 'home/category-management/all-categories', component: ShowAllCategoriesComponent , canActivate : [AuthGuardGuard] },
{path: 'category-details', component: CategoryDetailsComponent, canActivate : [AuthGuardGuard]},
  // { path: '/login', redirectTo: 'login'}

 // Customer Management
  {path: 'home/add-customer', component: CreateCustomerComponent},
  {path: 'home/all-customers', component: ViewAllCustomersComponent},
  {path: 'home/view-customer/:id', component: ViewCustomerComponent},
  {path: 'home/edit-customer', component: EditCustomerComponent},
  { path: '**', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
