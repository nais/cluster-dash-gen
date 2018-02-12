const fetch = require('node-fetch')

exports.postUrl = (url, form) => {
    console.log(' - Publishing JSON dashboard to grafana:', url)
    const init = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJrIjoiRTV5M1VLRVNsMVNKcmNFM3VOMFBqM0k0bXJOM2J2TmciLCJuIjoibmFpcy1kYXNoYm9hcmQiLCJpZCI6MX0='
        },
        // credentials: 'include',
        method: 'POST',
        body: JSON.stringify(form)
    }
    return fetch(url, init)
        .then(res => {
            if (res.ok) {
                return res.text()
                    .then(text => {
                        console.log(text)
                    })
            } else {
                return res.text()
                    .then(text => {
                        console.log(text)
                        throw text
                    })
            }
        })
        .catch(error => {
            console.log(error)
            return new Error
        })
}