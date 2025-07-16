export const duplicateVar = value => (value ? JSON.parse(JSON.stringify(value)) : '');

export const getAxiosErrorMessage = e => (e.response ? e.response.data.message : '');

export const convertSecondToTime = (seconds) => {
    seconds = Math.floor(seconds);
    
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    const padded = (n) => String(n).padStart(2, '0');
    
    return `${padded(hrs)}:${padded(mins)}:${padded(secs)}`;      
}
