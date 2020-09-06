import { Component, OnDestroy, OnInit } from '@angular/core';
import { AccountApi } from '../../../../api/base';
import { merge, of, Subject } from 'rxjs';
import { OrdersList } from '../../../../interfaces/list';
import { distinctUntilChanged, mergeMap, takeUntil } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { UrlService } from '../../../../services/url.service';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-page-orders',
    templateUrl: './page-orders.component.html',
    styleUrls: ['./page-orders.component.scss'],
})
export class PageOrdersComponent implements OnInit, OnDestroy {
    private destroy$: Subject<void> = new Subject<void>();

    currentPage: FormControl = new FormControl(1);
    list: OrdersList;
    orders: any;

    constructor(
        private accountApi: AccountApi,
        public url: UrlService,
        private http: HttpClient
    ) {}

    ngOnInit(): void {
        // this.http
        //     .get('http://192.168.43.38:4040/order')
        //     .subscribe((data: any) => {
        //         this.orders = data;
        //         console.log(this.orders);
        //     });
        this.http
            .get('http://192.168.43.38:4040/order')
            .subscribe((data: any) => {
                this.orders = data.reverse();
                console.log(this.orders);
            });
        merge(of(this.currentPage.value), this.currentPage.valueChanges)
            .pipe(
                distinctUntilChanged(),
                mergeMap((page) =>
                    this.accountApi.getOrdersList({
                        limit: 5,
                        page,
                    })
                ),
                takeUntil(this.destroy$)
            )
            .subscribe((x) => (this.list = x));
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
