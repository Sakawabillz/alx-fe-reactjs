import React, { useState } from 'react';
import RegistrationForm from './components/RegistrationForm';
import FormikForm from './components/formikForm';
import './App.css';

function App() {
  const [showFormik, setShowFormik] = useState(false);

  return (
    <div className="App">
      <h1>Form Handling in React</h1>
      <button onClick={() => setShowFormik(!showFormik)}>
        Switch to {showFormik ? 'Controlled Components' : 'Formik'} Form
      </button>
      
      <div style={{margin: '20px 0'}}>
        <h2>{showFormik ? 'Formik Form' : 'Controlled Components Form'}</h2>
        {showFormik ? <FormikForm /> : <RegistrationForm />}
      </div>
    </div>
  );
}

export default App;