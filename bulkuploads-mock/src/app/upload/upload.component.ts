import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule, NgbModule],
  template: `
    <main class="main">
      <input type="file" (change)="onFileSelected($event)">
      <p class="msg" *ngIf="selectedFile">Selected file: {{ selectedFile.name }}</p>
      <button *ngIf="selectedFile" (click)="submitFile()">Submit</button>
      <pre class="msg" *ngIf="error">{{ error }}</pre>
      <div *ngIf="fileContent">
      <p class="msg">Confirm data before saving</p>
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
  error: string = "";

  onFileSelected(event: any) {
    const file = event.target?.files?.[0]; // Use optional chaining

    // Validate file type (CSV)
    if (file.type !== 'text/csv') {
      this.error = 'Invalid file type. Please select a CSV file.';
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
  saveData() {
    const jsonData = this.data.map(row => ({ ...Object.fromEntries(row.map(cell => [this.headers[row.indexOf(cell)], cell])) })); // Convert to array of objects
    const jsonString = JSON.stringify(jsonData, null, 2); // Formatted JSON string

    const blob = new Blob([jsonString], { type: 'application/json;charset=utf-8' });
    const filename = 'contacts.json'; // Adjust filename as needed

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
  }
}
