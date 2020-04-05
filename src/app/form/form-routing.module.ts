import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SimpleComponent } from './simple/simple.component';
import { ReactiveComponent } from './reactive/reactive.component';

const routes: Routes = [
    { path: '', component: SimpleComponent },
    { path: 'reactive', component: ReactiveComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FormRoutingModule {

}
