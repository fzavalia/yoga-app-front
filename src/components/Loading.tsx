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
      <div className="loading-container">
        <img className="loading-logo" src={logo} alt='...'/>
        <h3 className="loading-text">Cargando...</h3>
      </div>
    </section>
  );
};

export default Loading;
