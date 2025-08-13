// Конфигурация Sanity
export const sanityConfig = {
  projectId: 'i2ncx2dk',
  dataset: 'production',
  apiVersion: '2023-05-03',
  useCdn: false
};

// Получение всех постов
export async function getAllPosts() {
  const query = `*[_type == "post"] | order(publishedAt desc) {
    title,
    slug,
    publishedAt,
    mainImage,
    "categories": categories[]->title
  }`;
  
  const url = `https://${sanityConfig.projectId}.api.sanity.io/v${sanityConfig.apiVersion}/data/query/${sanityConfig.dataset}?query=${encodeURIComponent(query)}`;
  
  const response = await fetch(url);
  const data = await response.json();
  return data.result;
}