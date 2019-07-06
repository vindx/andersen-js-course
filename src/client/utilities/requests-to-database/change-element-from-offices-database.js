import { SERVER_URL } from '../helpers/constants';

const changeElementFromOfficesDB = async (departmentId, elementId, title, url) => {
  await fetch(`${SERVER_URL}/${url}/${departmentId}/${elementId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title }),
  });
};

export default changeElementFromOfficesDB;
