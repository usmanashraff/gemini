import React, { useEffect, useState } from 'react'

const DarkMode = () => {
 const [theme, settheme] = useState(localStorage.getItem("theme") ? localStorage.getItem("theme"): "light")
 useEffect(()=>{
  localStorage.setItem("theme", theme)
  document.querySelector("html").setAttribute("data-theme", theme)
 },[theme])
 const checked = theme === 'dark'? true: false
  return (
    <input type="checkbox" className="toggle theme-controller" checked={checked} onChange={(e)=>{
      e.target.checked ? settheme("dark"): settheme("light")
    }} />
  )
}

export default DarkMode