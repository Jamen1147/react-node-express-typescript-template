import config from 'config';

interface IExtendedConfig {
  server: {
    port: number;
  };
  db: {
    user: string;
    password: string;
    db: string;
  };
  jwt: {
    secret: string;
    expiresIn: string;
    issuer: string;
    refresh: {
      secret: string;
      expiresIn: string;
    };
  };
  cors?: {
    allow: string | string[];
  };
}

declare module 'config' {
  interface IConfig extends IExtendedConfig {}
}
