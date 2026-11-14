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

  isAnnotationMode = false;
  currentMarker: { x: number; y: number } | null = null;
  savedMarkers: { x: number; y: number; category: string }[] = [];
  selectedCategory = '';

  insights: any = null;
  loadingInsights = false;
  activeTab: 'movimento' | 'brilho' | 'ruido' = 'movimento';

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
    if (screen === 'data') {
      this.fetchInsights();
    }
  }

  setActiveTab(tab: 'movimento' | 'brilho' | 'ruido') {
    this.activeTab = tab;
  }

  fetchInsights() {
    this.loadingInsights = true;
    this.http.get<any>('http://127.0.0.1:8000/api/insights').subscribe({
      next: (data) => {
        this.insights = data;
        this.loadingInsights = false;
      },
      error: (err) => {
        console.error('Erro ao buscar insights:', err);
        this.loadingInsights = false;
      }
    });
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
        this.resetAnnotations();
      }
    });
  }

  resetAnnotations() {
    this.isAnnotationMode = false;
    this.currentMarker = null;
    this.savedMarkers = [];
    this.selectedCategory = '';
  }

  startAnnotation() {
    this.isAnnotationMode = true;
  }

  handleImageClick(event: MouseEvent) {
    if (!this.isAnnotationMode) return;
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    this.currentMarker = { x, y };
  }

  setCategory(category: string) {
    this.selectedCategory = category;
  }

  savePoint() {
    if (!this.currentMarker || !this.selectedCategory) return;
    this.savedMarkers.push({
      x: this.currentMarker.x,
      y: this.currentMarker.y,
      category: this.selectedCategory
    });
    this.currentMarker = null;
    this.selectedCategory = '';
  }

  cancelPoint() {
    this.currentMarker = null;
    this.selectedCategory = '';
  }

  markNothing() {
    this.fetchNasaPair();
  }

  submitAndNext() {
    if (this.savedMarkers.length === 0) {
      this.isAnnotationMode = false;
      return;
    }

    const payload = {
      image_id: this.currentPairMeta.image_id || 'SPH-001',
      ra: String(this.currentPairMeta.ra || '0.0'),
      dec: String(this.currentPairMeta.dec || '0.0'),
      annotations: this.savedMarkers
    };

    this.http.post('http://127.0.0.1:8000/api/annotations', payload).subscribe({
      next: () => this.fetchNasaPair(),
      error: (err) => console.error('Erro ao gravar anomalia:', err)
    });
  }
}