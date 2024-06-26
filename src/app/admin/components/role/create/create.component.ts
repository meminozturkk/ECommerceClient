import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import {
  AlertifyService,
  MessageType,
  Position,
} from 'src/app/services/admin/alertify.service';
import { RoleService } from 'src/app/services/common/models/role.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent extends BaseComponent implements OnInit {
  constructor(
    spiner: NgxSpinnerService,
    private roleService: RoleService,
    private alertify: AlertifyService
  ) {
    super(spiner);
  }

  ngOnInit(): void {}

  @Output() createdRole: EventEmitter<string> = new EventEmitter();

  create(name: HTMLInputElement) {
    this.showSpinner(SpinnerType.BallBeat);

    this.roleService.create(
      name.value,
      () => {
        this.hideSpinner(SpinnerType.BallBeat);
        this.alertify.message('Role başarıyla eklenmiştir.', {
          messageType: MessageType.Success,
          position: Position.TopRight,
        });
        this.createdRole.emit(name.value);
      },
      (errorMessage) => {
        this.alertify.message(errorMessage, {
          messageType: MessageType.Error,
          position: Position.TopRight,
        });
      }
    );
  }
}
