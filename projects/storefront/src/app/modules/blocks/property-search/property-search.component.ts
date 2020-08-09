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
}
