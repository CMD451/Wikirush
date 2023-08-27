
export async function fetchbackendlookup(method, endpoint, data) {
    const url = `http://127.0.0.1:8000${endpoint}`;
    let fetch_data = {
      method: method,
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    };
    if (data) {
        fetch_data['headers']['Content-Type'] = 'application/json'
        fetch_data['body'] = JSON.stringify(data);
      }
    }
    let response = await fetch(url, fetch_data);
    let responseBody = await response.json();
    return {status:response.status,body:responseBody}
  } 