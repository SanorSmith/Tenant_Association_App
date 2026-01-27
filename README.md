# Grannskapet - Stage 1 Frontend Prototype

En modern, fullständig digital plattform för att hantera hyresgästföreningar i Sverige.

## 📋 Projektöversikt

**Stage 1: Frontend Prototype - COMPLETE ✅**

High-fidelity UI/UX demo för hyresgästföreningsplattform med mock data.

Detta är en Vue 3 + TypeScript applikation med ett professionellt designsystem inspirerat av Hyresgästföreningen.

## 🎨 Design System

Designsystemet är baserat på Hyresgästföreningens visuella identitet:

- **Färgpalett**: Djupblå/teal primärfärger (#005F73)
- **Typografi**: Segoe UI för professionell svensk design
- **Komponenter**: Omfattande bibliotek av återanvändbara komponenter
- **Responsiv**: Fungerar på mobil, surfplatta och desktop

## 🛠️ Tech Stack

- **Vue 3.4** - Composition API + TypeScript 5.3
- **Vite 5** - Build tool
- **Pinia 2.1** - State management
- **Vue Router 4** - Routing
- **Tailwind CSS 3.4** - Styling
- **Lucide Vue Next** - Icons
- **Chart.js** - Data visualization (Budget charts)
- **date-fns** - Date utilities with Swedish locale

## 📁 Projektstruktur

```
src/
├── assets/              # Bilder och fonts
├── components/
│   ├── common/         # Base komponenter (BaseButton, BaseInput, BaseCard, BaseModal, etc.)
│   ├── layout/         # Layout komponenter (Header, Sidebar, Footer)
│   ├── ui/             # UI komponenter (Badge, Alert, IconButton)
│   ├── meetings/       # Möteskomponenter
│   ├── documents/      # Dokumentkomponenter
│   ├── activities/     # Aktivitetskomponenter
│   ├── premises/       # Lokalkomponenter
│   ├── public/         # Publika komponenter (ingen auth)
│   ├── modals/         # Modal dialogs
│   └── settings/       # Inställningskomponenter
├── views/              # Sidor/vyer
│   ├── auth/          # Autentisering (Login, Register, ForgotPassword)
│   ├── dashboard/     # Dashboard
│   ├── meetings/      # Möten
│   ├── documents/     # Dokument
│   ├── budget/        # Budget
│   ├── activities/    # Aktiviteter
│   ├── premises/      # Lokaler & Bokningar
│   ├── public/        # Publika vyer (Premises Search)
│   └── settings/      # Inställningar
├── services/           # Services (reportGeneration, mockNotifications)
├── stores/             # Pinia stores (mockData)
├── router/             # Vue Router konfiguration
├── types/              # TypeScript typdefinitioner
└── styles/             # CSS och design tokens
```

## 🚀 Komma igång

### Installation

```bash
cd grannskapet
npm install
```

### Utveckling

```bash
npm run dev
```

Öppna [http://localhost:5173](http://localhost:5173) i din webbläsare.

### Bygga för produktion

```bash
npm run build
```

### Förhandsgranska produktionsbygge

```bash
npm run preview
```

## 📦 Komponenter

### Base Components (common/)
- **BaseButton** - Knappar med olika varianter (primary, secondary, outline, ghost, danger)
- **BaseInput** - Textinmatning med validering
- **BaseCard** - Kortkomponent för innehåll
- **BaseModal** - Modal dialog
- **BaseSelect** - Dropdown select
- **BaseCheckbox** - Checkbox med label
- **BaseTextarea** - Multiline textinmatning
- **LoadingSpinner** - Laddningsindikator

### UI Components (ui/)
- **IconButton** - Ikonknappar
- **Badge** - Statusmärken
- **Alert** - Varningsmeddelanden

### Layout Components (layout/)
- **MainLayout** - Huvudlayout med header, sidebar, footer
- **AppHeader** - Applikationshuvud med navigation
- **AppSidebar** - Sidopanel med meny
- **AppFooter** - Sidfot

## 🎯 Design Tokens

Alla designtokens finns i `src/styles/design-tokens.css`:

- Färger (primär, sekundär, accent, status)
- Typografi (fonter, storlekar, vikter)
- Spacing (xs, sm, md, lg, xl, 2xl, 3xl, 4xl)
- Border radius (sm, md, lg, xl, full)
- Skuggor (xs, sm, md, lg, xl)
- Övergångar (fast, base, slow)

## 🌐 Språk

Applikationen är helt på svenska. Alla översättningar finns i `src/locales/sv.ts`.

## 📊 Mock Data

För prototypfasen används mock data från Pinia store (`stores/mockData.ts`):

- Aktuell användare (Anna Andersson, Administratör)
- Aktuell förening (Storvreta Hyresgäster)
- Styrelsemedlemmar
- Platshållare för möten, dokument, budget, aktiviteter, lokaler, bokningar

## 🔐 Autentisering

I Stage 1 är autentiseringen mockad. Alla användare är automatiskt inloggade.

## ✅ Features (Stage 1 - Mock Data)

### Autentisering & Åtkomst
- ✅ Mock login (alla credentials fungerar)
- ✅ Rollbaserade dashboards (Administrator, Styrelsemedlem, Funktionär)
- ✅ Publik lokalbokning (ingen autentisering krävs)
- ✅ Logout funktionalitet

### Möten
- ✅ Skapa möten med alla fält
- ✅ Möteskalender
- ✅ RSVP till mötesförfrågningar
- ✅ Mötesdetaljer

### Dokument
- ✅ Steg-för-steg wizard för alla dokumenttyper
- ✅ Närvarohantering
- ✅ Dokumentfinalisering
- ✅ PDF nedladdning (mock)
- ✅ Dokumentlista med filter

### Budget & Aktiviteter
- ✅ Budgetöversikt med Chart.js (bar och pie charts)
- ✅ Skapa/redigera/ta bort budgetposter
- ✅ Aktivitetsplanering
- ✅ Aktivitetskalender med färgkodning
- ✅ Länka budget till aktiviteter

### Lokaler & Bokningar
- ✅ Registrera lokaler (admin)
- ✅ Publik lokalsökning (ingen auth)
- ✅ Publik bokningsformulär
- ✅ Tillgänglighetskalender
- ✅ Godkänn/avvisa bokningar
- ✅ Mock notifieringar

### Rapportering
- ✅ Välj datumintervall
- ✅ Förhandsgranska rapport
- ✅ PDF-generering (mock)

### Allmänt
- ✅ Helt på svenska
- ✅ Mobilresponsiv på alla sidor
- ✅ Inga konsolfel
- ✅ Formulärvalidering
- ✅ Laddningstillstånd
- ✅ Toast-notifieringar
- ✅ Tillgänglig (WCAG 2.1)

## 🚀 Deployment

### Deploy to AWS S3 + CloudFront

**PowerShell:**
```powershell
.\scripts\deploy.ps1
```

**Bash:**
```bash
chmod +x scripts/deploy.sh
./scripts/deploy.sh
```

Deployment script will:
1. Build the project (`npm run build`)
2. Sync to S3 bucket
3. Invalidate CloudFront cache
4. Display live URL

## 📝 Stage 1 Complete

All 5 prompts completed:
- ✅ Prompt #1: Project Setup & Design System
- ✅ Prompt #2: Authentication & Dashboard
- ✅ Prompt #3: Meetings & Documents
- ✅ Prompt #4: Budget, Activities & Premises
- ✅ Prompt #5: Public Booking & Deployment

**Next:** Stage 2 - Backend Implementation with Supabase

## 🐛 Felsökning

Om du stöter på problem:

1. Se till att du har Node.js 18+ installerat
2. Ta bort `node_modules` och kör `npm install` igen
3. Rensa Vite cache: `rm -rf node_modules/.vite`

## 📄 Licens

Detta projekt är utvecklat för Grannskapet.
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.
