import { Arg, Args, Authorized, Ctx, FieldResolver, Mutation, Query, Resolver, Root } from "type-graphql";
import { Service } from "typedi/decorators/Service";
import { PlaylistService } from "../Playlist/playlist.service";
import { QueueService } from "../Queue/queue.service";
import { Session } from "../Session/session.entity";
import { SessionService } from "../Session/session.service";

@Service()
@Resolver(of => Session)
export class SessionResolver {
    constructor(private sessionService: SessionService,
                private queueService: QueueService) { }
    
    @Query(returns => Session)
    async session(@Arg('id') id: number) {
        const session = await this.sessionService.findById(id);
        if (!session) {
            throw new Error('Session not found');
        }
        return session;
    }

    @FieldResolver()
    async currentQueue(@Root() session: Session) {
        return await this.queueService.findById(session.currentQueueId);
    }

    @Mutation(returns => Boolean)
    // @Authorized()
    async removeSession(@Arg('id') id: number) {
        // FIXME: always returns true
        try {
            await this.sessionService.remove(id);
            return true;
        } catch {
            return false;
        }
    }
}
