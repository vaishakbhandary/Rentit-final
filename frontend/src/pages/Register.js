import React from "react";
import { Row, Col, Form, Input } from "antd";
import { Link } from "react-router-dom";
import {useDispatch , useSelector} from 'react-redux'
import { userRegister } from "../redux/actions/userActions";
import AOS from 'aos';
import Spinner from '../components/Spinner';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
import { message } from "antd";
AOS.init()
function Register() {
  const dispatch = useDispatch()
  const {loading} = useSelector(state=>state.alertsReducer)
    function onFinish(values) {
          //  dispatch(userRegister(values))
          //  console.log(values)
          if ( values.password.value === values.cpassword.value &&
            values.password.length >= 8 &&
            values.password.length < 23 &&
             values.phone.length === 10 
            // values.phone.length < 13
          ) {
            dispatch(userRegister(values));
            console.log(values);
          } else if (values.password.length > 24) {
            message.error("Password is very lengthy to remember");
          } else if (values.password.length < 8) {
            message.error("Password is weak");
          } 
           else if (values.phone.length > 10 || values.phone.length < 11) {
            message.error("Invalid Phone Number");
          }else if(values.password.value !== values.cpassword.value){
            message.error("password");
          }
    }

  return (
    <div className="login">
      {loading && (<Spinner />)}
      <Row gutter={16} className="d-flex align-items-center">
        <Col lg={16} style={{ position: "relative" }}>
          <img 
           className='w-100'
           data-aos='slide-left'
           data-aos-duration='1500'
          src="https://t4.ftcdn.net/jpg/02/73/60/75/360_F_273607506_aaoo7ZdbMIk07l9vAFPT0vGuz8O5IJgi.jpg" />
          <h1 className="login-logo">RENT-IT</h1>
        </Col>
        <Col lg={8} className="text-left p-5">
          <Form layout="vertical" className="login-form p-5" onFinish={onFinish}>
            <h1>Register</h1>
            <hr />
            <Form.Item
              name="username"
              label="Username"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true }]}
            >
              <Input type="email"/>
            </Form.Item>
            <Form.Item
              name="phone"
              label="Phone"
              rules={[{ required: true }]}
            >
              <Input type="tel"/>
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true }]}
            >
              <Input type="password"/>
            </Form.Item>
            <Form.Item
              name="cpassword"
              label="Confirm Password"
              rules={[{ required: true }]}
            >
              <Input type="password" />
            </Form.Item>

            <button className="btn1 mt-2 mb-3">Register</button>
            <br />

            <Link to="/login">Click Here to Login</Link>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Register;