import { SERVER_URL } from '../helpers/constants';

const changeElementFromDB = async (elementId, elementTitle) => {
  await fetch(`${SERVER_URL}/${elementId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title: elementTitle }),
  });
};

export default changeElementFromDB;
