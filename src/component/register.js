import React,{useState} from 'react'
import './login.css'
import {createUserWithEmailAndPassword,
    onAuthStateChanged,
    } from "firebase/auth";
    import { auth } from "../firebasedocs";
import {useNavigate} from "react-router-dom"

function Register() {

    
    
    const[eye,seteye]=useState(true);
    const[inpass,setinpass]=useState("password");
     const[warning,setwarning]=useState(false);
    const[tick,settick]=useState(false);
    
     const[inputText,setInputText]=useState({ 
         email:"",
        password:""
    });
    
      const[wemail,setwemail]=useState(false);
    const[wpassword,setwpassword]=useState(false);
    let navigate = useNavigate();

 const Eye=()=>{
     if(inpass=="password"){
         setinpass("text");
         seteye(false); 
         setwarning(true);
     }
     else{
         setinpass("password");
         seteye(true);  
         setwarning(false);
     }
 }

const Tick=()=>{
   
    if(tick){
        settick(false);
    }
    else{
        settick(true);
    }
}


    const inputEvent=(event)=>{
        
        const name=event.target.name; 
        const value=event.target.value;
            setInputText((lastValue)=>{ 
                return{
                    ...lastValue,
                    [name]:value
                }
            }); 
        
    } 
     
    const submitForm=async(e)=>{
         
        e.preventDefault();
        
        setwemail(false);
        setwpassword(false);
        if(inputText.email==""){
            setwemail(true);
        }
        else if(inputText.password=="")
        setwpassword(true);
      else{
        try {
            const user= await createUserWithEmailAndPassword(auth,inputText.email,inputText.password);
            console.log(user)
            console.log(user.idToken);
            localStorage.setItem('data', JSON.stringify(user.idToken))
            var res =localStorage.getItem('data')
        navigate('/admin')
            
        // console.log(res)
           
        
          }catch(error){
            console.log(error.message)
           
          }
      }
    } 
    

  return (
   <>
<div className="container">
  <div className="card">
     <div className="form">
        <div className="left-side">
            <img src="https://imgur.com/K230JeW.jpg"/>

                
        </div>
        <div className="right-side">
                <div className="heading">
                    <h3>Hey!! Manager welcome back</h3>
                    <p>Welcome Back! login with your data that you entered during registration.</p>
                </div>
               
                <hr/> 
                <div className="or">
                    <p>Welcome</p> 
                </div> 
                <form onSubmit={submitForm}>
                <div className="input-text">
                    <input type="text" className={`${wemail ? "text-warning" : ""}`} value={inputText.email} onChange={inputEvent} name="email"  />
                    <label>Email</label>
                    <i className="fa fa-envelope"></i>
                </div>
                <div className="input-text">
                    <input type={inpass} className={` ${warning ? "warning" : ""} ${wpassword ? "text-warning" : ""}`} value={inputText.password} onChange={inputEvent} name="password"  />
                    <label>Password</label>
                    <i className="fa fa-lock"></i>
                    <i onClick={Eye} className={`fa ${eye ? "fa-eye-slash" : "fa-eye"}`}></i>
                </div>
           
                <div className="button">
                    <button type="submit">Register</button>
                    
                </div>
                 </form>
                <div className="register">
                    <p>already have an account?<a href="/login"> login</a></p>
                </div>

            

           </div>
        </div>
    </div>
</div>

      
</>  
  )
}

export default Register