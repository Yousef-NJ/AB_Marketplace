import { NgModule } from '@angular/core';

// modules (angular)
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
// modules (third-party)
import { CarouselModule } from 'ngx-owl-carousel-o';
import { TranslateModule } from '@ngx-translate/core';
// modules
import { SharedModule } from '../shared/shared.module';

// blocks
import { BlockBannersComponent } from './block-banners/block-banners.component';
import { BlockBrandsComponent } from './block-brands/block-brands.component';
import { BlockCategoriesComponent } from './block-categories/block-categories.component';
import { BlockFeaturesComponent } from './block-features/block-features.component';
import { BlockFinderComponent } from './block-finder/block-finder.component';
import { BlockPostsCarouselComponent } from './block-posts-carousel/block-posts-carousel.component';
import { BlockProductsCarouselComponent } from './block-products-carousel/block-products-carousel.component';
import { BlockProductsColumnsComponent } from './block-products-columns/block-products-columns.component';
import { BlockSaleComponent } from './block-sale/block-sale.component';
import { BlockSlideshowComponent } from './block-slideshow/block-slideshow.component';
import { BlockZoneComponent } from './block-zone/block-zone.component';
import { PropertyComponent } from './property/property.component';
import { CarSearchComponent } from './car-search/car-search.component';
import { TravelSearchComponent } from './travel-search/travel-search.component';
import { InsuranceSearchComponent } from './insurance-search/insurance-search.component';
import { PropertySearchComponent } from './property-search/property-search.component';
import { FilterRangeComponent } from '../shop/filters/filter-range/filter-range.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip/public_api';

@NgModule({
    declarations: [
        // blocks
        BlockBannersComponent,
        BlockBrandsComponent,
        BlockCategoriesComponent,
        BlockFeaturesComponent,
        BlockFinderComponent,
        BlockPostsCarouselComponent,
        BlockProductsCarouselComponent,
        BlockProductsColumnsComponent,
        BlockSaleComponent,
        BlockSlideshowComponent,
        BlockZoneComponent,
        PropertyComponent,
        CarSearchComponent,
        TravelSearchComponent,
        InsuranceSearchComponent,
        PropertySearchComponent,
    ],
    exports: [
        // blocks
        BlockBannersComponent,
        BlockBrandsComponent,
        BlockCategoriesComponent,
        BlockFeaturesComponent,
        BlockFinderComponent,
        BlockPostsCarouselComponent,
        BlockProductsCarouselComponent,
        BlockProductsColumnsComponent,
        BlockSaleComponent,
        BlockSlideshowComponent,
        BlockZoneComponent,
        PropertyComponent,
        CarSearchComponent,
        TravelSearchComponent,
        InsuranceSearchComponent,
        PropertySearchComponent,
        CarSearchComponent,
    ],
    imports: [
        // modules (angular)
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        // modules (third-party)
        CarouselModule,
        TranslateModule.forChild(),
        // modules
        SharedModule,
        // FormsModule,
        // ReactiveFormsModule,
    ],
})
export class BlocksModule {}
