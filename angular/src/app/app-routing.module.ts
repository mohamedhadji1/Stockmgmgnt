import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './dashboard/home-page/home-page.component';
import { ProductsPageComponent } from './dashboard/product/products-page/products-page.component';
import { ProviderssPageComponent } from './dashboard/provider/providerss-page/providerss-page.component';
import { FacturePageComponent } from './dashboard/facture-page/facture-page.component';
import { NavigationBarComponent } from './dashboard/navigation-bar/navigation-bar.component';
import { CategorysComponent } from './ProductManagement/categorys/categorys.component';
import { ProductsComponent } from './ProductManagement/products/products.component';
import { ProvidersManagementComponent } from './providers-management/providers-management.component';
import { OrderManagementComponent } from './order-management/order-management.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { UserListComponent } from './user-list/user-list.component';
import { AuthGuard } from './auth.guard';
import { RedirectComponent } from './redirect/redirect.component';
import { ClaimManagmentComponent } from './claim-managment/claim-managment.component';
import { AddClaimComponent } from './add-claim/add-claim.component';

const routes: Routes = [
  { path: 'home-page', component: HomePageComponent },
  { path: '', canActivate: [AuthGuard], component: RedirectComponent }, // Use a dummy component for redirection
  { path: 'providers', component: ProvidersManagementComponent },
  { path: 'products-page', component: ProductsPageComponent },
  { path: 'facture-page', component: FacturePageComponent },
  { path: 'categorys', component: CategorysComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'orders', component: OrderManagementComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'customers', component: UserListComponent },
  { path :'claims', component: ClaimManagmentComponent},
  { path :'addclaim', component: AddClaimComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
