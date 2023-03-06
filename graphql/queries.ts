import { gql } from '@apollo/client';

export const GET_USERS = gql`
    query GetUsers {
        getUsers {
            value {
                email
                name
            }
            name
        }
    }
`;

export const GET_ROOMS = gql`
    query GetRooms {
        getRooms {
            name
            value {
                createdAt
                createdBy {
                email
                name
                }
                createdById
                name
            }
        }
    }
`;

export const GET_MESSAGES = gql`
    query GetMessages {
        getMessages {
            name
            value {
                createdAt
                createdBy {
                    email
                    name
                }
                createdById
                text
            }
        }
    }
`;
