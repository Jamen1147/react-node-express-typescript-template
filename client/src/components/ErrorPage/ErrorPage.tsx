import React from 'react';

const message = {
  404: 'Page Not Found',
} as const;

type TProps = {
  code?: keyof typeof message;
};

const ErrorPage = ({ code }: TProps) => {
  return (
    <div>
      <h2>{code || 'Error'}</h2>
      <p>{code ? message[code] : 'Unexpected Error Happened'}</p>
    </div>
  );
};

export default ErrorPage;
