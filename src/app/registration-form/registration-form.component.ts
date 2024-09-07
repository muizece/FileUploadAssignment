import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ToastrConfigModule } from '../toastr-config.module';

@Component({
  selector: 'app-registration-form',
  standalone: true,
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css'],
  imports: [CommonModule, ReactiveFormsModule, ToastrConfigModule], 
    providers:[ToastrService]
})
export class RegistrationFormComponent implements OnInit {
  registrationForm: FormGroup;

  readonly allowedTypes = ['image/jpeg', 'image/png']; // Allowed file types
  readonly maxSizeMB = 5; // Maximum file size in MB

  constructor(private fb: FormBuilder, private toastr: ToastrService) {
    this.registrationForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      address: ['', Validators.required],
      files: this.fb.array([]),
    });
  }

  ngOnInit(): void {}

  get files() {
    return this.registrationForm.get('files') as FormArray;
  }

  addFile() {
    this.files.push(this.fb.group({
      fileName: ['', Validators.required],
      file: [null, Validators.required],
      fileError: [null] // Error message for file validation
    }));
  }

  removeFile(index: number) {
    this.files.removeAt(index);
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      // Display success message
      this.toastr.success("submitted successfulluy","Suceess")

      console.log(this.registrationForm.value);
    } else {
      
      this.toastr.error("submitted successfulluy","Error")

    }
  }

  onFileChange(event: any, index: number) {
    const file = event.target.files[0];
    const fileGroup = this.files.at(index) as FormGroup;

    if (file) {
      const fileReader = new FileReader();

      // Set up file reader to handle file type checking
      fileReader.onloadend = () => {
        const arrayBuffer = fileReader.result as ArrayBuffer;
        const byteArray = new Uint8Array(arrayBuffer);

        // Check file signature (magic numbers) to determine file type
        const isValidType = this.checkFileType(byteArray, file.type);

        // Validate file type and size
        if (!isValidType) {
          fileGroup.get('fileError')?.setValue('Invalid file type. Only JPEG and PNG are allowed.');
          fileGroup.get('file')?.setValue(null);
          return;
        }

        if (file.size > this.maxSizeMB * 1024 * 1024) {
          fileGroup.get('fileError')?.setValue(`File size exceeds ${this.maxSizeMB} MB.`);
          fileGroup.get('file')?.setValue(null);
          return;
        }

        fileGroup.patchValue({
          file: file,
          fileError: null // Clear error message if file is valid
        });
      };

      fileReader.readAsArrayBuffer(file);
    }
  }

  checkFileType(byteArray: Uint8Array, mimeType: string): boolean {
    // Check for JPEG
    if (mimeType === 'image/jpeg') {
      // JPEG files start with 0xFFD8 and end with 0xFFD9
      return byteArray[0] === 0xFF && byteArray[1] === 0xD8 &&
             byteArray[byteArray.length - 2] === 0xFF && byteArray[byteArray.length - 1] === 0xD9;
    }
    // Check for PNG
    if (mimeType === 'image/png') {
      // PNG files start with 0x89504E47 and end with 0x49454E44
      return byteArray[0] === 0x89 && byteArray[1] === 0x50 &&
             byteArray[2] === 0x4E && byteArray[3] === 0x47 &&
             byteArray[byteArray.length - 8] === 0x49 &&
             byteArray[byteArray.length - 7] === 0x45 &&
             byteArray[byteArray.length - 6] === 0x4E &&
             byteArray[byteArray.length - 5] === 0x44;
    }
    alert("File type supported is only PNG or JPEG !!")
    return false;
  }
}
