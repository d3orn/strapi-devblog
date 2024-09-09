import Logo from './extensions/logo.svg'

const newPrimaryColor = '#FF4785';

export default {
  config: {
    locales: [
      'de',
    ],
    // translations: {
    //   de: {
    //     "app.components.LeftMenuLinkContainer.installNewPlugin": "Marktplatz"
    //   }
    // }
    auth: {
      logo: Logo
    },
    menu: {
      logo: Logo
    },
    head: {
      favicon: 'https://strapi.io/favicon.ico',
    },
    tutorials: false,
    theme: {
      light: {
        colors: {
          buttonPrimary600: newPrimaryColor,
          primary600: newPrimaryColor,
        }
      },
      dark: {
        colors: {
          buttonPrimary600: newPrimaryColor,
          primary600: newPrimaryColor,
        }
      },
    }
  },
  bootstrap(app) {
    console.log(app);
  },
};
