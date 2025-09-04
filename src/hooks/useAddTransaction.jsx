import React from 'react'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { useGetUserInfo } from '../hooks/useGetUserInfo'
import { db } from '../config/firebase-config'
export const useAddTransaction = () => {
  const transactionCollectionRef = collection(db, "transactions")
  const { name, profilePhoto, userID, isAuth} = useGetUserInfo()
  const addTransaction = async ({
    description,
    transactionAmount,
    transactionType
  }) => {
    await addDoc(transactionCollectionRef, {
      userID: userID,
      description,
      transactionAmount,
      transactionType,
      createdAt: serverTimestamp()
    })
  }
  return { addTransaction }
}
