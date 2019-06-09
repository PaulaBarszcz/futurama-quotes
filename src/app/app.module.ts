import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ModalContentComponent } from './modal-content.component';

import { AppService } from './app.service';

@NgModule({
    declarations: [
        AppComponent,
        ModalContentComponent
    ],
    entryComponents: [ModalContentComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        NgbModule,
    ],
    providers: [AppService],
    bootstrap: [AppComponent]
})
export class AppModule { }
