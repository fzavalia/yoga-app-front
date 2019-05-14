import FetchModel from "./FetchModel";
import { FetchMethod } from "./Fetch";

export default class FetchStudentModel extends FetchModel {
  
  list = (options: any) => {
    return this.fetch.fetch('/students', FetchMethod.GET)
  }
}