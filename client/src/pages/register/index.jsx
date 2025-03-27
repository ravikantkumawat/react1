
import React from "react";
import {Button, Form, Input, message} from "antd";
import { Link, useNavigate } from "react-router-dom";
import { RegisterUser } from "../../apicalls/users";

function Register() {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const response = await RegisterUser(values);
      if(response.success) {
        // message.success(response.message);
        // console.log(response.message);
        navigate("/login");
      } else {
        // message.error(response.message);
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
            <h1>Register to BMS</h1>
          </section>

          <section className="right-section">
            <Form layout="vertical" onFinish={onFinish}>
              <Form.Item label="Name" htmlFor="name" name="name" className="d-block" rules={[{ required: true, message: "Enter your name"}]}>
                <Input id="name" type="text" placeholder="Enter your email"></Input>
              </Form.Item>
              <Form.Item label="Email" htmlFor="email" name="email" className="d-block" rules={[{ required: true, message: "Email is required"}]}>
                <Input id="email" type="text" placeholder="Enter your email"></Input>
              </Form.Item>
              <Form.Item label="Password" htmlFor="password" name="password" className="d-block" rules={[{ required: true, message: "Password is required"}]}>
                <Input id="password" type="text" placeholder="Enter your password"></Input>
              </Form.Item>
              <Form.Item>
                <Button type="primary" block htmlType="submit" style={{fontSize: "1rem", fontWeight: "600" }}>Register</Button>
              </Form.Item>
            </Form>


            <div>
              <p>Already a User? <Link to="/login">Login now</Link></p>
            </div>
          </section>
        </main>

      </header>
    </div>
  )
}
export default Register;