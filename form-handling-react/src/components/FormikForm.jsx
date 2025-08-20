import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

function FormikForm() {
  return (
    <Formik
      initialValues={{ username: "", email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log("Formik form submitted:", values);
        // mock API call could go here
      }}
    >
      {() => (
        <Form className="space-y-4">
          <div>
            <label>Username</label>
            <Field name="username" type="text" className="border px-2 py-1 w-full" />
            <ErrorMessage name="username" component="p" className="text-red-500" />
          </div>

          <div>
            <label>Email</label>
            <Field name="email" type="email" className="border px-2 py-1 w-full" />
            <ErrorMessage name="email" component="p" className="text-red-500" />
          </div>

          <div>
            <label>Password</label>
            <Field name="password" type="password" className="border px-2 py-1 w-full" />
            <ErrorMessage name="password" component="p" className="text-red-500" />
          </div>

          <button type="submit" className="bg-green-500 text-white px-4 py-2">
            Register
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default FormikForm;
