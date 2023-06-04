import React, { useState, FormEvent, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { NavBar } from '../navbar/NavBar';
import Alert from 'react-bootstrap/Alert';
import { useNavigate } from 'react-router-dom';


type VerificationToken = {
    token: string;
}

export const Verify = () => {
    const [token, setToken] = useState<VerificationToken>();
    var url = window.location.href;
    var index = url.indexOf("verify/");
    var userToken = url.substring(index + "verify/".length);
    var x: any[] = [];
    const navigate = useNavigate();

    const fetchItems = async () => {
      const response = await fetch('/getVerificationToken');
      const token: VerificationToken = await response.json();
      var t: VerificationToken = {token: "hi"};
      setToken(t);
      if (token) setToken(token);
    };

    useEffect(() => {
      fetchItems();
    }, []);

    const fetchItems2 = async () => {
      const response = await fetch('/verifyUser');
    };

      if (userToken === "redirect") {
        x.push(<Alert variant='success'>User successfully signed up!</Alert>);
        x.push(<Alert variant='warning'>Check your email for verification!</Alert>);
      } else {
        if (userToken === token?.token) {
          x.push(<Alert variant='success'>Your account has been verified sucessfully :)</Alert>);
        } else {
          x.push(<Alert variant='warning'>Invalid Token!</Alert>);
        }
      }

    useEffect(() => {
      const redirectTimer = setTimeout(() => {
        if (userToken === token?.token) {
          fetchItems2();
        }
        navigate('/');
      }, 1500);
  
      return () => {
        clearTimeout(redirectTimer);
      };
    }, []);


  return(
    <>
      <NavBar/>  
      {x}
    </>
  );
}

function VerficationToken(): React.SetStateAction<VerificationToken | undefined> {
    throw new Error('Function not implemented.');
}
