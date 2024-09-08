import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class SubmissionService {
  constructor(private toastr: ToastrService) {}

  submitForm(formData: any) {
    return of(formData).pipe(delay(2000));
  }
}
