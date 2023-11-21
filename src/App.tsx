import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import Navbar from './layouts/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import ProtectedRoute from './components/ProtectedRoute'
import RecipePage from './pages/RecipePage'
import CreateRecipe from './pages/CreateRecipe'
import { Navigate } from 'react-router-dom'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Navbar/>}>
      <Route index element={<Home/>}/>
      <Route path='/signup' element={<ProtectedRoute path='/'><Login/></ProtectedRoute>}/>
      <Route path='/profile/:username' element={<Profile/>}/>
      <Route path='/recipe/id/:id' element={<RecipePage/>}/>
      <Route path='/create' element={<ProtectedRoute path='/signup' allow={true}><CreateRecipe/></ProtectedRoute>}/>
      <Route path='*' element={<Navigate to={'/'}/>}/>
    </Route>
  )
)

function App() {

  return <RouterProvider router={router}/>
}

export default App
