const generateDashboard = require('./js/generator')
const program = require('commander')
const templater = require('json-templater/object')
const util = require('./js/util')
console.log('what')

function list(val) {
    return val.split(',')
}

program
    .usage('[options] <args>')
    .option('-c, --cluster <cluster name>', 'Cluster name')
    .option('-m, --masters <comma separated host list>', 'all master nodes in the cluster', list)
    .option('-w, --workers <comma separated host list>', 'all worker nodes in the cluster', list)
    .option('-t, --template <file.json>', 'JSON template for the dashboard')
    .parse(process.argv)

console.log(' - Cluster name: %s', program.cluster)
console.log(' - Master nodes: %j', program.masters)
console.log(' - Worker nodes: %j', program.workers)
console.log(' - Template: %s', program.template)

if (!program.cluster || !program.masters || !program.workers || !program.template) {
    console.log('Argument(s) missing, use --help for more info')
    process.exit(0)
} else {
    const config = templater(
        require(`${program.template}`),
        {
            title: program.cluster,
            masters: program.masters,
            workers: program.workers,
            nodes: program.masters.concat(program.workers)
        }
    )
    const dashboard = generateDashboard(program.cluster, program.masters, program.workers, config)
    util.postUrl('https://grafana.adeo.no/api/dashboards/db/', dashboard)
}