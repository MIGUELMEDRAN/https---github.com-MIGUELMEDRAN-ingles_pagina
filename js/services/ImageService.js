// ImageService — proporciona URLs de fallback temáticas basadas en el título del post
export default class ImageService {
  constructor() {
    // Mapeo simple: keywords -> queries para source.unsplash.com
    this.map = [
      { keywords: ['health', 'job', 'medical', 'health area'], query: 'health,medical' },
      { keywords: ['restaurant', 'food', 'restaurants'], query: 'food,restaurant' },
      { keywords: ['vocabulary', 'words', 'learning'], query: 'books,vocabulary,learning' },
      { keywords: ['travel', 'traveling', 'travel'], query: 'travel,landscape' },
      { keywords: ['critical', 'media', 'literacy', 'thinking'], query: 'critical-thinking,media,reading' },
      { keywords: ['crime', 'punishment', 'law', 'justice'], query: 'law,justice,crime' }
    ];
    this.defaultQuery = 'nature,landscape';
  }

  // Normaliza el título y busca una query apropiada
  getFallbackForTitle(title) {
    if (!title || typeof title !== 'string') {
      return this._sourceUrl(this.defaultQuery);
    }

    const lower = title.toLowerCase();
    for (const entry of this.map) {
      for (const kw of entry.keywords) {
        if (lower.includes(kw)) {
          return this._sourceUrl(entry.query);
        }
      }
    }

    return this._sourceUrl(this.defaultQuery);
  }

  // Construye una URL de source.unsplash.com con tamaño y calidad
  _sourceUrl(query) {
    // source.unsplash.com devuelve una imagen aleatoria por query
    return `https://source.unsplash.com/1200x600/?${encodeURIComponent(query)}`;
  }
}
