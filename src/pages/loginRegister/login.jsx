/**
 * @description login module
 */

import { Form, Icon, Input, Button, Checkbox } from "antd";
import React from "react";
import styles from "./style.less";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
  }

  formSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
        console.log(this.props.history);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.formSubmit} className={styles.loginForm}>
        <Form.Item>
          {getFieldDecorator("username", {
            rules: [{ required: true, message: "Please input your username!" }]
          })(
            <Input
              placeholder="username"
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "Please input your username!" }]
          })(
            <Input
              placeholder="password"
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("remeber", {
            valuePropName: "checked",
            initialValue: true
          })(<Checkbox>remeber</Checkbox>)}
          <Button
            type="primary"
            htmlType="submit"
            className={styles.loginFormButton}
          >
            log in
          </Button>
          Or <a href="#">register now!</a>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create({ name: "loginForm" })(LoginForm);
