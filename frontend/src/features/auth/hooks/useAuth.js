import {useContext} from 'react'
import {AuthContext} from '../auth.context'
import { register , login , logout , getMe } from '../services/auth.api'


export const useAuth = ()=>{
    const context = useContext(AuthContext);
    const {user , setUser , loading , setLoading} = context

    const handleLogin = async ({email , password})=>{
        setLoading(true);
        try{
            const data = await login({email , password});
            setUser(data.user);
        }catch(error){
            console.log(error);
        }finally{

            setLoading(false);
        }
    }

    const handleRegister = async({username , email , password})=>{
        setLoading(true);
        try{
            const data = await register ({username , email , password});
            setUser(data.user);
        }catch(error){
            console.log(error);
        }finally{
            setLoading(false);
        }
    }
    const handleLogout = async ()=>{
        setLoading(true);
        try{
            const data = await logout();
            setUser(null);
        }catch(error){
            console.log(error);
        }finally{
            setLoading(false);
        }
    }

    return {user , loading , handleLogin , handleRegister , handleLogout};  
}