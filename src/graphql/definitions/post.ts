import {
  idArg,
  mutationField,
  objectType,
  queryField,
  stringArg
} from '@nexus/schema'
import { randomBytes } from 'crypto'

interface Post {
  id: string
  title: string
  body?: string | null | undefined
}

type PostsArray = Post[]

const posts: PostsArray = []

export const Post = objectType({
  name: 'Post',
  definition(t) {
    t.id('id', { nullable: false })
    t.string('title', { nullable: false })
    t.string('body', { nullable: true })
  }
})

export const addPost = mutationField('addPost', {
  type: 'Boolean',
  args: {
    title: stringArg({ required: true }),
    body: stringArg({ nullable: true })
  },
  nullable: false,
  resolve(_, args) {
    posts.push({ id: randomBytes(5).toString('hex'), ...args })
    return true
  }
})

export const post = queryField('posts', {
  type: 'Post',
  list: true,
  resolve() {
    return posts
  }
})
