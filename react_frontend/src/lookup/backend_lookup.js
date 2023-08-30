
export async function fetchBackendLookup(method, url, data) {
    let fetch_data = {
      method: method,
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'include',
      headers: {
        
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer'
    };
    if (data) {
        fetch_data['headers']['Content-Type'] = 'application/json'
        fetch_data['body'] = JSON.stringify(data);
      }
    let response = await fetch(url, fetch_data);
    let responseBody = await response.json();
    return {status:response.status,body:responseBody}
  }
  export async function fetchWikipedia(method,url,data){
    let fetch_data = {
      method: method,
    };
    if (data) {
      fetch_data['headers']['Content-Type'] = 'application/json'
      fetch_data['body'] = JSON.stringify(data);
    }
    let response = await fetch(url, fetch_data);
    let responseBody = await response.json();
    console.log(responseBody)
    return {status:response.status,body:responseBody}


  }