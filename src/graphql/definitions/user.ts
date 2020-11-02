import { mutationField, objectType, queryField, stringArg } from '@nexus/schema'
import { randomBytes } from 'crypto'

type UserArray = {
  id: string
  username: string
  email: string
  password: string
}[]

const users: UserArray = [
  {
    id: '783073f09d',
    username: 'test',
    email: 'test@example.com',
    password: 'secure'
  }
]

export const User = objectType({
  name: 'User',
  definition(t) {
    t.id('id')
    t.string('username')
    t.string('email')
  }
})

export const createAccount = mutationField('createAccount', {
  type: 'Boolean',
  args: {
    username: stringArg({ required: true }),
    email: stringArg({ required: true }),
    password: stringArg({ required: true })
  },
  nullable: false,
  resolve(_, args) {
    users.push({ id: randomBytes(5).toString('hex'), ...args })
    return true
  }
})

export const login = mutationField('login', {
  type: 'Boolean',
  args: {
    username: stringArg({ required: true }),
    password: stringArg({ required: true })
  },
  nullable: false,
  resolve(_, { username, password }) {
    const exists = users.find(
      user => user.username === username && user.password === password
    )
    if (!exists) {
      return false
    }
    return true
  }
})

export const me = queryField('me', {
  type: 'User',
  nullable: true,
  resolve() {
    return users[users.length - 1]
  }
})
