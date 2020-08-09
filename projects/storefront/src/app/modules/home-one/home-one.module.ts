import { NgModule } from '@angular/core';

// modules (angular)
import { CommonModule } from '@angular/common';
// modules (third-party)
import { TranslateModule } from '@ngx-translate/core';
// modules
import { BlocksModule } from '../blocks/blocks.module';
import { HomeOneRoutingModule } from './home-one-routing.module';
import { SharedModule } from '../shared/shared.module';

// pages
import { PageOneComponent } from './pages/page-one/page-one.component';
import { CarsSearchHomeComponent } from './pages/cars-search-home/cars-search-home.component';
import { PeopertySearchHomeComponent } from './pages/peoperty-search-home/peoperty-search-home.component';
import { TravelSearchHomeComponent } from './pages/travel-search-home/travel-search-home.component';
import { IncuranseSearchHomeComponent } from './pages/incuranse-search-home/incuranse-search-home.component';
import { ShopModule } from '../shop/shop.module';
import { QuotationComponent } from './pages/quotation/quotation.component';

@NgModule({
    declarations: [
        // pages
        PageOneComponent,
        CarsSearchHomeComponent,
        PeopertySearchHomeComponent,
        TravelSearchHomeComponent,
        IncuranseSearchHomeComponent,
        QuotationComponent,
    ],
    imports: [
        // modules (angular)
        CommonModule,
        // modules (third-party)
        TranslateModule.forChild(),
        // modules
        BlocksModule,
        HomeOneRoutingModule,
        SharedModule,
        ShopModule,
    ],
})
export class HomeOneModule {}
