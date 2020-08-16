import { ChangeDetectorRef, Directive, OnDestroy } from '@angular/core';
import { Product } from '../../../interfaces/product';
import { CompareService } from '../../../services/compare.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Directive({
    selector: '[appAddToCompare]',
    exportAs: 'addToCompare',
})
export class AddToCompareDirective implements OnDestroy {
    private destroy$: Subject<void> = new Subject<void>();

    inProgress = false;

    static type: string = 'any';

    constructor(
        private compare: CompareService,
        private cd: ChangeDetectorRef
    ) {}

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    add(product: any): void {
        if (this.inProgress) {
            return;
        }

        console.log(product.type);
        console.log(AddToCompareDirective.type);

        if (product.type != AddToCompareDirective.type) {
            console.log('clear');
            this.compare
                .clear()
                .pipe(takeUntil(this.destroy$))
                .subscribe({
                    complete: () => {},
                });
            AddToCompareDirective.type = product.type;
        }

        console.log('current type' + AddToCompareDirective.type);

        this.inProgress = true;
        this.compare
            .add(product)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                complete: () => {
                    this.inProgress = false;
                    this.cd.markForCheck();
                },
            });
    }
}
