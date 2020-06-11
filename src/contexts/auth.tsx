import React,{createContext, useState, useContext} from 'react';
import api from '../services/api';
import { IUser } from '../models/Interfaces';

const END_POINT = '/users/login';


interface AuthContextData{
    userNotFound: boolean
    signed: boolean,
    user: IUser | null,
    loading: boolean,
    signIn: (email: string, password: string)=>void
    signOut(): void
}
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({children})=>{

const [user, setUser] = useState<IUser | null>(null);
const [loading, setLoading] = useState(false)
const [userNotFound, SetuserNotFound] = useState(false)

const signIn = (email:string, password: string)=> {
    
  setLoading(true);
api.post(END_POINT,{
        email: email,
        password: password
      }).then(response =>{

        setUser(response.data)
        setLoading(false);
        
      }).catch(err =>{

        if(err?.status === 404)
        SetuserNotFound(true);
        
        setLoading(false);
      });
    }

    const signOut = () =>{

      setUser(null);
      
    }

    return (
        <AuthContext.Provider value={{signed: !!user, user,signIn,signOut,loading,userNotFound}}>
            {children}
        </AuthContext.Provider>
    );
}

//export default AuthContext;

// trasnformando em hooks

export function useAuth(){
  const context = useContext(AuthContext);

  return context;
}