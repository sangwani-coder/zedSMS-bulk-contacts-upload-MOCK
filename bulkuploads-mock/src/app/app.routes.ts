import { Routes } from '@angular/router';
import { UploadComponent } from './upload/upload.component';
import { ContactsComponent } from './contacts/contacts.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


export const routes: Routes = [
    { path: "upload-contacts", component: UploadComponent },
    { path: "", redirectTo: '/upload-contacts', pathMatch: 'full' },
    { path: 'view-contacts', component: ContactsComponent },
    {path: '**', component: PageNotFoundComponent}
];
