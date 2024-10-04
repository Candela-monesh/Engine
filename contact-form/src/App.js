import './App.css';
import { useState } from 'react';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    number: '+1',
    messages: ''
  });
  const [errors, setErrors] = useState({});
  const [responseMessage, setResponseMessage] = useState({ message: '', isError: false });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validation function
    const validateForm = () => {
      const errors = {};
      
      // Name validation: Only letters, no numbers allowed
      const nameRegex = /^[A-Za-z\s]+$/;
      if (!formData.name) {
        errors.name = 'Name is required';
      } else if (!nameRegex.test(formData.name)) {
        errors.name = 'Name can only contain letters and spaces';
      }

      // Mobile Number validation
      if (!formData.number) {
        errors.number = 'Mobile Number is required';
      } else if (!/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/.test(formData.number)) {
        errors.number = 'Mobile Number is invalid';
      }

      // Email validation
      if (!formData.email) {
        errors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = 'Email address is invalid';
      }

      // Messages validation
      // if (!formData.messages) {
      //   errors.messages = 'Message is required';
      // } else if (formData.messages.length < 10) {
      //   errors.messages = 'Message must be at least 10 characters long';
      // }

      return errors;
    };
  
    // Perform validation
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setResponseMessage({
        message: 'Please fix the errors in the form.',
        isError: true
      });
      setErrors(errors);  
      return;
    }
  
    // If validation passes, proceed with API call
    try {
      const response = await fetch('http://localhost:9099/customer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        const result = await response.json();
        setResponseMessage({
          message: 'Thank you for your message. It has been sent.',
          isError: false,
        });
        setFormData({ name: '', email: '', number: '', messages: '' });
        setErrors({});
      } else {
        setResponseMessage({
          message: 'Failed to submit data.',
          isError: true,
        });
      }
    } catch (error) {
      console.error('Error:', error);
      setResponseMessage({
        message: 'An error occurred. Please try again.',
        isError: true,
      });
    }
  };

  return (
    <div className="Contact-us-form-box">
      <form className="contact-us-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="inputs" 
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleInputChange}
        />
        {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}

        <input 
          className="inputs" 
          type="number" 
          name="number" 
          placeholder="+1"
          value={formData.number}
          onChange={handleInputChange}
        />
        {errors.number && <p style={{ color: 'red' }}>{errors.number}</p>}

        <input 
          className="inputs"
          type="email" 
          name="email" 
          placeholder="Your Mail" 
          value={formData.email}
          onChange={handleInputChange}
        />
        {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}

        <textarea
          className="inputs" 
          name="messages" 
          placeholder="Write Your Message"
          value={formData.messages}
          onChange={handleInputChange}
        />
        {errors.messages && <p style={{ color: 'red' }}>{errors.messages}</p>}
        
        <button type="submit">SUBMIT</button>
      </form>

      {/* Conditionally show the response message */}
      {responseMessage.message && (
        <p className={`response-message ${responseMessage.isError ? 'error' : 'success'}`}>
          {responseMessage.message}
        </p>
      )}
    </div>
  );
}

export default App;
