import { StyleSheet, Text, TouchableOpacity, View, TouchableWithoutFeedback, Alert } from 'react-native'
import React from 'react'
import { CompositeNavigationProp, RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackNavigationProp, RootStackParamList } from '../navigator/RootNavigator';
import { Room, Visit } from '../types';
import { auth, db } from '../firebase';
import EditRoomButton from './EditRoomButton';
import Icon from 'react-native-vector-icons/FontAwesome';
import { DocumentData, collection, deleteDoc, doc, getDocs, limit, query, where } from 'firebase/firestore';
import useUser from '../hooks/useUser';

export type VisitListItemProps = {
    roomProps: Room;
    lastVisit: Date | null;
}

export function getElapsedTimeSince(date: Date): string {

    const timeDiff = (new Date().valueOf() - date.valueOf());

    const seconds = Math.floor(timeDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
        return `${days} day${days > 1 ? 's' : ''} ago`;
    }
    if (hours > 0) {
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    }
    if (minutes > 0) {
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    }
    return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
}

const deleteVisit = async (visitedRoom: string, visitedBy: string) => {
    const q = query(collection(db, "visits"),
        where('visitedRoom', '==', visitedRoom),
        where('visitedBy', '==', visitedBy),
        limit(1)
    );
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
        return null;
    }

    await deleteDoc(doc(db, "visits", snapshot.docs[0].id));
};

const VisitListItem = ({ roomProps, lastVisit }: VisitListItemProps) => {

    const navigation = useNavigation<RootStackNavigationProp>();
    const user = useUser();

    const isOwner = roomProps.createdById === auth.currentUser?.uid;
    const handleLongPress = () => {
        navigation.setOptions({
            gestureEnabled: false,
        });

        Alert.alert(
            'Delete Room',
            'Are you sure you want to delete this visit?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => {
                        user && deleteVisit(roomProps.code, user?.uid);
                    },
                },
            ],
            { cancelable: true },
        );
    };


    return (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate('Room', { roomProps });
            }}
            onLongPress={handleLongPress}>
            <View style={styles.container}>
                <Text numberOfLines={1} style={styles.header}>
                    {roomProps.name}
                </Text>
                <Text numberOfLines={1} style={styles.description}>
                    {roomProps.description}
                </Text>
                <View style={styles.separator} />
                {lastVisit && (
                    <View style={styles.lastVisitContainer}>
                        <Icon name="clock-o" size={24} color="black" />
                        <Text style={styles.lastVisitText}>
                            - {getElapsedTimeSince(lastVisit)}
                        </Text>
                    </View>
                )}
                {!lastVisit && <Text style={styles.lastVisitText}>Never visited</Text>}
            </View>
            {isOwner && (
                <View style={{ position: 'absolute', left: 20, top: 70 }}>
                    <Icon
                        size={24}
                        name="gear"
                        color="green"
                        onPress={() => {
                            navigation.navigate('EditRoom', { roomProps });
                        }}
                    />
                </View>
            )}
        </TouchableOpacity>
    );
};

export default VisitListItem

const styles = StyleSheet.create({

    container: {
        width: '96%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFF5555',
        borderRadius: 15,
        padding: 5,
        // shadowColor: '',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 1,
            height: 2,
        },
        shadowRadius: 4,
        elevation: 5,
        borderWidth: 1,
        marginBottom: 15,
        borderColor: 'black',
        // marginBottom: 30,
    },
    separator: {
        width: '70%',
        height: 1,
        backgroundColor: 'black',
        marginVertical: 5,
    },

    header: {
        shadowOpacity: 0.1,
        shadowOffset: {
            width: 0.1,
            height: 0.2,
        },
        fontSize: 30,
        fontWeight: '800',
        textAlign: 'center',
        padding: 1,

    },
    description: {
        shadowOpacity: 0.1,
        shadowOffset: {
            width: 0.1,
            height: 0.2,
        },
        fontSize: 20,
        fontWeight: '200',
        textAlign: 'center',
        padding: 1,


    },
    lastVisitContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    lastVisitText: {
        fontSize: 14,
        marginLeft: 8,
    },
});
