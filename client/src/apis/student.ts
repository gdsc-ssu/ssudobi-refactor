import { Patron } from 'Template';
import { get } from './AxiosCreate';
import { StudentIdResponse } from 'Mate';

class StudentApi {
  getStudentId = async (info: Patron): Promise<StudentIdResponse> => {
    const id = await get<StudentIdResponse>(
      `/patrons/${info.name}/${info.sId}`,
    );
    return id;
  };
}

export default StudentApi;
