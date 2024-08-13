import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ResumeFormComponent } from './resume-form/resume-form.component';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"register",component:ResumeFormComponent},
  {path:"view/:id",component:ViewComponent},
  {path:"edit/:id",component:EditComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
