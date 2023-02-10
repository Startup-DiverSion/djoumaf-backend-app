export const MODE_APP: any = 'dev';
const MODE_APP_DEFINED = (Developpement:any, Production:any) => {
   return MODE_APP === 'dev' ? Developpement : Production
}

export const env = {
   SECRET_TOKEN:
      'L1&|YAO_EMMANUEL_001_DJOUMAF_10102022)-z)_DIOMANDE_EMMANUEL_002__TOKEN',
   SECRET_SIGN_MAIL:
      '2&|YAO_EMMANUEL_101_DJOUMAF_10102022)-z)_DIOMANDE_EMMANUEL_001__SIGN_MAIL',

   NUMBER_USERNAME_RANDOM: 10000000,

   HOST_CLIENT: MODE_APP_DEFINED('http://localhost:5173', 'https://djoumaf.com'),
   PORT: 8080,

   // Database
   HOST: MODE_APP_DEFINED('localhost', 'localhost'),
   USERNAME: MODE_APP_DEFINED('root', 'c2047332c_user_d'),
   PASSWORD: MODE_APP_DEFINED('', 'djoumaf-nray-20'),
   DATABASE: MODE_APP_DEFINED('c2047332c_djoumaf', 'c2047332c_djoumaf'),
   CHARSET: MODE_APP_DEFINED('utf8mb4_bin', 'utf8mb4_bin'),
   PORT_DB: MODE_APP_DEFINED('3306', '3306'),

   // Mail
   MAIL_PORT: MODE_APP_DEFINED('localhost', 'localhost'),
   MAIL_HOST: MODE_APP_DEFINED('localhost', 'localhost'),
   MAIL_USERNAME: MODE_APP_DEFINED('localhost', 'localhost'),
   MAIL_PASSWORD: MODE_APP_DEFINED('localhost', 'localhost')
};
