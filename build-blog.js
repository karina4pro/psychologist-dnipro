const fs = require('fs');

const SANITY_CONFIG = {
  projectId: 'i2ncx2dk',
  dataset: 'production',
  apiVersion: '2024-05-15'
};

const POST_TEMPLATE = `<!DOCTYPE html>
<html lang="ru" class="scroll-smooth">
<head>
   <meta charset="UTF-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>{{SEO_TITLE}}</title>
   <meta name="description" content="{{SEO_DESCRIPTION}}">
   <meta property="og:title" content="{{SEO_TITLE}}">
   <meta property="og:description" content="{{SEO_DESCRIPTION}}">
   <meta property="og:image" content="{{OG_IMAGE}}">
   <meta property="og:url" content="https://www.karina-psychologist.com/blog/{{SLUG}}.html">
   <link rel="canonical" href="https://www.karina-psychologist.com/blog/{{SLUG}}.html">
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
  <link rel="manifest" href="/site.webmanifest">
   <link href="../dist/output.css" rel="stylesheet">
   <script type="application/ld+json">{{STRUCTURED_DATA}}</script>
</head>
<body class="bg-neutral-light text-neutral-dark">
<div id="header-placeholder"></div>
<main class="pt-24 pb-16">
    <div class="container max-w-4xl">
        <nav class="mb-8">
            <a href="../index.html" class="text-primary hover:text-primary-dark">Главная</a>
            <span class="mx-2 text-neutral">→</span>
            <a href="../blog.html" class="text-primary hover:text-primary-dark">Блог</a>
            <span class="mx-2 text-neutral">→</span>
            <span class="text-neutral-dark">{{TITLE}}</span>
        </nav>
        <article class="bg-white rounded-lg shadow-md p-8">
            {{CONTENT}}
            
            <!-- Перелинковка -->
            <footer class="mt-12 pt-8 border-t border-neutral-light">
                <div class="text-center mb-8">
                    <h3 class="text-xl font-bold mb-4 text-primary-dark">Нужна помощь психолога?</h3>
                    <p class="mb-4 text-neutral">Запишитесь на индивидуальную консультацию</p>
                    <a href="../index.html#contact" class="btn btn-primary inline-block">
                        Записаться на консультацию
                    </a>
                </div>
                
                <div class="mt-8">
                    <h4 class="text-lg font-bold mb-4 text-primary-dark">📚 Читайте также:</h4>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {{RELATED_ARTICLES}}
                    </div>
                </div>
            </footer>
        </article>
    </div>
</main>
<div id="footer-placeholder"></div>
<script src="../components/header.js"></script>
<script>document.getElementById('header-placeholder').innerHTML = getHeaderHTML('home');</script>
<script src="../components/footer.js"></script>
<script>document.getElementById('footer-placeholder').innerHTML = getFooterHTML();</script>
</body>
</html>`;

async function fetchPosts() {
  const query = `*[_type == "post"] | order(publishedAt desc) {
    title, "slug": slug.current, publishedAt, body, seoTitle, seoDescription,
    mainImage{asset, alt}
  }`;
  
  const url = `https://${SANITY_CONFIG.projectId}.api.sanity.io/v1/data/query/${SANITY_CONFIG.dataset}?query=${encodeURIComponent(query)}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.result || [];
}

function renderPortableText(blocks) {
  if (!blocks) return '';
  
  return blocks.map(block => {
    if (block._type === 'block') {
      const text = block.children?.map(child => {
        let content = child.text || '';
        if (child.marks?.includes('strong')) content = `<strong>${content}</strong>`;
        if (child.marks?.includes('em')) content = `<em>${content}</em>`;
        return content;
      }).join('') || '';
      
      switch (block.style) {
        case 'h1': return `<h1 class="text-3xl font-bold mb-6 text-primary-dark">${text}</h1>`;
        case 'h2': return `<h2 class="text-2xl font-bold mb-4 text-primary-dark">${text}</h2>`;
        case 'h3': return `<h3 class="text-xl font-bold mb-3 text-primary-dark">${text}</h3>`;
        case 'blockquote': return `<blockquote class="border-l-4 border-primary pl-4 italic mb-4">${text}</blockquote>`;
        default: return `<p class="mb-4 leading-relaxed">${text}</p>`;
      }
    }
    
    if (block._type === 'image' && block.asset) {
      const imageUrl = `https://cdn.sanity.io/images/i2ncx2dk/production/${block.asset._ref.replace('image-', '').replace(/-(\w+)$/, '.$1')}`;
      return `<img src="${imageUrl}" alt="${block.alt || ''}" class="w-full rounded-lg shadow-md my-8">`;
    }
    
    return '';
  }).join('');
}

function generateRelatedArticles(currentSlug, allPosts) {
  const otherPosts = allPosts.filter(post => post.slug !== currentSlug).slice(0, 4);
  
  return otherPosts.map(post => `
    <a href="${post.slug}.html" class="block p-4 bg-gray-50 border border-gray-200 rounded-lg hover:bg-primary-light hover:border-primary transition-colors">
      <h5 class="font-semibold text-primary-dark">${post.title}</h5>
      <p class="text-sm text-neutral mt-1">Читать статью →</p>
    </a>
  `).join('');
}

async function buildBlog() {
  console.log('🚀 Генерация статичных страниц блога...');
  
  if (!fs.existsSync('blog')) {
    fs.mkdirSync('blog');
  }
  
  const posts = await fetchPosts();
  console.log(`📝 Найдено ${posts.length} статей`);
  
  // Генерируем обновленный sitemap
  const sitemapUrls = [
    '<url><loc>https://www.karina-psychologist.com/</loc><lastmod>2025-08-25</lastmod><changefreq>weekly</changefreq><priority>1.0</priority></url>',
    '<url><loc>https://www.karina-psychologist.com/blog.html</loc><lastmod>2025-08-25</lastmod><changefreq>daily</changefreq><priority>0.9</priority></url>'
  ];
  
  for (const post of posts) {
    if (!post.slug) continue;
    
    const seoTitle = post.seoTitle || post.title;
    const seoDescription = post.seoDescription || post.body?.[0]?.children?.[0]?.text?.substring(0, 160) || post.title;
    const ogImage = post.mainImage ? 
      `https://cdn.sanity.io/images/i2ncx2dk/production/${post.mainImage.asset._ref.replace('image-', '').replace(/-(\w+)$/, '.$1')}` : 
      'https://www.karina-psychologist.com/images/og-image.jpg';
    
    const content = `
      <header class="mb-8">
        <h1 class="text-3xl font-bold mb-4 text-primary-dark">${post.title}</h1>
        ${post.publishedAt ? `<time class="text-neutral text-sm">${new Date(post.publishedAt).toLocaleDateString('ru-RU')}</time>` : ''}
        ${post.mainImage ? `<img src="${ogImage}" alt="${post.mainImage.alt || ''}" class="w-full rounded-lg shadow-md my-8">` : ''}
      </header>
      <div class="prose prose-lg max-w-none">
        ${renderPortableText(post.body)}
      </div>
    `;
    
    const relatedArticles = generateRelatedArticles(post.slug, posts);
    
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": post.title,
      "author": {"@type": "Person", "name": "Карина Варганова"},
      "datePublished": post.publishedAt,
      "description": seoDescription,
      "image": ogImage,
      "url": `https://www.karina-psychologist.com/blog/${post.slug}.html`
    };
    
    const html = POST_TEMPLATE
      .replace(/{{TITLE}}/g, post.title)
      .replace(/{{SEO_TITLE}}/g, seoTitle)
      .replace(/{{SEO_DESCRIPTION}}/g, seoDescription)
      .replace(/{{OG_IMAGE}}/g, ogImage)
      .replace(/{{SLUG}}/g, post.slug)
      .replace(/{{CONTENT}}/g, content)
      .replace(/{{RELATED_ARTICLES}}/g, relatedArticles)
      .replace(/{{STRUCTURED_DATA}}/g, JSON.stringify(structuredData));
    
    fs.writeFileSync(`blog/${post.slug}.html`, html);
    console.log(`✅ Создан файл: blog/${post.slug}.html`);
    
    // Добавляем в sitemap
    const lastmod = post.publishedAt ? new Date(post.publishedAt).toISOString().split('T')[0] : '2025-08-25';
    sitemapUrls.push(`<url><loc>https://www.karina-psychologist.com/blog/${post.slug}.html</loc><lastmod>${lastmod}</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>`);
  }
  
  // Создаем новый sitemap
  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls.join('\n')}
</urlset>`;
  
  fs.writeFileSync('sitemap.xml', sitemapContent);
  console.log('🗺️ Sitemap обновлен');
  
  console.log('🎉 Генерация завершена!');
}

buildBlog().catch(console.error);