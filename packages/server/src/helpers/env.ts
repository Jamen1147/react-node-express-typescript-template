type NodeEnv = 'development' | 'testing' | 'production';

type EnvVar = {
  current?: NodeEnv;
  port?: number;
};

const env: EnvVar = {
  current: process.env.NODE_ENV as NodeEnv,
  port: Number(process.env.PORT),
};

export default env;
