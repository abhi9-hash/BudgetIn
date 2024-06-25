import React from "react";
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Typography,
  Card,
} from "antd";
import { userSignIn } from "../../components/actions/signInAction.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadingBox from "../../components/loadingBox.js";
import ErrorBox from "../../components/errorBox.js";

const { Title } = Typography;

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = (values) => {
    // dispatch(userSignIn(values, navigate));
    navigate('/welcome')
  };

  const { loading, error } = useSelector((state) => state.signIn);

  return (
    <Row justify="center" align="middle" className="min-h-dvh">
      {loading ? (
        <LoadingBox message="Signing In" />
      ) : (
        <Col>
          {error && <ErrorBox message={error} />}
          <Card className="w-72 p-5">
            <Title level={2} className="text-center">
              Sign In
            </Title>
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{ remember: true }}
              onFinish={onFinish}
            >
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: "Please input your Username!" },
                ]}
              >
                <Input placeholder="Username" className="p-2.5"/>
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your Password!" },
                ]}
              >
                <Input
                  type="password"
                  placeholder="Password"
                  className="p-2.5"
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button w-full"
                  
                >
                  Sign In
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      )}
    </Row>
  );
};

export default SignIn;
