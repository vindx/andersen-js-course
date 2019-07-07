import { SERVER_URL } from '../helpers/constants';

const deleteElementFromOfficesDB = async (departmentId, elementId, url) => {
  await fetch(`${SERVER_URL}/${url}/${departmentId}/${elementId}`, {
    method: 'DELETE',
  });
};

export default deleteElementFromOfficesDB;
