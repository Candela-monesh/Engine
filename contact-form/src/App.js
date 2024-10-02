import './App.css';
import { useState } from 'react';
function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    number:'',
    messages:''
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
      
      // Name validation
      if (!formData.name) {
        errors.name = 'Name is required';
      } else if (formData.name.length < 3) {
        errors.name = 'Name must be at least 3 characters long';
      }
      
      // Email validation
      if (!formData.email) {
        errors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = 'Email address is invalid';
      }
         // Phone number validation
      const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
      if (!formData.number) {
        errors.number = 'Phone number is required';
      } else if (!phoneRegex.test(formData.number)) {
        
        
        errors.number = 'Phone number must be 10 digits long';
      }
      
      return errors;
    };
  
    // Perform validation
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setResponseMessage({
        message: `Please fix the errors in the form.`,
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
    <div class="Contact-us-form-box">

<form class="contact-us-form" onSubmit={handleSubmit}>
     
     <input
          type="text"
          className="inputs" 
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleInputChange}
          // className={errors.name ? 'input-error' : ''}
  required
        />
               {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}


     <input 
     className="inputs" 
     type="text" 
     name="number" 
     placeholder="Your Number"
     value={formData.number}
    onChange={handleInputChange}
    required />
 {errors.number && <p style={{ color: 'red' }}>{errors.number}</p>}

     <input 
     className="inputs"
      type="email" 
      name="email" 
      placeholder="Your Mail" 
      value={formData.email}
      onChange={handleInputChange}
      required
      />
 {errors.mail && <p style={{ color: 'red' }}>{errors.mail}</p>}

     <textarea
      className="inputs" 
      name="messages" 
      placeholder="Write Your Message"
      value={formData.messages}
      onChange={handleInputChange}
      required
      />
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
