import { SERVER_URL } from '../helpers/constants';

const addElementToOfficesDB = async (title, departmentId, url) => {
  const result = await fetch(`${SERVER_URL}/${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, departmentId }),
  });
  return result.json();
};

export default addElementToOfficesDB;
