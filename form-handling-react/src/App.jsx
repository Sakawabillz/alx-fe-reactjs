import React, { useState } from 'react';
import RegistrationForm from './components/RegistrationForm';
import FormikForm from './components/formikForm';

export default function App() {
  const [which, setWhich] = useState('controlled');
  return (
    <div style={{ padding: 20 }}>
      <div style={{ marginBottom: 12 }}>
        <button onClick={() => setWhich('controlled')}>Controlled</button>{' '}
        <button onClick={() => setWhich('formik')}>Formik</button>
      </div>
      {which === 'controlled' ? <RegistrationForm /> : <FormikForm />}
    </div>
  );
}
