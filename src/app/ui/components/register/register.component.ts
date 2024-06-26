import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  UntypedFormBuilder,
  UntypedFormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { User } from '../../../entities/user';
import { UserService } from 'src/app/services/common/models/user.service';
import {
  CustomToastrService,
  ToastrMessageType,
  ToastrPosition,
} from 'src/app/services/ui/custom-toastr.service';
import { Create_User } from 'src/app/contracts/create_user';
import { BaseComponent } from 'src/app/base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent extends BaseComponent implements OnInit {
  constructor(
    private formBuilder: UntypedFormBuilder,

    private userService: UserService,
    private toastrService: CustomToastrService,
    spinner: NgxSpinnerService
  ) {
    super(spinner);
  }

  frm: UntypedFormGroup;

  ngOnInit(): void {
    this.frm = this.formBuilder.group(
      {
        nameSurname: [
          '',
          [
            Validators.required,
            Validators.maxLength(50),
            Validators.minLength(3),
          ],
        ],
        username: [
          '',
          [
            Validators.required,
            Validators.maxLength(50),
            Validators.minLength(3),
          ],
        ],
        email: [
          '',
          [Validators.required, Validators.maxLength(250), Validators.email],
        ],
        password: ['', [Validators.required]],
        passwordConfirm: ['', [Validators.required]],
      },
      {
        validators: (group: AbstractControl): ValidationErrors | null => {
          let sifre = group.get('password').value;
          let sifreTekrar = group.get('passwordConfirm').value;
          return sifre === sifreTekrar ? null : { notSame: true };
        },
      }
    );
  }

  get component() {
    return this.frm.controls;
  }

  submitted: boolean = false;
  async onSubmit(user: User) {
    this.submitted = true;
    if (this.frm.invalid) return;
    const result: Create_User = await this.userService.create(user);
    if (result.succeeded)
      this.toastrService.message(result.message, 'User created', {
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.TopRight,
      });
    else
      this.toastrService.message(result.message, 'Error', {
        messageType: ToastrMessageType.Error,
        position: ToastrPosition.TopRight,
      });
  }
}
