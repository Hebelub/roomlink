import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Card, Icon } from '@rneui/themed';
import { RoomNavigatorScreenNavigationProp } from '../navigator/RoomNavigator';
import useUser from '../hooks/useUser';
import { Image } from '@rneui/themed';
import { getElapsedTimeSince } from './VisitListItem';

export type VisitorCardProps = {
    userId: string;
    lastVisit: Date;
};

const VisitorCard = ({ userId, lastVisit }: VisitorCardProps) => {
    const navigation = useNavigation<RoomNavigatorScreenNavigationProp>();

    const user = useUser(userId);

    return (
        <TouchableOpacity
            onPress={() =>
                navigation.navigate('MyModal', {
                    userId: userId,
                })
            }>
            <Card style={styles.card}>
                <View style={styles.cardContent}>
                    {user?.photoURL && (
                        <Image style={styles.avatar} source={{ uri: user?.photoURL }} />
                    )}
                    <View style={styles.cardText}>
                        <Text style={styles.displayName}>{user?.displayName}</Text>
                        <Text style={styles.lastVisit}>
                            {getElapsedTimeSince(lastVisit)}
                        </Text>
                    </View>
                    <Icon
                        name="arrow-ios-forward"
                        pack="eva"
                        style={styles.cardIcon}
                    />
                </View>
                <Card.Divider />
            </Card>
        </TouchableOpacity>
    );
};

export default VisitorCard;

const styles = StyleSheet.create({
    card: {
        borderRadius: 10,
        marginHorizontal: 10,
        marginVertical: 5,
        padding: 10,
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardText: {
        flex: 1,
        marginHorizontal: 10,
    },
    displayName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    lastVisit: {
        fontSize: 14,
        color: 'gray',
        marginTop: 5,
    },
    avatar: {
        height: 50,
        width: 50,
        borderRadius: 9999,
    },
    cardIcon: {
        fontSize: 24,
        color: 'gray',
    },
});
