import { Button, Form, Input, Space } from "antd";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";

import { respBody } from "@/config/serverResponse";

type FieldType = {
  email?: string;
  password?: string;
};

const SignInForm = () => {
  const router = useRouter();

  const [loginForm] = Form.useForm();

  const [rslt, setRslt] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
      callbackUrl: "/dashboard",
    })
      .then((res: any) => {
        setLoading(false);
        if (!res.ok && res.status == 401)
          setRslt(respBody.ERROR.INC_EMAIL_PASSWORD.message);
        else if (res.ok) router.push("/dashboard");
      })
      .catch((err: any) => {
        // eslint-disable-next-line no-console
        console.log("err", err);
      });
  };

  const onEmailPwdChange = () => {
    setRslt("");
  };
  return (
    <>
      <Form
        form={loginForm}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input onChange={onEmailPwdChange} />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password onChange={onEmailPwdChange} />
        </Form.Item>

        {rslt && (
          <div className="flex flex-row justify-center items-center pb-[1rem] text-red-500">
            {rslt}
          </div>
        )}

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Space>
            <Button type="primary" htmlType="submit" loading={loading}>
              Sign in
            </Button>
            <Button htmlType="button" onClick={() => loginForm.resetFields()}>
              Reset
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
};

export default SignInForm;
