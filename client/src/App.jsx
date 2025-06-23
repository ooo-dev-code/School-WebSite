import { useContext, useEffect } from 'react'
import AppRouter from './router/AppRouter.jsx'
import { DarkModeContext } from './context/darkModeContext.jsx'
import { AuthContext } from './context/authContext.jsx'
import Footer from './components/bars/Footer.jsx'
import NavBar from './components/bars/NavBar.jsx'

function App() {

  const {darkMode, toggle } = useContext(DarkModeContext)
  const { currentUser } = useContext(AuthContext)
  console.log('Current User:', currentUser)
  console.log('Dark Mode:', darkMode)

  const setBodyColor = (color, text) => {
    document.body.style.backgroundColor = color
    document.body.style.color = text
  }

  useEffect(() => {
    if (darkMode) {
      setBodyColor('black', 'white')
    } else {
      setBodyColor('white', 'black')
    }

    const timer = setTimeout(() => {
      if (darkMode) {
        setBodyColor('black', 'white')
      } else {
        setBodyColor('white', 'black')
      }
    }, 2000)

    return () => clearTimeout(timer)
  }, [darkMode])

  return (
    <>
      <NavBar />
      <AppRouter />
      <Footer />
    </>
)
}

export default App
