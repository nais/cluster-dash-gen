const row = require('./rows')

module.exports = (clusterName, masters, workers) => {
    const dashboard = {
        "dashboard": {
            "id": null,
            "title": `NAIS cluster ${clusterName} dashboard`,
            "tags": ["kubernetes", "nais"],
            "timezone": "browser",
            "rows": [
                row.header(clusterName),
                row.nodeAgg(masters, 'master'),
                row.nodeAgg(workers, 'worker'),
                row.clusterMetrics(clusterName, masters, workers)
            ],
            "schemaVersion": 6,
            "version": 0
        },
        "overwrite": true
    }
    return dashboard
}