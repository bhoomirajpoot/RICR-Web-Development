import { createContext, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toggleTheme, setTheme } from '../store/slices/themeSlice'

const ThemeContext = createContext(null)

export const ThemeProvider = ({ children }) => {
  const dispatch = useDispatch()
  const { mode } = useSelector(state => state.theme)

  return (
    <ThemeContext.Provider value={{
      mode,
      toggle: () => dispatch(toggleTheme()),
      set: (m) => dispatch(setTheme(m)),
    }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useThemeContext = () => useContext(ThemeContext)
