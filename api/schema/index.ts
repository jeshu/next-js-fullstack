import { GraphQLSchema } from 'graphql'
import { buildSchema } from 'type-graphql'
import { ObjectId } from 'mongodb'
import path from 'path'

import { UserResolver } from '../resolvers/UserResolver'
import { AuthResolver } from '../resolvers/AuthResolver'
import { StreamResolver } from '../resolvers/StreamResolver'
import { ObjectIdScaler } from './object-id.scaler'
import { TypegooseMiddleware } from '../middleware/typegoose'


export default async function createSchema(): Promise<GraphQLSchema> {
  const schema = await buildSchema({
    resolvers: [UserResolver, AuthResolver, StreamResolver],
    emitSchemaFile: path.resolve(__dirname, 'schema.ggl'),
    globalMiddlewares: [TypegooseMiddleware],
    scalarsMap: [{ type: ObjectId, scalar: ObjectIdScaler }],
    validate: false,
  })

  return schema;
}