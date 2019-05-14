import FetchStudentModel from "./FetchStudentModel";
import DefaultFetch from "./DefaultFetch";

const fetch = new DefaultFetch('http://localhost:8000')

export default {
  student: new FetchStudentModel(fetch)
}