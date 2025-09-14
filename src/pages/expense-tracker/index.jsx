import { useState } from "react"
import { useAddTransaction } from "../../hooks/useAddTransaction"
import { useGetTransactions } from "../../hooks/useGetTransactions"
import { useGetUserInfo } from "../../hooks/useGetUserInfo"
import { signOut } from "firebase/auth"
import { auth } from "../../config/firebase-config"
import { useNavigate } from "react-router-dom"
import { FiArrowUpCircle, FiArrowDownCircle } from "react-icons/fi"
import "./index.css"
import { FiArrowUpRight } from 'react-icons/fi'
import { FiLogOut } from "react-icons/fi";
import { AiOutlinePlusCircle } from "react-icons/ai";

export const ExpenseTracker = () => {
  let navigate = useNavigate()
  const { addTransaction } = useAddTransaction()
  const { transactions, transactionTotals } = useGetTransactions()
  const [description, setDescription] = useState("")
  const [transactionAmount, setTransactionAmount] = useState(0)
  const [transactionType, setTransactionType] = useState("expense")
  const { name, profilePhoto } = useGetUserInfo()

  const onSubmit = (e) => {
    e.preventDefault()
    addTransaction({ description, transactionAmount, transactionType })
    setDescription("")
    setTransactionAmount(0)
    setTransactionType("expense")
  }

  const signUserOut = async () => {
    try {
      await signOut(auth)
      localStorage.clear()
      navigate("/")
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="expense-container">
      <div className="expense-card">
        <div className="expense-header">
          <h1>{name}'s Expense Tracker</h1>
          {profilePhoto && (
            <div className="profile-box">
              <img src={profilePhoto} alt="Profile" />
              <button onClick={signUserOut} className="signout-btn">
                Sign Out
                <FiArrowUpRight />
              </button>
            </div>
          )}
        </div>
        {/* Balance Section */}
        <div className="balance-section">
          <h3>Your Balance</h3>
          <h2
            className={
              transactionTotals.balance >= 0 ? "positive" : "negative"
            }
          >
            {transactionTotals.balance >= 0
              ? `$${transactionTotals.balance}`
              : `-$${Math.abs(transactionTotals.balance)}`}
          </h2>

          <div className="totals">
            <div className="total-box income-box">
              <h4>Income</h4>
              <p>${transactionTotals.income}</p>
            </div>
            <div className="total-box expense-box">
              <h4>Expenses</h4>
              <p>${transactionTotals.expense}</p>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <form onSubmit={onSubmit} className="expense-form">
          <input
            type="text"
            placeholder="Description"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="number"
            placeholder="Amount"
            required
            value={transactionAmount}
            onChange={(e) => setTransactionAmount(Number(e.target.value))}
          />

          <div className="radio-group">
            <label>
              <input
                type="radio"
                value="expense"
                checked={transactionType === "expense"}
                onChange={(e) => setTransactionType(e.target.value)}
              />
              Expense
            </label>
            <label>
              <input
                type="radio"
                value="income"
                checked={transactionType === "income"}
                onChange={(e) => setTransactionType(e.target.value)}
              />
              Income
            </label>
          </div>

          <button type="submit" className="submit-btn">
            Add Transaction
            <AiOutlinePlusCircle style={{marginLeft: "5px"}}/>
          </button>
        </form>
      </div>

      {/* Transactions List */}
      <div className="transactions-card">
        <h3>Transactions</h3>
        <ul>
          {transactions.map((transaction, index) => {
            const { description, transactionAmount, transactionType } =
              transaction
            return (
              <li key={index} className="transaction-item">
                <div>
                  <h4>{description}</h4>
                </div>
                <p
                  className={
                    transactionType === "expense"
                      ? "amount expense-amount"
                      : "amount income-amount"
                  }
                >
                  {transactionType === "expense" ? "-" : "+"}${transactionAmount}
                </p>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
