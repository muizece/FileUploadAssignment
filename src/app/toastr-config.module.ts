import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    ToastrModule.forRoot({ // Configure Toastr
      timeOut: 3000, // Default timeout for toasts
      positionClass: 'toast-top-center', // Position of toasts
      preventDuplicates: true, // Prevent duplicate toasts
      progressBar: true, // Show progress bar
      closeButton: true, // Show close button on toast
      newestOnTop: true, // Newest toasts appear on top
    })
  ],
  exports: [
    CommonModule,
    ToastrModule
  ]
})
export class ToastrConfigModule { }
