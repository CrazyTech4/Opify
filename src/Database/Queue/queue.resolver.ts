import { Arg, Args, FieldResolver, Mutation, Query, Resolver, Root } from "type-graphql";
import { Service } from "typedi/decorators/Service";
import { DatabaseService } from "../database-service";
import { Playlist } from "../Playlist/playlist.entity";
import { PlaylistService } from "../Playlist/playlist.service";
import { RangeArgs } from "../range.args";
import { Track } from "../Track/track.entity";
import { UserService } from "../User/user.service";
import { Queue } from "./queue.entity";
import { NewQueueInput } from "./new-queue.input";
import { QueueService } from "./queue.service";

@Service()
@Resolver(of => Queue)
export class QueueResolver {
    constructor(private queueService: QueueService,
                private playlistService: PlaylistService) { }
    
    @Query(returns => Queue)
    async queue(@Arg('id') id: number) {
        const queue = await this.queueService.findById(id);
        if (!queue) {
            throw new Error('Queue not found');
        }
        return queue;
    }

    @FieldResolver(returns => Playlist)
    async playlist(@Root() queue: Queue) {
        return await this.playlistService.findById(queue.playlistId);
    }

    @FieldResolver(returns => Playlist)
    async playingSession(@Root() queue: Queue) {
        return await this.queueService.getPlayingSession(queue.id);
    }

    @FieldResolver()
    async currentTime() {
        return new Date();
    }

    @FieldResolver()
    async sessions(@Root() queue: Queue) {
        return await this.queueService.getSessions(queue.id);
    }

    @Mutation(returns => Boolean)
    async setPlayingSession(@Arg('queueId') queueId: number,
                            @Arg('sessionId') sessionId: number) {
        return await this.queueService.playFromSession(queueId, sessionId);
    }

    @Mutation(returns => Queue)
    async addQueue(@Arg('queueData') queue: NewQueueInput) {
        return await this.queueService.add(queue);
    }

    @Mutation(returns => Boolean)
    async removeQueue(@Arg('id') id: number) {
        // FIXME: always returns true
        try {
            await this.queueService.remove(id);
            return true;
        } catch {
            return false;
        }
    }
}
