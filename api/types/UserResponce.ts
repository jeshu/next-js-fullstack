import { User } from '../entity/User'
import {ObjectType, Field} from 'type-graphql'

@ObjectType()
export class UserReponse {

  @Field(()=> User, {nullable:true})
  user?:User

  @Field(()=> String, {nullable:true})
  token?:String
}