import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'image-upload',
    templateUrl: '../../template/common/image-upload.component.html'
})
export class ImageUploadComponent {
    @Input() source: string;
    @Output() logoChange: EventEmitter<string> = new EventEmitter();

    logoSelected(event) {
        let me = this;
        if (event.target.files && event.target.files.length > 0) {
            var fr = new FileReader();
            fr.onload = function (e) {
                me.source = fr.result;
                me.logoChange.emit(me.source);
            };
            fr.readAsDataURL(event.target.files[0]);
        }
    }

    clear(event) {
        this.source = null;
        this.logoChange.emit(null);
        event.cancelBubble = true;
    }
}