import { useState } from "react";
import useLogin from "../hooks/useLogin";
import useRegister from "../hooks/useRegister";

const Login = () => {
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [imageUrl, setImageUrl] = useState<string>('')
    const [isLogin,setIsLogin] = useState<boolean>(true)

    const { login, isLoading: loginLoading, error: loginError } = useLogin()
    const { register, isLoading: registerLoading, error: registerError } = useRegister()

    document.title = 'Sign up'

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()


        if(isLogin){
            if(!loginLoading){
                login(username, password)
            }
        }else{
            if(!registerLoading){
                register(username, password, imageUrl)
            }
        }
    }

    return ( 
        <form onSubmit={handleSubmit}>
            <h1>{isLogin ? 'Log in' : 'Register'}</h1>
            <label>Username *</label>
            <input type="text" value={username} onChange={(e)=>setUsername(e.currentTarget.value)}/>

            <label>Password *</label>
            <input type="password" value={password} onChange={(e)=>setPassword(e.currentTarget.value)}/>
        
            {!isLogin && <>
                <label>Image url</label>
                <input type="text" value={imageUrl} onChange={(e)=>setImageUrl(e.currentTarget.value)}/>
            </>}

            <button disabled={registerLoading || loginLoading} type="submit">{isLogin ? 'Login' : 'Register'}</button>

            <p>
                {isLogin ? "Don't" : "Already"} have an account? 
                <button type="button" onClick={() => setIsLogin(prev => !prev)}>
                    &nbsp;{!isLogin ? 'log in' : 'register'} here
                </button>
            </p>
            {isLogin && <>
                {loginLoading && <p>Loading...</p>} 
                {loginError && <p className="error">{loginError}</p>}
            </>}
            {!isLogin && <>
                {registerLoading && <p>Loading...</p>} 
                {registerError && <p className="error">{registerError}</p>}
            </>}
        </form>
     );
}
 
export default Login;