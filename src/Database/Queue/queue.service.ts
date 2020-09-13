import { Service } from "typedi/decorators/Service";
import { DatabaseService } from "../database-service";
import { Session } from "../Session/session.entity";
import { Track } from "../Track/track.entity";
import { Queue } from "./queue.entity";
import { NewQueueInput } from "./new-queue.input";
import { UpdateQueueInput } from "./update-queue.input";


@Service()
export class QueueService extends DatabaseService<Queue, NewQueueInput, UpdateQueueInput> {
    
    constructor() {
        super('TemporaryQueue', Queue);
    }

    async update(id: number, data: UpdateQueueInput) {
        if (['currentAudioPosition', 'currentTrackIndex', 'playing'].some(key => key in data)) {
            data.lastUpdate = new Date();
        }
        return await super.update(id, data);
    }

    async getSessions(id: number) {
        return await this.joinThemBack(id, 'current_queue_id', 'UserSession');
    }

    async getPlayingSession(id: number) {
        return await this.joinToOne(id, 'playing_session_id', 'UserSession', Session); 
    }
    
    async playFromSession(queueId: number, sessionId: number) {
        await this.update(queueId, Object.assign(new UpdateQueueInput(), {
            playingSessionId: sessionId
        }));
        return true; // FIXME: not the reality
    }
    
}