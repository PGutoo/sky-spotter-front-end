import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  currentScreen: 'welcome' | 'blink' | 'data' = 'welcome';

  navigateTo(screen: 'welcome' | 'blink' | 'data') {
    this.currentScreen = screen;
  }
}