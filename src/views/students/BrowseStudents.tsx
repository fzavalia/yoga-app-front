import React from "react";
import api from "../../modules/api";
import { History } from "history";
import BrowseView from "../../components/BrowseView";
import { OrderType } from "../../modules/api/core/QueryStringBuilder";

export default (props: { history: History }) => {
  return (
    <BrowseView
      mapItem={student => ({
        title: student.name,
        props: [
          { label: "Email", value: student.email },
          { label: "Teléfono", value: student.phoneNumber },
          { label: "DNI", value: student.dni }
        ]
      })}
      loadMore={page =>
        api.student.paginatedList(page, {
          order: { by: "name", type: OrderType.ASC }
        })
      }
      history={props.history}
      createItemPath={`/students/create`}
      updateItemPath={student => `/students/update/${student.id}`}
      deletePromise={student => api.student.delete(student.id)}
      deleteMessage={student => "Eliminar Alumno" + student.name}
    />
  );
};
