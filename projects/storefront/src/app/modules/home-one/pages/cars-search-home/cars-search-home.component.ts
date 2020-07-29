import { Component, OnInit } from '@angular/core';
import { BlogApi, ShopApi } from '../../../../api/base';
import { SectionHeaderGroup } from '../../../shared/components/section-header/section-header.component';
import { BehaviorSubject, Observable, of, timer } from 'rxjs';
import { Product } from '../../../../interfaces/product';
import { filter, mergeMap, switchMap, tap } from 'rxjs/operators';
import { ShopCategory } from '../../../../interfaces/category';
import { Post } from '../../../../interfaces/post';
import { Brand } from '../../../../interfaces/brand';

interface ProductsCarouselGroup extends SectionHeaderGroup {
    products$: Observable<Product[]>;
}

interface ProductsCarouselData {
    subject$: BehaviorSubject<ProductsCarouselGroup>;
    products$: Observable<Product[]>;
    loading: boolean;
    groups: ProductsCarouselGroup[];
}

interface BlockZoneData {
    image: string;
    mobileImage: string;
    category$: Observable<ShopCategory>;
}

interface DeferredData<T> {
    loading: boolean;
    data$: Observable<T>;
}

@Component({
    selector: 'app-cars-search-home',
    templateUrl: './cars-search-home.component.html',
    styleUrls: ['./cars-search-home.component.scss'],
})
export class CarsSearchHomeComponent implements OnInit {
    constructor(private shopApi: ShopApi, private blogApi: BlogApi) {}

    ngOnInit(): void {}
}
