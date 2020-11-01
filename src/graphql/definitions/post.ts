import {
  idArg,
  mutationField,
  objectType,
  queryField,
  stringArg
} from '@nexus/schema'
import { randomBytes } from 'crypto'

type PostsArray = {
  id: string
  title: string
  body?: string | null | undefined
}[]

const posts: PostsArray = [
  {
    id: '156045f99n',
    title: 'First post',
    body: null
  }
]

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

export const post = queryField('post', {
  type: 'Post',
  nullable: true,
  args: { id: idArg({ required: true }) },
  resolve(_, { id }) {
    const post = posts.find(post => post.id === id)
    if (!post) {
      return null
    }
    return post
  }
})
