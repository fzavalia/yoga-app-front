import React from "react";
import { useSelector } from "react-redux";
import logo from "../assets/img/logo.png";
import "./Loading.css";
import { AppState } from "../modules/redux/reducers";

const Loading = () => {

  const show = useSelector((state: AppState) => state.loading.isLoading);

  if (!show) {
    return null;
  }

  return (
    <section className="loading">
      <img className="loading-logo" src={logo} />
    </section>
  );
};

export default Loading;
