
import React from "react";
import {Button, Form, Input, message} from "antd";
import { Link, useNavigate } from "react-router-dom";
import { LoginUser } from "../../apicalls/users";

function Login() {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const response = await LoginUser(values);
      const { message, data } = response;
      if(response.success) {
        // console.log(response.message);
        localStorage.setItem('token', data);
        navigate("/");
      } else {
        console.error(response.message);
      }
    } catch(err) {
      message.error(err);
    } 
  }
  return (
    <div>
      <header className="App-header">
        <main className="main-area mw-500 text-center px-3">
          <section className="left-section">
            <h1>Login to BMS</h1>
          </section>

          <section className="right-section">
            <Form layout="vertical" onFinish={onFinish}>
              <Form.Item label="Email" htmlFor="email" name="email" className="d-block" rules={[{ required: true, message: "Email is required"}]}>
                <Input id="email" type="text" placeholder="Enter your email"></Input>
              </Form.Item>
              <Form.Item label="Password" htmlFor="password" name="password" className="d-block" rules={[{ required: true, message: "Password is required"}]}>
                <Input id="password" type="text" placeholder="Enter your password"></Input>
              </Form.Item>
              <Form.Item>
                <Button type="primary" block htmlType="submit" style={{fontSize: "1rem", fontWeight: "600" }}>Login</Button>
              </Form.Item>
            </Form>
            <div>
              <p>New User? <Link to="/register">Register Here</Link></p>
            </div>
          </section>
        </main>

      </header>
    </div>
  )
}
export default Login;