import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  
  
  {path:'conversion', loadChildren: () => import('../app/convetion-eur-usd/convetion-eur-usd.module').then(m => m.ConvetionEurUsdModule )},  
 

  { path: '', redirectTo: 'conversion', pathMatch: 'full' },

];




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
