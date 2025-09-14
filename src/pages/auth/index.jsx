import { auth, provider } from "../../config/firebase-config"
import { signInWithPopup } from 'firebase/auth'
import { useNavigate, Navigate } from 'react-router-dom'
import { useGetUserInfo } from "../../hooks/useGetUserInfo"
import { FiArrowUpRight } from 'react-icons/fi'
import './index.css'
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
    className="sign-in-container"
    >
      <p
      className="sign-in-p" >Sign In With Google to Continue</p>
      <button 
        onClick={signInWithGoogle}
        className="sign-in-button"
      >
        Sign In With Google
        <FiArrowUpRight />
      </button>
    </div>
  )
}
