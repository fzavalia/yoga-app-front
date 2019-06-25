import React from "react";
import api from "../../modules/api";
import { History } from "history";
import BrowseView, {
  FilterType,
  useStudentOptions
} from "../../components/BrowseView";
import { YogaClass } from "../../modules/api/requests/YogaClassRequest";
import helpers from "../../helpers";
import { OrderType } from "../../modules/api/core/QueryStringBuilder";
import { PaginatedListOptions } from "../../modules/api/impl/ApiModelRequest";

export default (props: { history: History }) => {
  const studentOptions = useStudentOptions();

  const getFormatedDateFromYogaClass = (yogaClass: YogaClass) =>
    helpers.date.normalizeAndFormatForView(yogaClass.date);

  return (
    <BrowseView
      title="Clases"
      history={props.history}
      createItemPath={`/yoga_classes/create`}
      updateItemPath={yogaClass => `/yoga_classes/update/${yogaClass.id}`}
      deletePromise={yogaClass => api.yogaClass.delete(yogaClass.id)}
      deleteMessage={yogaClass =>
        "Eliminar Clase" + getFormatedDateFromYogaClass(yogaClass)
      }
      mapItem={yogaClass => ({
        title: getFormatedDateFromYogaClass(yogaClass),
        props: [{ label: "Asistencias", value: yogaClass.students.length }]
      })}
      loadMore={(page, filters) => {
        const options: PaginatedListOptions = {
          include: ["students"],
          order: { by: "date", type: OrderType.DESC }
        };
        if (filters) {
          // Filter by Month
          if (filters.month) {
            const dateRange = helpers.date.getFormatedMonthRange(filters.month);
            options.whereBetween = {
              date: { min: dateRange.start, max: dateRange.end }
            };
          }
          // Filter by Student
          if (filters.student !== undefined) {
            options.whereRelationEquals = {
              id: { relation: "students", value: filters.student }
            };
          }
        }
        return api.yogaClass.paginatedList(page, options);
      }}
      filters={[
        {
          name: "student",
          label: "Filtrar por Alumno",
          type: FilterType.SELECT,
          options: studentOptions
        },
        { name: "month", label: "Buscar por Més", type: FilterType.MONTH }
      ]}
    />
  );
};
