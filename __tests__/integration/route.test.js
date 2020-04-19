const csv = require('csv-parser');
const path = require('path');
const os = require('os');
const fs = require('fs');
const filename = path.join(__dirname, './routesTeste.csv');

describe('Routes', () => {

    it('should bring the route at the lowest price', () => {

        const results = []

        const data = {
            from: "GRU",
            to: "SCL"
        }

        const expected = {
            route: "GRU,SCL",
            price: "3"
        }

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

                expect(expected).toBe(quote);
            })
    })
    
   /* it('should register the news routes to file csv', () => {

        const results = []
        const row = [];

        const route = [{
            from: "GRU",
            to: "SCL",
            price: 3
        }]

        const expected = ["GRU,SCL,3"];

        fs.createReadStream(filename, 'utf8')

            .on('data', (data) => results.push(data))
            .on('end', () => {

                route.forEach((d) => {
                    row.push(d.from);
                    row.push(d.to);
                    row.push(d.price);

                    results.push(row.join());
                });

                fs.writeFileSync(filename, results.join(os.EOL));

                expect(expected).toStrictEqual(results)
            })
    }); 

    */
})
