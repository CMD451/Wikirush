import { fetchBackendLookup,fetchWikipedia } from "./backend_lookup";

export async function wikipageRequest(page,language){
    const url = `https://${language}.wikipedia.org/w/api.php?action=parse&format=json&page=${page}&origin=*&prop=text|headhtml`;
    return await fetchWikipedia("GET",url,null)
}
export async function wikipageRequestId(pageid,language){
    const url = `https://${language}.wikipedia.org/w/api.php?action=parse&format=json&pageid=${pageid}&origin=*&prop=text|headhtml`;
    return await fetchWikipedia("GET",url,null)
}
export async function searchForArticle(articleName,language){
    const url = `https://${language}.wikipedia.org/w/api.php?action=query&origin=*&list=search&srsearch=${articleName}&utf8=&format=json`
    console.log(url)
    return await fetchWikipedia("GET",url,null)
}
// export async function getWikipediaLanguages(){

// }