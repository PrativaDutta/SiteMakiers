import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BannerComponent } from './banner/banner.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductFilterComponent } from './product-filter/product-filter.component';
import { ListingComponent } from './listing/listing.component';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CartComponent } from './cart/cart.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountComponent } from './account/account.component';
import { CustomerrorComponent } from './customerror/customerror.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { OrdersComponent } from './orders/orders.component';
import { DatePipe } from '@angular/common';
import { TransactionFailureComponent } from './transaction-failure/transaction-failure.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BannerComponent,
    HomeComponent,
    ProductFilterComponent,
    ListingComponent,
    ProductDetailsComponent,
    WishlistComponent,
    CheckoutComponent,
    CartComponent,
    SigninComponent,
    SignupComponent,
    AccountComponent,
    CustomerrorComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    UpdatePasswordComponent,
    OrdersComponent,
    TransactionFailureComponent,
   
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CarouselModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
    
    
  ],
  exports: [RouterModule],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
