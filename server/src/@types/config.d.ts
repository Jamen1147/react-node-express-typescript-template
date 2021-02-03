import config from 'config';

interface IExtendedConfig {
  server: {
    port: number;
  };
}

declare module 'config' {
  interface IConfig extends IExtendedConfig {}
}
