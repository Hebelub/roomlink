import { useQuery } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { GET_USERS } from '../graphql/queries';
import { CustomerScreenNavigationProp } from '../screens/RoomItemScreen';

const useUsers = () => {
    const { data, loading, error } = useQuery(GET_USERS);
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        if (!data) return;

        const users: User[] = data.getUsers.map(({ value }
            : UserResponse) => ({
                email: value.email,
                name: value.name
            }))

        setUsers(users);
    }, [data])

    return { loading, error, users };
}

export default useUsers