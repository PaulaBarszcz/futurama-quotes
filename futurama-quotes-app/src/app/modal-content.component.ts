import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from './app.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-ngbd-modal-content',
    templateUrl: './modal-content.component.html',
    styleUrls: ['./modal-content.component.scss']
})

export class ModalContentComponent implements OnInit, OnDestroy {
    @Input() public characterName;
    characterQuotes: Array<string> = [];
    characterQuotesObservable: Subscription;

    constructor(private appService: AppService, public activeModal: NgbActiveModal) { }

    get shouldLengthErrorBeVisible() {
        return this.characterQuotes.length > 0 && this.characterQuotes.length < 5;
    }

    public ngOnInit(): void {
        this.subscribeToGetCharacterQuotes();
    }

    public ngOnDestroy(): void {
        if (this.characterQuotesObservable) {
            this.characterQuotesObservable.unsubscribe();
        }
    }

    private subscribeToGetCharacterQuotes(): void {
        const characterQuotesObservable = this.appService.getCharacterQuotes(this.characterName);
        this.characterQuotesObservable = characterQuotesObservable
            .subscribe((characterQuotes) => {
                let i = 0;
                while (i < 5) {
                    if (characterQuotes[i]) {
                        this.characterQuotes.push(characterQuotes[i].quote);
                    } else {
                        break;
                    }
                    i++;
                }
            },
            error => {
                console.error(error);
            },
        );
    }
}
