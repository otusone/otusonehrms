import React, { Fragment } from 'react'
import Overview from './components/main/Overview/Overview'

const App = () => {
  return (
    <Fragment>
      <Overview />
    </Fragment>
  )
}

export default App



// App.jsx
// import React, { Fragment } from 'react';
// import { Routes, Route } from 'react-router-dom';
// import Overview from './components/main/Overview/Overview';
// import LoginPage from './components/login/Login'; 

// const App = () => {
//   return (
//     <Fragment>
//       <Routes>
//         <Route path="/login" element={<LoginPage />} />

//         <Route path="/" element={<Overview />} />
//       </Routes>
//     </Fragment>
//   );
// };

// export default App;
