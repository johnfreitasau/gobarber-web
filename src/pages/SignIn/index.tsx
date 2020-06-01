import React, { useRef, useCallback } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Background } from './styles';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      formRef.current?.setErrors({});

      try {
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('Name is required.')
            .email('Digit a valid e-mail.'),
          // password: Yup.string().min(6, 'Password must be 6 characters long.'),
          password: Yup.string().required('Password required.'),
        });

        await schema.validate(data, { abortEarly: false });

        await signIn({
          email: data.email,
          password: data.password,
        });
      } catch (err) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
      }
      addToast({
        type: 'info',
        title: 'Authentication error',
        description:
          'Error occurred in the Authentication. Please check Credentials.',
      });
    },
    [signIn, addToast],
  );

  return (
    <>
      <Container>
        <Content>
          <img src={logoImg} alt="GoBarber Logo" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Login</h1>
            <Input name="email" icon={FiMail} placeholder="E-mail" />

            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Password"
            />

            <Button type="submit">Sign In</Button>
            <a href="test">Forgot my password</a>
          </Form>

          <a href="test">
            <FiLogIn />
            Create account
          </a>
        </Content>
        <Background />
      </Container>
    </>
  );
};

export default SignIn;
