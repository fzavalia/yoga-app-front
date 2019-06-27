import routes, { Route } from "./routes";

const postLoginRoutes: Route[] = [
  routes.browseStudents,
  routes.createStudent,
  routes.updateStudent,
  routes.browsePayments,
  routes.createPayment,
  routes.updatePayment,
  routes.paymentsSummary,
  routes.browseClasses,
  routes.createClass,
  routes.updateClass,
  routes.viewAssistanceTable
];

export default postLoginRoutes;
