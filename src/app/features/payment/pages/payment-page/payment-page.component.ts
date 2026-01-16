  import { Component, inject } from '@angular/core';
  import { FormBuilder, FormGroup, PatternValidator, ReactiveFormsModule, Validators } from '@angular/forms';
  import { PaymentService } from '../../services/payment.service';
  import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../../cart/services/cart.service';
import { CurrencyPipe } from '@angular/common';
import { PHONE_REGEX } from '../../../auth/interfaces/validators';

  @Component({
    selector: 'app-payment-page',
    imports: [ReactiveFormsModule,CurrencyPipe],
    templateUrl: './payment-page.component.html',
    styleUrl: './payment-page.component.css',
  })
  export class PaymentPageComponent {
  //injected services
    private readonly fb = inject(FormBuilder)
    private readonly paymentService = inject(PaymentService)
    private readonly activatedRoute = inject(ActivatedRoute)
    private readonly router = inject(Router)
    private readonly cartService = inject(CartService)


    userPaymentForm !: FormGroup
    selectedMethod : 'cash' | 'online' ='cash'
    cartId !:string
    submitted : boolean = false

    deliveryFee : number = 10

    constructor(){
      this.initUserPaymentForm()
      this.getCartId()
    }

  get priceWithTaxes(): number {
    return this.cartService.PriceWithTaxes;
  }

  get totalPrice(): number {
    return this.cartService.PriceWithTaxes + this.deliveryFee;
  }

    getCartId() : void{
      this.cartId =  this.activatedRoute.snapshot.paramMap.get('cartId') as string
    }

    initUserPaymentForm() : void{
      this.userPaymentForm = this.fb.group({
        phone: ['',Validators.required,Validators.pattern(PHONE_REGEX)],
        city: ['',Validators.required],
        details: ['',Validators.required],
      })
    }
    sendUserPaymentInfo() : void{
      this.submitted = true
      if (this.userPaymentForm.invalid) {
        return
      }
      if (this.selectedMethod === 'cash') {
        this.payCash()
      }else if (this.selectedMethod === 'online') {
        this.payOnline()
      }
    }

    payCash(): void {
      this.paymentService.cashPayment(this.userPaymentForm.value, this.cartId).subscribe({
        next: () => {
          this.router.navigateByUrl('/orders');
          this.cartService.numOfCartItems.next(0)
        }
      });
    }

    payOnline(): void {
      this.paymentService.onlinePayment(this.userPaymentForm.value, this.cartId).subscribe({
        next: (response) => {
          if (response?.session?.url) {
            window.location.assign(response.session.url);
          }
        }
      });
    }
  }
