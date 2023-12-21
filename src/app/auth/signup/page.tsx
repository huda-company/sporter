"use client";
import { Button, DatePicker, Form, Input, Select, Space } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";

import { respBody } from "@/config/serverResponse";

type FieldType = {
  email?: string;
  password?: string;
  gender?: string;
};

const { Option } = Select;

export default function Page() {
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
      <div className="h-screen">
        <div className="flex flex-col items-center justify-center h-screen ">
          <div className="border-double border-4 border-blue-900 p-[2rem]">
            <div className="flex flex-col items-center">
              <p className="text-xl">SPORTER APP</p>
              <p className="text-xs ">-- everything about sports --</p>
            </div>
            <div className="mt-[2rem]">
              <Form
                form={loginForm}
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
              >
                <Form.Item<FieldType>
                  label="email"
                  name="email"
                  rules={[
                    { required: true, message: "Please input your email!" },
                  ]}
                >
                  <Input onChange={onEmailPwdChange} />
                </Form.Item>

                <Form.Item<FieldType>
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input.Password onChange={onEmailPwdChange} />
                </Form.Item>

                <Form.Item
                  label="Phone"
                  name="phone"
                  rules={[
                    {
                      required: true,
                      type: "number",
                      message: "invalid phone number",
                    },
                  ]}
                >
                  <Input width="100%" onChange={onEmailPwdChange} />
                </Form.Item>

                <Form.Item
                  label="Gender"
                  name="gender"
                  rules={[{ required: true }]}
                >
                  <Select defaultValue="male" style={{ width: "100%" }}>
                    <Option selected value="male">
                      Male
                    </Option>
                    <Option value="female">Female</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Birthday"
                  name="birthday"
                  rules={[{ required: true }]}
                >
                  <DatePicker style={{ width: "100%" }} />
                </Form.Item>

                {rslt && (
                  <div className="flex flex-row justify-center items-center pb-[1rem] text-red-500">
                    {rslt}
                  </div>
                )}

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Space>
                    <Button type="primary" htmlType="submit" loading={loading}>
                      Register
                    </Button>
                    <Button
                      htmlType="button"
                      onClick={() => loginForm.resetFields()}
                    >
                      Reset
                    </Button>
                  </Space>
                </Form.Item>
              </Form>

              <div className="flex flex-row justify-center items-center text-xs gap-1">
                <p className="flex justify-center">already have account ?</p>
                <Link href="/auth/signin">Sign In</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
