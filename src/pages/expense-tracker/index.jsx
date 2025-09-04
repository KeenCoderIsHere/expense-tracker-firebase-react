import { useState } from 'react'
import { useAddTransaction } from '../../hooks/useAddTransaction'
import { useGetTransactions } from '../../hooks/useGetTransactions'
import { useGetUserInfo } from '../../hooks/useGetUserInfo'
import { signOut } from 'firebase/auth'
import { auth } from '../../config/firebase-config'
import { useNavigate } from 'react-router-dom'
export const ExpenseTracker = () => {
  let navigate = useNavigate()
  const { addTransaction } = useAddTransaction()
  const { transactions, transactionTotals } = useGetTransactions()
  const [ description,setDescription] = useState("")
  const [ transactionAmount,setTransactionAmount] = useState(0)
  const [ transactionType,setTransactionType] = useState("expense")
  const { name, profilePhoto } = useGetUserInfo()
  const onSubmit = (e) => {
    e.preventDefault()
    addTransaction({
      description,
      transactionAmount,
      transactionType,
    })
    setDescription("")
    setTransactionAmount(0)
    setTransactionType("expense")
  }
  const signUserOut = async () => {
    try{
      await signOut(auth)
      localStorage.clear()
      navigate("/")
    }
    catch(err){console.error(err)}
  }
  return (
    <>
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",padding:"20px",fontFamily:"Arial"}}>
      <div style={{width:"100%",maxWidth:"500px",border:"1px solid #ccc",borderRadius:"10px",padding:"20px",boxShadow:"0 2px 6px rgba(0,0,0,0.1)"}}>
        <h1 style={{textAlign:"center",marginBottom:"20px"}}>{name}'s Expense Tracker</h1>

        <div style={{marginBottom:"20px"}}>
          <h3 style={{margin:"0"}}>Your Balance</h3>
          {
            transactionTotals.balance >= 0 ? (<h2 style={{margin:"5px 0"}}>${ transactionTotals.balance }</h2>) : (<h2 style={{margin:"5px 0"}}>-${ Math.abs(transactionTotals.balance) }</h2>)
          }
          

          <div style={{display:"flex",justifyContent:"space-between",marginTop:"10px"}}>
            <div style={{flex:1,textAlign:"center",padding:"10px",borderRight:"1px solid #ddd"}}>
              <h4 style={{margin:"0"}}>Income</h4>
              <p style={{margin:"5px 0"}}>${ transactionTotals.income }</p>
            </div>
            <div style={{flex:1,textAlign:"center",padding:"10px"}}>
              <h4 style={{margin:"0"}}>Expenses</h4>
              <p style={{margin:"5px 0"}}>${ transactionTotals.expense }</p>
            </div>
          </div>
        </div>

        <form onSubmit={onSubmit} style={{display:"flex",flexDirection:"column",gap:"10px"}}>
          <input 
            type="text" 
            placeholder="Description" 
            required 
            onChange={e => setDescription(e.target.value)}
            style={{padding:"8px",borderRadius:"5px",border:"1px solid #ccc"}}
          />
          <input 
            type="number" 
            placeholder="Amount" 
            required 
            onChange={e => setTransactionAmount(Number(e.target.value))}
            style={{padding:"8px",borderRadius:"5px",border:"1px solid #ccc"}}
          />

          <div style={{display:"flex",gap:"10px",alignItems:"center"}}>
            <input 
              type="radio" 
              id="expense" 
              value="expense" 
              onChange={e => setTransactionType(Number(e.target.value))} 
              checked={transactionType === "expense"}
            />
            <label htmlFor="expense">Expense</label>
            <input 
              type="radio" 
              id="income" 
              value="income" 
              onChange={e => setTransactionType(e.target.value)} 
              checked={transactionType === "income"}
            />
            <label htmlFor="income">Income</label>
          </div>

          <button 
            type="submit"
            style={{padding:"10px",backgroundColor:"#007bff",color:"white",border:"none",borderRadius:"5px",cursor:"pointer"}}
          >
            Add Transaction
            
          </button>
        </form>
      </div>
    </div>{profilePhoto && (
  <div 
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginTop: "20px"
    }}
  >
    <img 
      src={profilePhoto} 
      alt="Profile" 
      style={{
        width: "100px",
        height: "100px",
        borderRadius: "50%",
        objectFit: "cover",
        boxShadow: "0 2px 6px rgba(0,0,0,0.2)"
      }} 
    />
    <button 
  onClick={signUserOut}
  style={{
    backgroundColor: "#e74c3c",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "15px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.2)"
  }}
>
  Sign Out
</button>

  </div>
)}

    <div style={{width:"100%",maxWidth:"500px",margin:"20px auto",padding:"20px",border:"1px solid #ccc",borderRadius:"10px",boxShadow:"0 2px 6px rgba(0,0,0,0.1)"}}>
      <h3 style={{textAlign:"center"}}>Transactions</h3>
      <ul style={{listStyle:"none",padding:"0"}}>
        {transactions.map((transaction, index) => {
          const {description, transactionAmount, transactionType} = transaction
          return (
            <li key={index} style={{padding:"10px",borderBottom:"1px solid #ddd"}}>
              <h4 style={{margin:"0 0 5px 0"}}>{description}</h4>
              <p style={{margin:"0"}}>
                ${transactionAmount}  
                <label style={{marginLeft:"10px",color: transactionType === "expense" ? "red" : "green"}}>
                  {transactionType}
                </label>
              </p>
            </li>
          )
        })}
      </ul>
    </div>
    </>
  )
}
