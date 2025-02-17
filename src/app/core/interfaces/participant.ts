export interface participant {
    name: string,
    show?: boolean,
    gives?: string,
}

export const emptyParticipant:participant = {
    name: "",
    show: false,
}