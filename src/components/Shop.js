import React, { Fragment } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { depositeMoney,withdrawMoney } from '../State/action-creators/index';
import { actionCreators } from '../State/index';


export default function Shop() {

    const dispatch =useDispatch()
    const action =bindActionCreators(actionCreators,dispatch)
    

    return(
       <div>
        <h2>Deposite/Withdraw Money</h2>
        {/* <button className='btn btn-primary mx-2' onClick={()=>dispatch(withdrawMoney(100))}>-</button>
       Updated Balance
        <button className='btn btn-primary mx-2' onClick={()=>dispatch(depositeMoney(100))}>+</button> */}
         <button className='btn btn-primary mx-2' onClick={()=>{action.withdrawMoney(100)}}>-</button>
       Updated Balance
        <button className='btn btn-primary mx-2' onClick={()=>{action.depositeMoney(100)}}>+</button>
       </div>
       
    )

}
