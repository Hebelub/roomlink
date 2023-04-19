import { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Unsubscribe, User, getAuth } from 'firebase/auth';
import { auth, db } from '../firebase';
import 'firebase/auth';
import 'firebase/firestore';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';

interface LocalUser {
    lastUpdated: number;
    uid: string;
    displayName: string | null;
    email: string | null;
    photoURL: string | null;
}

export const setUserInDb = (user: User | null): void => {
    if (!user) return;
    setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
    });
}

const useUser = (userID: string): LocalUser | undefined => {
    const [user, setUser] = useState<LocalUser>();

    useEffect(() => {
        let unsubscribe: Unsubscribe | undefined;
        const getUser = async (userID: string) => {
            if (userID) {
                const cachedUser = localStorage.getItem(userID);
                let parsedUser: LocalUser | undefined;
                if (cachedUser) {
                    try {
                        parsedUser = JSON.parse(cachedUser) as LocalUser;
                        setUser(parsedUser);
                    } catch (e) {
                        console.error(`Error parsing cached user data: ${e}`);
                    }
                }

                if (parsedUser) {
                    setUser(parsedUser);
                }

                // If the user is not cached or the cached user is older than 1 minute, fetch the user from the database
                if (!parsedUser || (parsedUser && Date.now() - parsedUser.lastUpdated > 60000)) {
                    const userDocRef = doc(collection(db, 'users'), userID);

                    const userDocSnap = await getDoc(userDocRef);

                    if (userDocSnap.exists()) {
                        const { uid, displayName, email, photoURL } = userDocSnap.data();
                        const newUser = { uid, displayName, email, photoURL, lastUpdated: Date.now() };
                        localStorage.setItem(userID, JSON.stringify(newUser));
                        setUser({ uid, displayName, email, photoURL } as LocalUser);
                    }
                }
            }
        };

        getUser(userID);

        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, [userID]);

    return user;
};

export default useUser;
