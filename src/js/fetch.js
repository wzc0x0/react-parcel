export default async(url = '', data = {}, type = 'GET') => {
    type = type.toUpperCase();
    url = `https://api.douban.com${url}`;

    let requestConfig = {
        method: type,
        // headers: {
        //     'Accept': 'application/json',
        //     'Content-Type': 'application/json'
        // },
        // mode: "no-cors",
        cache: "force-cache"
    }

    if (type === 'GET') {
        Object.keys(data).length > 0 && (url += `?${urlParams(data)}`)
    }


    if (type == 'POST') {
        Object.defineProperty(requestConfig, 'body', {
            value: JSON.stringify(data)
        })
    }

    try {
        const response = await fetch(url, requestConfig);
        // const responseJson = await response.json();
        return response
    } catch (error) {
        throw new Error(error)
    }
}

function urlParams(params) {
    return Object.keys(params).reduce((init, cur) => {
        init.push(`${window.decodeURIComponent(cur)}=${window.decodeURIComponent(params[cur])}`)
        return init
    }, []).join("&")
}
