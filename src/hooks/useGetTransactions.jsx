import { query, collection, where, orderBy, onSnapshot } from 'firebase/firestore'
import React, { useActionState, useEffect, useState } from 'react'
import { db } from '../config/firebase-config'
import { useGetUserInfo } from './useGetUserInfo'
export const useGetTransactions = () => {
  const [transactions,setTransactions] = useState([])
  const transactionCollectionRef = collection(db, "transactions")
  const { userID } = useGetUserInfo()
  const [ transactionTotals, setTransactionTotals ] = useState({
    balance: 0.0,
    income: 0.0,
    expense: 0.0
  })
  const getTransactions =   () => {
    let unsubscribe
    try{
      const queryTransactions = query(transactionCollectionRef,
         where("userID", "==", userID),
        orderBy("createdAt"))

        unsubscribe = onSnapshot(queryTransactions, (snapshot) => {
          let docs = []
          let totalIncome = 0.0
          let totalExpense = 0.0
            snapshot.forEach((doc) => {
              const data = doc.data()
              const id = doc.id
              docs.push({...data, id})
              if(data.transactionType === "expense"){
                totalExpense += Number(data.transactionAmount)
              } else {
                totalIncome += Number(data.transactionAmount)
              }
            })
            setTransactions(docs)
            let balance = totalIncome - totalExpense
            setTransactionTotals({
              balance,
              income: totalIncome,
              expense: totalExpense
            })
        })
    }
    catch(err){
      console.error(err)
    }
    return unsubscribe
  }
  useEffect(() => {return getTransactions()}, [])
  return ({transactions, transactionTotals})
}
