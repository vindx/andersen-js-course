import { SERVER_URL } from '../helpers/constants';

const deleteElementFromDB = async elementId => {
  await fetch(`${SERVER_URL}/${elementId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export default deleteElementFromDB;
