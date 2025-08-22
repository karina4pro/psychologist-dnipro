export default function handler(request, response) {
  const url = new URL(request.url, 'https://example.com');
  const slug = url.searchParams.get('slug');
  
  if (!slug) {
    return response.status(400).send('No slug provided');
  }

  // Простой HTML с мета-тегами
  const html = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <title>Тестовый заголовок для ${slug}</title>
  <meta name="description" content="Тестовое описание статьи">
  <meta property="og:title" content="Тестовый заголовок для ${slug}">
  <meta property="og:description" content="Тестовое описание статьи">
  <meta property="og:image" content="https://www.karina-psychologist.com/images/og-image.jpg">
</head>
<body>
  <h1>Статья: ${slug}</h1>
  <script>setTimeout(() => window.location.href = '/post.html?slug=${slug}', 1000)</script>
</body>
</html>`;

  response.setHeader('Content-Type', 'text/html');
  response.status(200).send(html);
}