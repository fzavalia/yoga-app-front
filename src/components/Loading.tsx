import React from "react";
import logo from "../assets/img/logo.png";
import './Loading.css'

const Loading = (props: { show: boolean }) => {
  return (
    <section className="loading">
      <img className='loading-logo' src={logo} />
    </section>
  );
};

export default Loading;
