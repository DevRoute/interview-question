import { getCollection } from 'astro:content'
import { transformMenuData } from '@/utils/data'
import type { CollectionEntry } from 'astro:content'

type CollectionType = 'javascript' | 'network' | 'react'

interface PostData {
  id: string
  title: string
  category: string
  sticky: number
  description: string
  pubDate: Date
  tags: string[]
  draft: boolean
}

// 获取所有文章
export async function getAllPosts(type: CollectionType) {
  const allPosts = await getCollection(type, ({ data }) => {
    return import.meta.env.PROD ? data.draft !== true : true
  })

  return allPosts
}

//获取所有文章，置顶优先，发布日期降续
export async function getSortedPosts(type: CollectionType) {
  const allPosts = await getAllPosts(type)
  return allPosts.sort((a, b) => {
    if (a.data.sticky !== b.data.sticky) {
      return b.data.sticky - a.data.sticky
    } else {
      return b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
    }
  })
}

//将文章进行排序，并转换为扁平化数组
export async function getFlattenedPosts<T extends CollectionType>(posts: CollectionEntry<T>[]) {
  const menuData = transformMenuData(
    posts.map(
      (post) =>
        ({
          id: post.id,
          title: post.data.title,
          category: post.data.category,
          sticky: post.data.sticky,
          description: post.data.description,
          pubDate: post.data.pubDate,
          tags: post.data.tags,
          draft: post.data.draft,
        }) satisfies PostData,
    ),
  )

  return menuData.reduce<{ id: string }[]>((acc, item) => {
    if ('children' in item && item.children) {
      return [...acc, ...item.children]
    }
    return [...acc, item]
  }, [])
}
