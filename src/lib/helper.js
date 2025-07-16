export const duplicateVar = value => (value ? JSON.parse(JSON.stringify(value)) : '');
