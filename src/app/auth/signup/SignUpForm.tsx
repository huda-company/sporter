import { Button, DatePicker, Form, Input, Modal, Select, Space } from "antd";
import { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { respBody } from "@/config/serverResponse";

import { signupAPI } from "@/app/services/auth";

import { SignUpReq } from "^/@types/models/auth";
import { SuccessBodyType } from "^/@types/models/server";
const { Option } = Select;

type FieldType = {
  email?: string;
  password?: string;
  gender?: string;
};

const SignUpForm = () => {
  const router = useRouter();
  const [loginForm] = Form.useForm();

  const [rslt, setRslt] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    const params: SignUpReq = {
      name: values.name,
      email: values.email,
      password: values.password,
      phone: values.phone,
      birthDate: values.birthday.format("YYYY-MM-DD"),
      gender: values.gender,
    };

    const doSignUp: AxiosResponse<SuccessBodyType> = await signupAPI(params);

    if (doSignUp.data.success) {
      successModal();
    }
  };

  const onEmailPwdChange = () => {
    setRslt("");
  };

  const validatePhoneNumber = (_: any, value: string) => {
    // Simple phone number validation example
    // You may want to use a more sophisticated validation library or regex
    if (!value || !/^\d{9,}$/.test(value)) {
      return Promise.reject(
        "Please enter a valid phone number. avoid zero on first number"
      );
    }
    return Promise.resolve();
  };

  const successModal = () => {
    Modal.success({
      title: "Success",
      content: (
        <div>
          <p>{respBody.SUCCESS.NEW_USER_CREATE.message}</p>
          <p>
            Sign in first. Then, Please Check your email for verification
            process. Enjoy our Sports!!!
          </p>
        </div>
      ),
      onOk() {
        setLoading(true);
        router.push("/auth/signin");
      },
    });
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
        autoComplete="off"
      >
        <Form.Item
          label="name"
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input />
        </Form.Item>
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

        <Form.Item
          label="Phone"
          name="phone"
          rules={[
            {
              required: true,
              message: "invalid phone number",
            },
            { validator: validatePhoneNumber },
          ]}
        >
          <Input width="100%" onChange={onEmailPwdChange} />
        </Form.Item>

        <Form.Item
          label="Gender"
          name="gender"
          rules={[{ required: true }]}
          initialValue="male"
        >
          <Select style={{ width: "100%" }}>
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
            <Button htmlType="button" onClick={() => loginForm.resetFields()}>
              Reset
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
};

export default SignUpForm;
