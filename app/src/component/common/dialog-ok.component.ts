import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'dialog-ok',
    templateUrl: '../../template/common/dialog-ok.component.html'
})
export class DialogOkComponent {
    @Input() disabled: boolean = false;
    @Input() dialogResult: any = true;
    @Output() okClick: EventEmitter<any> = new EventEmitter<any>();

    onClick() {
        this.okClick.emit(this.dialogResult);
    }
}