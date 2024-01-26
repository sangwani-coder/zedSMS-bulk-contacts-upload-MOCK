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
      <div *ngIf="fileContent">
      Confirm data before saving
      <table>
        <thead>
          <tr>
            <th *ngFor="let header of headers">
              {{ header }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let row of data">
            <td *ngFor="let cell of row">
              {{ cell }}
            </td>
          </tr>
        </tbody>
      </table>
      <button (click)="saveData()">Save</button>      
    </div>
    
    </main>
  `,
  styleUrls: ['./upload.component.css']
})
export class UploadComponent {
  selectedFile: File | undefined = undefined;
  fileContent: String | undefined = undefined;
  headers: string[] = [];
  data: string[][] = [];

  onFileSelected(event: any) {
    const file = event.target?.files?.[0]; // Use optional chaining

    // Validate file type (CSV)
    if (file.type !== 'text/csv') {
      console.error('Invalid file type. Please select a CSV file.');
      return;
    }
    this.selectedFile = file;
  }
  submitFile() {
    if (!this.selectedFile) {
      console.error('No file selected');
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = (event: any) => {
      this.fileContent = event.target.result as string;
      const csvData = this.fileContent.split('\n');
      this.headers = csvData[0].split(',');
      this.data = csvData.slice(1).map(row => row.split(','));
    };
    fileReader.readAsText(this.selectedFile);
  }
  saveData(){
    // initiate the upload process to the backend
    console.log("Save to database");
  }
}
