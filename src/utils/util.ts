import {  doc, updateDoc, setDoc, serverTimestamp,getDoc,deleteDoc } from 'firebase/firestore/lite';
import { db } from '../config/firebase';

export interface UserData{
  name: string;
  birthDate: string;
  tel: string;
  career: string;
  isEditing: boolean;
  gender: string;
  id: string;
  profileImage?: string;
}


export const editUserData = async (id: string, updatedData: Partial<UserData>) => {

  try {
    const userDocRef = doc(db, 'user-data', id);

    await updateDoc(userDocRef, updatedData);

  } catch (error) {
    console.error('Error updating user data:', error);
  }
};

export const createCard = async (cardData: UserData) => {
  try {
    const userDocRef = doc(db, 'user-data', cardData.id);

    const docSnapshot = await getDoc(userDocRef);
    if (docSnapshot.exists()) {
      console.log('Document already exists:', docSnapshot.data());
    } else {
      await setDoc(userDocRef, {
        ...cardData,
        createTime: serverTimestamp(),
      });
      console.log('Card created successfully');
    }
  } catch (error) {
    console.error('Error creating card:', error);
  }
}

export const deleteCard = async (id: string) => {
  try {
    const userDocRef = doc(db, 'user-data', id);
    await deleteDoc(userDocRef);
    console.log('Card deleted successfully');
  } catch (error) {
    console.error('Error deleting card:', error);
  }
}

export const generateCardId = (birthDate: string, tel: string): string => {
  return `${birthDate.replace(/-/g, '')}${tel.replace(/-/g, '')}`;
};