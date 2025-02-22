// import { Routes, Route } from "react-router-dom";
// import routes from "../routes";


// export function Auth() {
  
//   return (
//     <div className="relative min-h-screen w-full">
//       <Routes>
//         {routes.map(
//           ({ layout, pages }) =>
//             layout === "auth" &&
//             pages.map(({ path, element }) => (
//               <Route 
//                 key={path} 
//                 exact 
//                 path={path} 
//                 element={element} 
//               />
//             ))
//         )}
//       </Routes>
//     </div>
//   );
// }

// Auth.displayName = "/src/layout/Auth.jsx";

// export default Auth;


// import { Navigate, Route, Routes } from "react-router-dom";
// import { useAppSelector } from "../store";
// import routes from "../routes";

// export function Auth() {
//     const { accessToken, user } = useAppSelector((state) => state.auth);

//     if (accessToken) {
//         return <Navigate to={user?.role_id?.role_name === "user" ? "/dashboard/inbox" : "/dashboard/home"} replace />;
//     }

//     return (
//         <div className="relative min-h-screen w-full">
//             <Routes>
//                 {routes.map(
//                     ({ layout, pages }) =>
//                         layout === "auth" &&
//                         pages.map(({ path, element }) => (
//                             <Route key={path} exact path={path} element={element} />
//                         ))
//                 )}
//             </Routes>
//         </div>
//     );
// }
