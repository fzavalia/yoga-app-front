import React from "react";
import Layout from "../layouts/Layout";
import Admin from "../layouts/Admin";
import BrowseStudents from "../views/students/BrowseStudents";
import CreateStudent from "../views/students/CreateStudent";
import UpdateStudent from "../views/students/UpdateStudent";
import BrowsePayments from "../views/payments/BrowsePayments";
import CreatePayments from "../views/payments/CreatePayments";
import UpdatePayments from "../views/payments/UpdatePayments";
import BrowseYogaClasses from "../views/yogaClasses/BrowseYogaClasses";
import CreateYogaClass from "../views/yogaClasses/CreateYogaClass";
import UpdateYogaClass from "../views/yogaClasses/UpdateYogaClass";

export interface Route {
  path: string;
  name: string;
  component: any;
  layout: Layout;
  isModuleEntrypoint: boolean;
}

const routes: Route[] = [
  {
    path: "/students",
    component: BrowseStudents,
    name: "Alumnos",
    isModuleEntrypoint: true,
    layout: Admin
  },
  {
    path: "/students/update/:id",
    component: UpdateStudent,
    name: "Alumnos",
    isModuleEntrypoint: false,
    layout: Admin
  },
  {
    path: "/students/create",
    component: CreateStudent,
    name: "Alumnos",
    isModuleEntrypoint: false,
    layout: Admin
  },
  {
    path: "/payments",
    component: BrowsePayments,
    name: "Pagos",
    isModuleEntrypoint: true,
    layout: Admin
  },
  {
    path: "/payments/create",
    component: CreatePayments,
    name: "Alumnos",
    isModuleEntrypoint: false,
    layout: Admin
  },
  {
    path: "/payments/update/:id",
    component: UpdatePayments,
    name: "Alumnos",
    isModuleEntrypoint: false,
    layout: Admin
  },
  {
    path: "/yoga_classes",
    component: BrowseYogaClasses,
    name: "Clases",
    isModuleEntrypoint: true,
    layout: Admin
  },
  {
    path: "/yoga_classes/create",
    component: CreateYogaClass,
    name: "Clases",
    isModuleEntrypoint: false,
    layout: Admin
  },
  {
    path: "/yoga_classes",
    component: UpdateYogaClass,
    name: "Clases",
    isModuleEntrypoint: false,
    layout: Admin
  }
];

export default routes;
