import { Component, Inject } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'confirm',
    templateUrl: '../../template/common/confirm.component.html'
})
export class ConfirmComponent {
    constructor( @Inject(MD_DIALOG_DATA) public data: any) { }
}