let url = 'http://localhost:8000';
url = 'https://cc-api.menulet.io';
// url = 'http://192.168.200.130:8000';
if(process.env.NODE_ENV === 'production') {
    url = 'https://cc-api.menulet.io';
}

export const BASE_URL = url;
