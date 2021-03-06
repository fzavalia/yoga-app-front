import ApiModelRequest from "../impl/ApiModelRequest";
import StudentRequest, { Student } from "./StudentRequest";
import helpers from "../../../helpers";

export interface YogaClass {
  id: number;
  date: Date;
  students?: Student[];
}

export interface SubmittableYogaClass {
  date: Date;
  studentIds: number[];
}

export default class YogaClassApiModelRequest extends ApiModelRequest<
  YogaClass,
  SubmittableYogaClass
> {
  protected mapModelFromApi: (model: any) => YogaClass = model => ({
    id: model.id,
    date: new Date(model.date),
    students: model.students
      ? model.students.map(StudentRequest.mapModelFromApi)
      : undefined
  });

  protected mapSubmittableForApi = (model: SubmittableYogaClass) => {
    const res: any = {};
    res.date = helpers.date.format(model.date, "YYYY-MM-DD");
    res.student_ids = model.studentIds;
    return res;
  };
}
