import React, { useState, useEffect } from "react";
import { History } from "history";
import api from "../../modules/api";
import YogaClassForm from "./YogaClassForm";
import { YogaClass } from "../../modules/api/requests/YogaClassRequest";
import { match } from "react-router";
import helpers from "../../helpers";

export default (props: { history: History; match: match<{ id: string }> }) => {
  const [yogaClass, setYogaClass] = useState<YogaClass | undefined>();

  useEffect(() => {
    api.yogaClass
      .show(parseInt(props.match.params.id), { include: ["students"] })
      .then(setYogaClass);
  }, [props.match.params.id]);

  if (!yogaClass) {
    return null;
  }

  return (
    <YogaClassForm
      title="Actualizar Clase"
      history={props.history}
      initialValues={{
        date: helpers.date.normalizeAndFormatForInput(yogaClass.date),
        selectedStudentIds: yogaClass.students
          ? yogaClass.students.map(s => s.id)
          : []
      }}
      submit={values =>
        api.yogaClass.update(yogaClass.id, {
          date: new Date(values.date),
          studentIds: values.selectedStudentIds
        })
      }
    />
  );
};
