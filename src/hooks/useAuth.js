// // import { createContext, useContext, useState } from 'react';
// // import axiosInstance from '../axiosInstance';
// // import useToast from './useToast';


// // const AuthContext = createContext();

// // export function AuthProvider({ children }) {
// //   const [user, setUser] = useState("Guest");
// //    const { showToast } = useToast();

// //    const login = async (username, password) => {
// //     try {
// //       const response = await axiosInstance.post("/login", {
// //         username: username,
// //         password: password,
// //       });
  
// //       console.log("login response...",response)
// //       if (response) {
// //         // const { access_token, token_type, user } = response.data;
// //         const { access_token, user } = response.data;
// //         console.log(response.data);
  
// //         // Save access token and token type
// //         localStorage.setItem("accessToken", access_token);
// //         // localStorage.setItem("tokenType", token_type);
  
// //         // Save user info
// //         localStorage.setItem("user", JSON.stringify(user));
  
// //         // Update state
// //         setUser(user);
  
// //         return response;
// //       }
// //     } catch (error) {
// //       const errorMsg = error?.response?.data?.detail || 'Something went wrong!';
// //       console.error(errorMsg);
// //       showToast(errorMsg, 'error');
// //       return error;
// //     }
// //   };
  

// //   const logout = () => {
// //     setUser(null);
// //     localStorage.clear();
// //     localStorage.removeItem('user');
// //   };

// //   const isAuthenticated = !!user;

// //   return (
// //     <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // }

// // export default function useAuth() {
// //   return useContext(AuthContext);
// // }


// import { createContext, useContext, useState } from 'react';
// import axiosInstance from '../axiosInstance';
// import useToast from './useToast';

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState("Guest");
//   const { showToast } = useToast();

//   const login = async (username, password) => {
//     try {
//       // Validate inputs
//       if (!username || !password) {
//         const errorMsg = "Username and password are required";
//         showToast(errorMsg, 'error');
//         throw new Error(errorMsg);
//       }

//       // Create form data
//       const formData = new URLSearchParams();
//       formData.append('username', username);
//       formData.append('password', password);

//       // Send request with form data
//       const response = await axiosInstance.post("/login", formData, {
//         headers: {
//           'Content-Type': 'application/x-www-form-urlencoded',
//         },
//       });

//       console.log("login response...", response);
//       if (response) {
//         const { access_token, user } = response.data;
//         console.log(response.data);

//         localStorage.setItem("accessToken", access_token);
//         localStorage.setItem("user", JSON.stringify(user));
//         setUser(user);
//         return response;
//       }
//     } catch (error) {
//       // Format error message
//       let errorMsg = "Something went wrong!";
//       if (error?.response?.data?.detail) {
//         if (Array.isArray(error.response.data.detail)) {
//           errorMsg = error.response.data.detail.map((err) => err.msg).join("; ");
//         } else {
//           errorMsg = error.response.data.detail;
//         }
//       }
//       console.error(errorMsg);
//       showToast(errorMsg, 'error');
//       return error;
//     }
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.clear();
//     localStorage.removeItem('user');
//   };

//   const isAuthenticated = !!user;

//   return (
//     <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export default function useAuth() {
//   return useContext(AuthContext);
// }









import { createContext, useContext, useState } from 'react';
import axiosInstance from '../axiosInstance';
import useToast from './useToast';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : "Guest";
  });
  const { showToast } = useToast();

  const login = async (username, password) => {
    try {
      // Validate inputs
      if (!username || !password) {
        const errorMsg = "Username and password are required";
        showToast(errorMsg, 'error');
        throw new Error(errorMsg);
      }

      // Create form data
      const formData = new URLSearchParams();
      formData.append('username', username);
      formData.append('password', password);

      // Send request with form data
      const response = await axiosInstance.post("/login", formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      console.log("login response...", response);
      if (response) {
        const { access_token, user } = response.data;
        console.log(response.data);

        localStorage.setItem("accessToken", access_token);
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
        return response;
      }
    } catch (error) {
      // Format error message
      let errorMsg = "Something went wrong!";
      if (error?.response?.data?.detail) {
        if (Array.isArray(error.response.data.detail)) {
          errorMsg = error.response.data.detail.map((err) => err.msg).join("; ");
        } else {
          errorMsg = error.response.data.detail;
        }
      }
      console.error(errorMsg);
      showToast(errorMsg, 'error');
      return error;
    }
  };

  const logout = () => {
    setUser("Guest");
    // Clear only authentication-related keys
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
  };

  const isAuthenticated = !!user && user !== "Guest";

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export default function useAuth() {
  return useContext(AuthContext);
}