import axios, { AxiosResponse } from 'axios';
import queryString from 'query-string';

const api = axios.create({
	baseURL: 'https://opentdb.com/api.php',
	timeout: 5000,
	responseType: 'json',
	paramsSerializer: (params: any) => queryString.stringify(params),
});

api.interceptors.response.use((response: AxiosResponse<any>) => {
	if (response && response.data) {
		return response.data;
	}

	return response;
});

export default api;
