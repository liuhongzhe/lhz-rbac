import { NgModule } from '@angular/core';
import {
    MaterialModule,
    MdAutocompleteModule,
    MdCheckboxModule,
    MdDatepickerModule,
    MdInputModule,
    MdRadioModule,
    MdSelectModule,
    MdSliderModule,
    MdSlideToggleModule,
    MdMenuModule,
    MdSidenavModule,
    MdToolbarModule,
    MdListModule,
    MdGridListModule,
    MdCardModule,
    MdTabsModule,
    MdButtonModule,
    MdButtonToggleModule,
    MdChipsModule,
    MdIconModule,
    MdProgressSpinnerModule,
    MdProgressBarModule,
    MdDialogModule,
    MdTooltipModule,
    MdSnackBarModule,
    MdTableModule,
    MdSortModule,
    MdPaginatorModule,
    MdSnackBarConfig
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    imports: [
        MaterialModule,
        MdAutocompleteModule,
        MdCheckboxModule,
        MdDatepickerModule,
        MdInputModule,
        MdRadioModule,
        MdSelectModule,
        MdSliderModule,
        MdSlideToggleModule,
        MdMenuModule,
        MdSidenavModule,
        MdToolbarModule,
        MdListModule,
        MdGridListModule,
        MdCardModule,
        MdTabsModule,
        MdButtonModule,
        MdButtonToggleModule,
        MdChipsModule,
        MdIconModule,
        MdProgressSpinnerModule,
        MdProgressBarModule,
        MdDialogModule,
        MdTooltipModule,
        MdSnackBarModule,
        MdTableModule,
        MdSortModule,
        MdPaginatorModule
    ],
    exports: [
        MaterialModule,
        MdAutocompleteModule,
        MdCheckboxModule,
        MdDatepickerModule,
        MdInputModule,
        MdRadioModule,
        MdSelectModule,
        MdSliderModule,
        MdSlideToggleModule,
        MdMenuModule,
        MdSidenavModule,
        MdToolbarModule,
        MdListModule,
        MdGridListModule,
        MdCardModule,
        MdTabsModule,
        MdButtonModule,
        MdButtonToggleModule,
        MdChipsModule,
        MdIconModule,
        MdProgressSpinnerModule,
        MdProgressBarModule,
        MdDialogModule,
        MdTooltipModule,
        MdSnackBarModule,
        MdTableModule,
        MdSortModule,
        MdPaginatorModule
    ],
    providers: [
        MdSnackBarConfig
    ]
})
export class MaterialImportModule {
    constructor(snackBarConfig: MdSnackBarConfig) {
        snackBarConfig.duration = 2000;
    }
}