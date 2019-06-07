import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-ngbd-modal-content',
    templateUrl: './modal-content.component.html'
})

export class ModalContentComponent implements OnInit {
    @Input() public characterRow;

    constructor() { }

    public ngOnInit(): void {
        console.log(this.characterRow);
    }
}
