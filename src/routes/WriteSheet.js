export default async function WriteSheet(sheet) {
    var credentials = window.btoa("ofbu0ykn:ftvr7ew7vvk6g1hosdgy", "base64");
    var auth = {
        "Authorization": `Basic ${credentials}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': null,
        'Cross-Origin-Resource-Policy': 'cross-origin'
    };

    const response = await fetch(sheet, {
        method: 'POST',
        headers: auth,
        mode: 'no-cors',
        body: { "fisrtName": "Guilherme" },
    }
    ).catch((res) => console.log(res))

    return response

}