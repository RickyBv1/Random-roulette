import { participant } from "./participant";

export interface event {
    id: number,
    title: string,
    participants: participant[],
    date: Date,
    ended?: boolean
}