import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { logoutRequest } from "../../../../store/action/login"
import { LoginWithGoogle } from "@/components/LoginWithGoogle/LoginWithGoogle";

export const Login = () => {
    const { loginResponse: userInfo } = useSelector(state => state.login)
    const dispatch = useDispatch()



    return (
        <div className="auth p-2 hidden sm:block">
            {userInfo?.token ? <div className="flex gap-4 flex-wrap">
                <Link to="/update-profile" className="nav-logo js-anchor-link hover:text-blue-400">Update Profile</Link>
                <Link to="/chats" className="nav-logo js-anchor-link hover:text-blue-400">Chats</Link>
                <div to="/chats" className="nav-logo js-anchor-link hover:text-red-500 cursor-pointer" onClick={() => dispatch(logoutRequest())}>Logout</div>
                {/* {params?.id === userInfo?._id && <input type="color" id="favcolor" name="favcolor" value={profileColor} onChange={(e) => setProfileColor(e.target.value)} onBlur={(e) => console.log(profileColor)} />} */}
            </div>
                : <LoginWithGoogle />}
        </div>
    )
}
