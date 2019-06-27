import Layout from "../layouts/Layout";
import Admin from "../layouts/Admin";
import Blank from "../layouts/Blank";
import Auth from "../layouts/Auth";
import BrowseStudents from "../views/students/BrowseStudents";
import CreateStudent from "../views/students/CreateStudent";
import UpdateStudent from "../views/students/UpdateStudent";
import BrowsePayments from "../views/payments/BrowsePayments";
import CreatePayments from "../views/payments/CreatePayment";
import UpdatePayments from "../views/payments/UpdatePayment";
import ViewPaymentsSummary from "../views/payments/ViewPaymentsSummary";
import BrowseYogaClasses from "../views/yogaClasses/BrowseYogaClasses";
import CreateYogaClass from "../views/yogaClasses/CreateYogaClass";
import UpdateYogaClass from "../views/yogaClasses/UpdateYogaClass";
import ViewAssistanceTable from "../views/yogaClasses/ViewAssistanceTable";
import Login from "../views/auth/Login";

export interface Route {
  path: string;
  name: string;
  component: any;
  layout: Layout;
  isModuleEntrypoint: boolean;
}

// Routes should be defined here and implemented in postlogin / prelogin routes

const routes = {
  browseStudents: {
    path: "/students",
    component: BrowseStudents,
    name: "Alumnos",
    isModuleEntrypoint: true,
    layout: Admin
  },
  createStudent: {
    path: "/students/create",
    component: CreateStudent,
    name: "Crear Alumno",
    isModuleEntrypoint: false,
    layout: Admin
  },
  updateStudent: {
    path: "/students/update/:id",
    component: UpdateStudent,
    name: "Actualizar Alumno",
    isModuleEntrypoint: false,
    layout: Admin
  },
  browsePayments: {
    path: "/payments",
    component: BrowsePayments,
    name: "Pagos",
    isModuleEntrypoint: true,
    layout: Admin
  },
  createPayment: {
    path: "/payments/create",
    component: CreatePayments,
    name: "Crear Pago",
    isModuleEntrypoint: false,
    layout: Admin
  },
  updatePayment: {
    path: "/payments/update/:id",
    component: UpdatePayments,
    name: "Editar Pago",
    isModuleEntrypoint: false,
    layout: Admin
  },
  paymentsSummary: {
    path: "/payments/summary",
    component: ViewPaymentsSummary,
    name: "Resumen de Pagos",
    isModuleEntrypoint: true,
    layout: Admin
  },
  browseClasses: {
    path: "/yoga_classes",
    component: BrowseYogaClasses,
    name: "Clases",
    isModuleEntrypoint: true,
    layout: Admin
  },
  createClass: {
    path: "/yoga_classes/create",
    component: CreateYogaClass,
    name: "Crear Clase",
    isModuleEntrypoint: false,
    layout: Admin
  },
  updateClass: {
    path: "/yoga_classes/update/:id",
    component: UpdateYogaClass,
    name: "Actualizar Clase",
    isModuleEntrypoint: false,
    layout: Admin
  },
  viewAssistanceTable: {
    path: "/yoga_classes/assistance_graph",
    component: ViewAssistanceTable,
    name: "Tabla de Asistencias",
    isModuleEntrypoint: true,
    layout: Blank
  },
  login: {
    path: "/auth/login",
    component: Login,
    name: "Login",
    isModuleEntrypoint: false,
    layout: Auth
  }
};

export default routes;
