
import { Component, OnInit} from '@angular/core';
import { NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService} from 'ngx-toastr';
import {NgxSmartModalService} from 'ngx-smart-modal';
import {FormControl, FormGroup, Validators} from '@angular/forms';

class Registration {
  constructor(
    public firstName: string = '',
    public lastName: string = '',
    public dob: NgbDateStruct = null,
    public email: string = '',
    public password: string = '',
    public country: string = 'Select country'
  ) {}
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  registrations: Registration[] = [];
  regModel: Registration;
  showNew: Boolean = false;
  submitType = 'Save';
  selectedRow: number;
  isSubmited: boolean;
  validateFirstName: Boolean = false;
  validateLastName: Boolean = false;
  validatePassword: Boolean = false;
  validateDOB: Boolean = false;
  countries: string[] = ['US', 'UK', 'India', 'UAE'];

  private myGroup: FormGroup;

  constructor(private toaster: ToastrService,
              public ngxSmartModalService: NgxSmartModalService
) {

    this.registrations.push(new Registration(
      'Tararat',
      'Tampayak',
      {year: 1985, month: 5, day: 12},
      'tararat.tampayak@allianz.com',
      '123456',
      'UK'));
    this.registrations.push(new Registration(
      'Tawinee',
      'Laplikitkul',
      {year: 1986, month: 12, day: 3},
      'tawinee.laplikitkul@allianz.com',
      '123456',
      'THD'));
    this.registrations.push(new Registration(
      'Eiko',
      'Pugh',
      {year: 1987, month: 7, day: 25},
      'eiko.pugh@allianz.com',
      '123456',
      'India'));
  }
  showSuccess() {
    this.toaster.success('User added successful !', '',
      {timeOut: 5000});
  }
  showInfo() {
    this.toaster.info('User added successful !', '',
      {timeOut: 5000});
  }
  showWarning() {
    this.toaster.warning('User deleted successful !', 'Warning',
      {timeOut: 5000});
  }
  showError() {
    this.toaster.error('everything is broken', 'Error', {
      timeOut: 3000
    });
  }
  ngOnInit() {

    this.myGroup = new FormGroup({
      'firstName': new FormControl(null, [Validators.required, Validators.minLength(3)]),
      'lastName': new FormControl(null, [Validators.required, Validators.minLength(3)]),
      'dob': new FormControl(null, [Validators.required]),
      'email': new FormControl(null, [Validators.email]),
      'password': new FormControl(null, [Validators.required])
    });
  }

  onNew() {

    this.myGroup.reset();
    this.regModel = new Registration();
    this.submitType = 'Save';
    this.showNew = true;
    this.validateFirstName = false;
    this.validateLastName = false;
    this.validatePassword = false;
    this.validateDOB = false;

  }

  onSave() {
    this.isSubmited = true;
    if (this.myGroup.get('firstName').invalid ||
      this.myGroup.get('lastName').invalid ||
      this.myGroup.get('password').invalid) {
      this.toaster.error('Please fill all required fields !', '',
        {timeOut: 5000});
      this.validateFirstName = true;
      this.validateLastName = true;
      this.validatePassword = true;
      this.validateDOB = true;
    }

    if (!this.myGroup.valid) {
      return;
    }
    if ('Save' === this.submitType) {
  // Push registration model object into registration list.
  this.registrations.push(this.regModel);
      this.toaster.info('User added successful !', '',
        {timeOut: 5000});
} else {
  // Update the existing properties values based on model.
  this.registrations[this.selectedRow].firstName = this.regModel.firstName;
  this.registrations[this.selectedRow].lastName = this.regModel.lastName;
  this.registrations[this.selectedRow].dob = this.regModel.dob;
  this.registrations[this.selectedRow].email = this.regModel.email;
  this.registrations[this.selectedRow].password = this.regModel.password;
  this.registrations[this.selectedRow].country = this.regModel.country;

      this.toaster.info('User updated successful !', '',
        {timeOut: 5000});
}
    this.showNew = false;
  }

  onEdit(index: number) {
    this.isSubmited = false;
    this.selectedRow = index;
    this.regModel = new Registration();
    this.regModel = Object.assign({}, this.registrations[this.selectedRow]);
    this.submitType = 'Update';
    this.showNew = true;
    this.validateFirstName = false;
    this.validateLastName = false;
    this.validatePassword = false;
    this.validateDOB = false;
  }

  onDelete(index: number) {
    this.registrations.splice(index, 1);

    this.toaster.info('User deleted successful !', '',
      {timeOut: 5000});
    this.ngxSmartModalService.getModal('myBootstrapModal').close();
    this.validateFirstName = false;
    this.validateLastName = false;
    this.validatePassword = false;
    this.validateDOB = false;
  }

  onCancel() {
    this.showNew = false;
  }

  onChangeCountry(country: string) {
    this.regModel.country = country;
  }



}

