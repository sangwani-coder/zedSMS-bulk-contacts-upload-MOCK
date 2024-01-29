import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

interface DataItem {
  name: string;
  // Other properties as needed
}

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css'
})
export class ContactsComponent implements OnInit {
  error: string = "";
  data: DataItem[] = [];

  ngOnInit() {
    fetch('../data/contacts.json')
      .then(response => response.json())
      .then(data => {
        this.data = data;
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        this.error = "No contacts Found";
        // Handle errors gracefully, e.g., display an error message to the user
      });
  }

}