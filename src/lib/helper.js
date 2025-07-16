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

export const formatTimestampToDate = (isoString) => {
    const date = new Date(isoString);
  
    const pad = (n) => n.toString().padStart(2, '0');
  
    const day = pad(date.getDate());
    const month = pad(date.getMonth() + 1);
    const year = date.getFullYear();
  
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());
  
    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  }
  