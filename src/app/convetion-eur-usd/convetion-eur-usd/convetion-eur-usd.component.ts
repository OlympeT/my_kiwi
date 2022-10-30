import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl,  FormGroup,  Validators } from '@angular/forms';

@Component({
  selector: 'app-convetion-eur-usd',
  templateUrl: './convetion-eur-usd.component.html',
  styleUrls: ['./convetion-eur-usd.component.scss']
})
export class ConvetionEurUsdComponent implements OnInit {
taux_change:number=1.1;
montant_eur:number=0;
montant_usd:number=0;
montant:number=0
usd_convert:number=0
currency:number=1
currencyCode: string= "EUR"
currencyCodeConvert: string= "USD"
compter:number=0
event_number:number=0
taux:number=0
taux_reel:number = 0;
taux_fixe:number=0;
@Input() categoryId: string;
historiques:Array<{taux_reel:number,taux_fixe:number,valeur_init:string,valeur_cal:string}>=[]
date=new Date();
  myGroup: FormGroup ;

switch_currency=[
  {'name':"EUR",'value':1},
  {'name':"USD",'value':2}
]
  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {

this.initFormGroup()
    window.setInterval(()=>{
      this.taux_change=1.1
     
     
      this.generateRandom(Math.floor(Math.random() * 1000))
      
      
      // this.montant_usd=this.montant_eur*this.taux_change

      // this.taux_reel=(this.taux_change*2)/100
      
      this.taux_reel=this.taux_change
      this.taux_fixe= this.tauxChange(this.taux)
      console.log('fixe',this.taux_fixe);
     console.log('reel',this.taux_reel);
   
        if((this.taux_fixe-this.taux_reel)>=0.02){
    
      
        this.myGroup.controls['taux_fixe'].disable()
        // this.montant_usd=this.montant_eur*this.taux_fixe
      //  this.taux_change=this.taux_fixe
       
        
         this.montant_usd=this.switchMontant(this.montant_eur,this.currency)


        
      } 
      else{
        
        this.myGroup.controls['taux_fixe'].enable()
        
        
        this.montant_usd=this.switchMontant(this.montant_eur,this.currency)
      
        
      }
if(this.montant_eur!=0){
  this.historiques.push({
    taux_reel:this.taux_reel,taux_fixe:this.taux_fixe,valeur_init:this.montant_eur+ ' '+this.currencyCodeConvert,
    valeur_cal:this.montant_usd+ ' '+this.currencyCode
    
  })
   if(this.historiques.length>5){

        this.historiques.shift()
      }
}
     
     
    },3000)
   
  }
  private initFormGroup(){
    this.myGroup=this.fb.group({
      montantEur: new FormControl('',Validators.pattern("[0.9]")),
      montantUSD: new FormControl({ value: '', disabled: true }),
      taux_fixe: new FormControl('',Validators.pattern("[0.9]")),
      curency_value:new FormControl('')
  
     })
  }
  

   private generateRandom(randomChoice: number) {
    // console.log(randomChoice);
    
    if(randomChoice % 2==0){
      // console.log('paire');
      
      this.taux_change+=0.05
    }else if(randomChoice % 2!=0){
      // console.log('impaire');
      
      this.taux_change-=0.05
    }
    
    //return this.taux_change;
  }

 onChangeMontant(value:number,index:number){
  console.log('name',index);
  console.log('montant',value);
  let new_currency:number=0
  
this.switchMontant(value,index)
console.log('valueee',this.switchMontant(value,index));

  
  new_currency=this.usd_convert
  localStorage.setItem("val",new_currency.toString())
  console.log('value',new_currency);
  
  // console.log(this.event_number,this.compter);
  console.log('compteur',this.compter);
  
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

 tauxChange(value:number){
  value=this.taux
  return value
  
 }
private switchMontant(amount:number,index:number){
  console.log(this.taux_fixe);
  console.log(this.taux_reel);
  
  
  if(index==1){
    
    this.usd_convert=amount*  this.taux_change
    this.currencyCode = "USD"  
    this.currencyCodeConvert="EUR"
    
  
  
}
  else{
    this.usd_convert=amount /this.taux_change
    this.currencyCode = "EUR"
    this.currencyCodeConvert="USD"
   
  }
return this.usd_convert
}


}
