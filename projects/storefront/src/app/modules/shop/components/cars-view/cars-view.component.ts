import {
    Component,
    HostBinding,
    Input,
    OnDestroy,
    OnInit,
} from '@angular/core';
import {
    PageShopGridLayout,
    PageShopLayout,
} from '../../pages/page-shop/page-shop.component';
import { ShopSidebarService } from '../../services/shop-sidebar.service';
import { PageShopService } from '../../services/page-shop.service';
import { FormControl } from '@angular/forms';
import { merge, Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { CurrentVehicleService } from '../../../../services/current-vehicle.service';
import { ActivatedRoute } from '@angular/router';
import { brands } from '../../../../../fake-server/database/brands';

export interface LayoutButton {
    layout: PageShopLayout;
    icon: string;
}
@Component({
    selector: 'app-cars-view',
    templateUrl: './cars-view.component.html',
    styleUrls: ['./cars-view.component.scss'],
    providers: [ShopSidebarService, PageShopService, CurrentVehicleService],
})
export class CarsViewComponent implements OnInit, OnDestroy {
    products: any;
    cars: Array<any> = [];
    carsByBrand: Array<any> = [];
    carsByYear: Array<any> = [];
    carsByPrice: Array<any> = [];
    private destroy$: Subject<void> = new Subject<void>();

    isEmptyList$: Observable<boolean>;

    currentFiltersCount$: Observable<number>;

    hasActiveFilters$: Observable<boolean>;

    layoutButtons: LayoutButton[] = [
        { layout: 'grid', icon: 'layout-grid-16' },
        { layout: 'list', icon: 'layout-list-16' },
        { layout: 'table', icon: 'layout-table-16' },
    ];

    pageControl: FormControl;
    limitControl: FormControl;
    sortControl: FormControl;

    @Input() layout: PageShopLayout = 'grid';

    @Input() gridLayout: PageShopGridLayout = 'grid-4-sidebar';

    @Input() offCanvasSidebar: 'always' | 'mobile' = 'mobile';

    @HostBinding('class.products-view') classProductsView = true;
    brand: any;
    year: any;
    priceFilter: string;
    minPrice: number;
    maxPrice: number;
    brands: any;

    @HostBinding('class.products-view--loading')
    get classProductsViewLoading(): boolean {
        return this.page.isLoading;
    }

    constructor(
        public sidebar: ShopSidebarService,
        public page: PageShopService,
        private http: HttpClient,
        private route: ActivatedRoute
    ) {
        this.route.queryParams.subscribe((params) => {
            this.brand = params['brand'];
            console.log(this.brand);

            this.year = params['year'];
            console.log(this.year);
            this.priceFilter = params['price'];
            if (this.priceFilter.indexOf('-') > 0) {
                var x: number = +this.priceFilter.split('-')[0];
                this.minPrice = x;
                console.log(this.minPrice);
                var y: number = +this.priceFilter.split('-')[1];
                this.maxPrice = y;
                console.log(this.maxPrice);
            }
            console.log(this.priceFilter);
        });
    }

    ngOnInit(): void {
        this.getProducts();

        this.products.properties.forEach((element: any) => {
            this.cars.push(element);
        });

        if (this.brand != 'All') {
            this.brands = this.brand.split(', ');
            this.cars.forEach((element: any) => {
                this.brands.forEach((brandi: string) => {
                    if (brandi == element.brand) {
                        this.carsByBrand.push(element);
                    }
                });
            });
            this.cars = this.carsByBrand;
        }

        if (this.year != 'all') {
            this.cars.forEach((element: any) => {
                if (element.year == this.year) {
                    this.carsByYear.push(element);
                }
            });
            this.cars = this.carsByYear;
        }

        if (this.priceFilter != 'all') {
            this.cars.forEach((element: any) => {
                if (
                    element.price >= this.minPrice &&
                    element.price <= this.maxPrice
                ) {
                    this.carsByPrice.push(element);
                    // console.log(element);
                }
            });
            this.cars = this.carsByPrice;
        }

        this.pageControl = new FormControl(this.page.defaultOptions.page);
        this.limitControl = new FormControl(this.page.defaultOptions.limit);
        this.sortControl = new FormControl(this.page.defaultOptions.sort);

        merge(
            this.pageControl.valueChanges.pipe(map((v) => ['page', v])),
            this.limitControl.valueChanges.pipe(
                map((v) => ['limit', parseFloat(v)])
            ),
            this.sortControl.valueChanges.pipe(map((v) => ['sort', v]))
        )
            .pipe(takeUntil(this.destroy$))
            .subscribe(([option, value]) => {
                this.page.setOptionValue(option, value);
            });

        this.page.list$
            .pipe(takeUntil(this.destroy$))
            .subscribe(({ page, limit, sort }) => {
                this.pageControl.setValue(page, { emitEvent: false });
                this.limitControl.setValue(limit, { emitEvent: false });
                this.sortControl.setValue(sort, { emitEvent: false });
            });

        this.isEmptyList$ = this.page.list$.pipe(map((x) => x.total === 0));
        this.currentFiltersCount$ = this.page.currentFilters$.pipe(
            map((x) => x.length)
        );
        this.hasActiveFilters$ = this.page.activeFilters$.pipe(
            map((x) => x.length > 0)
        );
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    setLayout(value: PageShopLayout): void {
        this.layout = value;
    }

    trackById(index: number, entity: { id: string | number }): string | number {
        return entity.id;
    }

    sort(s: string) {
        if (s == 'asc') {
            this.sortLowToHigh();
        } else if (s == 'desc') {
            this.sortHighToLow();
        }
    }

    sortLowToHigh() {
        this.cars = this.insertionSort();
    }
    sortHighToLow() {
        this.cars = this.insertionSortDesc();
    }

    insertionSort(): any[] {
        if (this.products) {
            let listToSort = this.cars;

            let i = 0,
                j = 0,
                len = listToSort.length,
                holePosition = 0,
                valueToInsert = null;
            for (i = 0; i < len; i++) {
                valueToInsert = listToSort[i]; /* select value to be inserted */
                holePosition = i;
                /*locate hole position for the element to be inserted */
                while (
                    holePosition > 0 &&
                    listToSort[holePosition - 1].price > valueToInsert.price
                ) {
                    listToSort[holePosition] = listToSort[holePosition - 1];
                    holePosition = holePosition - 1;
                }
                listToSort[
                    holePosition
                ] = valueToInsert; /* insert the number at hole position */
            }
            return listToSort;
        }
        return [];
    }

    insertionSortDesc(): any[] {
        if (this.products) {
            let listToSort = this.cars;

            let i = 0,
                j = 0,
                len = listToSort.length,
                holePosition = 0,
                valueToInsert = null;
            for (i = 0; i < len; i++) {
                valueToInsert = listToSort[i]; /* select value to be inserted */
                holePosition = i;
                /*locate hole position for the element to be inserted */
                while (
                    holePosition > 0 &&
                    listToSort[holePosition - 1].price < valueToInsert.price
                ) {
                    listToSort[holePosition] = listToSort[holePosition - 1];
                    holePosition = holePosition - 1;
                }
                listToSort[
                    holePosition
                ] = valueToInsert; /* insert the number at hole position */
            }
            return listToSort;
        }
        return [];
    }

    getProducts() {
        this.products = {
            properties: [
                {
                    id: 990,
                    type: 'car',
                    brand: 'Ford',
                    model: 'Fusion Titanium',
                    year: '2017',
                    price: 14599,
                    pictures: [
                        'https://cdn02.carsforsale.com/3/1017897/42982228/1934719606.jpg',
                        'https://cdn02.carsforsale.com/3/1017897/42982228/1934719627.jpg',
                        'https://cdn02.carsforsale.com/3/1017897/42982228/1934719581.jpg',
                        'https://cdn02.carsforsale.com/3/1017897/42982228/1934719608.jpg',
                        'https://cdn02.carsforsale.com/3/1017897/42982228/1934719586.jpg',
                    ],
                },
                {
                    id: 991,
                    type: 'car',
                    brand: 'Ford',
                    model: 'F-250 Super Duty',
                    year: '2018',
                    price: 41950,
                    pictures: [
                        'https://cdn02.carsforsale.com/3/1028096/43040201/1937366255.jpg',
                        'https://cdn02.carsforsale.com/3/1028096/43040201/1937366268.jpg',
                        'https://cdn02.carsforsale.com/3/1028096/43040201/1937366257.jpg',
                        'https://cdn02.carsforsale.com/3/1028096/43040201/1937366273.jpg',
                        'https://cdn02.carsforsale.com/3/1028096/43040201/1937366259.jpg',
                    ],
                },
                {
                    id: 992,
                    type: 'car',
                    brand: 'Ford',
                    model: 'Mustang',
                    year: '2019',
                    price: 42950,
                    pictures: [
                        'https://cdn02.carsforsale.com/3/364524/43046086/1939013610.jpg',
                        'https://cdn02.carsforsale.com/3/364524/43046086/1939013651.jpg',
                        'https://cdn02.carsforsale.com/3/364524/43046086/1939013587.jpg',
                        'https://cdn02.carsforsale.com/3/364524/43046086/1939013647.jpg',
                        'https://cdn02.carsforsale.com/3/364524/43046086/1939013551.jpg',
                    ],
                },
                {
                    id: 993,
                    type: 'car',
                    brand: 'Ford',
                    model: 'Focus',
                    year: '2018',
                    price: 10950,
                    pictures: [
                        'https://cdn02.carsforsale.com/3/1030721/43034481/1937169878.jpg',
                        'https://cdn02.carsforsale.com/3/1030721/43034481/1937169895.jpg',
                        'https://cdn02.carsforsale.com/3/1030721/43034481/1937170010.jpg',
                        'https://cdn02.carsforsale.com/3/1030721/43034481/1937170035.jpg',
                        'https://cdn02.carsforsale.com/3/1030721/43034481/1937170127.jpg',
                    ],
                },
                {
                    id: 994,
                    type: 'car',
                    brand: 'Audi',
                    model: 'RS 5',
                    year: '2019',
                    price: 72900,
                    pictures: [
                        'https://cdn02.carsforsale.com/3/1031227/42939713/1934467167.jpg',
                        'https://cdn02.carsforsale.com/3/1031227/42939713/1934467176.jpg',
                        'https://cdn02.carsforsale.com/3/1031227/42939713/1934467177.jpg',
                        'https://cdn02.carsforsale.com/3/1031227/42939713/1934467182.jpg',
                        'https://cdn02.carsforsale.com/3/1031227/42939713/1934467163.jpg',
                    ],
                },
                {
                    id: 995,
                    type: 'car',
                    brand: 'Audi',
                    model: 'S5 Sportback',
                    year: '2018',
                    price: 42900,
                    pictures: [
                        'https://cdn02.carsforsale.com/3/406826/42952165/1939254486.jpg',
                        'https://cdn02.carsforsale.com/3/406826/42952165/1939254485.jpg',
                        'https://cdn02.carsforsale.com/3/406826/42952165/1939254503.jpg',
                        'https://cdn02.carsforsale.com/3/406826/42952165/1939254506.jpg',
                        'https://cdn02.carsforsale.com/3/406826/42952165/1939254530.jpg',
                    ],
                },
                {
                    id: 996,
                    type: 'car',
                    brand: 'BMW',
                    model: '7 Series',
                    year: '2017',
                    price: 43200,
                    pictures: [
                        'https://cdn02.carsforsale.com/3/1023240/42984004/1937601993.jpg',
                        'https://cdn02.carsforsale.com/3/1023240/42984004/1937602014.jpg',
                        'https://cdn02.carsforsale.com/3/1023240/42984004/1937602017.jpg',
                        'https://cdn02.carsforsale.com/3/1023240/42984004/1937602012.jpg',
                        'https://cdn02.carsforsale.com/3/1023240/42984004/1937602005.jpg',
                    ],
                },
                {
                    id: 997,
                    type: 'car',
                    brand: 'BMW',
                    model: '5 Series',
                    year: '2018',
                    price: 31900,
                    pictures: [
                        'https://cdn02.carsforsale.com/3/1023587/42879702/1931067117.jpg',
                        'https://cdn02.carsforsale.com/3/1023587/42879702/1931067184.jpg',
                        'https://cdn02.carsforsale.com/3/1023587/42879702/1931067142.jpg',
                        'https://cdn02.carsforsale.com/3/1023587/42879702/1931067122.jpg',
                        'https://cdn02.carsforsale.com/3/1023587/42879702/1931067126.jpg',
                    ],
                },
                {
                    id: 998,
                    type: 'car',
                    brand: 'BMW',
                    model: 'X5 M',
                    year: '2016',
                    price: 46991,
                    pictures: [
                        'https://cdn02.carsforsale.com/3/637503/42840275/1934756152.jpg',
                        'https://cdn02.carsforsale.com/3/637503/42840275/1934756154.jpg',
                        'https://cdn02.carsforsale.com/3/637503/42840275/1934756163.jpg',
                        'https://cdn02.carsforsale.com/3/637503/42840275/1934756142.jpg',
                        'https://cdn02.carsforsale.com/3/637503/42840275/1934756145.jpg',
                    ],
                },
                {
                    id: 999,
                    type: 'car',
                    brand: 'BMW ',
                    model: 'i3',
                    year: '2017',
                    price: 19999,
                    pictures: [
                        'https://cdn02.carsforsale.com/3/501434/43083283/1938691139.jpg',
                        'https://cdn02.carsforsale.com/3/501434/43083283/1938691119.jpg',
                        'https://cdn02.carsforsale.com/3/501434/43083283/1938691120.jpg',
                        'https://cdn02.carsforsale.com/3/501434/43083283/1938691145.jpg',
                        'https://cdn02.carsforsale.com/3/501434/43083283/1938691144.jpg',
                    ],
                },
                {
                    id: 9990,
                    type: 'car',
                    brand: 'Ford',
                    model: 'Explorer',
                    year: '2018',
                    price: 17791,
                    pictures: [
                        'https://cdn02.carsforsale.com/3/1011099/43347036/1949535563.jpg',
                        'https://cdn02.carsforsale.com/3/1011099/43347036/1949535557.jpg',
                        'https://cdn02.carsforsale.com/3/1011099/43347036/1949535582.jpg',
                        'https://cdn02.carsforsale.com/3/1011099/43347036/1949535546.jpg',
                        'https://cdn02.carsforsale.com/3/1011099/43347036/1949535555.jpg',
                    ],
                },
                {
                    id: 9992,
                    type: 'car',
                    brand: 'Ford',
                    model: 'Mustang',
                    year: '2019',
                    price: 39999,
                    pictures: [
                        'https://cdn02.carsforsale.com/3/1025665/43254604/1946282142.jpg',
                        'https://cdn02.carsforsale.com/3/1025665/43254604/1946282128.jpg',
                        'https://cdn02.carsforsale.com/3/1025665/43254604/1946282172.jpg',
                        'https://cdn02.carsforsale.com/3/1025665/43254604/1946282131.jpg',
                        'https://cdn02.carsforsale.com/3/1025665/43254604/1946282152.jpg',
                    ],
                },
                {
                    id: 9993,
                    type: 'car',
                    brand: 'Ford',
                    model: 'Transit Passenger',
                    year: '2017 ',
                    price: 19988,
                    pictures: [
                        'https://cdn02.carsforsale.com/3/1016858/43379675/1950632907.jpg',
                        'https://cdn02.carsforsale.com/3/1016858/43379675/1950632932.jpg',
                        'https://cdn02.carsforsale.com/3/1016858/43379675/1950633049.jpg',
                        'https://cdn02.carsforsale.com/3/1016858/43379675/1950633038.jpg',
                        'https://cdn02.carsforsale.com/3/1016858/43379675/1950633098.jpg',
                    ],
                },
                {
                    id: 9994,
                    type: 'car',
                    brand: 'Audi',
                    model: 'e-tron',
                    year: '2019 ',
                    price: 83010,
                    pictures: [
                        'https://cdn02.carsforsale.com/3/1003339/43305883/1948011349.jpg',
                        'https://cdn02.carsforsale.com/3/1003339/43305883/1949289633.jpg',
                        'https://cdn02.carsforsale.com/3/1003339/43305883/1949289635.jpg',
                        'https://cdn02.carsforsale.com/3/1003339/43305883/1949289650.jpg',
                        'https://cdn02.carsforsale.com/3/1003339/43305883/1949289651.jpg',
                    ],
                },
                {
                    id: 9995,
                    type: 'car',
                    brand: 'Audi',
                    model: 'RS Q8',
                    year: '2020 ',
                    price: 53500,
                    pictures: [
                        'https://cdn02.carsforsale.com/3/1024293/43101962/1939522821.jpg',
                        'https://cdn02.carsforsale.com/3/1024293/43101962/1939520521.jpg',
                        'https://cdn02.carsforsale.com/3/1024293/43101962/1939520532.jpg',
                        'https://cdn02.carsforsale.com/3/1024293/43101962/1939520544.jpg',
                        'https://cdn02.carsforsale.com/3/1024293/43101962/1939520554.jpg',
                    ],
                },
                {
                    id: 9996,
                    type: 'car',
                    brand: 'Audi',
                    model: 'A8 L',
                    year: '2019 ',
                    price: 73355,
                    pictures: [
                        'https://cdn02.carsforsale.com/3/1024527/29287181/1612322524.jpg',
                        'https://cdn02.carsforsale.com/3/1024527/29287181/1604877480.jpg',
                        'https://cdn02.carsforsale.com/3/1024527/29287181/1604877478.jpg',
                        'https://cdn02.carsforsale.com/3/1024527/29287181/1604877482.jpg',
                        'https://cdn02.carsforsale.com/3/1024527/29287181/1604878044.jpg',
                    ],
                },
                {
                    id: 9997,
                    type: 'car',
                    brand: 'BMW',
                    model: 'X6',
                    year: '2020',
                    price: 73355,
                    pictures: [
                        'https://cdn02.carsforsale.com/3/1031498/43355416/1953055634.jpg',
                        'https://cdn02.carsforsale.com/3/1031498/43355416/1953055680.jpg',
                        'https://cdn02.carsforsale.com/3/1031498/43355416/1953055666.jpg',
                        'https://cdn02.carsforsale.com/3/1031498/43355416/1953055650.jpg',
                        'https://cdn02.carsforsale.com/3/1031498/43355416/1953055663.jpg',
                    ],
                },
                {
                    id: 9998,
                    type: 'car',
                    brand: 'BMW',
                    model: '4 Series',
                    year: '2017',
                    price: 26400,
                    pictures: [
                        'https://cdn02.carsforsale.com/3/1018968/43413001/1951883169.jpg',
                        'https://cdn02.carsforsale.com/3/1018968/43413001/1951883169.jpg',
                        'https://cdn02.carsforsale.com/3/1018968/43413001/1951883242.jpg',
                        'https://cdn02.carsforsale.com/3/1018968/43413001/1951883204.jpg',
                        'https://cdn02.carsforsale.com/3/1018968/43413001/1951883221.jpg',
                    ],
                },
            ],
            totalProperties: 18,
        };
        this.layout = 'grid';
    }
}
