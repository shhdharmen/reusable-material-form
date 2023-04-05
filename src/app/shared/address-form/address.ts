import { FormControl } from '@angular/forms';

export class Address {
  constructor(
    public company: string | null = null,
    public firstName: string = '',
    public lastName: string = '',
    public address: string = '',
    public address2: string | null,
    public city: string = '',
    public state: string = '',
    public postalCode: number = 0,
    public shipping: AddressShipping = 'free'
  ) {}

  isValid() {
    return (
      this.firstName &&
      this.lastName &&
      this.address &&
      this.city &&
      this.state &&
      this.postalCode.toFixed().length === 5
    );
  }
}

export type AddressForm = {
  company: FormControl<string | null>;
  firstName: FormControl<string>;
  lastName: FormControl<string>;
  address: FormControl<string>;
  address2: FormControl<string | null>;
  city: FormControl<string>;
  state: FormControl<string>;
  postalCode: FormControl<number>;
  shipping: FormControl<AddressShipping>;
};

export type AddressShipping = 'free' | 'priority' | 'nextday';
