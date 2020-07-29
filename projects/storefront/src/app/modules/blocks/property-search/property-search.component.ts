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
}
