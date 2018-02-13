const generateDashboard = require('./js/generator')
const program = require('commander')
const util = require('./js/util')

const args = process.argv.slice(2)

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

const dashboard = generateDashboard(program.cluster, program.masters, program.workers)

util.postUrl('https://grafana.adeo.no/api/dashboards/db/', dashboard)
