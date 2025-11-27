import axios from "axios";

const url="http://localhost:5000";
// const url="https://backend-sigma-henna.vercel.app";


export const addUser=async (userData)=>{

   return await axios.post(`${url}/registrationPage`,userData);
};
export const getUsers= async ()=>{
  const token = localStorage.getItem("token");
  console.log("API CALL - Get Users:");
  console.log("Token being sent:", token ? " Present" : " Missing");
  console.log("Endpoint: /AdminDashboard");
  console.log("---");
  return await axios.get(`${url}/AdminDashboard`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
export const editUser=async(id,updatedData)=>{
  const token = localStorage.getItem("token");
  return await axios.put(`${url}/UsersView/${id}`,updatedData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
export const deleteUser = async (id) => {
  const token = localStorage.getItem("token");
  return await axios.delete(`${url}/UsersView/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
export const addSubscription=async(subscriptionData)=>{
  const token = localStorage.getItem("token");
  return await axios.post(`${url}/MaintainSubscription`,subscriptionData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
export const showSubscription=async()=>{
  const token = localStorage.getItem("token");
  console.log(" API CALL - Get Subscriptions:");
  console.log("Token being sent:", token ? " Present" : " Missing");
  console.log("Endpoint: /MaintainSubscription");
  console.log("---");
  return await axios.get(`${url}/MaintainSubscription`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
export const deleteSubscription=async(id)=>{
  const token = localStorage.getItem("token");
  return await axios.delete(`${url}/MaintainSubscription/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
export const displaysubscription= async()=>{
  return await axios.get(`${url}/`);
};
export const postloginCredentials=async(loginData)=>{ 
  return await axios.post(`${url}/login`,loginData);
};
export const postcontact=async(contactData)=>
{
return await axios.post(`${url}/contacts`,contactData);
};
export const fetchUsername = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${url}/Dashboard`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
export const createCheckoutSession = async (planId) => {
  const token = localStorage.getItem("token");

  return await axios.post(
    `${url}/create-checkout-session`,
    { planId },
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );
};

export const getwholeuserData = async () => {
  const token = localStorage.getItem("token");


  const res = await axios.get(`${url}/profile`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};


export const deleteUserbyUser = async () => {
  const token = localStorage.getItem("token");


  await axios.delete(`${url}/profile`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};


export const UpdateUserByUser = async (updatedData) => {
  const token = localStorage.getItem("token");
  

  await axios.put(`${url}/profile`, updatedData, {
    headers: { Authorization: `Bearer ${token}` }
  });
};


export const getImageByKey = async (key) => {
  return await axios.get(`${url}/component-image/${key}`);
};
