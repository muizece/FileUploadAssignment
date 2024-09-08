import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { RegistrationFormComponent } from './registration-form.component';
import { SubmissionService } from '../registeration-form-service/submission-service';

describe('RegistrationFormComponent', () => {
  let component: RegistrationFormComponent;
  let fixture: ComponentFixture<RegistrationFormComponent>;
  let toastrService: jasmine.SpyObj<ToastrService>;
  let submissionService: jasmine.SpyObj<SubmissionService>;

  beforeEach(async () => {
    const toastrSpy = jasmine.createSpyObj('ToastrService', [
      'success',
      'error',
    ]);
    const submissionSpy = jasmine.createSpyObj('SubmissionService', [
      'submitForm',
    ]);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RegistrationFormComponent], // Add the standalone component to imports
      providers: [
        { provide: ToastrService, useValue: toastrSpy },
        { provide: SubmissionService, useValue: submissionSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrationFormComponent);
    component = fixture.componentInstance;
    toastrService = TestBed.inject(
      ToastrService
    ) as jasmine.SpyObj<ToastrService>;
    submissionService = TestBed.inject(
      SubmissionService
    ) as jasmine.SpyObj<SubmissionService>;

    fixture.detectChanges();
  });

  it('should create the form with default values', () => {
    expect(component).toBeTruthy();
    expect(component.registrationForm.value).toEqual({
      name: '',
      address: '',
      files: [],
    });
  });

  it('should add a file control to the form array', () => {
    component.addFile();
    expect(component.files.length).toBe(1);
    expect(component.files.at(0).get('fileName')?.value).toBe('');
  });

  it('should remove a file control from the form array', () => {
    component.addFile();
    component.addFile();
    expect(component.files.length).toBe(2);

    component.removeFile(0);
    expect(component.files.length).toBe(1);
  });
});
