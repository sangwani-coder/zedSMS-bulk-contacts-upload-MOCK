import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule],
  template: `
    <main class="main">
      <input type="file" (change)="onFileSelected($event)">
      <p *ngIf="selectedFile">Selected file: {{ selectedFile.name }}</p>
      <button (click)="submitFile()">Submit</button>
      <pre *ngIf="fileContent">{{ fileContent }}</pre>
    </main>
  `,
  styleUrls: ['./upload.component.css']
})
export class UploadComponent {
  selectedFile: File | undefined = undefined;
  fileContent: String | undefined = undefined;

  onFileSelected(event: any) {
    const file = event.target?.files?.[0]; // Use optional chaining

    // Validate file type (CSV)
    if (file.type !== 'text/csv') {
      console.error('Invalid file type. Please select a CSV file.');
      return;
    }

    this.selectedFile = file;
    // Initiate the upload process to the backend
  }
  submitFile() {
    if (!this.selectedFile) {
      console.error('No file selected');
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = (event: any) => {
      this.fileContent = event.target.result as string;
    };
    fileReader.readAsText(this.selectedFile);
  }
}
