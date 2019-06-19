import React from "react";
import api from "../../modules/api";
import { History } from "history";
import BrowseView from "../../components/BrowseView";
import { YogaClass } from "../../modules/api/requests/YogaClassRequest";
import helpers from "../../helpers";
import { OrderType } from "../../modules/api/core/QueryStringBuilder";

export default (props: { history: History }) => {
  const date = (yogaClass: YogaClass) =>
    helpers.date.normalizeAndFormatForView(yogaClass.date);

  return (
    <BrowseView
      title="Clases"
      mapItem={yogaClass => ({
        title: date(yogaClass),
        props: [{ label: "Asistencias", value: yogaClass.students.length }]
      })}
      loadMore={page =>
        api.yogaClass.paginatedList(page, {
          include: ["students"],
          order: { by: "date", type: OrderType.DESC }
        })
      }
      history={props.history}
      createItemPath={`/yoga_classes/create`}
      updateItemPath={yogaClass => `/yoga_classes/update/${yogaClass.id}`}
      deletePromise={yogaClass => api.yogaClass.delete(yogaClass.id)}
      deleteMessage={yogaClass => "Eliminar Clase" + date(yogaClass)}
    />
  );
};