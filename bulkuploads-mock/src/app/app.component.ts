import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UploadComponent } from './upload/upload.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UploadComponent],
  template: `
    <main>
    <header class="brand-name">
      <!-- <img class="brand-logo" src="/assets/logo.svg" alt="logo" aria-hidden="true"> -->
      <p>Click on the "Choose File" button to upload a CSV file:</p>
    </header>
    <section class="content">
      <app-upload></app-upload>
    </section>
  </main>
  ` ,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'bulkuploads-mock';
}
