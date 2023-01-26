import React, { useState, useRef, useEffect, useCallback } from "react";
import { NavLink } from 'react-router-dom'
import {useNavigate} from "react-router-dom"
import { signOut,
    onAuthStateChanged } from 'firebase/auth'
    import { auth } from '../firebasedocs'
import './Admin.css'
import styled from "styled-components";
import { useSpring, animated } from "react-spring";
import { MdClose } from "react-icons/md";
import db from '../firebasedocs'

    const Background = styled.div`
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8) !important;
    position: fixed !important;
    display: flex;
    justify-content: center;
    align-items: center;
  `;
  
  const ModalWrapper = styled.div`
    width: 900px;
  
    height: 530px;
    box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
    background: #fff;
    color: #000;
  
    position: relative;
    z-index: 10;
    border-radius: 10px;
  `;
  
  const ModalImg = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 10px 0 0 10px;
    background: #000;
  `;
  
  const ModalContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    line-height: 1.8;
    color: #141414;
    p {
      margin-bottom: 1rem;
    }
    button {
      padding: 10px 24px;
      background: #141414;
      color: #fff;
      border: none;
    }
  `;
  
  const CloseModalButton = styled(MdClose)`
    cursor: pointer;
    position: absolute;
    top: 20px;
    right: 20px;
    width: 32px;
    height: 32px;
    padding: 0;
    z-index: 10;
  `;
  
  const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  `;
  
  const Button = styled.button`
    min-width: 100px;
    padding: 16px 32px;
    border-radius: 4px;
    border: none;
    background: #141414;
    color: #fff;
    font-size: 24px;
    cursor: pointer;
  `;
  

function Admin() {
    let navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const[inputText,setInputText]=useState({ 
        
      P_name:"",
      P_description:"",
      P_startD:"",
      P_end:"",
      P_manager:"",
      P_devloper:"",
      P_status:"",
  });
 
  const [p_name,setP_name]=useState('')
  const [p_description,setP_description]=useState('')
  const [p_startD,setP_startD]=useState('')
  const [p_end,setP_end]=useState('')
  const [p_manager,setP_manager]=useState('')
  const [p_developer,setP_developer]=useState('')
  const [p_status,setP_status]=useState('')
  const AddProject = async(e) => {
    e.preventDefault()
    console.log(p_name);

    await db.collection('projects').doc(p_name).set({
      P_name:p_name,
      P_description:p_description,
      P_start:p_startD,
      P_end:p_end,
      P_manager:p_manager,
      P_developer:p_developer,
      P_status:p_status
    }).then(res=>{
console.log('done');
    // closeModal()
    setShowModal((prev) => !prev)
    }).catch((err)=>{
      console.log(err);
    })
  }  
    const openModal = () => {
      setShowModal((prev) => !prev);
    };
  
    const logout= async (e)=>{
        e.preventDefault()
        await signOut(auth)
        localStorage.removeItem('data')
        navigate('/login');
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
const [data,setdata]=useState([])
      const Find_project=async()=>{
        setdata('');
        db.collection('projects').get().then((querySnapshot) => {
          querySnapshot.forEach(element => {
              var detail = element.data();
              setdata(arr => [...arr, detail]);
  
          })
      });
      }
useEffect(() => {
  Find_project();
}, [showModal])


console.log(data);
  const modalRef = useRef();

  const animation = useSpring({
    config: {
      duration: 250,
    },
    opacity: showModal ? 1 : 0,
    transform: showModal ? `translateY(0%)` : `translateY(-100%)`,
  });

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };

  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && showModal) {
        setShowModal(false);
        console.log("I pressed");
      }
    },
    [setShowModal, showModal]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  return (
    <>
 <NavLink className="logout"  to='/login' onClick={(e) => logout(e)} > Logout</NavLink>  

 {showModal ? (
        <Background onClick={closeModal} ref={modalRef}>
          <animated.div style={animation}>
            <ModalWrapper showModal={showModal}>
              <CloseModalButton
                aria-label="Close modal"
                onClick={() => setShowModal((prev) => !prev)}
              />

              <div style={{}}>
                <div className="Modal_head">
                  
                  <h1 className="Modal_heading">Add Project Panel</h1>
                </div>
              <div className="input_container">
                 <input type="text" placeholder="Project Name" style={{width:"250px"}}  onChange={(e)=>setP_name(e.target.value)} className="Input_text" />
                 <input type="text" placeholder="Project Description" style={{width:"250px"}}  onChange={(e)=>setP_description(e.target.value)} className="Input_text"   />

                 {/* <input type="file" accept=".pdf" placeholder="Project Prototype" style={{width:"250px"}} value={inputText.email} onChange={inputEvent}  className="Input_text" /> */}

                 <input type="date" placeholder="Project Start Date" style={{width:"250px"}}onChange={(e)=>setP_startD(e.target.value)} className="Input_text"  />

                 <input type="date" placeholder="Project Deadline" style={{width:"250px"}}  onChange={(e)=>setP_end(e.target.value)}  className="Input_text" />
                 <input type="text" placeholder="Select Project Manager" style={{width:"250px"}}  onChange={(e)=>setP_manager(e.target.value)} className="Input_text" />

                 <input type="text" placeholder="Select Developer" style={{width:"250px"}}  onChange={(e)=>setP_developer(e.target.value)} className="Input_text"  />
                 <input type="text" placeholder="Project Status" style={{width:"250px"}}  onChange={(e)=>setP_status(e.target.value)} className="Input_text"  />

                 {/* <select id="cars" name="cars" className="Input_text">

  <option value="volvo">Volvo XC90</option>
  <option value="saab">Saab 95</option>
  <option value="mercedes">Mercedes SLK</option>
  <option value="audi">Audi TT</option>
</select> */}
{/* <input type="submit" className="Input_text"  value="Submit"/> */}
                 </div>
                 <button className="Submit_btn" onClick={(e)=>AddProject(e)}>Submit</button>
              </div>
            </ModalWrapper>
          </animated.div>
        </Background>
      ) : null}
<button onClick={openModal} className="Ass_project_btn">Add Project</button>



<div className="table-div">
  <div>
<h2>A basic Manager table</h2>

<table style={{width:'80%'}}>
  <tr>
    <th>Project Name</th>
    <th>Project description</th>
    <th>Project Start</th>
    <th>Project End</th>
    <th>Project manager</th>
    <th>Project Developer</th>
    <th>Project status</th>
    <th>Edit</th>

  </tr>
{
  data?(
    data.map(ele=>(
      <>
<tr>
    <td>{ele.P_name}</td>
    <td>{ele.P_description}</td>
    <td>{ele.P_start}</td>
    <td>{ele.P_end}</td>
    <td>{ele.P_manager}</td>
    <td>{ele.P_developer}</td>
    <td>{ele.P_status}</td>
    <td><button onClick={openModal}>Edit</button></td>
  </tr>
      </>
    ))
  ):('')
}
  
  
</table>
</div>
</div>
   </>
  )
}

export default Admin