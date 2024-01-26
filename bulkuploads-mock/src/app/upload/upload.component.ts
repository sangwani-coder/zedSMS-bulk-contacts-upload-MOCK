import { Component } from '@angular/core';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [],
  template: `
    <main class="main">
      <form action="/">
        <input type="file" id="myFile" name="filename">
        <input type="submit">
      </form>
    </main>
  `,
  styleUrl: './upload.component.css'
})
export class UploadComponent {

}
