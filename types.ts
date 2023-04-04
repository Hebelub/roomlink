export type Room = {
    name: string;
    code: string;
    description?: string;
    image?: string;

    createdAt?: Date;
    createdBy?: string;
};

export type Message = {
    text: string;
    createdAt: Date;
    createdBy: string;
};