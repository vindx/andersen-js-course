import { SERVER_URL } from '../helpers/constants';

const addElementToDB = async elementTitle => {
  const result = await fetch(SERVER_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title: elementTitle }),
  });
  return result.json();
};

export default addElementToDB;
