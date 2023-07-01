# Creating a custom form field control group using Angular Material

It is possible to create custom form field controls that can be used inside `<mat-form-field>`. This can be useful if you need to create a component that shares a lot of common behavior with a form field, but adds some additional logic.

For example in this guide I have created an address form and hook it up to work with `<mat-form-field>`.

```html
<div [formGroup]="form" class="form-container">
  <mat-card class="shipping-card">
    <mat-card-header>
      <mat-card-title>Shipping Information</mat-card-title>
    </mat-card-header>
    <mat-card-content>
      <mat-form-field  appearance="outline" class="full-width address-form">
        <!-- 💡 Look at below line -->
        <app-address-form formControlName="address" required></app-address-form>
      </mat-form-field>
    </mat-card-content>
  </mat-card>

  <button mat-raised-button color="primary" type="submit" [disabled]="form.invalid">Submit</button>
</div>

```

The code for `<app-address-form>` is present at [src\app\shared\address-form](https://github.com/shhdharmen/reusable-material-form/tree/main/src/app/shared/address-form).
