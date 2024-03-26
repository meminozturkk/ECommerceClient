import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BaseDialogs } from '../base/base-dialogs';
import { RoleService } from 'src/app/services/common/models/role.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSelectionList } from '@angular/material/list';
import { SpinnerType } from 'src/app/base/base.component';
import { List_Role } from 'src/app/contracts/List_Role';
import { AuthorizationEndpointService } from 'src/app/services/common/models/authorization-endpoint.service';

@Component({
  selector: 'app-authorize-menu-dialog',
  templateUrl: './authorize-menu-dialog.component.html',
  styleUrls: ['./authorize-menu-dialog.component.scss'],
})
export class AuthorizeMenuDialogComponent
  extends BaseDialogs<AuthorizeMenuDialogComponent>
  implements OnInit
{
  constructor(
    dialogRef: MatDialogRef<AuthorizeMenuDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private roleService: RoleService,
    private authorizationEndpointService: AuthorizationEndpointService,
    private spinner: NgxSpinnerService
  ) {
    super(dialogRef);
  }
  roles: { datas: List_Role[]; totalCount: number };
  assignedRoles: Array<string>;
  listRoles: { name: string; selected: boolean }[];
  async ngOnInit() {
    this.assignedRoles =
      await this.authorizationEndpointService.getRolesToEndpoint(
        this.data.code,
        this.data.menuName
      );

    this.roles = await this.roleService.getRoles(-1, -1);

    this.listRoles = this.roles.datas.map((r: any) => {
      return {
        name: r.name,
        selected: this.assignedRoles?.indexOf(r.name) > -1,
      };
    });
  }

  assignRoles(rolesComponent: MatSelectionList) {
    const roles: string[] = rolesComponent.selectedOptions.selected.map(
      (o) => o._elementRef.nativeElement.innerText //buraya bakariz
    );
    this.spinner.show(SpinnerType.BallBeat);
    this.authorizationEndpointService.assignRoleEndpoint(
      roles,
      this.data.code,
      this.data.menuName,
      () => {
        this.spinner.hide(SpinnerType.BallBeat);
      },
      (error) => {}
    );
  }
}

export enum AuthorizeMenuState {
  Yes,
  No,
}
