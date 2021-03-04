import { GraphQLScalarType, Kind } from 'graphql';
import { ObjectId } from 'mongodb'

export const ObjectIdScaler = new GraphQLScalarType({

  name: 'ObjectId',
  description: 'Mongodb id scaler type',
  parseValue(value: string) {
    return new ObjectId(value);
  },

  serialize(value: ObjectId) {
    return value.toHexString()
  },

  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return new ObjectId(ast.value)
    }
    return null;
  },
})
