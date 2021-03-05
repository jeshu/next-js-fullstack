import {prop as Property, getModelForClass } from '@typegoose/typegoose';
import {ObjectID} from 'mongodb';
import {Field, ObjectType} from 'type-graphql'

@ObjectType()
export class User {
  @Field()
  readonly id:ObjectID;
  
  @Field()
  @Property({required:true})
  email:string;

  @Property({required:true})
  password:string;
  }

export const UserModel = getModelForClass(User);
