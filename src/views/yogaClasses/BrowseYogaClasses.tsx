import React, { useState, useEffect } from "react";
import api from "../../modules/api";
import { History } from "history";
import BrowseView from "../../components/BrowseView";
import { YogaClass } from "../../modules/api/requests/YogaClassRequest";
import helpers from "../../helpers";
import { OrderType } from "../../modules/api/core/QueryStringBuilder";
import Button from "../../components/Button";

export default (props: { history: History }) => {
  const [yogaClasses, setYogaClasses] = useState<YogaClass[]>([]);

  useEffect(() => {
    api.yogaClass
      .list({
        include: ["students"],
        order: { by: "date", type: OrderType.DESC }
      })
      .then(setYogaClasses);
  }, []);

  const date = (yogaClass: YogaClass) =>
    helpers.date.normalizeAndFormatForView(yogaClass.date);

  return (
    <>
      <ViewAssistanceTableButton
        onClick={() => props.history.push("/yoga_classes/assistance_graph")}
      />
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
    </>
  );
};

const ViewAssistanceTableButton = (props: { onClick: () => void }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginBottom: "1rem"
      }}
    >
      <Button
        colors={{ main: helpers.color.secondary }}
        size="sm"
        onClick={props.onClick}
      >
        Ver Tabla de Asistencias
      </Button>
    </div>
  );
};
