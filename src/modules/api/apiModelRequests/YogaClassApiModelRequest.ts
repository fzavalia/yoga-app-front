import ApiModelRequest from "../impl/ApiModelRequest";
import StudentApiModelRequest, { Student } from "./StudentApiModelRequest";

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
      ? model.students.map(StudentApiModelRequest.mapModelFromApi)
      : undefined
  });

  protected mapModelForApi = (model: SubmittableYogaClass) => {
    const res: any = {};
    res.date = model.date;
    res.student_ids = model.studentIds;
    return res;
  };
}
