// src/components/formikForm.js
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

export default function FormikForm() {
  return (
    <div style={{ maxWidth: 420 }}>
      <h2>Formik Registration Form</h2>
      <Formik
        initialValues={{ username: "", email: "", password: "" }}
        validationSchema={SignupSchema}
        onSubmit={async (values, { setSubmitting, resetForm, setStatus }) => {
          setSubmitting(true);
          setStatus(null);
          try {
            const res = await fetch("https://jsonplaceholder.typicode.com/users", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(values),
            });
            const data = await res.json();
            setStatus({ success: "Mock registered — id: " + (data.id ?? "n/a") });
            resetForm();
          } catch (err) {
            setStatus({ error: "Network error" });
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, status }) => (
          <Form>
            <div>
              <label>Username</label>
              <Field name="username" />
              <div style={{ color: "red" }}>
                <ErrorMessage name="username" />
              </div>
            </div>

            <div>
              <label>Email</label>
              <Field name="email" />
              <div style={{ color: "red" }}>
                <ErrorMessage name="email" />
              </div>
            </div>

            <div>
              <label>Password</label>
              <Field name="password" type="password" />
              <div style={{ color: "red" }}>
                <ErrorMessage name="password" />
              </div>
            </div>

            <button type="submit" disabled={isSubmitting}>
              Register
            </button>

            {status?.success && <div style={{ color: "green" }}>{status.success}</div>}
            {status?.error && <div style={{ color: "red" }}>{status.error}</div>}
          </Form>
        )}
      </Formik>
    </div>
  );
}
