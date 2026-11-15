# ☄️ Sky Spotter — Front-end (Astronomical Observatory UI)

[🇧🇷 Português](#-português) | [🇺🇸 English](#-english)

---

## 🇧🇷 Português

### Sobre o Projeto
O **Sky Spotter** é uma plataforma web de ciência cidadã e análise astrométrica desenvolvida para o **NASA Space Apps Challenge**. A aplicação transforma dados de levantamentos espaciais (inspirados nas missões **WISE** e **SPHEREx** via protocolo **IVOA SIA v2**) em um observatório visual interativo no estilo *Command Center / HUD*.

Através do **Blink Comparator**, qualquer pessoa pode comparar imagens do mesmo campo estelar em épocas e bandas espectrais distintas, isolar anomalias com precisão de coordenadas e alimentar uma base global de inteligência coletiva.

🌐 **Aplicação em Produção:** [sky-spotter-front-end.vercel.app](https://sky-spotter-front-end.vercel.app/)

### Funcionalidades Principais
* **Visão Geral (HUD Command Center):** Interface assimétrica com painel de telemetria em tempo real e status da rede SIA v2.
* **Observatório (Blink Comparator):**
  * Pré-carregamento em dupla camada com alternância automática de opacidade (`800ms`) entre **Época 01** e **Época 02**, eliminando cintilação e requisições duplicadas.
  * Modo de anotação interativo com mira (*crosshair*) para marcação percentual `(X, Y)` sobre o alvo.
  * Classificação científica em **Transientes (Movimento)**, **Variáveis (Brilho)** ou **Artefatos (Ruído do Sensor)**.
* **Base de Inteligência Coletiva:** Contador global de descobertas validadas, motor de recomendações científicas geradas por IA e tabelas filtradas por categoria com coordenadas de Ascensão Reta (`RA`) e Declinação (`Dec`).

### Tecnologias Utilizadas
* **Angular** (Standalone Components & TypeScript)
* **RxJS & HttpClient** (Consumo assíncrono da API REST)
* **NgZone & ChangeDetectorRef** (Sincronização instantânea de estado na UI)
* **CSS3 / Glassmorphism** (Design responsivo de alta performance)

### Como Rodar Localmente

#### Pré-requisitos
* **Node.js** (v18 ou superior) e **npm**
* **Angular CLI** (`npm install -g @angular/cli`)
* Back-end (`sky-spotter-api`) em execução localmente ou via URL de produção.

#### Passo a Passo
1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/PGutoo/sky-spotter-front-end.git](https://github.com/PGutoo/sky-spotter-front-end.git)
   cd sky-spotter-front-end
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure a URL da API (opcional):**
   No arquivo `src/app/app.ts`, verifique se as chamadas `this.http.get` e `this.http.post` apontam para o seu back-end local (`http://127.0.0.1:8000/api/...`) ou para a URL publicada na Vercel.

4. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm start
   ```
   Acesse **`http://localhost:4200`** no navegador.

---

## 🇺🇸 English

### About the Project
**Sky Spotter** is a citizen science and astrometric analysis web platform built for the **NASA Space Apps Challenge**. It transforms deep-space survey data (modeled after the **WISE** and **SPHEREx** missions via the **IVOA SIA v2** protocol) into an accessible, *Command Center / HUD*-styled visual observatory.

Using the built-in **Blink Comparator**, users can toggle between multi-epoch and multi-band sky cutouts, isolate celestial anomalies with coordinate precision, and contribute to a real-time collective intelligence database.

🌐 **Live Deployment:** [sky-spotter-front-end.vercel.app](https://sky-spotter-front-end.vercel.app/)

### Key Features
* **Overview (HUD Command Center):** Asymmetric hero layout featuring a live system telemetry panel and SIA v2 network status indicator.
* **Observatory (Blink Comparator):**
  * Dual-layer image preloading with automated `800ms` opacity toggling between **Epoch 01** and **Epoch 02** to prevent flickering and redundant network requests.
  * Interactive crosshair annotation mode calculating exact percentage vectors `(X, Y)` on target clicks.
  * Scientific classification into **Transients (Motion)**, **Variables (Brightness)**, or **Artifacts (Sensor Noise)**.
* **Collective Intelligence Base:** Global counter of validated discoveries, AI-generated scientific follow-up recommendations, and tabbed telemetry tables displaying Right Ascension (`RA`) and Declination (`Dec`).

### Tech Stack
* **Angular** (Standalone Components & TypeScript)
* **RxJS & HttpClient** (Asynchronous REST API integration)
* **NgZone & ChangeDetectorRef** (Instant UI state synchronization)
* **CSS3 / Glassmorphism** (Custom dark-space responsive styling)

### Running Locally

#### Prerequisites
* **Node.js** (v18+) and **npm**
* **Angular CLI** (`npm install -g @angular/cli`)
* Back-end API (`sky-spotter-api`) running locally or via deployed URL.

#### Step-by-Step
1. **Clone the repository:**
   ```bash
   git clone [https://github.com/PGutoo/sky-spotter-front-end.git](https://github.com/PGutoo/sky-spotter-front-end.git)
   cd sky-spotter-front-end
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure the API endpoint (optional):**
   In `src/app/app.ts`, ensure `this.http.get` and `this.http.post` point to your local server (`http://127.0.0.1:8000/api/...`) or your Vercel back-end URL.

4. **Start the development server:**
   ```bash
   npm start
   ```
   Open **`http://localhost:4200`** in your browser.