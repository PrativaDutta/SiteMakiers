import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListingComponent } from './listing/listing.component';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { AccountComponent } from './account/account.component';
import { CustomerrorComponent } from './customerror/customerror.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { PaymentFailureComponent } from './payment-failure/payment-failure.component';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';
import { TransactionFailureComponent } from './transaction-failure/transaction-failure.component';




const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'listing/:productId', component: ListingComponent },
  {path:'productdetails/:prodId',component:ProductDetailsComponent},
  {path:'wishlist',component:WishlistComponent},
  {path:'cart',component:CartComponent},
  {path:'checkout',component:CheckoutComponent},
  {path:'signup',component:SignupComponent},
  {path:'signin',component:SigninComponent},
  {path:'account',component:AccountComponent},
  {path:'lostpassword',component:ForgotPasswordComponent},
  {path:'reset-password/:email/:token',component:ResetPasswordComponent},
  {path:'updatepassword',component:UpdatePasswordComponent},
  {path:'payment-failure/:id',component:PaymentFailureComponent},
  {path:'payment-success/:id',component:PaymentSuccessComponent},
   {path:'transaction-failure/:id',component:TransactionFailureComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  //  {path:'**',component:CustomerrorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
