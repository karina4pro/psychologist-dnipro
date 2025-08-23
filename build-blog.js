const fs = require('fs');
const path = require('path');

const SANITY_CONFIG = {
  projectId: 'i2ncx2dk',
  dataset: 'production',
  apiVersion: '2024-05-15'
};

// Шаблон статьи
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
  const query = `*[_type == "post"] {
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

async function buildBlog() {
  console.log('🚀 Генерация статичных страниц блога...');
  
  // Создаем папку blog если её нет
  if (!fs.existsSync('blog')) {
    fs.mkdirSync('blog');
  }
  
  const posts = await fetchPosts();
  console.log(`📝 Найдено ${posts.length} статей`);
  
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
      </header>
      <div class="prose prose-lg max-w-none">
        ${renderPortableText(post.body)}
      </div>
    `;
    
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
      .replace(/{{STRUCTURED_DATA}}/g, JSON.stringify(structuredData));
    
    fs.writeFileSync(`blog/${post.slug}.html`, html);
    console.log(`✅ Создан файл: blog/${post.slug}.html`);
  }
  
  console.log('🎉 Генерация завершена!');
}

buildBlog().catch(console.error);