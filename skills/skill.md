# Skill: Refactoring del Tema del Progetto

Questa skill deve essere utilizzata ogni volta che vengono importati nuovi componenti con colori hardcodati (Hex, RGB o colori Tailwind base come `bg-blue-500`) e devono essere adattati alla palette ufficiale del brand.

## Obiettivo
Sostituire tutti i colori fissi con le variabili di tema definite in `@src/app/globals.css`, assicurando coerenza visiva e supporto per i gradienti del brand.

## Rimozione Logic di Tema Hardcoded (next-themes/isDark)

Molti componenti importati utilizzano `useTheme` di `next-themes` e variabili come `isDark` per gestire i colori condizionalmente (es. `${isDark ? 'text-white/60' : 'text-slate-600'}`). 

**Nella nostra app, questa logica deve essere rimossa:**
1. **Rimuovere Import:** Eliminare `import { useTheme } from 'next-themes'`.
2. **Eliminare Hook:** Rimuovere `const { theme } = useTheme()` e la logica `const isDark = ...`.
3. **Sostituzione con Classi Semantiche:** Sostituire le classi condizionali con le classi semantiche del tema (es. `text-foreground/60` o `text-muted-foreground`). I colori si adatteranno automaticamente tramite CSS (grazie alle definizioni in `globals.css`) senza bisogno di logica JS nel componente.

## Palette del Brand

| Variabile Tailwind | CSS Var | Colore Hex | Caso d'Uso |
| :--- | :--- | :--- | :--- |
| `text-brand-1` | `--brand-1` | `#ff5e1a` | **Colore Primario:** Logo, pulsanti principali (CTA), stati attivi, arancione brand. |
| `text-brand-2` | `--brand-2` | `#fb7e7e` | **Colore Secondario:** Azioni secondarie, transizioni di colore, gradienti, rosso corallo. |
| `text-brand-3` | `--brand-3` | `#e29832` | **Colore Accento:** Icone di risalto, bordi evidenziati, dettagli oro/ocra. |
| `text-brand-4` | `--brand-4` | `#ff8f8f` | **Colore Highlight:** Stati di hover, bagliori soft (glows), rosa pesca. |

## Utility di Gradienti Custom
Utilizza queste classi Tailwind per pattern ricorrenti invece di scrivere gradienti inline:

- `.brand-glow`: Gradiente soft (30% opacità) da `brand-1` a `brand-3`. Ideale per sfondi e bagliori decorativi.
- `.brand-glow-strong`: Gradiente più marcato (50% opacità). Ideale per stati di focus e hover intensi.

## Regole di Refactoring
1. **Analisi:** Trova tutti i colori non basati su variabili (es: `bg-[#ff0000]`, `text-cyan-500`).
2. **Sostituzione Semantica:**
   - Se è un colore per il testo generico, usa `text-foreground` o `text-muted-foreground`.
   - Se è un colore per lo sfondo generico, usa `bg-background` o `bg-card`.
   - Se è un colore distintivo del brand, mappa sulla palette `brand-1` a `brand-4` seguendo i casi d'uso sopra.
3. **Ombre e Focus:** Se il componente ha ombre colorate, usa `brand-1` (arancione) con opacità variabile (es. `shadow-[0_0_30px_rgba(255,94,26,0.4)]`).
4. **Rimozione Hardcoded:** Non devono rimanere valori Hex o RGB inline nel codice JSX/TSX.
