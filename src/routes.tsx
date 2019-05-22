import React from "react";
import BrowseStudents from "./views/students/BrowseStudents";
import CreateStudent from "./views/students/CreateStudent";
import UpdateStudent from "./views/students/UpdateStudent";
import BrowsePayments from "./views/payments/BrowsePayments";
import CreatePayments from "./views/payments/CreatePayments";
import UpdatePayments from "./views/payments/UpdatePayments";

interface Route {
  path: string;
  component: any;
  name: string;
  showInHeader: boolean;
}

const routes: Route[] = [
  {
    path: "/students",
    component: BrowseStudents,
    name: "Alumnos",
    showInHeader: true
  },
  {
    path: "/students/create",
    component: CreateStudent,
    name: "Alumnos",
    showInHeader: false
  },
  {
    path: "/students/update/:id",
    component: UpdateStudent,
    name: "Alumnos",
    showInHeader: false
  },
  {
    path: "/payments",
    component: BrowsePayments,
    name: "Pagos",
    showInHeader: true
  },
  {
    path: "/payments/create",
    component: CreatePayments,
    name: "Alumnos",
    showInHeader: false
  },
  {
    path: "/payments/update/:id",
    component: UpdatePayments,
    name: "Alumnos",
    showInHeader: false
  },
  {
    path: "/classes",
    component: (props: any) => <div>Classes</div>,
    name: "Clases",
    showInHeader: true
  }
];

export default routes;
