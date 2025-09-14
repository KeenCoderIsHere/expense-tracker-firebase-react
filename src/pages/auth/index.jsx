import { auth, provider } from "../../config/firebase-config"
import { signInWithPopup } from 'firebase/auth'
import { useNavigate, Navigate } from 'react-router-dom'
import { useGetUserInfo } from "../../hooks/useGetUserInfo"
import { useEffect } from "react"
export const Auth = () => {
  let navigate = useNavigate()
  let { isAuth } = useGetUserInfo()
  const signInWithGoogle = async () => {
    const results = await signInWithPopup(auth, provider)
    const authInfo = {
      userID: results.user.uid,
      name: results.user.displayName,
      profilePhoto: results.user.photoURL,
      isAuth: true
    }
    localStorage.setItem("auth", JSON.stringify(authInfo))
    navigate("/expense-tracker")
  }
  if(isAuth){
    return <Navigate to="/expense-tracker" /> }
    
  return (
    <div 
      style={{
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center",
        height:"100vh",
        fontFamily:"Arial",
        backgroundColor:"#f5f5f5"
      }}
    >
      <p style={{fontSize:"18px",marginBottom:"20px"}}>Sign In With Google to Continue</p>
      <button 
        onClick={signInWithGoogle}
        style={{
          padding:"10px 20px",
          backgroundColor:"#4285F4",
          color:"white",
          border:"none",
          borderRadius:"5px",
          cursor:"pointer",
          fontSize:"16px",
          fontWeight:"bold",
          boxShadow:"0 2px 6px rgba(0,0,0,0.2)"
        }}
      >
        Sign In With Google
      </button>
    </div>
  )
}
