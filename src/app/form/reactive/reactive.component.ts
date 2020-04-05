import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {
  languages = ['English', 'Hindi', 'Marathi'];
  searchTerm: FormControl;
  terms: string[] = [];

  myForm: FormGroup;
  nameGroup: FormGroup;
  firstName: FormControl;
  lastName: FormControl;
  email: FormControl;
  password: FormControl;
  lang: FormControl;
  constructor() {
  }

  generateFormControls() {
    this.firstName = new FormControl('', Validators.required);
    this.lastName = new FormControl('', Validators.required);
    this.email = new FormControl('', [Validators.required]);
    this.password = new FormControl('', [Validators.required, Validators.minLength(6)]);
    this.lang = new FormControl('', Validators.required);
  }

  public ngOnInit(): void {
    this.searchTerm = new FormControl();

    this.generateFormControls();

    this.generateForm();

    this.searchTerm.valueChanges
      .pipe(
        debounceTime(400)
        , distinctUntilChanged()
        , tap()
      )
      .subscribe((term) => {
        this.terms.push(term);
      });
  }

  submitForm() {
    if (this.myForm.valid) {

    }
  }

  private generateForm() {
    this.nameGroup = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName
    });
    this.myForm = new FormGroup({
      name: this.nameGroup,
      email: this.email,
      password: this.password,
      lang: this.lang
    });
  }
}
