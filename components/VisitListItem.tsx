import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { CompositeNavigationProp, RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackNavigationProp, RootStackParamList } from '../navigator/RootNavigator';
import { Room, Visit } from '../types';

export type VisitListItemProps = {
    roomProps: Room;
    lastVisit: Date | null;
}

function getElapsedTimeSince(date: Date): string {

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

const VisitListItem = ({ roomProps, lastVisit }: VisitListItemProps) => {
    const navigation = useNavigation<RootStackNavigationProp>();

    return (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate("RoomScreen", { roomProps: roomProps })
            }}
            style={[styles.button, styles.buttonOutline]}
        >
            <Text numberOfLines={1} style={styles.header}>{roomProps.name}</Text>
            <Text numberOfLines={1} style={styles.description}>{roomProps.description}</Text>
            {lastVisit && <Text style={styles.timeSince}>Last visited {lastVisit && getElapsedTimeSince(lastVisit)}</Text>}
            {!lastVisit && <Text style={styles.timeSince}>Never visited</Text>}
        </TouchableOpacity>
    )
}

export default VisitListItem

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        height: 50,
        width: 300,
        margin: 10,
        borderWidth: 1,
        padding: 10,
    },
    button: {
        backgroundColor: 'lightblue',
        padding: 15,
        width: 300,
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonOutline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        marginTop: 10,
    },
    description: {
        fontSize: 12,
        fontStyle: 'italic',
    },
    timeSince: {
        fontSize: 10,
    },
    header: {
        fontSize: 14,
        fontWeight: 'bold',
    },
})
