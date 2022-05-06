import React, { useState } from "react";
import {
  Button,
  Card,
  Col,
  Row,
  Container,
  Form,
  Spinner,
} from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string().email().required("Please enter your email"),
    password: Yup.string()
      .required("Please enter your password (6 characters minimum)")
      .min(6),
  });
  const onSubmit = (values) => {
    setLoading(true);
    console.log(values.email);
    const email = "hilal@mail.com";
    const password = "123456";

    if (email === values.email && password === values.password) {
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);

      navigate("/search");
    } else {
      setLoading(false);
      navigate("/");
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <div>
      <div className="text-center mt-5 ">
        <h1 className="title">Instant Weather Forecast</h1>
        <br></br>
        <hr></hr>
      </div>

      <Container style={{ marginTop: "3rem" }}>
        <Row style={{ justifyContent: "center" }}>
          <Col md={6}>
            <Card className="loginCard">
              <Card.Body>
                <Form noValidate onSubmit={formik.handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter an email address"
                      autoFocus="autofocus"
                      {...formik.getFieldProps("email")}
                      isInvalid={!!formik.errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter your password"
                      {...formik.getFieldProps("password")}
                      isInvalid={!!formik.errors.password}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Button
                    className="btn-login"
                    variant="primary"
                    type="submit"
                    disabled={loading}
                  >
                    {loading && <Spinner animation="border" size="sm" />} Login
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginForm;
