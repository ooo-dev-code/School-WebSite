import React from 'react'

function AuthInputs({placeholder, name, variable, setVariable}) {
    
    const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    
  return (
    <div>
        <div className="form-group">
            <label htmlFor={name}>{capitalizeFirstLetter(name)}</label>
            <input
            placeholder={placeholder}
            type="text"
            id={name}
            name={name}
            required
            className="w-full p-2.5 my-2.5 rounded border border-[#444] bg-[#252525] text-white text-[1.2rem] focus:shadow-sm focus:transition-all focus:duration-300"
            value={variable}
            onChange={(e) => setVariable(e.target.value)}
            />
        </div>
      
    </div>
  )
}

export default AuthInputs


