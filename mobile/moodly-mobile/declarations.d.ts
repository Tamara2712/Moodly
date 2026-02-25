
declare module 'expo-router';

declare module 'some-untyped-package';

declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg';
declare module '*.gif';

declare module '*.json' {
  const value: any;
  export default value;
}
