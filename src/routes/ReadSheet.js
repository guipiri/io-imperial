export default async function ReadSheet(sheet) {
    var credentials = window.btoa("ofbu0ykn:ftvr7ew7vvk6g1hosdgy", "base64");
    var auth = { "Authorization": `Basic ${credentials}` };
    var res

    await fetch(sheet, {
        headers: auth
    }
    )
        .then((res) => res.json())
        .then((data) => res = data)

    return res

}