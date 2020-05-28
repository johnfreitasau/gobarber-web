import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiUser, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import logoImg from '../../assets/logo.svg';
import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Background } from './styles';

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  console.log(formRef);

  const handleSubmit = useCallback(async (data: Record<string, unknown>) => {
    formRef.current?.setErrors({});

    try {
      // formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string()
          .required('Name is required.')
          .email('Digit a valid e-mail.'),
        password: Yup.string().min(6, 'Password must be 6 characters long.'),
      });

      await schema.validate(data, { abortEarly: false });
    } catch (err) {
      const errors = getValidationErrors(err);

      formRef.current?.setErrors(errors);
    }
  }, []);

  return (
    <>
      <Container>
        <Background />
        <Content>
          <img src={logoImg} alt="GoBarber Logo" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Registration</h1>

            <Input name="name" icon={FiUser} placeholder="Name" />
            <Input name="email" icon={FiMail} placeholder="E-mail" />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Password"
            />

            <Button type="submit">Sign Up</Button>
          </Form>

          <a href="test">
            <FiArrowLeft />
            Back to the Login page
          </a>
        </Content>
      </Container>
    </>
  );
};

export default SignUp;
