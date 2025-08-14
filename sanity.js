// Конфигурация Sanity
export const sanityConfig = {
  projectId: 'i2ncx2dk',
  dataset: 'production',
  apiVersion: '2024-05-15',  // Обновленная версия API
  useCdn: false
};

// Получение всех постов
export async function getAllPosts() {
  const query = `*[_type == "post"] | order(publishedAt desc) {
    title,
    "slug": slug.current,  // Правильный способ получить slug
    publishedAt,
    mainImage,
    "categories": categories[]->title
  }`;
  
  // Исправленный URL API для новой версии
  const url = `https://${sanityConfig.projectId}.apicdn.sanity.io/v${sanityConfig.apiVersion}/data/query/${sanityConfig.dataset}?query=${encodeURIComponent(query)}`;
  
  const response = await fetch(url);
  const data = await response.json();
  return data.result;
}