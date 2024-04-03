import { ConfigModuleOptions } from '@nestjs/config';

const mongoConfig: ConfigModuleOptions = {
  isGlobal: true,
  load: [
    () => ({
      mongo: {
        uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/bookstore',
      },
    }),
  ],
};

export default mongoConfig;
