import {
  Component,
  ElementRef,
  Inject,
  Input,
  OnDestroy,
  Optional,
  Self,
  ViewChild,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  NgControl,
  Validators,
} from '@angular/forms';
import { Address, AddressForm, AddressShipping } from './address';
import {
  MAT_FORM_FIELD,
  MatFormField,
  MatFormFieldControl,
} from '@angular/material/form-field';
import { Subject } from 'rxjs';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { FocusMonitor } from '@angular/cdk/a11y';
import { MatSelect } from '@angular/material/select';
import { MatRadioGroup } from '@angular/material/radio';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.css'],
  providers: [
    { provide: MatFormFieldControl, useExisting: AddressFormComponent },
  ],
  host: {
    '[class.address-form-floating]': 'shouldLabelFloat',
    '[id]': 'id',
  },
})
export class AddressFormComponent
  implements ControlValueAccessor, MatFormFieldControl<Address>, OnDestroy
{
  static nextId = 0;
  @ViewChild('company')
  companyInput!: HTMLInputElement;
  @ViewChild('firstName')
  firstNameInput!: HTMLInputElement;
  @ViewChild('lastName')
  lastNameInput!: HTMLInputElement;
  @ViewChild('address')
  addressInput!: HTMLTextAreaElement;
  @ViewChild('address2')
  address2Input!: HTMLTextAreaElement;
  @ViewChild('city')
  cityInput!: HTMLInputElement;
  @ViewChild('state')
  stateInput!: MatSelect;
  @ViewChild('postalCode')
  postalCodeInput!: HTMLInputElement;
  @ViewChild('shipping')
  shippingInput!: MatRadioGroup;

  readonly freeShipping: AddressShipping = 'free';
  addressForm = this._fromBuilder.group<AddressForm>({
    company: this._fromBuilder.control(null),
    firstName: this._fromBuilder.control('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    lastName: this._fromBuilder.control('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    address: this._fromBuilder.control('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    address2: this._fromBuilder.control(null),
    city: this._fromBuilder.control('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    state: this._fromBuilder.control('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    postalCode: this._fromBuilder.control(0, {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(5),
      ],
    }),
    shipping: this._fromBuilder.control(this.freeShipping, {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  hasUnitNumber = false;

  states = [
    { name: 'Alabama', abbreviation: 'AL' },
    { name: 'Alaska', abbreviation: 'AK' },
    { name: 'American Samoa', abbreviation: 'AS' },
    { name: 'Arizona', abbreviation: 'AZ' },
    { name: 'Arkansas', abbreviation: 'AR' },
    { name: 'California', abbreviation: 'CA' },
    { name: 'Colorado', abbreviation: 'CO' },
    { name: 'Connecticut', abbreviation: 'CT' },
    { name: 'Delaware', abbreviation: 'DE' },
    { name: 'District Of Columbia', abbreviation: 'DC' },
    { name: 'Federated States Of Micronesia', abbreviation: 'FM' },
    { name: 'Florida', abbreviation: 'FL' },
    { name: 'Georgia', abbreviation: 'GA' },
    { name: 'Guam', abbreviation: 'GU' },
    { name: 'Hawaii', abbreviation: 'HI' },
    { name: 'Idaho', abbreviation: 'ID' },
    { name: 'Illinois', abbreviation: 'IL' },
    { name: 'Indiana', abbreviation: 'IN' },
    { name: 'Iowa', abbreviation: 'IA' },
    { name: 'Kansas', abbreviation: 'KS' },
    { name: 'Kentucky', abbreviation: 'KY' },
    { name: 'Louisiana', abbreviation: 'LA' },
    { name: 'Maine', abbreviation: 'ME' },
    { name: 'Marshall Islands', abbreviation: 'MH' },
    { name: 'Maryland', abbreviation: 'MD' },
    { name: 'Massachusetts', abbreviation: 'MA' },
    { name: 'Michigan', abbreviation: 'MI' },
    { name: 'Minnesota', abbreviation: 'MN' },
    { name: 'Mississippi', abbreviation: 'MS' },
    { name: 'Missouri', abbreviation: 'MO' },
    { name: 'Montana', abbreviation: 'MT' },
    { name: 'Nebraska', abbreviation: 'NE' },
    { name: 'Nevada', abbreviation: 'NV' },
    { name: 'New Hampshire', abbreviation: 'NH' },
    { name: 'New Jersey', abbreviation: 'NJ' },
    { name: 'New Mexico', abbreviation: 'NM' },
    { name: 'New York', abbreviation: 'NY' },
    { name: 'North Carolina', abbreviation: 'NC' },
    { name: 'North Dakota', abbreviation: 'ND' },
    { name: 'Northern Mariana Islands', abbreviation: 'MP' },
    { name: 'Ohio', abbreviation: 'OH' },
    { name: 'Oklahoma', abbreviation: 'OK' },
    { name: 'Oregon', abbreviation: 'OR' },
    { name: 'Palau', abbreviation: 'PW' },
    { name: 'Pennsylvania', abbreviation: 'PA' },
    { name: 'Puerto Rico', abbreviation: 'PR' },
    { name: 'Rhode Island', abbreviation: 'RI' },
    { name: 'South Carolina', abbreviation: 'SC' },
    { name: 'South Dakota', abbreviation: 'SD' },
    { name: 'Tennessee', abbreviation: 'TN' },
    { name: 'Texas', abbreviation: 'TX' },
    { name: 'Utah', abbreviation: 'UT' },
    { name: 'Vermont', abbreviation: 'VT' },
    { name: 'Virgin Islands', abbreviation: 'VI' },
    { name: 'Virginia', abbreviation: 'VA' },
    { name: 'Washington', abbreviation: 'WA' },
    { name: 'West Virginia', abbreviation: 'WV' },
    { name: 'Wisconsin', abbreviation: 'WI' },
    { name: 'Wyoming', abbreviation: 'WY' },
  ];

  stateChanges = new Subject<void>();
  focused = false;
  touched = false;
  controlType = 'address-form';
  id = `address-form-${AddressFormComponent.nextId++}`;
  onChange = (_: any) => {};
  onTouched = () => {};

  get empty() {
    const {
      value: {
        company,
        firstName,
        address2,
        address,
        city,
        lastName,
        postalCode,
        shipping,
        state,
      },
    } = this.addressForm;

    return (
      !company &&
      !firstName &&
      !address &&
      !address2 &&
      !city &&
      !lastName &&
      !postalCode &&
      !shipping &&
      !state
    );
  }

  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

  @Input('aria-describedby') userAriaDescribedBy = '';

  @Input()
  get placeholder(): string {
    return this._placeholder;
  }
  set placeholder(value: string) {
    this._placeholder = value;
    this.stateChanges.next();
  }
  private _placeholder = '';

  @Input()
  get required(): boolean {
    return this._required;
  }
  set required(value: BooleanInput) {
    this._required = coerceBooleanProperty(value);
    this.stateChanges.next();
  }
  private _required = false;

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: BooleanInput) {
    this._disabled = coerceBooleanProperty(value);
    this._disabled ? this.addressForm.disable() : this.addressForm.enable();
    this.stateChanges.next();
  }
  private _disabled = false;

  @Input()
  get value(): Address | null {
    const rawValue = this.addressForm.getRawValue();
    const address = this.createAddress(rawValue);
    if (address.isValid()) {
      return address;
    }
    return null;
  }
  private createAddress(
    rawValue: Partial<{
      company: string | null;
      firstName: string;
      lastName: string;
      address: string;
      address2: string | null;
      city: string;
      state: string;
      postalCode: number;
      shipping: AddressShipping;
    }>
  ) {
    return new Address(
      rawValue.company,
      rawValue.firstName,
      rawValue.lastName,
      rawValue.address,
      rawValue.address2 ?? '',
      rawValue.city,
      rawValue.state,
      rawValue.postalCode,
      rawValue.shipping
    );
  }

  set value(tel: Address | null) {
    tel = tel || new Address('', '', '', '', '', '', '', 0, this.freeShipping);
    this.addressForm.setValue(tel);

    this.stateChanges.next();
  }

  get errorState(): boolean {
    return this.addressForm.invalid && this.touched;
  }

  constructor(
    private _fromBuilder: FormBuilder,
    private _focusMonitor: FocusMonitor,
    private _elementRef: ElementRef<HTMLElement>,
    @Optional() @Inject(MAT_FORM_FIELD) public _formField: MatFormField,
    @Optional() @Self() public ngControl: NgControl
  ) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  onSubmit(): void {
    alert('Thanks!');
  }

  onFocusIn(event: FocusEvent) {
    if (!this.focused) {
      this.focused = true;
      this.stateChanges.next();
    }
  }

  onFocusOut(event: FocusEvent) {
    if (
      !this._elementRef.nativeElement.contains(event.relatedTarget as Element)
    ) {
      this.touched = true;
      this.focused = false;
      this.onTouched();
      this.stateChanges.next();
    }
  }

  setDescribedByIds(ids: string[]) {
    const controlElement = this._elementRef.nativeElement.querySelector(
      '.address-form-container'
    )!;
    controlElement.setAttribute('aria-describedby', ids.join(' '));
  }

  onContainerClick() {
    if (this.addressForm.controls.company.valid) {
      this._focusMonitor.focusVia(this.companyInput, 'program');
    } else if (this.addressForm.controls.firstName.valid) {
      this._focusMonitor.focusVia(this.firstNameInput, 'program');
    } else if (this.addressForm.controls.lastName.valid) {
      this._focusMonitor.focusVia(this.lastNameInput, 'program');
    } else if (this.addressForm.controls.address.valid) {
      this._focusMonitor.focusVia(this.addressInput, 'program');
    } else if (this.addressForm.controls.address2.valid) {
      this._focusMonitor.focusVia(this.address2Input, 'program');
    } else if (this.addressForm.controls.city.valid) {
      this._focusMonitor.focusVia(this.cityInput, 'program');
    } else if (this.addressForm.controls.state.valid) {
      this._focusMonitor.focusVia(
        this.stateInput._elementRef.nativeElement,
        'program'
      );
    } else if (this.addressForm.controls.postalCode.valid) {
      this._focusMonitor.focusVia(this.postalCodeInput, 'program');
    } else {
      this.shippingInput._radios.first.focus(undefined, 'program');
    }
  }

  writeValue(value: Address | null): void {
    this.value = value;
    if (value) {
      const address = this.createAddress(value);
      this.addressForm.patchValue(address, { emitEvent: false });
    }
  }

  registerOnChange(fn: any): void {
    this.addressForm.valueChanges.subscribe((value) => {
      const address = this.createAddress(value);
      this.onChange = fn(address);
    });
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    if (isDisabled) {
      this.addressForm.disable();
    } else {
      this.addressForm.enable();
    }
  }

  _handleInput(): void {
    this.onChange(this.value);
  }

  ngOnDestroy() {
    this.stateChanges.complete();
    this._focusMonitor.stopMonitoring(this._elementRef);
  }
}
