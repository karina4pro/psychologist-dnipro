import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: {type: 'author'},
    }),
    defineField({
        name: 'mainImage',
        title: 'Main image',
        type: 'image',
        options: {
            hotspot: true,
        },
        fields: [
            {
                name: 'alt',
                type: 'string',
                title: 'Alt text',
                description: 'Описание изображения для SEO',
            }
        ]
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),
    // SEO поля
    defineField({
      name: 'seoTitle',
      title: 'SEO заголовок',
      type: 'string',
      description: 'Заголовок для поисковиков (до 60 символов). Если не заполнено - будет использован обычный заголовок',
      validation: Rule => Rule.max(60).warning('Лучше до 60 символов')
    }),
    defineField({
      name: 'seoDescription', 
      title: 'SEO описание',
      type: 'text',
      description: 'Описание для поисковиков и соцсетей (до 160 символов)',
      validation: Rule => Rule.max(160).warning('Лучше до 160 символов')
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author && `by ${author}`}
    },
  },
})