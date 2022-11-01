import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl,  FormGroup,  Validators } from '@angular/forms';

@Component({
  selector: 'app-convetion-eur-usd',
  templateUrl: './convetion-eur-usd.component.html',
  styleUrls: ['./convetion-eur-usd.component.scss'],
  
})
export class ConvetionEurUsdComponent implements OnInit {
taux_change:number=1.1;
montant_eur:number=0;
montant_usd:number=0;
montant:number=0
usd_convert:number=0
currency:number=1
taux_change_variation:number=0
currencyCode: string= "EUR"
currencyCodeConvert: string= "USD"
compter:number=0
event_number:number=0
taux:number=0
taux_reel:number = 0;
taux_fixe:number=0;

disabled: boolean = false;
historiques:Array<{taux_reel:number,taux_fixe:number,valeur_init:string,valeur_cal:string}>=[]
date=new Date();
  myGroup: FormGroup ;

switch_currency=[
  {'name': "EUR",'value':1},
  {'name':"USD",'value':2}
]
  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {

this.initFormGroup()
/*change random exchange rate every 3 seconds*/
    window.setInterval(()=>{
      this.taux_change=1.1
     
     
      this.generateRandom(Math.floor(Math.random() * 1000))
      

      this.taux_reel=this.taux_change
      this.taux_fixe= this.tauxChange(this.taux)
     
   /*test the exchange rate*/
        if((this.taux_fixe-this.taux_reel)>=0.02){
    
      
        this.myGroup.controls['taux_fixe'].disable()
        this.disabled = true;
       
         this.montant_usd=this.switchMontant(this.montant_eur,this.currency)


        
      } 
      else{
        
        this.myGroup.controls['taux_fixe'].enable()
        
        this.disabled = false;
        this.montant_usd=this.switchMontant(this.montant_eur,this.currency)
        
        
        
      }
      /*save amount conversion in historiques table*/ 
      
if((this.montant_eur!=0 &&!this.myGroup.controls['montantEur'].errors)){
  if(!this.myGroup.controls['taux_fixe'].errors ||this.myGroup.controls['taux_fixe'].value==0){
  this.historiques.push({
    taux_reel:this.taux_reel,taux_fixe:this.taux_fixe,valeur_init:this.montant_eur+ ' '+this.currencyCodeConvert,
    valeur_cal:this.montant_usd+ ' '+this.currencyCode
    
  })
  /**remove the first ligne of table when length of table>5 */
   if(this.historiques.length>5){

        this.historiques.shift()
      }
}
}    
     
    },3000)
   
  }
  /*initialize the form reactif form*/
  private initFormGroup(){
    
    this.myGroup=this.fb.group({
      montantEur: new FormControl('',Validators.pattern(/^([0-9])+\.{1}([0-9])+$/)),
      montantUSD: new FormControl({ value: '', disabled: true }),
      taux_fixe: new FormControl('',Validators.pattern(/^([0-9])+\.{1}([0-9])+$/)),
      curency_value:new FormControl('')
  
     })
  }
  
 /* test if the value is positive then addition to the exchange rate sinn subtraction*/
   private generateRandom(randomChoice: number) {
   
    
    if(randomChoice % 2==0){
     
      
      this.taux_change+=0.05
    }else if(randomChoice % 2!=0){
  
      
      this.taux_change-=0.05
    }
    
   
  }
/**change value when index change */
 onChangeMontant(value:number,index:number){
  
  let new_currency:number=0
  
this.switchMontant(value,index)


  
  new_currency=this.usd_convert
  localStorage.setItem("val",new_currency.toString())
 
  
if(this.compter!=0){
  this.montant=0
  this.usd_convert=0
  console.log('eur', this.montant);
  console.log('usd', this.usd_convert);
  console.log('def',new_currency);
  
  console.log(localStorage.getItem("val"));
  
  let newVal = localStorage.getItem("val");
  if(newVal!=null){
    this.montant = parseFloat(newVal)
  }


 
}
this.compter+=1
    
 }
/*get fixed exchange rate*/
 tauxChange(value:number){
 if (this.montant_eur!=0 &&!this.myGroup.controls['taux_fixe'].errors){
  value=this.taux
 }
  
  return value
  
 }
 /*calculate amount based on exchange rate and index(euror usd) */
private switchMontant(amount:number,index:number){
  
  if(index==1 ){
    if(this.disabled){
      
       /*calculation formula*/ 
      this.montant_usd=amount*  this.taux
      this.currencyCode = "USD"  
      this.currencyCodeConvert="EUR"

    }
   
    else{
      if(!this.disabled ){
      /*calculation formula*/ 
        this.montant_usd=amount*  this.taux_change
        this.currencyCode = "USD"  
        this.currencyCodeConvert="EUR"
      }
      
      
    }
  
  
}

  if(index==2){

    if(this.disabled){
      this.montant_usd=amount /this.taux
    this.currencyCode = "EUR"
    this.currencyCodeConvert="USD"
   
    }
    if(!this.disabled){
      this.montant_usd=amount /this.taux_change
    this.currencyCode = "EUR"
    this.currencyCodeConvert="USD"
   
    }
  }
return this.montant_usd
}

}