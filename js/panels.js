const measurement = require('./measurements')

const generateMeasurements = (nodes, type) => {
    let measurements = []
    if (!nodes) {
        // Do nothing
    } else {
        if (typeof (nodes) === 'string') {
            measurements.push(measurement[type](nodes))
        }
        if (nodes.length === 1 && typeof (nodes) === 'object') {
            measurements.push(measurement[type](nodes[0]))
        }
        if (nodes.length >= 2 && typeof (nodes) === 'object') {
            nodes.forEach((e, i) => {
                measurements.push(measurement[type](nodes[i]))
            })
        }
    }
    return measurements
}

exports.text = (clusterName) => {
    const id = Math.random(1, 1000000)
    panel = {
        "content": `<p>\n<img src=\"https://confluence.adeo.no/download/thumbnails/245392474/nais-hvit.png?version=1&modificationDate=1510648603680&api=v2\" height=\"150\" align=\"right\" /img>\n<font size=\"40\">${clusterName}</font>\n</p>`,
        "height": "100",
        "id": id,
        "links": [],
        "mode": "html",
        "span": 12,
        "title": "",
        "transparent": true,
        "type": "text"
    }
    console.log(` - Inserting text panel with cluster name ${clusterName}`)
    return panel
}

exports.singleStat = (node, measurement) => {
    const id = Math.random(1, 1000000)
    panel = {
        "cacheTimeout": null,
        "colorBackground": true,
        "colorValue": false,
        "colors": [
            "#299c46",
            "#299c46",
            "#d44a3a"
        ],
        "datasource": "influxdb",
        "format": "none",
        "id": id,
        "interval": null,
        "links": [],
        "mappingType": 1,
        "mappingTypes": [
            {
                "name": "value to text",
                "value": 1
            },
            {
                "name": "range to text",
                "value": 2
            }
        ],
        "maxDataPoints": 100,
        "nullPointMode": "connected",
        "nullText": null,
        "postfix": "",
        "postfixFontSize": "50%",
        "prefix": "",
        "prefixFontSize": "50%",
        "rangeMaps": [
            {
                "from": "null",
                "text": "No data",
                "to": "null"
            }
        ],
        "span": 3,
        "sparkline": {
            "fillColor": "rgba(31, 118, 189, 0.18)",
            "full": false,
            "lineColor": "rgb(31, 120, 193)",
            "show": false
        },
        "tableColumn": "",
        "targets": generateMeasurements(node, measurement),
        "thresholds": "0,1",
        "title": node,
        "transparent": true,
        "type": "singlestat",
        "valueFontSize": "120%",
        "valueMaps": [
            {
                "op": "=",
                "text": "Healthy",
                "value": "0"
            },
            {
                "op": "=",
                "text": "Error",
                "value": "1"
            }
        ],
        "valueName": "current"
    }
    console.log(` - Inserting ${measurement} singlestat panel with: ${node}`)
    return panel
}

exports.graph = (nodes, measurement, title) => {
    const id = Math.random(1, 1000000)
    panel = {
        "bars": false,
        "dashLength": 10,
        "dashes": false,
        "datasource": "influxdb",
        "fill": 1,
        "hideTimeOverride": true,
        "id": id,
        "interval": "5m",
        "legend": {
            "alignAsTable": true,
            "avg": true,
            "current": true,
            "hideEmpty": false,
            "hideZero": false,
            "max": true,
            "min": true,
            "rightSide": false,
            "show": true,
            "total": false,
            "values": true
        },
        "lines": true,
        "linewidth": 1,
        "links": [],
        "nullPointMode": "null",
        "percentage": false,
        "pointradius": 5,
        "points": false,
        "renderer": "flot",
        "spaceLength": 10,
        "span": 4,
        "stack": false,
        "steppedLine": false,
        "targets": generateMeasurements(nodes, measurement),
        "thresholds": [],
        "timeFrom": "1d",
        "timeShift": null,
        "title": title,
        "tooltip": {
            "shared": true,
            "sort": 0,
            "value_type": "individual"
        },
        "transparent": true,
        "type": "graph",
        "xaxis": {
            "buckets": null,
            "mode": "time",
            "name": null,
            "show": true,
            "values": []
        },
        "yaxes": [
            {
                "format": "percent",
                "label": null,
                "logBase": 1,
                "max": "100",
                "min": "1",
                "show": true
            },
            {
                "format": "short",
                "label": null,
                "logBase": 1,
                "max": null,
                "min": null,
                "show": true
            }
        ]
    }
    console.log(` - Inserting graph panel: ${title}, with: ${nodes}`)
    return panel
}