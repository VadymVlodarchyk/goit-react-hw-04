import axios from 'axios';

const ACCESS_KEY = 'ii7H9fUagnKu9zA05DPDPYzZgEHo9d-D4em5QQM8YdA';

axios.defaults.baseURL = 'https://api.unsplash.com';

export const fetchImages = async (query, page) => {
  const response = await axios.get('/search/photos', {
    params: {
      query,
      page,
      per_page: 12,
      client_id: ACCESS_KEY,
    },
  });

  return response.data;
};
