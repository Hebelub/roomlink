export type Room = {
    name: string;
    code: string;
    description: string;
    imageUrl: string;

    createdAt: Date;
    createdById: string;
};

export type Message = {
    createdBy: string;
    createdAt: Date;
    text: string;
};

export type Visit = {
    visitedRoom: string;
    visitedBy: string;
    lastVisit: Date;
};
