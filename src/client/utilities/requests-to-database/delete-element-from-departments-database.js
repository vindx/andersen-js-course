import { SERVER_URL } from '../helpers/constants';

const deleteElementFromDepartmentsDB = async (elementId, url) => {
  await fetch(`${SERVER_URL}/${url}/${elementId}`, {
    method: 'DELETE',
  });
};

export default deleteElementFromDepartmentsDB;
