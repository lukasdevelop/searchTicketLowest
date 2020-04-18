const csv = require('csv-parser');
const path = require('path');
const os = require('os');
const fs = require('fs');
const filename = path.join(__dirname, '../routes.csv');

module.exports = {

    async store(req, res) {

        const results = []

        const data = req.params;

        fs.createReadStream(filename)
            .pipe(csv(['from', 'to', 'price']))
            .on('data', (data) => results.push(data))
            .on('end', () => {

                const quotes = results.filter(function (route) {
                    return (route.from === data.from && route.to === data.to)
                })

                const lowestPriceFinder = (acc, current) => {
                    return (+acc.price < +current.price) ? acc : current;
                };

                const lowestQuotes = quotes.reduce(lowestPriceFinder);

                const quote = {
                    route: `${lowestQuotes.from},${lowestQuotes.to}`,
                    price: lowestQuotes.price
                }

                return res.json(quote)
            })

    },

    async create(req, res) {
        const results = []

        const { from, to, price } = req.body;

        const route = [{
            from,
            to,
            price
        }]

        fs.createReadStream(filename, 'utf8')

            .on('data', (data) => results.push(data))
            .on('end', () => {

                route.forEach((d) => {
                    const row = [];
                    row.push(d.from);
                    row.push(d.to);
                    row.push(d.price);

                    results.push(row.join());
                });

                console.log(results)

                fs.writeFileSync(filename, results.join(os.EOL));

            })

        res.json(route)
    }
}