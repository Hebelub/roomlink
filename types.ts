export type RoomProps = {
    name: string;
    code: string;
    description?: string;
    image?: string;

    createdAt?: Date;
    createdBy?: string;
};

export type Message = {
    id: string;
    text: string;
    createdAt: Date;
    createdBy: string;
};