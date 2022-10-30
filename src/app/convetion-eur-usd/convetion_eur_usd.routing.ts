
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConvetionEurUsdComponent } from './convetion-eur-usd/convetion-eur-usd.component';






const routes: Routes = [
  {
    path: '',
    component:ConvetionEurUsdComponent,
   
  }
    
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ConversionRouting { }