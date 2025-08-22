export default async function handler(request) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug')
  
  if (!slug) {
    return new Response('No slug provided', { status: 400 })
  }

  try {
    // Загружаем данные из Sanity
    const query = `*[_type == "post" && slug.current == "${slug}"][0] {
      title, seoTitle, seoDescription, publishedAt,
      mainImage{asset, alt}, body
    }`
    
    const sanityUrl = `https://i2ncx2dk.api.sanity.io/v1/data/query/production?query=${encodeURIComponent(query)}`
    const response = await fetch(sanityUrl)
    const data = await response.json()
    const post = data.result
    
    if (!post) {
      return new Response('Post not found', { status: 404 })
    }

    // Генерируем HTML с мета-тегами
    const title = post.seoTitle || post.title
    const description = post.seoDescription || post.title
    const ogImage = post.mainImage ? 
      `https://cdn.sanity.io/images/i2ncx2dk/production/${post.mainImage.asset._ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png')}` : 
      'https://www.karina-psychologist.com/images/og-image.jpg'

    const html = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:image" content="${ogImage}">
  <meta property="og:url" content="${request.url}">
  <meta property="og:type" content="article">
  <link href="/dist/output.css" rel="stylesheet">
</head>
<body>
  <h1>${post.title}</h1>
  <p>${description}</p>
  <script>window.location.href = '/post.html?slug=${slug}'</script>
</body>
</html>`

    return new Response(html, {
      headers: { 'content-type': 'text/html' }
    })
    
  } catch (error) {
    return new Response('Error loading post', { status: 500 })
  }
}