import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent implements OnInit, OnDestroy {
  imageA = 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=600&auto=format&fit=crop&q=80';
  imageB = 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80';

  activeEpoch: 'A' | 'B' = 'A';
  currentImageUrl = this.imageA;
  isPlaying = true;
  private intervalId: any;

  // Estado da Anotação
  isAnnotationMode = false;
  marker: { x: number, y: number } | null = null;
  selectedCategory = '';

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.startBlink();
  }

  ngOnDestroy() {
    this.stopBlink();
  }

  startBlink() {
    this.isPlaying = true;
    this.intervalId = setInterval(() => {
      this.activeEpoch = this.activeEpoch === 'A' ? 'B' : 'A';
      this.currentImageUrl = this.activeEpoch === 'A' ? this.imageA : this.imageB;
      this.cdr.detectChanges();
    }, 800);
  }

  stopBlink() {
    this.isPlaying = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  // Ações Principais
  markNothing() {
    console.log('Nenhuma alteração detetada. A avançar...');
    this.resetAndNext();
  }

  startAnnotation() {
    this.stopBlink();
    this.isAnnotationMode = true;
    this.cdr.detectChanges();
  }

  // Captura do clique na imagem
  handleImageClick(event: MouseEvent) {
    if (!this.isAnnotationMode) return;
    
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    
    // Calcula a posição exata em percentagem
    const clickX = ((event.clientX - rect.left) / rect.width) * 100;
    const clickY = ((event.clientY - rect.top) / rect.height) * 100;
    
    this.marker = { x: clickX, y: clickY };
  }

  setCategory(cat: string) {
    this.selectedCategory = cat;
  }

  submitAnnotation() {
    console.log('Anomalia registada no Supabase:', {
      x: this.marker?.x,
      y: this.marker?.y,
      categoria: this.selectedCategory
    });
    this.resetAndNext();
  }

  resetAndNext() {
    // Limpa o estado e simula a passagem para a próxima dupla de imagens
    this.isAnnotationMode = false;
    this.marker = null;
    this.selectedCategory = '';
    this.activeEpoch = 'A';
    this.currentImageUrl = this.imageA;
    this.startBlink();
  }
}