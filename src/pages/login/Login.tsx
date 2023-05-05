import React from 'react';
import { useSearchParams } from 'react-router-dom';

function Login() {
  const [searchParams, setSearchParams] = useSearchParams();

  return <div>Login {searchParams}</div>;
}

export default Login;
