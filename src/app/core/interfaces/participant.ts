export interface participant {
    name: string,
    show?: boolean,
    gives?: string,
}

export const defaultParticipant:participant = {
    name: "Ricky"
}

export const emptyParticipant:participant = {
    name: "",
}