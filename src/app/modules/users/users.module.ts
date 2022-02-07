import { NgModule } from '@angular/core';
import { UsersListComponent } from './users-list/users-list.component';
import { SharedModule } from '@shared/shared.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: UsersListComponent }];

@NgModule({
  declarations: [UsersListComponent],
  imports: [SharedModule, RouterModule.forChild(routes)],
})
export class UsersModule {}
