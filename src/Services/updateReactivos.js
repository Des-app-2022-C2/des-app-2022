export default async function updateReactivo(id, data) {
  
    try {
      
        const requestJson = JSON.stringify(data);

        const response = await fetch('http://localhost:3000/api/reactivo/update/' + id, {
            method: "PATCH",
            body: requestJson,
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const responseText = await response.text();
        console.log(responseText);
    } catch (ex) {
        console.log(ex);
    }

};
