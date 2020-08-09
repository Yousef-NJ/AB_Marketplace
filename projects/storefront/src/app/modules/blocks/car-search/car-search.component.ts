import { Component, OnInit, HostBinding } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Vehicle } from '../../../interfaces/vehicle';
import { Router } from '@angular/router';
import { UrlService } from '../../../services/url.service';
@Component({
    selector: 'app-car-search',
    templateUrl: './car-search.component.html',
    styleUrls: ['./car-search.component.scss'],
})
export class CarSearchComponent implements OnInit {
    vehicleControl: FormControl = new FormControl(null);

    range: any = 0;
    value: any = 0;
    yearsValue: any = 0;
    liabilitiesValue: any = 0;
    monthlyinstallmentValue: any = 0;
    incomeValue: any = 0;
    selectedBrand: string = 'none';
    selectedYear: string = 'all';
    selectedPrice: string = 'all';
    get vehicle(): Vehicle {
        return this.vehicleControl.value;
    }

    @HostBinding('class.block') classBlock = true;

    @HostBinding('class.block-finder') classBlockFinder = true;

    constructor(private router: Router, private url: UrlService) {}

    submit(): void {
        if (!this.vehicle) {
            return;
        }

        this.router
            .navigate([this.url.allProducts()], {
                queryParams: {
                    filter_vehicle: this.vehicle.id,
                },
            })
            .then();
    }
    ngOnInit(): void {}

    onRangeValueChange(event: any) {
        console.log(event);
        this.value = event;
    }

    onChangeYearsValue(value: string) {
        console.log('the selected value is ' + value);
        this.value = value;
        this.yearsValue = value;
    }

    onChangeLiabilitiesValue(value: string) {
        console.log('the selected value is ' + value);
        this.value = value;
        this.liabilitiesValue = value;
    }

    onChangeMonthlyInstallmentValue(value: string) {
        console.log('the selected value is ' + value);
        this.value = value;
        this.monthlyinstallmentValue = value;
    }

    onChangeIncomeValue(value: string) {
        console.log('the selected value is ' + value);
        this.value = value;
        this.incomeValue = value;
    }

    onBrandSelected(value: string) {
        console.log('the selected value is ' + value);
    }

    onYearSelected(value: string) {
        console.log('the selected value is ' + value);
    }
}
