// import { useEffect } from 'react';
// import { jwtDecode } from 'jwt-decode';
// import { useNavigate } from 'react-router-dom';

// const Role = () => {
//   const navigate = useNavigate();
//   const user = localStorage.getItem('token');

//   useEffect(() => {
//     if (!user) {
//       console.log('Navigating to login');
//       // navigate('/login');
//     }
//   }, [user, navigate]);

//   if (!user) {
//     // Render something meaningful if user is not logged in
//     return null;
//   }

//   const token = jwtDecode(user);
//   const role = token.user.role;
//   console.log(role);
//   return role;
// };

// export default Role;