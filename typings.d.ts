type User = {
    email: string,
    name: string,
};

type UserList = {
    name: ID,
    value: User,
};

type Room = {
    createdAt: string,
    createdBy: User,
    createdById: ID,
    name: string,
};

type UserResponse = {
    name: ID,
    value: User,
}

type RoomResponse = {
    value: Room,
}
