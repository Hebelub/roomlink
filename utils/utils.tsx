import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Room } from '../types';
import { collection, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

export const getRoom = async (roomCode: string): Promise<Room | null> => {
    const collectionRef = collection(db, "rooms");
    const documentRef = doc(collectionRef, roomCode);

    try {
        const docSnapshot = await getDoc(documentRef);
        if (docSnapshot.exists()) {
            const data = docSnapshot.data();
            return data as Room;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error retrieving document: ", error);
        return null;
    }
};

export const checkURL = async (url: string): Promise<boolean> => {
    return new Promise((resolve) => {
        const image = new Image();
        image.onload = function () {
            if (image.width > 0) {
                console.log("image exists");
                resolve(true);
            }
        }
        image.onerror = function () {
            console.log("image doesn't exist");
            resolve(false);
        }
        image.src = url;
    });
}
