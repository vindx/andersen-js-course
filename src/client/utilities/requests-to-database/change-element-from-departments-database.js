import { SERVER_URL } from '../helpers/constants';

const changeElementFromDepartmentsDB = async (elementId, title, url) => {
  await fetch(`${SERVER_URL}/${url}/${elementId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title }),
  });
};

export default changeElementFromDepartmentsDB;
