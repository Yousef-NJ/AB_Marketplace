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

export interface LayoutButton {
    layout: PageShopLayout;
    icon: string;
}
@Component({
    selector: 'app-products-view',
    templateUrl: './products-view.component.html',
    styleUrls: ['./products-view.component.scss'],
})
export class ProductsViewComponent implements OnInit, OnDestroy {
    products: any;
    private destroy$: Subject<void> = new Subject<void>();

    isEmptyList$: Observable<boolean>;

    currentFiltersCount$: Observable<number>;

    hasActiveFilters$: Observable<boolean>;

    layoutButtons: LayoutButton[] = [
        { layout: 'grid', icon: 'layout-grid-16' },
        { layout: 'grid-with-features', icon: 'layout-grid-with-details-16' },
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

    @HostBinding('class.products-view--loading')
    get classProductsViewLoading(): boolean {
        return this.page.isLoading;
    }

    constructor(
        public sidebar: ShopSidebarService,
        public page: PageShopService,
        private http: HttpClient
    ) {}

    ngOnInit(): void {
        this.getProducts();
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

    getProducts() {
        this.products = {
            properties: [
                {
                    id: 1,
                    city: 'San Francisco',
                    address: 'San Francisco, CA, United States',
                    name:
                        'Civic Center Views from a Contemporary City Pad and Parking',
                    pictures: [
                        'https://a0.muscache.com/4ea/air/v2/pictures/cac13d0f-1b23-4e42-aad7-c24e40ed9895.jpg?t=r:w1200-h720-sfit,e:fjpg-c90',
                        'https://a0.muscache.com/4ea/air/v2/pictures/d1a6b280-f488-412d-9b15-0eb19ce75299.jpg?t=r:w1200-h720-sfit,e:fjpg-c90',
                        'https://a0.muscache.com/4ea/air/v2/pictures/07552b7d-38b7-4213-abba-64ce1e1aebd9.jpg?t=r:w1200-h720-sfit,e:fjpg-c90',
                        'https://a0.muscache.com/4ea/air/v2/pictures/3484658c-cd08-4aa7-99d7-d1fd52d401b4.jpg?t=r:w1200-h720-sfit,e:fjpg-c90',
                        'https://a0.muscache.com/4ea/air/v2/pictures/771354d3-d139-4e79-971d-fe3f66335646.jpg?t=r:w1200-h720-sfit,e:fjpg-c90',
                        'https://a0.muscache.com/4ea/air/v2/pictures/a08ff076-085b-40cc-9240-6a8297dd9f25.jpg?t=r:w1200-h720-sfit,e:fjpg-c90',
                        'https://a0.muscache.com/4ea/air/v2/pictures/3d93dca4-7a1c-4536-a1f7-4b77d1ce50b0.jpg?t=r:w1200-h720-sfit,e:fjpg-c90',
                        'https://a0.muscache.com/4ea/air/v2/pictures/955437ed-a77b-4bc6-9335-43bd5aecfa62.jpg?t=r:w1200-h720-sfit,e:fjpg-c90',
                        'https://a0.muscache.com/4ea/air/v2/pictures/b9d0cd06-d163-46d2-b655-08e7b667c72b.jpg?t=r:w1200-h720-sfit,e:fjpg-c90',
                        'https://a0.muscache.com/4ea/air/v2/pictures/5c31ea25-9c46-44e8-bbbc-4f960bf1fb9c.jpg?t=r:w1200-h720-sfit,e:fjpg-c90',
                        'https://a0.muscache.com/4ea/air/v2/pictures/e4b0f483-899c-4e61-9750-ca3bd15ac8d5.jpg?t=r:w1200-h720-sfit,e:fjpg-c90',
                        'https://a0.muscache.com/4ea/air/v2/pictures/965441e1-6ff4-4b30-9015-fb7960e557e1.jpg?t=r:w1200-h720-sfit,e:fjpg-c90',
                        'https://a0.muscache.com/4ea/air/v2/pictures/d1a6b280-f488-412d-9b15-0eb19ce75299.jpg?t=r:w1200-h720-sfit,e:fjpg-c90',
                        'https://a0.muscache.com/4ea/air/v2/pictures/3e128211-349f-493a-ae98-65804dcfed27.jpg?t=r:w1200-h720-sfit,e:fjpg-c90',
                    ],
                    bathroomLabel: '1 bath',
                    bedroomLabel: 'Studio',
                    bedLabel: '1 bed',
                    amenities: 'Free parking,Wifi,Kitchen',
                    avgRating: 5,
                    price: 80,
                    currency: 'USD',
                },
                {
                    id: 2,
                    city: 'San Francisco',
                    address: 'San Francisco, CA, United States',
                    name: 'Diva | Heart of Union Square | Loft Room 1 Double',
                    pictures: [
                        'https://a0.muscache.com/im/pictures/df5ef00c-1e39-44fd-94e4-964b60558454.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/adc6a62f-3d2c-4534-8671-7cd044d3cacc.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/01a6818f-f869-4d37-9470-a437e238c8a1.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/c8b00a5e-09b8-49b9-bc0c-42de7f87ec58.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/471a4775-7786-46e1-801a-c6f19193fb02.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/e455d3ed-ef5b-412e-bdaf-69c97361a38d.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/9dfee3f1-4fd1-47df-b32e-29a3d5dd0a8b.jpg?aki_policy=large',
                    ],
                    bathroomLabel: '1 bath',
                    bedroomLabel: '1 bedroom',
                    bedLabel: '1 bed',
                    amenities: 'Wifi',
                    avgRating: 4,
                    price: 196,
                    currency: 'USD',
                },
                {
                    id: 3,
                    city: 'San Francisco',
                    address: 'San Francisco, CA, United States',
                    name: 'Financial District, Amazing Building and View',
                    pictures: [
                        'https://a0.muscache.com/im/pictures/12001904-9691-402e-9df8-312ca903596d.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/b95f1d83-8b9d-42a6-87c0-5f189d5e2504.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/3ad3b205-526c-4a78-a625-8345fcb8abfd.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/6e1df210-78db-458f-a3a3-aa411bedf78f.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/84b4c6d7-2319-49d6-9b91-d1547ca3a3e7.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/e0018aa8-a18f-48ba-bde4-8dd2ea92dca8.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/28b72c1c-6224-4cff-a292-158731aeb3d6.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/be2e92d7-7cf3-419c-a8e6-4e6d6f4e3b78.jpg?aki_policy=large',
                    ],
                    bathroomLabel: '1 bath',
                    bedroomLabel: 'Studio',
                    bedLabel: '2 beds',
                    amenities: 'Wifi,Kitchen',
                    avgRating: 0,
                    price: 90,
                    currency: 'USD',
                },
                {
                    id: 4,
                    city: 'San Francisco',
                    address: 'San Francisco, CA, United States',
                    name: '316 - Private Room, Clean and New!',
                    pictures: [
                        'https://a0.muscache.com/im/pictures/b251d123-3938-476f-a2db-83f151f72f2e.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/9958bbf0-cbdb-4b3a-be03-a40b95d8dd2e.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/353b0275-2317-4362-b856-d7c0388a901c.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/29e93b99-0eee-4ce1-856e-b1e1e82d0113.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/fc1eb82d-a76d-451a-bc03-6c5d36eb5a4e.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/bc44594d-208c-4c3d-86f5-3f5bcee0c01b.jpg?aki_policy=large',
                    ],
                    bathroomLabel: '0 baths',
                    bedroomLabel: '1 bedroom',
                    bedLabel: '1 bed',
                    amenities: 'Wifi',
                    avgRating: 4.41,
                    price: 40,
                    currency: 'USD',
                },
                {
                    id: 5,
                    city: 'San Francisco',
                    address: 'San Francisco, CA, United States',
                    name: 'Newly Renovated near Painted Ladies / Hayes Valley',
                    pictures: [
                        'https://a0.muscache.com/im/pictures/e9b978fb-8595-4b2e-b921-79a98f87a2b2.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/8606742b-6efb-47e3-abba-33a4d30d26ea.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/00ca9565-21c9-43bb-b065-57b83e44d8a6.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/2e031dc9-4b81-46b5-967d-17a415cd0d94.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/715a8f3b-10ac-44c4-ac7e-05aa4d279302.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/295a5658-8869-43b3-a117-f385dd099331.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/66f32fd0-7150-4f3b-9668-23146aed2a6e.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/4cbc16f2-465f-43b2-a0ab-0588a336ddd3.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/c1886805-a4b9-4d37-a723-f4a1bfbcb8ee.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/5092a00b-d397-474c-a3a5-d04addbb071a.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/be844e24-ddf2-4058-a14a-79c372b9a274.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/5d1ef044-6a44-4e50-a0e3-7fcec0da40de.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/e5015434-d589-4c30-8ba9-c3c591dee303.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/9a87b2ba-27dc-4042-bb1f-cd8c8eece256.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/d145bd50-338f-4c43-a278-e0b011d1ca94.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/dbd393aa-9d14-4ce9-ba4f-e890042acd0c.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/24e2cde2-4cc4-4fd2-89b6-ff6300c636b1.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/17a16f6a-47fd-4524-a84a-f43d22c47f07.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/8e29b653-2693-4b28-9261-d8b3cca5b706.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/b48ec0e5-68aa-40e2-b88a-1ced5fff6563.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/91e7cca2-77c9-4427-bdc3-7ed01e392c9d.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/a5b92f22-7dd3-4cd7-9276-c5141d0bec7b.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/c4a16639-edda-4c04-b3ad-cefa09727c89.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/1687761e-0acd-4c18-9f4a-d9b09ef8ecc5.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/bae6562f-83c6-4c6e-b82b-f9a0b2314f22.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/41487d90-cd0f-48df-8e72-ebb269df85bc.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/d5c960de-80f2-476e-a84c-1dd942121262.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/cb691fdb-930f-4adb-948f-a67b56100697.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/4b0ea0d5-6d27-4e8a-be3c-2820ab0bafb9.jpg?aki_policy=large',
                    ],
                    bathroomLabel: '2 shared baths',
                    bedroomLabel: '1 bedroom',
                    bedLabel: '1 bed',
                    amenities: 'Wifi,Kitchen',
                    avgRating: 0,
                    price: 49,
                    currency: 'USD',
                },
                {
                    id: 6,
                    city: 'San Francisco',
                    address: 'San Francisco, CA, United States',
                    name: 'Private room with very pretty bey view',
                    pictures: [
                        'https://a0.muscache.com/im/pictures/e60847c0-49bc-49de-b222-8153683e3176.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/7e6dad78-b0b8-4de9-b46d-3ae1c63990c3.jpg?aki_policy=large',
                    ],
                    bathroomLabel: '1 private bath',
                    bedroomLabel: '1 bedroom',
                    bedLabel: '1 bed',
                    amenities: 'Wifi,Kitchen',
                    avgRating: 0,
                    price: 48,
                    currency: 'USD',
                },
                {
                    id: 7,
                    city: 'San Francisco',
                    address: 'San Francisco, CA, United States',
                    name: 'FOUND Hotel San Francisco, Bed in Shared Room',
                    pictures: [
                        'https://a0.muscache.com/im/pictures/75ad37f9-c4a8-42bf-b86f-5826dd9d2a52.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/25dc9f28-a82a-4003-b7d9-cc07565c0a58.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/6d86cb6c-9a2d-46c3-bcd1-0637b0079431.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/e316fdcb-6c9d-4ee4-be3f-b08565833e92.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/0d83bf37-7ddc-4c6a-a603-2cd03b7c4528.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/415f89a5-eadb-4e8e-852b-7afd45748f22.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/b5a2c16e-d4ad-4669-bb6b-7b09022c03a7.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/abf6105b-27b8-4db2-8d5f-09fe83f709d2.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/77522378-be3f-495a-9bc7-646d9facf40e.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/c1c509e1-b947-4109-8b3e-092316791a1d.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/1a633de7-f7a1-432a-be7c-f2778a64b7b6.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/ff8b0b6f-e163-4d8b-ba1b-2f0308c7ef8b.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/c0269c94-ea06-4ad0-9d1e-1af8b92a59a1.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/ce591905-50f5-412d-a450-04ed8e75d766.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/0914e186-d80d-4514-a20b-cb34edd21a20.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/3817a652-01b9-4662-a3d0-c17e94cbff19.jpg?aki_policy=large',
                    ],
                    bathroomLabel: '1 shared bath',
                    bedroomLabel: '1 bedroom',
                    bedLabel: '1 bed',
                    amenities: 'Wifi,Kitchen',
                    avgRating: 4.92,
                    price: 36,
                    currency: 'USD',
                },
                {
                    id: 8,
                    city: 'San Francisco',
                    address: 'San Francisco, CA, United States',
                    name: 'Female room for 3 ppl at Japantown House',
                    pictures: [
                        'https://a0.muscache.com/im/pictures/1df18863-f85b-41fd-83f8-d92faf0270f3.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/7b369c2a-9e71-46e1-8f6a-9a8583c673f0.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/f23f8c07-045a-435e-98b1-8e5c8e528a36.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/4ae5ac90-55bf-4faf-9d1e-d8998d2926ee.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/d70b54b9-944f-4c99-9142-480a5f8a5d84.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/48d005c5-066f-42fd-999c-9be89d1c0222.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/91398a0c-1a40-4be8-ae82-ae08d0b60560.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/72ee97e3-a16a-4633-b657-a9aacd7d6e3a.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/bdb9e0c1-e1fe-4adf-8921-ae75bfefcead.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/5952a3dc-cd33-4d6b-a741-4583573124a6.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/230620f7-239e-4211-a459-d1bfcc5f440b.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/60268411-5810-40fb-8d0f-eb6770efe498.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/21c4e6f2-66c2-4c7f-8212-8fd5be6e4f70.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/ff74f9da-344b-44f5-9c71-915a91e33281.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/25913c3d-8aa7-4794-b371-77cfbbf37bd7.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/09cb022b-be6d-4724-ae01-fcd6bcd1133e.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/3cb3b6a5-c328-42f2-a3fc-5d1025fc6b56.jpg?aki_policy=large',
                    ],
                    bathroomLabel: '2 shared baths',
                    bedroomLabel: '1 bedroom',
                    bedLabel: '3 beds',
                    amenities: 'Wifi,Kitchen',
                    avgRating: 0,
                    price: 20,
                    currency: 'USD',
                },
                {
                    id: 9,
                    city: 'San Francisco',
                    address: 'San Francisco, CA, United States',
                    name: 'Safe Private entry Pac Heights Studio, Tree Lined',
                    pictures: [
                        'https://a0.muscache.com/im/pictures/27e77c00-e407-4b6b-88b8-68bde2a19c7a.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/5a9fc030-9cc4-41af-b67f-02c642df8480.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/a043c81e-7ac7-4b37-8e37-97e18aae3ca2.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/b964e9cc-ddda-442b-8984-a7180ee46ea2.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/e4cde327-7832-4899-861b-1f73d3317e86.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/380cbe65-7833-422a-94dc-92ebe41b8ee5.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/41f7caa1-4688-42bd-933f-5dde1680a711.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/3c6d6383-d707-4f40-abe8-23367281e911.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/2bb45b98-0c48-4628-b7b1-beaa2b35b79c.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/6a3414d0-d497-4e58-9e83-fd55c3dca432.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/fc6ea797-ff8a-47b9-aa8c-ec7087a7bf0c.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/4fbe1d22-ba2f-4a60-bfef-b6325df3271d.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/817ca106-485e-41f2-8bf7-5177d4afa2b5.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/ac7e0835-949d-4382-bb9e-1e03fba97d1a.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/f53d14f0-09c6-4a71-a0e8-f0cfdf629c79.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/4e02270e-685e-499f-a20c-173ff73d45d4.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/18478646-e8ef-4020-84db-c02e92b87d19.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/2bf398e9-275c-4a3f-81d2-2cbd40f93297.jpg?aki_policy=large',
                    ],
                    bathroomLabel: '1 bath',
                    bedroomLabel: 'Studio',
                    bedLabel: '2 beds',
                    amenities: 'Wifi,Kitchen',
                    avgRating: 0,
                    price: 75,
                    currency: 'USD',
                },
                {
                    id: 10,
                    city: 'San Francisco',
                    address: 'San Francisco, CA, United States',
                    name: 'Centrally Located Studio',
                    pictures: [
                        'https://a0.muscache.com/im/pictures/d9909c72-f66b-4fcd-a47b-603feb98c413.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/79841e1f-ee4b-45ff-96ca-5b0c05320d52.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/726ecafb-af9d-4b95-9b6b-98a2f554dc13.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/872f4291-1c71-4b84-9ea1-4b11c640247c.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/02fe4974-d74b-4bca-ad3d-ee685fea9f7f.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/4633633e-c0fb-441d-9f1b-0c283072a3a2.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/d2181a47-e6e9-48ea-b55b-854bd49da0c6.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/ee6b7896-9817-4bc5-aa04-e4a39fd0c87d.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/106f4110-d0d4-434c-bb28-7f01466fe799.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/674ec798-d189-4750-a0c3-d1455daa4397.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/2bd99091-03f2-4f82-b122-c20861a1b1a2.jpg?aki_policy=large',
                    ],
                    bathroomLabel: '1 bath',
                    bedroomLabel: 'Studio',
                    bedLabel: '1 bed',
                    amenities: 'Wifi,Kitchen',
                    avgRating: 4,
                    price: 55,
                    currency: 'USD',
                },
                {
                    id: 11,
                    city: 'San Francisco',
                    address: 'San Francisco, CA, United States',
                    name: 'Grant Plaza Hotel, Standard Double',
                    pictures: [
                        'https://a0.muscache.com/im/pictures/c5d9ed10-3193-43cf-a515-55e318b7cb9a.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/9e547872-fd8a-43dd-9db0-bc28af940e0f.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/260539bb-99d6-43a1-a41d-eea829d03784.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/4626e7bc-146f-4ea6-a716-f6b84216b776.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/9145da66-9836-4a68-b264-6ac0ebc60a20.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/f0e96d53-84f3-4583-928d-655fb7f50079.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/8bb050d8-ccd0-445d-be69-bbec1a472f14.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/ad8d2bf5-1e4c-4be1-b908-0ea6d86eda0a.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/22e210a1-227a-4ea3-8277-816b193081a3.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/c912e77f-7295-46b2-ad0b-05a6b965b7f5.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/fa4d5744-278f-43fe-bc68-db01c27e32ae.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/e6d876cd-bbe5-47d7-b883-1e149585ec5d.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/c882532c-78f7-40ec-b33e-cc43af7c6f47.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/1eb3fd19-7f5b-4bc1-8b26-fe27dbe47da9.jpg?aki_policy=large',
                    ],
                    bathroomLabel: '1 bath',
                    bedroomLabel: '1 bedroom',
                    bedLabel: '1 bed',
                    amenities: 'Wifi',
                    avgRating: 4.21,
                    price: 109,
                    currency: 'USD',
                },
                {
                    id: 12,
                    city: 'San Francisco',
                    address: 'San Francisco, CA, United States',
                    name: 'Sublease: Master Bedroom with Private Bathroom',
                    pictures: [
                        'https://a0.muscache.com/im/pictures/02330202-f378-4ae3-87df-ff2d12f91ba7.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/b0260302-8e12-4884-8e57-70da9d7aa874.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/76730913-c426-41db-929f-5960da7cbf8c.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/55702670-d6fe-4c19-9d6f-d2ba484a282e.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/f493b81e-02b7-4655-87b7-6a874b091443.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/f6105c7e-2ace-4e67-9c32-c07d1fdc78a6.jpg?aki_policy=large',
                    ],
                    bathroomLabel: '1 private bath',
                    bedroomLabel: '1 bedroom',
                    bedLabel: '',
                    amenities: 'Kitchen',
                    avgRating: 0,
                    price: 62,
                    currency: 'USD',
                },
                {
                    id: 13,
                    city: 'San Francisco',
                    address: 'San Francisco, CA, United States',
                    name: 'Gorgeous Renovated Near Painted LadiesHayes Valley',
                    pictures: [
                        'https://a0.muscache.com/im/pictures/d5c960de-80f2-476e-a84c-1dd942121262.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/e9b978fb-8595-4b2e-b921-79a98f87a2b2.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/8606742b-6efb-47e3-abba-33a4d30d26ea.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/00ca9565-21c9-43bb-b065-57b83e44d8a6.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/2e031dc9-4b81-46b5-967d-17a415cd0d94.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/715a8f3b-10ac-44c4-ac7e-05aa4d279302.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/295a5658-8869-43b3-a117-f385dd099331.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/66f32fd0-7150-4f3b-9668-23146aed2a6e.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/4cbc16f2-465f-43b2-a0ab-0588a336ddd3.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/c1886805-a4b9-4d37-a723-f4a1bfbcb8ee.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/5092a00b-d397-474c-a3a5-d04addbb071a.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/be844e24-ddf2-4058-a14a-79c372b9a274.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/5d1ef044-6a44-4e50-a0e3-7fcec0da40de.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/e5015434-d589-4c30-8ba9-c3c591dee303.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/9a87b2ba-27dc-4042-bb1f-cd8c8eece256.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/d145bd50-338f-4c43-a278-e0b011d1ca94.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/dbd393aa-9d14-4ce9-ba4f-e890042acd0c.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/24e2cde2-4cc4-4fd2-89b6-ff6300c636b1.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/17a16f6a-47fd-4524-a84a-f43d22c47f07.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/8e29b653-2693-4b28-9261-d8b3cca5b706.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/b48ec0e5-68aa-40e2-b88a-1ced5fff6563.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/91e7cca2-77c9-4427-bdc3-7ed01e392c9d.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/a5b92f22-7dd3-4cd7-9276-c5141d0bec7b.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/c4a16639-edda-4c04-b3ad-cefa09727c89.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/1687761e-0acd-4c18-9f4a-d9b09ef8ecc5.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/bae6562f-83c6-4c6e-b82b-f9a0b2314f22.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/41487d90-cd0f-48df-8e72-ebb269df85bc.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/cb691fdb-930f-4adb-948f-a67b56100697.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/4b0ea0d5-6d27-4e8a-be3c-2820ab0bafb9.jpg?aki_policy=large',
                    ],
                    bathroomLabel: '2.5 shared baths',
                    bedroomLabel: '1 bedroom',
                    bedLabel: '1 bed',
                    amenities: 'Wifi,Kitchen',
                    avgRating: 0,
                    price: 54,
                    currency: 'USD',
                },
                {
                    id: 14,
                    city: 'San Francisco',
                    address: 'San Francisco, CA, United States',
                    name: 'Soma 2bunk bed/Furnished kitchen&laundry included',
                    pictures: [
                        'https://a0.muscache.com/im/pictures/0bb8459a-c3d0-42f4-9b9b-3da0d90ce87d.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/a696217c-c61d-4c2e-bbd9-280ad0bfac7b.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/4ce42ebc-a420-414d-a919-c55137f87605.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/bd4b92b3-6cd8-4cef-8245-79fa632fcd7d.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/53ffd300-07cb-4c6d-877a-3b95efd847a8.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/b466ca86-b4a5-483d-b76b-d12cf9b1ddaf.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/6d3de7eb-0973-43c0-9ed1-94e91be371b7.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/cc705fcf-abd3-41b9-9e32-0b9af778cb17.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/7fcf1d4f-ec80-46b9-8e57-5ab4e2b5cf87.jpg?aki_policy=large',
                    ],
                    bathroomLabel: '3 shared baths',
                    bedroomLabel: '1 bedroom',
                    bedLabel: '2 beds',
                    amenities: 'Wifi,Kitchen',
                    avgRating: 0,
                    price: 34,
                    currency: 'USD',
                },
                {
                    id: 15,
                    city: 'San Francisco',
                    address: 'San Francisco, CA, United States',
                    name: 'shared room in SoMa/1mon',
                    pictures: [
                        'https://a0.muscache.com/im/pictures/02753a5d-1785-4e78-be57-90b691b12354.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/79a3907c-2658-4198-99b9-9c43fd0b7823.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/fc7eef18-992d-454a-9976-66667e2eecd1.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/d7a7227b-9051-4d0e-9b83-7b6acb40037d.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/dc103a59-f7ca-45f2-940b-b82de5294e0c.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/d50a2a61-64cf-471f-9ea8-73fe249057f6.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/b03a88cd-1e1e-49a3-8fef-840da7700191.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/aba6dbfe-da48-424e-8436-863580693362.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/6ec1ab5d-9af7-4fd0-b67d-68b8c36938ca.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/9cc523f7-02d9-4c68-bee1-54b705f0f6b6.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/f8079431-35fb-4d22-afda-72dcef6ee328.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/7d0e87ac-2c9b-484f-b9b3-3eb35a87f956.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/0823a6f8-56cb-4af6-9eb7-eac3c43586cb.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/e03f6d11-766e-4cc7-b510-7cd259ef35c5.jpg?aki_policy=large',
                    ],
                    bathroomLabel: '3 shared baths',
                    bedroomLabel: '1 bedroom',
                    bedLabel: '1 bed',
                    amenities: 'Wifi,Kitchen',
                    avgRating: 0,
                    price: 22,
                    currency: 'USD',
                },
                {
                    id: 16,
                    city: 'San Francisco',
                    address: 'San Francisco, CA, United States',
                    name: 'Room for women/3-people shared room',
                    pictures: [
                        'https://a0.muscache.com/im/pictures/64a153f4-3ec0-41fc-a414-a95f067886e0.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/35632db8-b13c-4e3b-87ad-4c44beaa1d80.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/56915c12-6823-4b48-9f33-d7aed77ffc80.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/90a4a20d-36ed-4001-8b8a-308813eb01f9.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/72220e6e-7f26-4805-91a7-983a409bcd87.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/43278118-b580-4f60-a559-5fd8a2b337d2.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/f444d315-d8a6-4d13-a73d-d80eff6fe255.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/c643db0c-4d07-43c9-bada-530b6ee60059.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/40a855d4-5049-457f-a6d9-a1b05c5aea78.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/7b54f58d-6330-47e7-956e-37ba913dc290.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/e8bcdb75-06ea-4f95-ad0a-e7a5f450f00a.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/f324ff61-3eae-4a95-8e44-05dd61a412e3.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/8f319a70-4961-4d46-8222-c7b5267afc6a.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/4618e02e-336b-4d83-b5cf-3abfd6d60965.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/e394f0fe-1f1d-4c97-b70e-7ecf6d060f3d.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/dd4ae4e0-3c13-4b9d-8ed3-26b6c8dbf384.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/f93e9e5e-66cc-4bab-8985-db66288d14c1.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/87a5e9da-2968-40c4-8252-b605e067c927.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/6a547189-0f61-4e3b-b0a6-15db9ec88438.jpg?aki_policy=large',
                    ],
                    bathroomLabel: '2 shared baths',
                    bedroomLabel: '1 bedroom',
                    bedLabel: '3 beds',
                    amenities: 'Wifi,Kitchen',
                    avgRating: 0,
                    price: 21,
                    currency: 'USD',
                },
                {
                    id: 17,
                    city: 'San Francisco',
                    address: 'San Francisco, CA, United States',
                    name: 'Twin bed in private room/Outpost Club',
                    pictures: [
                        'https://a0.muscache.com/im/pictures/ebdc773c-b1e7-4b19-bced-47cd9c9b2656.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/be736492-d9dd-478b-b1bf-8bf83540278e.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/5649a3e1-d469-4388-80b1-4ade6c9a6e13.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/7dff738c-705e-4cd4-a61c-496c0fe668e0.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/9171796f-0fb0-4db2-8e82-69e7f83bf9d6.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/d1f05d96-28f1-4246-bbb0-319b3070e64a.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/8bcfe328-81f9-498b-8fac-8611ff51fa9c.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/37aa9493-dba0-4dd5-b0fe-c66f56bc9b8f.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/6bf89af2-c733-4351-ba93-9f5556ffa10d.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/cdd81f78-162b-483d-b908-835809a4cb61.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/b9e41d5e-3591-43aa-925d-4fd156f23661.jpg?aki_policy=large',
                    ],
                    bathroomLabel: '6 shared baths',
                    bedroomLabel: '1 bedroom',
                    bedLabel: '1 bed',
                    amenities: 'Wifi,Kitchen',
                    avgRating: 0,
                    price: 43,
                    currency: 'USD',
                },
                {
                    id: 18,
                    city: 'San Francisco',
                    address: 'San Francisco, CA, United States',
                    name: 'Dorm Bed In Friendly Hostel Community #2',
                    pictures: [
                        'https://a0.muscache.com/im/pictures/472437/e7822945_original.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/2220317/c713aed3_original.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/2220270/fb81b9c8_original.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/0bfec2b6-7826-4fd4-9366-b31d5568ea5e.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/2220305/6d39c998_original.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/472440/82d45711_original.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/2220293/3cab8353_original.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/2220289/2c80aae1_original.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/04e22cf4-4c9a-4613-99f2-6ddd33465b2b.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/2220311/df6b0a04_original.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/2220324/ccb665cc_original.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/54f3ce7c-3644-4845-ac1b-f156ac3cf031.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/2220340/94da5089_original.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/1fe03bca-690e-4c41-9c1f-daf91db4e5b9.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/037e44f6-c230-462a-a7f2-fdf4a389b818.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/f8244974-87ec-4b9c-80d7-942d38dbc7f9.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/2dc8f688-b926-4e76-864c-7e872f920ecd.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/a262c1af-4f39-4391-ba12-ab295621a575.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/cedaa865-5cb0-4332-a884-c2965ab324e8.jpg?aki_policy=large',
                    ],
                    bathroomLabel: '1 shared bath',
                    bedroomLabel: '1 bedroom',
                    bedLabel: '4 beds',
                    amenities: 'Wifi,Kitchen',
                    avgRating: 4.69,
                    price: 33,
                    currency: 'USD',
                },
                {
                    id: 19,
                    city: 'San Francisco',
                    address: 'San Francisco, CA, United States',
                    name: 'Cozy and Efficient SF Studio Condo.',
                    pictures: [
                        'https://a0.muscache.com/im/pictures/56f42eae-de17-4588-8ab0-57a83b5219c1.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/9c62b156-1016-4532-acfb-90d4df9e885a.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/1546e37a-5f67-4907-aecd-040d24244e57.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/03d4a543-c0ac-42dd-bfb7-aed3a6cf89ed.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/c4e1c659-b82a-4a1f-95cd-2de3f8797611.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/fe145a14-5269-4114-8c65-38907e23b9a7.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/5fde3fd7-a3e1-489e-a818-3a85dbeba874.jpg?aki_policy=large',
                    ],
                    bathroomLabel: '1 bath',
                    bedroomLabel: 'Studio',
                    bedLabel: '1 bed',
                    amenities: 'Wifi,Kitchen',
                    avgRating: 0,
                    price: 70,
                    currency: 'USD',
                },
                {
                    id: 20,
                    city: 'San Francisco',
                    address: 'San Francisco, CA, United States',
                    name: 'Efficient SOMA Studio',
                    pictures: [
                        'https://a0.muscache.com/im/pictures/86149071-04fe-48d5-8c67-15938fa0d1a9.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/fb3c9467-555c-496e-8983-c0fc719543da.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/3682b3c2-4dd3-4d1f-a839-10771faab832.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/260607e5-1225-4dc2-8cac-97b88a4c1a82.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/78e7dbc1-67c0-4f29-9808-6d3240306efa.jpg?aki_policy=large',
                        'https://a0.muscache.com/im/pictures/ca83d9f8-7064-4002-a538-0237a2198490.jpg?aki_policy=large',
                    ],
                    bathroomLabel: '1 bath',
                    bedroomLabel: 'Studio',
                    bedLabel: '1 bed',
                    amenities: 'Wifi,Kitchen',
                    avgRating: 0,
                    price: 85,
                    currency: 'USD',
                },
            ],
            totalProperties: 1001,
        };
        this.layout = 'grid';
    }
}
