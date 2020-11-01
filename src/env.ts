import 'dotenv/config'
import * as env from 'env-var'

export const PORT = env.get('PORT').required().asPortNumber() || 4000