import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { TestpadComponent } from './components/testpad/testpad.component';


const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'testpad', component: TestpadComponent },
  { path: 'forms', loadChildren: () => import('./form/form.module').then(mod => mod.FormModule) },
  { path: '**', component: WelcomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
