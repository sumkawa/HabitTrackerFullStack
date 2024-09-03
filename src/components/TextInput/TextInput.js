import React from 'react';
import './styles.css';

function TextInput({ value, onChange, name, id, placeholder }) {
  return (
    <div className='form__group__edit field'>
      <input
        type='text'
        className='form__field__edit'
        placeholder={placeholder}
        name={name}
        id={id}
        spellCheck={false}
        required
        value={value}
        onChange={onChange}
        autoComplete='off'
      />
      <label htmlFor={id} className='form__label__edit'>
        {placeholder}
      </label>
    </div>
  );
}

export default TextInput;
