import React from 'react'

function AuthSelections({ name, variable, setVariable, optionList }) {

    const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

  return (
    <div className="form-group">
      <label htmlFor={name}>{capitalizeFirstLetter(name)}</label>
      <select
        name={name}
        id={name}
        className="w-full p-2.5 my-2.5 rounded border border-[#444] bg-[#252525] text-white text-[1.2rem] focus:shadow-sm focus:transition-all focus:duration-300"
        value={variable}
        onChange={(e) => {setVariable(e.target.value), console.log(variable)}}
        required
      >
        <option value="" disabled>
          Select {capitalizeFirstLetter(name)}
        </option>
        {optionList.map((option) => (
          <option key={option} value={option}>
            {capitalizeFirstLetter(option)}
          </option>
        ))}
      </select>
    </div>
  )
}

export default AuthSelections
