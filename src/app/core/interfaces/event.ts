import { participant, defaultParticipant } from "./participant";

export interface event {
    id?: number,
    title: string,
    participants: participant[],
    date: Date,
    ended?: boolean
}

export const defaultEvent: event = {
    id:1,
    title: "Birthday",
    date: new Date(new Date().getTime() + 1000 * 60 * 24),
    participants: [defaultParticipant, defaultParticipant]
}