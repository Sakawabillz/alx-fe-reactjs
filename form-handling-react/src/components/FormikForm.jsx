import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function FormikForm() {
  const initialValues = { username: "", email: "", password: "" };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

  const handleSubmit = (values) => {
    console.log("Formik submitted:", values);
    alert("User registered successfully with Formik (mock API)!");
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Formik Registration Form</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="mb-3">
            <label className="block mb-1">Username:</label>
            <Field
              type="text"
              name="username"
              className="w-full border p-2 rounded"
            />
            <ErrorMessage
              name="username"
              component="p"
              className="text-red-500"
            />
          </div>

          <div className="mb-3">
            <label className="block mb-1">Email:</label>
            <Field
              type="email"
              name="email"
              className="w-full border p-2 rounded"
            />
            <ErrorMessage
              name="email"
              component="p"
              className="text-red-500"
            />
          </div>

          <div className="mb-3">
            <label className="block mb-1">Password:</label>
            <Field
              type="password"
              name="password"
              className="w-full border p-2 rounded"
            />
            <ErrorMessage
              name="password"
              component="p"
              className="text-red-500"
            />
          </div>

          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Register
          </button>
        </Form>
      </Formik>
    </div>
  );
}
