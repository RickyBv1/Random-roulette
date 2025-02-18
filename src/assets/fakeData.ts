import { event, defaultEvent } from "src/app/core/interfaces/event";
import { defaultParticipant } from "src/app/core/interfaces/participant";

const defaultEvent2: event = {
  id: 2,
  title: "Christmas",
  date: new Date(new Date().getTime() + 1000*60*24*10),
  participants: [defaultParticipant, defaultParticipant]
}

export const eventsList: event[] = []