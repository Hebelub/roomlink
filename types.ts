export type Room = {
    name: string;
    code: string;
    description: string;
    imageUrl: string;

    createdAt: Date;
    createdById: string;
};

export type Message = {
    text: string;
    createdAt: Date;
    createdBy: string;
};

export type Visit = {
    visitedRoom: string;
    visitedBy: string;
    lastVisit: Date;
}