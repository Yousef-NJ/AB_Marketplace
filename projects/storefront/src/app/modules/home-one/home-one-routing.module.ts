import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// pages
import { PageOneComponent } from './pages/page-one/page-one.component';
import { CarsSearchHomeComponent } from './pages/cars-search-home/cars-search-home.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: PageOneComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [],
})
export class HomeOneRoutingModule {}
