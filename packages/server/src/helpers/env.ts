type NodeEnv = 'development' | 'testing' | 'staging' | 'production' | undefined;

type EnvVar = {
  current: NodeEnv;
};

export const env: EnvVar = {
  current: process.env.NODE_ENV as NodeEnv,
};
