import axios from 'axios';
const getUrun=()=>{
  
  const token=sessionStorage.getItem('user');
  
  return  axios.post('http://localhost:8083/takasplatform_rest/ilanlar/',{},{headers:{
      'Authorization': `Bearer ${token}`, 
  
  }});
}
export default getUrun;
