import axios from 'axios';
const getUser=(username,password)=>{
  var querystring = require('querystring');
  const data={
      'grant_type':'password',
      'username':username,
      'password':password
      
  };
 console.log(data);
  return  axios.post('http://localhost:8083/takasplatform_rest/oauth/token',querystring.stringify(data),{headers:{
      'Authorization':  'Basic dGFrYXNfbW9iaWw6dGFrYXNfbW9iaWxfc2VjcmV0X2tleQ==', 
   'Content-Type': 'application/x-www-form-urlencoded'
  }});
}
export default getUser;
