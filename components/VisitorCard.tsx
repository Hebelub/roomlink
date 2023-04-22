import { View, Text, TouchableOpacity, StyleSheet, } from 'react-native'
import React from 'react'
import { useTailwind } from 'tailwind-rn/dist';
import { useNavigation } from '@react-navigation/native';
import { Card, Icon } from '@rneui/themed';
import { RoomNavigatorScreenNavigationProp } from '../navigator/RoomNavigator';
import useUser from '../hooks/useUser';
import { Image } from "@rneui/themed";
import { getElapsedTimeSince } from './VisitListItem';

export type VisitorCardProps = {
    userId: string;
    lastVisit: Date;
}

const VisitorCard = ({ userId, lastVisit }: VisitorCardProps) => {





    const navigation = useNavigation<RoomNavigatorScreenNavigationProp>();

    const user = useUser(userId);




    return (
        <TouchableOpacity
            onPress={() =>
                navigation.navigate('MyModal', {
                    userId: userId
                })
            }
        >
            <View style={styles.card}>
                <View style={styles.container}>
                    <View style={styles.leftContainer}>
                        {user?.photoURL && (
                            <Image
                                style={styles.avatar}
                                source={{ uri: user?.photoURL }}
                            />
                        )}
                        <View style={styles.textContainer}>
                            <Text style={styles.displayName}>
                                {user?.displayName}
                            </Text>
                            <Text style={styles.timeAgo}>
                                {getElapsedTimeSince(lastVisit)}
                            </Text>
                        </View>
                    </View>
                    <Icon
                        name="chevron-right"
                        size={24}
                        color="gray"
                        style={styles.rightIcon}
                    />
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default VisitorCard

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#FFFFF444",
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginVertical: 5,
        marginHorizontal: 10,
        borderRadius: 10,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        height: 50,
        width: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    textContainer: {
        justifyContent: 'center',
    },
    displayName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    timeAgo: {
        fontSize: 14,
        color: 'gray',
    },
    rightIcon: {
        marginLeft: 10,
    },
});
