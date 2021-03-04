import { Resolver, Query, FieldResolver, Ctx, Root, UseMiddleware, Arg, Mutation } from 'type-graphql';
import { ObjectId } from 'mongodb';
import { MyContext } from '../types/MyContext'
import { User, UserModel } from '../entity/User';
import { ObjectIdScaler } from '../schema/object-id.scaler';
import { isAuth } from '../middleware/isAuth';
import { Stream, StreamModel } from '../entity/Stream';
import { StreamInput } from '../types/StreamInput';


@Resolver(() => Stream)
export class StreamResolver {

  @Query(() => Stream, { nullable: true })
  stream(@Arg('streamId', () => ObjectIdScaler) streamId: ObjectId) {

    return StreamModel.findById(streamId);
  }

  @Query(() => [Stream])
  @UseMiddleware(isAuth)
  streams(@Ctx() ctx: MyContext) {
    return StreamModel.find({ author: ctx.res.locals.userId })
  }

  @Mutation(() => Stream)
  @UseMiddleware(isAuth)
  async addStream(@Arg('input') streamInput: StreamInput, @Ctx() ctx: MyContext): Promise<Stream> {
    const stream = new StreamModel({
      ...streamInput,
      author: ctx.res.locals.userId
    } as Stream)
    await stream.save();
    return stream;
  }

  @Mutation(() => Stream)
  @UseMiddleware(isAuth)
  async editStream(
    @Arg('input') streamInput: StreamInput, 
    @Ctx() ctx: MyContext
  ): Promise<Stream> {
    const { id, title, description, url } = streamInput
    const stream = await StreamModel.findOneAndUpdate(
      { _id: id, author: ctx.res.locals.userId },
      { title, description, url },
      { runValidators: true, new: true }
    );

    if (!stream) {
      throw new Error('Stream not found')
    }
    return stream;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteStream(@Arg('streamId', () => ObjectIdScaler) streamId: ObjectId, @Ctx() ctx: MyContext): Promise<Boolean | undefined> {
    const deleted = await StreamModel.findByIdAndDelete({
      _id: streamId,
      author: ctx.res.locals.userId
    })
    if (!deleted) {
      throw new Error('Stream not found')
    }
    return true;
  }

  @FieldResolver()
  async author(@Root() stream: Stream): Promise<User | null> {
    return await UserModel.findById(stream.author)
  }
}

