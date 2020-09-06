import { Component, OnInit, HostBinding } from '@angular/core';
import {
    FormControl,
    FormGroup,
    FormBuilder,
    Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UrlService } from '../../../services/url.service';
import { Vehicle } from '../../../interfaces/vehicle';

@Component({
    selector: 'app-property-search',
    templateUrl: './property-search.component.html',
    styleUrls: ['./property-search.component.scss'],
})
export class PropertySearchComponent implements OnInit {
    vehicleControl: FormControl = new FormControl(null);
    rentFormSearch: FormGroup;
    formBuilder: FormBuilder;
    range: any = 0;
    value: any = 0;
    yearsValue: any = 0;
    liabilitiesValue: any = 0;
    monthlyinstallmentValue: any = 0;
    incomeValue: any = 0;
    numberOfRooms: string = 'all';
    downpaymentValue: any = 0;
    isVisable: boolean = false;
    creditValue: any = 0;
    monthlyRepaument: number = 0;
    mmmm: number = 0;

    get vehicle(): Vehicle {
        return this.vehicleControl.value;
    }

    @HostBinding('class.block') classBlock = true;

    @HostBinding('class.block-finder') classBlockFinder = true;

    constructor(private router: Router, private url: UrlService) {
        // this.rentFormSearch = this.formBuilder.group({
        //     Country: [
        //         '',
        //         Validators.compose([
        //             Validators.required,
        //             Validators.minLength(2),
        //         ]),
        //     ],
        //     City: [
        //         '',
        //         Validators.compose([
        //             Validators.required,
        //             Validators.minLength(1),
        //         ]),
        //     ],
        //     Rooms: [
        //         '',
        //         Validators.compose([
        //             Validators.required,
        //             Validators.minLength(2),
        //         ]),
        //     ],
        //     Type: [
        //         '',
        //         Validators.compose([
        //             Validators.required,
        //             Validators.minLength(1),
        //         ]),
        //     ],
        // });
    }

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

    search() {}

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

    onNumberOfRoomsSelected(value: string) {
        this.numberOfRooms = value;
    }
}
