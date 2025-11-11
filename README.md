# English Blog (GitHub Pages)

This repository contains a simple static blog for a school assignment.

Refactor notes: the project was reorganized to follow SOLID principles for easier maintenance and extensibility.

## 📦 Files (after refactor)
- `index.html` — markup only, references external CSS/JS.
- `css/styles.css` — presentation (separated from markup) — Single Responsibility.
- `js/app.js` — application assembler / entry point (ES module).
- `js/services/YearService.js` — small service that provides the year (Dependency Inversion, Single Responsibility).
- `js/ui/DomRenderer.js` — UI renderer that receives providers by dependency injection (Interface Segregation, Liskov).

## Diseño y cómo aplicar SOLID aquí
- Single Responsibility: cada archivo tiene una sola responsabilidad (estilos, servicios, UI, montaje).
- Open/Closed: `DomRenderer` y `YearService` pueden extenderse o sustituirse sin cambiar `app.js`.
- Liskov Substitution: cualquier proveedor que implemente `getYear()` puede reemplazar `YearService`.
- Interface Segregation: las clases consumen interfaces pequeñas (p.ej. `getYear()`), no un objeto monolítico.
- Dependency Inversion: `DomRenderer` depende de una abstracción (el proveedor de año), y `app.js` resuelve las dependencias.

## 🚀 Publicar en GitHub Pages
1. Crear un repositorio público (por ejemplo `english-blog`).
2. Subir todos los archivos (incluyendo la carpeta `css` y `js`) al root del repo.
3. Ir a **Settings → Pages**.
4. En **Source**, elegir **Deploy from a branch**.
5. En **Branch**, seleccionar **main** y **/(root)**. Guardar.
6. En ~1 minuto tendrás una URL como:
   `https://<your-username>.github.io/english-blog/`

> Author: **Cristian Lopez Anaya**  
> Last updated: 2025-11-11
