import React from "react";
import { History } from "history";
import api from "../../modules/api";
import YogaClassForm from "./YogaClassForm";

export default (props: { history: History }) => {
  return (
    <YogaClassForm
      title="Crear Clase"
      history={props.history}
      submit={yogaClass =>
        api.yogaClass.create({
          date: new Date(yogaClass.date),
          studentIds: yogaClass.selectedStudentIds
        })
      }
    />
  );
};
