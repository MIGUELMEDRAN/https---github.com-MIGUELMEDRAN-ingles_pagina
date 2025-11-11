import YearService from './services/YearService.js';
import DomRenderer from './ui/DomRenderer.js';
import ImageService from './services/ImageService.js';

// Composición: ensamblamos dependencias aquí (fábrica simple)
const yearService = new YearService();
const renderer = new DomRenderer(yearService);
const imageService = new ImageService();

// Ejecutamos responsabilidades UI
renderer.renderYear('#year');
// Aseguramos que las imágenes de Unsplash incluyan parámetros de formato y añadimos un fallback
function makeUnsplashFriendly(img) {
	try {
		const src = img.getAttribute('src') || '';
		if (src.includes('images.unsplash.com') && !src.includes('?')) {
			// Añadir parámetros para mejorar compatibilidad y tamaño
			img.src = src + '?auto=format&fit=crop&w=1200&q=80';
		}
	} catch (e) {
		// noop
	}
	// Fallback: si la imagen no carga, intentar una imagen temática según el título
	img.onerror = function () {
		try {
			// Evitar loops: si ya intentamos fallback, mostramos el placeholder SVG
			if (img.dataset.fallbackTried === '1') {
				img.onerror = null;
				const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="600">
					<rect width="100%" height="100%" fill="#111827" />
					<text x="50%" y="50%" fill="#9ca3af" font-family="system-ui, Arial, sans-serif" font-size="32" dominant-baseline="middle" text-anchor="middle">Image unavailable</text>
				</svg>`;
				img.src = 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
				return;
			}

			// Marcar que intentamos fallback
			img.dataset.fallbackTried = '1';

			// Intentar obtener el título del post cercano
			let title = img.alt || '';
			const postEl = img.closest('.post');
			if (postEl) {
				const h2 = postEl.querySelector('h2');
				if (h2 && h2.textContent) title = h2.textContent;
			}

			const fallbackUrl = imageService.getFallbackForTitle(title);
			// Asignamos la URL de fallback (source.unsplash.com). Si falla también, el onerror volverá a entrar y caerá al SVG.
			img.src = fallbackUrl;
		} catch (err) {
			img.onerror = null;
		}
	};
}

// Aplicar a todas las imágenes dentro de .post
document.querySelectorAll('.post img').forEach(makeUnsplashFriendly);

// Exportamos componentes para facilitar pruebas y extensibilidad (Open/Closed)
export { YearService, DomRenderer };
