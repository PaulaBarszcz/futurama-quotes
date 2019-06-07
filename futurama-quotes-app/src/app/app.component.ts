import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { Quote } from './quote.model';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
    title = 'Futurama quotes';
    characterRows: Array<object> = [];

    constructor(private appService: AppService) { }

    public ngOnInit(): void {
        const quotesObservable = this.appService.getQuotes();
        quotesObservable.subscribe((characterRows: Quote[]) => {
            this.characterRows = characterRows;
            console.log(characterRows);
        });
    }
}
