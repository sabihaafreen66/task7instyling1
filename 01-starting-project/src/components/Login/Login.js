import React, { useState, useEffect, useReducer } from 'react';
import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const Login = (props) => {

  const emailReducer=(state,action)=>{
    return {value:'',isValid:false}
  }


  const [enteredEmail, setEnteredEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [enteredCollegeName, setEnteredCollegeName] = useState('');
  const [collegeNameIsValid, setCollegeNameIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const[emailState,dispatchEmail]=useReducer(emailReducer,{value:'',isValid:false});

   useEffect(()=>{
    console.log('EFFECT RUNNING')
    return(()=>{
      console.log('EFFECT CLEANUP')
    })
   },[enteredPassword])

  useEffect(() => {
    console.log('Checking form Validity!');
    const identifier=setTimeout(()=>{ setFormIsValid(
      emailIsValid === true &&
        passwordIsValid === true &&
        collegeNameIsValid === true
    );},500);
    
   return(()=>{
        console.log("CLEANUP");
        clearTimeout(identifier);
   });
  }, [emailIsValid, passwordIsValid, collegeNameIsValid]);

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
    setEmailIsValid(event.target.value.includes('@'));
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
    setPasswordIsValid(event.target.value.trim().length > 6);
  };

  const collegeNameChangeHandler = (event) => {
    setEnteredCollegeName(event.target.value);
    setCollegeNameIsValid(event.target.value.trim().length > 0);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      props.onLogin(enteredEmail, enteredPassword, enteredCollegeName);
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
          />
        </div>
        <div className={`${classes.control}`}>
          <label htmlFor="collegeName">College Name</label>
          <input
            type="text"
            id="collegeName"
            value={enteredCollegeName}
            onChange={collegeNameChangeHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
