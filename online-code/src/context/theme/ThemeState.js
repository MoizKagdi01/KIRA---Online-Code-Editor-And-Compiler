import ThemeContext from './themeContext'
import {useState} from 'react'
const ThemeState = (props) =>{  
    // creating dark and light theme 
const s = {                          
    "text":"dark",
    "color":"light"
}
const [state , setState] = useState(s)
// function to update theme state 
const updateTheme = () => { 
    setInterval(() => {
        setState({
            "text":"light",
            "color":"dark"
        })
    }
    , 1)}
    return (
        <ThemeContext.Provider value={{state , updateTheme}}>
            {props.children}
        </ThemeContext.Provider>
    )
}
export default ThemeState;