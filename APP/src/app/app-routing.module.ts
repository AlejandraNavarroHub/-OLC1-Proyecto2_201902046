import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexControllerComponent } from './Controllers/index/index-controller/index-controller.component';

const routes: Routes = [
  {
    path: 'INTERPRETE',
    component: IndexControllerComponent,
  },
  { path: '', redirectTo: '/INTERPRETE', pathMatch: 'full' },
  { path: '*', redirectTo: '/INTERPRETE', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
