import Document, { Head, Html, Main, NextScript } from 'next/document';
import { ServerStyleSheets } from '@material-ui/core'
import React from 'react';

class MyDocument extends Document {

  static async getInitialProps(ctx) {

    const sheets = new ServerStyleSheets();
    const orignalRenderPage = ctx.renderPage;

    ctx.renderPage = () => orignalRenderPage({ 
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />), 
    })

    const initialProps = await Document.getInitialProps(ctx);
    return {...initialProps, 
      styles: [
      ...React.Children.toArray(initialProps.styles),
      sheets.getStyleElement(),
    ]
    };
  };

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument;