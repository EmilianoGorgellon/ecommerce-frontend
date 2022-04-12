import React from 'react'
import { BrowserRouter} from 'react-router-dom';
import PublicRoutes from './components/PublicRoutes/PublicRoutes';
const AppRoutes = () => {
  let admin = false;
  return (
    <BrowserRouter>
      <PublicRoutes path="/"/>
    </BrowserRouter>
  )
}

export default AppRoutes

