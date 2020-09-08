import { Track } from "./Track/track";

(async () => {
    const track = new Track({
        title: 'Ein Test Track',
        filepath: 'c:\\cool'
    });

    await track.insert();
})
