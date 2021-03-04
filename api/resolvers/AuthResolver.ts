import {Arg, Mutation, Resolver} from 'type-graphql'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { UserModel } from '../entity/User'
import { AuthInput } from '../types/AuthInput'
import { UserReponse } from '../types/UserResponce'


@Resolver()
export class AuthResolver {

  @Mutation(()=> UserReponse)
  async register(@Arg('input') {email, password}:AuthInput
  ): Promise<UserReponse> {

    const existing = await UserModel.findOne({ email})
    if(existing) {
      throw new Error('Email already registered')
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = new UserModel({email, password:hashedPassword})
    await user.save()

    const payload = {
      id: user.id,
    }

    const token = jwt.sign(payload, process.env.SESSION_SECRET || 'abcd963258')
    return {user, token}
  }

  @Mutation(()=> UserReponse)
  async login(@Arg('input') {email, password}:AuthInput
  ): Promise<UserReponse> {

    const existing = await UserModel.findOne({ email})
    const valid = await bcrypt.compare(password, existing.password)
    
    if(!valid) {
      throw new Error('Invalid login')
    }

    const payload = {
      id: existing.id,
    }

    const token = jwt.sign(payload, process.env.SESSION_SECRET || 'abcd963258')
    return {user:existing, token}
  }

}