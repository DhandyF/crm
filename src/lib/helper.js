export const duplicateVar = value => (value ? JSON.parse(JSON.stringify(value)) : '');

export const getAxiosErrorMessage = e => (e.response ? e.response.data.message : '');
