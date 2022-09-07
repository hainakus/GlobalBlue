import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subscription, tap} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  form: FormGroup
  subscription: Subscription | undefined;
  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      vat: [],
      calculatedVat: ['', [Validators.pattern("^[1-9]*$")]],
        withoutVat: ['', [Validators.pattern("^[1-9]*$")]],
        addedTax: ['', [Validators.pattern("^[1-9]*$")]],
        vatIncluded: ['', [Validators.pattern("^[1-9]*$")]],
    })
  }

  ngOnInit(): void {
      this.form.get('vat')?.patchValue('10');
      this.form.get('withoutVat')?.disable();
      this.form.get('addedTax')?.disable();
      this.form.get('vatIncluded')?.disable();
    this.subscription = this.form.get('vat')?.valueChanges.pipe( tap(_ => {
        this.vatCalc()
      })).subscribe();

    this.subscription = this.form.get('calculatedVat')?.valueChanges.pipe(  tap(_ => {
        this.vatCalc();
      })).subscribe();
  }


  round(n: number, dec: number)
  {
    let X = n * Math.pow(10,dec);
    X= Math.round(X);
    return (X / Math.pow(10,dec)).toFixed(dec);
  }

  vatCalc() {
    let Price = this.form.get('vatIncluded')?.value;
    let VATsum = this.form.get('addedTax')?.value;
    const VATrate = this.form.get('vat')?.value /100;
    let NetPrice = this.form.get('withoutVat')?.value
    if (this.form.get('calculatedVat')?.value == 1) {

      this.form.get('withoutVat')?.enable({onlySelf:true});
      this.form.get('addedTax')?.disable();
      this.form.get('vatIncluded')?.disable();

      Price = this.round(NetPrice * (1+VATrate), 2);
      VATsum = this.round(NetPrice * VATrate, 2);
      this.form.get('vatIncluded')?.patchValue(Price);
      this.form.get('addedTax')?.patchValue(VATsum);
    }
    else if (this.form.get('calculatedVat')?.value == 2) {
      this.form.get('addedTax')?.enable({onlySelf:true});
      this.form.get('withoutVat')?.disable();
      this.form.get('vatIncluded')?.disable();
      Price = this.round(VATsum * (1+VATrate) / VATrate, 2);
      NetPrice = this.round(VATsum / VATrate, 2);
      this.form.get('vatIncluded')?.patchValue(Price);
      this.form.get('withoutVat')?.patchValue(NetPrice);
    }
    else if (this.form.get('calculatedVat')?.value == 3) {
      this.form.get('vatIncluded')?.enable({onlySelf:true});
      this.form.get('withoutVat')?.disable();
      this.form.get('addedTax')?.disable();
      NetPrice = this.round(Price / (1+VATrate), 2);
      VATsum = this.round(Price * VATrate / (1+VATrate), 2);
      this.form.get('withoutVat')?.patchValue(NetPrice);
      this.form.get('addedTax')?.patchValue(VATsum);
    }
  }

  ngOnDestroy(): void {
    if(this.subscription) this.subscription.unsubscribe();
  }
}


