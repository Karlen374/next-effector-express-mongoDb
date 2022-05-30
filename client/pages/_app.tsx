import React from 'react';
import { AppProps } from 'next/app';
import '../styles/index.scss';

class MyApp extends React.Component<AppProps> {
  render() {
    const { Component, pageProps } = this.props;
    return (<Component {...pageProps} />);
  }
}

export default MyApp;
