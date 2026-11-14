import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, OnDestroy {
  currentScreen: 'welcome' | 'blink' | 'data' = 'welcome';

  imageEpochA = '';
  imageEpochB = '';
  currentImageUrl = '';
  activeEpoch: 'A' | 'B' = 'A';
  currentPairMeta: any = { image_id: 'SPH-001', ra: '0.0', dec: '0.0' };
  private blinkTimer: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchNasaPair();
    this.startBlinking();
  }

  ngOnDestroy() {
    if (this.blinkTimer) clearInterval(this.blinkTimer);
  }

  navigateTo(screen: 'welcome' | 'blink' | 'data') {
    this.currentScreen = screen;
  }

  startBlinking() {
    this.blinkTimer = setInterval(() => {
      this.activeEpoch = this.activeEpoch === 'A' ? 'B' : 'A';
      this.currentImageUrl = this.activeEpoch === 'A' ? this.imageEpochA : this.imageEpochB;
    }, 800);
  }

  fetchNasaPair() {
    this.http.get<any>('http://127.0.0.1:8000/api/nasa-pair').subscribe({
      next: (data) => {
        this.currentPairMeta = data;
        this.imageEpochA = data.image_a || data.epoch_a || '';
        this.imageEpochB = data.image_b || data.epoch_b || '';
        this.currentImageUrl = this.imageEpochA;
      },
      error: (err) => console.error('Erro ao carregar par SIA v2:', err)
    });
  }

  markNothing() {
    this.fetchNasaPair();
  }
}