import React, { useState } from 'react';
import './styles.css';

function EmailForm({ email, setEmail, handleSubmit }) {
  return (
    <form className='simple-form' onSubmit={handleSubmit}>
      <input
        type='email'
        className='form-input'
        placeholder='smeagle1032@aol.com'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        id='email-input'
      />
      <button type='submit' className='submit-button'>
        Add Friend
      </button>
    </form>
  );
}

export default EmailForm;
