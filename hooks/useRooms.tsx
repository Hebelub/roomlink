import React, { useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { GET_ROOMS } from '../graphql/queries'

const useRooms = () => {
    const { data, loading, error } = useQuery(GET_ROOMS);
    const [rooms, setRooms] = React.useState<Room[]>([]);

    useEffect(() => {
        if (!data) return;

        const rooms: Room[] = data.getOrders.map(({ value }
            : RoomResponse) => ({
                createdAt: value.createdAt,
                createdBy: value.createdBy,
                createdById: value.createdById,
                name: value.name,
            }));

        setRooms(rooms);
    }, [data])

    return { loading, error, rooms }
}

export default useRooms