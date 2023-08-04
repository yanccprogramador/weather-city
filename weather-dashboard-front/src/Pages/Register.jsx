import { useState } from "react";
import { register } from "../Services/userService";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button } from "antd";

function Register() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    const success = await register({ username, password });
    if (success !== true) {
      setError(success);
    }
    navigate("/login");
    setLoading(false);
  };
  return (
    <div style={{marginLeft:'30rem',marginRight:'30rem',marginTop:'10rem'}}>
      <Form
        style={{
          maxWidth: 600,
        }}
        onFinish={handleSubmit}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Campo obrigatorio",
            },
          ]}
        >
          <Input onChange={(e) => setUsername(e.target.value)} />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Campo obrigatorio",
            },
          ]}
        >
          <Input.Password onChange={(e) => setPassword(e.target.value)} />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit" disabled={loading}>
            Registrar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Register;
