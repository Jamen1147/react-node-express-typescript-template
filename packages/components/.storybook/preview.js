import '!style-loader!css-loader!sass-loader!../src/styles/global.scss';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  backgrounds: {
    values: [
      { name: 'light', value: '#f9f9f9' },
      { name: 'dark', value: '#373737' },
    ],
  },
}