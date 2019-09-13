import routes, { Route } from "./routes";

const postLoginRoutes: Route[] = [
  routes.dashboard,
  routes.browseStudents,
  routes.createStudent,
  routes.updateStudent,
  routes.browsePayments,
  routes.createPayment,
  routes.updatePayment,
  routes.browseClasses,
  routes.createClass,
  routes.updateClass,
  routes.paymentsSummary,
  routes.viewAssistanceTable
];

export default postLoginRoutes;
