import React from "react";
import api from "../../modules/api";
import { History } from "history";
import BrowseView, { FilterType } from "../../components/BrowseView";
import { YogaClass } from "../../modules/api/requests/YogaClassRequest";
import helpers from "../../helpers";
import { OrderType } from "../../modules/api/core/QueryStringBuilder";
import { PaginatedListOptions } from "../../modules/api/impl/ApiModelRequest";

export default (props: { history: History }) => {
  const date = (yogaClass: YogaClass) =>
    helpers.date.normalizeAndFormatForView(yogaClass.date);

  return (
    <BrowseView
      title="Clases"
      history={props.history}
      createItemPath={`/yoga_classes/create`}
      updateItemPath={yogaClass => `/yoga_classes/update/${yogaClass.id}`}
      deletePromise={yogaClass => api.yogaClass.delete(yogaClass.id)}
      deleteMessage={yogaClass => "Eliminar Clase" + date(yogaClass)}
      mapItem={yogaClass => ({
        title: date(yogaClass),
        props: [{ label: "Asistencias", value: yogaClass.students.length }]
      })}
      loadMore={(page, filters) => {
        const options: PaginatedListOptions = {
          include: ["students"],
          order: { by: "date", type: OrderType.DESC }
        };
        // Filter by Month
        if (filters && filters.month) {
          const dateRange = helpers.date.getFormatedMonthRange(filters.month);
          options.whereBetween = {
            date: { min: dateRange.start, max: dateRange.end }
          };
        }
        return api.yogaClass.paginatedList(page, options);
      }}
      filters={[
        { name: "month", label: "Buscar por Més", type: FilterType.MONTH }
      ]}
    />
  );
};
