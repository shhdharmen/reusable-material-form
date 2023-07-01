import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Address, AddressShipping } from './shared/address-form/address';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'reusable-material-form';
  readonly freeShipping: AddressShipping = 'free';
  form: FormGroup = new FormGroup({
    email: new FormControl(),
    username: new FormControl(),
    address: new FormControl(
      new Address('', '', '', '', '', '', '', 0, this.freeShipping)
    ),
  });
}
