export function uploadAjax(url, data, headers={}){
  let formData = new FormData();
  Object.keys(data).map(key=>{
     formData.append(key,data[key]);
  });
  return request(url, {
    method: 'POST',
    data: formData,
    headers:headers
  });
}