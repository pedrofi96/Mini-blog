import { auth } from '../firebase/config';
import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  updateProfile,
  
} from "firebase/auth";
import { useState, useEffect } from "react";

export const useAuthentication = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  //para lidar com memory leak
  const [ cancelled, setCancelled] = useState(false)

  function checkIfIsCancelled() {
    if (cancelled) {
      return;
    }
  }
  //-registrar usuario usando firebase
  const createUser = async (data) => {
    
    checkIfIsCancelled();
    setLoading(true);
    setError(null);

    try {
      // 1. Cria o usuário
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      // 2. Atualiza o perfil
      await updateProfile(userCredential.user, {
        displayName: data.displayName
      });

      return userCredential.user;

    } catch (error) {
      let errorMessage = "Erro ao criar usuário";
      
      // Tratamento específico de erros
      switch(error.code) {
        case 'auth/email-already-in-use':
          errorMessage = "E-mail já está em uso";
          break;
        case 'auth/invalid-email':
          errorMessage = "E-mail inválido";
          break;
        case 'auth/weak-password':
          errorMessage = "Senha deve ter pelo menos 6 caracteres";
          break;
        default:
          errorMessage = error.message;
      }
      
      setError(errorMessage);
      throw error; // Opcional: rejeita a promise para tratamento externo
    } finally {
      setLoading(false);
    }
  };

  //logout firebase
  const logout = () =>{
    checkIfIsCancelled();
    signOut(auth);

  }

  //login
  const login = async(data) =>{
    checkIfIsCancelled();
    
    setLoading(true);
    setError(false);

    try{

      await signInWithEmailAndPassword(auth, data.email , data.password)

    }catch(error){

      let systemErrorMessage;

      if(error.message.includes("user-not found")){
        systemErrorMessage="Usuário não encontrado"
      }else if(error.message.includes("wrong-password")){
        systemErrorMessage= "Senha incorreta"
      } else{
        systemErrorMessage="Error no sistema. Porfavor tente mais tarde."
      }

      setError(systemErrorMessage);
      setLoading(false);

    }

  }
  return {
    auth,
    createUser,
    error,
    loading,
    logout,
    login
  };
};