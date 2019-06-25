import React from "react";
import api from "../../modules/api";
import { History } from "history";
import BrowseView from "../../components/BrowseView/BrowseView";
import { OrderType } from "../../modules/api/core/QueryStringBuilder";
import { PaginatedListOptions } from "../../modules/api/impl/ApiModelRequest";

export default (props: { history: History }) => (
  <BrowseView
    title="Alumnos"
    mapItem={student => ({
      title: student.name,
      props: [
        { label: "Email", value: student.email },
        { label: "Teléfono", value: student.phoneNumber },
        { label: "DNI", value: student.dni }
      ]
    })}
    loadMore={(page, filters) => {
      const options: PaginatedListOptions = {
        order: { by: "name", type: OrderType.ASC }
      };
      if (filters) {
        options.where = {
          name: filters.name
        };
      }
      return api.student.paginatedList(page, options);
    }}
    history={props.history}
    createItemPath={`/students/create`}
    updateItemPath={student => `/students/update/${student.id}`}
    deletePromise={student => api.student.delete(student.id)}
    deleteMessage={student => "Eliminar Alumno" + student.name}
    filters={[{ name: "name", label: "Buscar por nombre" }]}
  />
);
