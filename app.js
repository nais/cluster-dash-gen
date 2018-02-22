const generateDashboard = require('./js/generator')
const program = require('commander')
const util = require('./js/util')
const templater = require('json-templater/object')

function list(val) {
    return val.split(',');
}

program
    .usage('[options] <args>')
    .option('-c, --cluster <cluster name>', 'Cluster name')
    .option('-m, --masters <comma separated host list>', 'All master nodes in the cluster', list)
    .option('-w, --workers <comma separated host list>', 'All worker nodes in the cluster', list)
    .parse(process.argv)

console.log(' - Cluster name: %s', program.cluster)
console.log(' - Master nodes: %j', program.masters)
console.log(' - Worker nodes: %j', program.workers)

const config = templater(
    require('./cluster-dashboard.json'),
    {
        title: program.cluster,
        masters: program.masters,
        workers: program.workers,
        nodes: program.masters.concat(program.workers)
    }
)

const dashboard = generateDashboard(program.cluster, program.masters, program.workers, config)

util.postUrl('https://grafana.adeo.no/api/dashboards/db/', dashboard)