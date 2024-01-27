import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UploadComponent } from './upload/upload.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UploadComponent],
  template: `
    <main>
    <header>
        <nav class="navbar navbar-default">
        <div class="container-fluid">
          <div class="navbar-header">
            <a class="brand" href="#">ZED SMS Bulk Uploads Mock</a>
          </div>
          <ul class="nav navbar-nav">
            <li id="active"><a href="#">Home</a></li>
            <li><a href="#">View Contacts</a></li>
          </ul>
        </div>
      </nav>
    </header>
    <section class="content">
    <p class="msg">Click on the "Choose File" button to upload a CSV file:</p>
      <app-upload></app-upload>
    </section>
  </main>
  ` ,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'bulkuploads-mock';
}
