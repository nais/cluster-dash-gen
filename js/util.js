const fetch = require('node-fetch')
const conf = require('../conf')

exports.postUrl = (url, form) => {
    console.log(' - Publishing JSON dashboard to grafana:', url)
    const init = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${conf.bearerToken}` 
        },
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