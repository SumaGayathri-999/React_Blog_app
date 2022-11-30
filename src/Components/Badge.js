import React from 'react'

const Badge = ({children}) => {
    const colorstyle={
        Fashion:"pink",
        Travel:"green",
        Fitness:"red",
        Food:"yellow",
        Tech:"blue",
        sports:"orange"
    }
  return (
    
         <div style={{backgroundColor:`${colorstyle[children]}`}}>{children}</div> 
   
  )
}

export default Badge