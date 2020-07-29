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
}
