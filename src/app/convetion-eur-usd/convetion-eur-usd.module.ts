import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConvetionEurUsdComponent } from './convetion-eur-usd/convetion-eur-usd.component';
import { ConversionRouting } from './convetion_eur_usd.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';




@NgModule({
  declarations: [
    ConvetionEurUsdComponent, 
  ],
  imports: [
    CommonModule,
    ConversionRouting,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule ,
    MatFormFieldModule,
   
  ]
})
export class ConvetionEurUsdModule { }
