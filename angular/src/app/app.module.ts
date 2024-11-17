import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomePageComponent } from './dashboard/home-page/home-page.component';
import { ProductsPageComponent } from './dashboard/product/products-page/products-page.component';
import { ProviderssPageComponent } from './dashboard/provider/providerss-page/providerss-page.component';
import { NavigationBarComponent } from './dashboard/navigation-bar/navigation-bar.component';
import { FacturePageComponent } from './dashboard/facture-page/facture-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CategorysComponent } from './ProductManagement/categorys/categorys.component';
import { ProductsComponent } from './ProductManagement/products/products.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ProvidersManagementComponent } from './providers-management/providers-management.component';
import { OrderManagementComponent } from './order-management/order-management.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { UserListComponent } from './user-list/user-list.component';
import { MatDialogModule } from '@angular/material/dialog';
import { EditUserModalComponent } from './edit-user-modal/edit-user-modal.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RedirectComponent } from './redirect/redirect.component';
import { ClaimManagmentComponent } from './claim-managment/claim-managment.component';
import { AddClaimComponent } from './add-claim/add-claim.component'; // Add this import

@NgModule({
  declarations: [
    AppComponent,
    ProductsPageComponent,
    HomePageComponent,
    ProviderssPageComponent,
    NavigationBarComponent,
    FacturePageComponent,
    CategorysComponent,
    ProductsComponent,
    ProvidersManagementComponent,
    OrderManagementComponent,
    RegisterComponent,
    LoginComponent,
    UserListComponent,
    EditUserModalComponent,
    RedirectComponent,
    ClaimManagmentComponent,
    AddClaimComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    MatSnackBarModule,
    BrowserAnimationsModule
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
