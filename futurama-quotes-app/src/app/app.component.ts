import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppService } from './app.service';
import { Quote } from './quote.model';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalContentComponent } from './modal-content.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, OnDestroy {
    title = 'Futurama quotes';
    characterRows: Array<Quote> = [];
    quotesObservable: Subscription;

    constructor(private appService: AppService, private modalService: NgbModal) { }

    public ngOnInit(): void {
        this.subscribeToGetQuotes();
    }

    public ngOnDestroy(): void {
        if (this.quotesObservable) {
            this.quotesObservable.unsubscribe();
        }
    }

    public showModal(characterRow): void {
        const modalRef = this.modalService.open(ModalContentComponent,  {backdrop  : 'static', size: 'lg'});
        modalRef.componentInstance.characterName = characterRow.character;
    }
s
    private subscribeToGetQuotes(): void {
        const quotesObservable = this.appService.getQuotes();
        this.quotesObservable = quotesObservable
            .subscribe((characterRows: Quote[]) => {
                for (const [index, charRow] of characterRows.entries()) {
                    if (this.characterRows.length < 10) {
                        // there is a bug in Futurama API - no quotes for character named URL are returned after call to address:
                        // http://futuramaapi.herokuapp.com/api/characters/url - that's why I'm excluding it below
                        if (this.characterRows.filter(e => e.character === charRow.character).length === 0
                            && charRow.character !== 'URL') {
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
