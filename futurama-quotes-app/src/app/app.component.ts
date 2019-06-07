import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppService } from './app.service';
import { Quote } from './quote.model';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, OnDestroy {
    title = 'Futurama quotes';
    characterRows: Array<object> = [];
    quotesObservable: Subscription;
    charactersToShow: Array<string> = [];

    constructor(private appService: AppService) { }

    public ngOnInit(): void {
        this.subscribeToGetQuotes();
    }

    public ngOnDestroy(): void {
        if (this.quotesObservable) {
            this.quotesObservable.unsubscribe();
        }
    }

    subscribeToGetQuotes(): void {
        const quotesObservable = this.appService.getQuotes();
        this.quotesObservable = quotesObservable
            .subscribe((characterRows: Quote[]) => {
                for (const charRow of characterRows) {
                    if (this.characterRows.length < 10) {
                        if (!this.charactersToShow.includes(charRow.character)) {
                            this.charactersToShow.push(charRow.character);
                            this.characterRows.push(charRow);
                        }
                    } else {
                        return;
                    }
                }
            },
            error => {
                console.error(error);
            },
        );
    }
}
