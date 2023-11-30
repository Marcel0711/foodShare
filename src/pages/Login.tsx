import { useState } from "react";
import useLogin from "../hooks/useLogin";
import useRegister from "../hooks/useRegister";

const Login = () => {
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [image, setImage] = useState<File>()
    const [isLogin,setIsLogin] = useState<boolean>(true)

    const { login, isLoading: loginLoading, error: loginError } = useLogin()
    const { register, isLoading: registerLoading, error: registerError } = useRegister()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if(isLogin){
            if(!loginLoading){
                login(username, password)
            }
        }else{
            if(!registerLoading){              
                register(username, password, image)
            }
        }
    }

    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.currentTarget.files
        if(file){
            setImage(file[0])
        }
    }

    document.title = 'Sign up'
    return ( 
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <h1>{isLogin ? 'Log in' : 'Register'}</h1>
            <label>Username *</label>
            <input type="text" value={username} onChange={(e)=>setUsername(e.currentTarget.value)}/>

            <label>Password *</label>
            <input type="password" value={password} onChange={(e)=>setPassword(e.currentTarget.value)}/>
        
            {!isLogin && <>
                <label>Image url</label>
                <div className="img-box">
                    <input type="file" id="image-register" onChange={(e)=>handleImage(e)}/>
                    <label htmlFor="image-register">File</label>
                    <span> {image && image.name}</span>
                </div>
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