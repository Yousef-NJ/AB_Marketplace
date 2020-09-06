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
    downpaymentValue: any = 0;
    incomeValueInput: any;
    yearsFilter = false;
    priceFilter = false;
    carYear: any = 'all';
    isVisable = false;

    brandShowen = false;
    brands: string = 'all';

    filterdBrands: string = 'All';
    maxPrice: number = 100000;
    minPrice: number = 0;
    mmmm: number;
    creditValue: any = 0;
    monthlyRepaument: number;
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

    cal() {
        let m: number = +this.liabilitiesValue;
        let c: number = +this.creditValue;
        let k: number = +this.monthlyinstallmentValue;
        let x: number = +(k * 0.5 - (c + m)) * this.yearsValue * 12;
        let y: number = +(x * 7) / 100;
        let down: number = +this.downpaymentValue;
        this.mmmm = down + x + y;
        this.monthlyRepaument = +y / 12;

        this.mmmm = Math.ceil(this.mmmm);
        this.monthlyRepaument = Math.ceil(this.monthlyRepaument);
    }

    onChangeYearsValue(value: string) {
        console.log('the selected value is ' + value);
        this.value = value;
        this.yearsValue = value;
        this.cal();
    }

    onChangeLiabilitiesValue(value: string) {
        console.log('the selected value is ' + value);
        this.value = value;
        this.liabilitiesValue = value;
        this.cal();
    }

    onChangeLCreditValue(value: any) {
        this.creditValue = value;
        this.cal();
    }

    onChangeMonthlyInstallmentValue(value: string) {
        // console.log('the selected value is ' + value);
        this.value = value;
        this.monthlyinstallmentValue = value;
        if (this.downpaymentValue > 0) {
            this.isVisable = true;
        }
        this.cal();
    }

    onChangeIncomeValue(value: string) {
        // console.log('the selected value is ' + value);
        this.value = value;
        this.incomeValue = value;
        this.cal();
    }

    onChangedownpaymentValue(value: string) {
        this.downpaymentValue = value;
        if (this.monthlyinstallmentValue > 0) {
            this.isVisable = true;
        }
        this.cal();
    }

    onBrandSelected(value: string) {
        // console.log('the selected value is ' + value);
    }

    onYearSelected(value: string) {
        // console.log('the selected value is ' + value);
    }
    changeIncome(value: string) {
        // console.log('the selected value is ' + value);
    }
    onCarYearChange(value: any) {
        this.carYear = value;
    }
    showBrands() {
        this.brandShowen = !this.brandShowen;
        this.yearsFilter = false;
        this.priceFilter = false;
    }
    showUYear() {
        this.yearsFilter = !this.yearsFilter;
        this.priceFilter = false;
        this.brandShowen = false;
    }
    showPrice() {
        this.priceFilter = !this.priceFilter;
        this.yearsFilter = false;
        this.brandShowen = false;
    }
    addBrand(type: string) {
        if (this.filterdBrands == 'All') {
            this.filterdBrands = type + ', ';
        } else if (this.filterdBrands.indexOf(type) >= 0) {
            this.filterdBrands =
                this.filterdBrands.substring(
                    0,
                    this.filterdBrands.indexOf(type)
                ) +
                this.filterdBrands.substring(
                    this.filterdBrands.indexOf(type) + type.length + 2,
                    this.filterdBrands.length
                );
        } else {
            this.filterdBrands += type + ', ';
        }

        if (this.filterdBrands == '') {
            this.filterdBrands = 'All';
        }
    }

    changeMaxPrice(value) {
        this.maxPrice = value;
    }

    changeMinPrice(value) {
        this.minPrice = value;
    }
}
