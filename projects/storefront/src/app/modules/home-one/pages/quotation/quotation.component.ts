import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-quotation',
    templateUrl: './quotation.component.html',
    styleUrls: ['./quotation.component.scss'],
})
export class QuotationComponent implements OnInit {
    username: string = '';

    constructor() {}

    ngOnInit(): void {
        this.getUsername();
    }

    getUsername() {
        this.username = 'Mr. Ballan';
    }
}
