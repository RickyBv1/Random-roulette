export interface participant {
    name: string,
    gives?: string,
    show?: boolean,
}

export const emptyParticipant:participant = {
    name: "",
    show: false,
}