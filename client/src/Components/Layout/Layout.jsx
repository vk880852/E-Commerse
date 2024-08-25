import React from 'react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import { Helmet } from 'react-helmet';


const Layout = ({ children, title = "Ecommerce App - Shop Now", description = "A MERN stack project", keywords = "MERN, React, Node, MongoDB", author = "Techinfoyt" }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: "70vh" }}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
