import React, { useState,useEffect } from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

import { LoginForm } from 'dan-components';
import styles from 'dan-components/Forms/user-jss';
import { useSelector, useDispatch } from 'react-redux';
import  getUser from './api/loginApi';
import {
    fetchAction
   } from './reducers/loginActions';

function Login(props) {
  const [valueForm, setValueForm] = useState(null);
  const [error,setError]=useState(false);
  const submitForm = async values => {
    console.log(values._root.entries[0][1]);
    const username=values._root.entries[0][1];
    const password=values._root.entries[1][1];

try {
  
const response= await getUser(username,password);

const authState={
    ...response.data
    
   
    
}
window.sessionStorage.setItem("user", authState.access_token);
console.log(authState.access_token);
window.location.href = '/app/pages/anasayfa';
} catch (apierror) {
 setError(true);
}
      setValueForm(values._root.entries);
      //console.log(values);
     //console.log(`You submitted:\n\n${valueForm}`);
      //window.location.href = '/app';
  
  };
  const fetchData = useDispatch();
const user={
  username:'fatih'
}
   useEffect(() => {
    fetchData(fetchAction(user));
  }, []);


    //const loginB = useSelector(state => state.getIn([reducer, 'login']));

  const title = brand.name + ' - Login';
  const description = brand.desc;
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Helmet>
      <div className={classes.container}>
        <div className={classes.userFormWrap}>
          <LoginForm onSubmit={(values) =>  {submitForm(values)}} />
          {error&&<Alert severity="error">Kullanıcı Adı veya Şifre Hatalı</Alert>}
        </div>
        
      </div>
    </div>
  );
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);
