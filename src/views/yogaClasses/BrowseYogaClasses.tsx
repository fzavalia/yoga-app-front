import React, { useState, useEffect } from "react";
import api from "../../modules/api";
import { History } from "history";
import BrowseView from "../../components/BrowseView";
import { YogaClass } from "../../modules/api/apiModelRequests/YogaClassApiModelRequest";
import helpers from "../../helpers";

export default (props: { history: History }) => {
  const [yogaClasses, setYogaClasses] = useState<YogaClass[]>([]);

  useEffect(() => {
    api.yogaClass.list({ include: ["students"] }).then(setYogaClasses);
  }, []);

  const date = (yogaClass: YogaClass) =>
    helpers.date.normalizeAndFormatForView(yogaClass.date);

  return (
    <BrowseView
      items={yogaClasses}
      mapItem={yogaClass => ({
        title: date(yogaClass),
        props: [{ label: "Asistencias", value: yogaClass.students.length }]
      })}
      onUpdateClick={yogaClass =>
        props.history.push(`/yoga_classes/update/${yogaClass.id}`)
      }
      onDeleteClick={yogaClass => {
        if (window.confirm("Eliminar Clase " + date(yogaClass))) {
          api.yogaClass
            .delete(yogaClass.id)
            .then(() =>
              setYogaClasses(yogaClasses.filter(x => x.id !== yogaClass.id))
            );
        }
      }}
      onCreateClick={() => props.history.push(`/yoga_classes/create`)}
    />
  );
};
