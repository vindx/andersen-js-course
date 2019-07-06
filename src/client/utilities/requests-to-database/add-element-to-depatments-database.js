import { SERVER_URL } from '../helpers/constants';

const addElementToDepartmentsDB = async (title, url) => {
  const result = await fetch(`${SERVER_URL}/${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title }),
  });
  return result.json();
};

export default addElementToDepartmentsDB;
