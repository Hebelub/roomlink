import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { CompositeNavigationProp, RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackNavigationProp, RootStackParamList } from '../navigator/RootNavigator';
import { Room, Visit } from '../types';
import { auth } from '../firebase';
import EditRoomButton from './EditRoomButton';
import Icon from 'react-native-vector-icons/FontAwesome';

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

    const isOwner = roomProps.createdById === auth.currentUser?.uid;

    return (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate("Room", { roomProps: roomProps })
            }}
        //   style={[styles.button, styles.buttonOutline, styles.horizontal]}
        >
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
                            -  {getElapsedTimeSince(lastVisit)}
                        </Text>
                    </View>
                )}
                {!lastVisit && (
                    <Text style={styles.lastVisitText}>Never visited</Text>
                )}


            </View>

            {
                isOwner && <View style={{ position: 'absolute', right: 8 }}>
                    <EditRoomButton roomProps={roomProps} />
                </View>
            }
        </TouchableOpacity>
    )
}

export default VisitListItem

const styles = StyleSheet.create({

    container: {
        width: '96%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFFFF',
        borderRadius: 15,
        padding: 5,
        shadowColor: '',
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
        width: '80%',
        height: 1,
        backgroundColor: 'black',
        marginVertical: 5,
    },

    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    description: {
        fontSize: 16,
        color: '#555',
        marginBottom: 6,
        paddingHorizontal: 40,

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
