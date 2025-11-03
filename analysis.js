const fs = require('fs');

function analyzePopulation(csvfile, region) {
    // Read and parse CSV file
    const data = fs.readFileSync(csvfile, 'utf8')
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0)
        .map(line => line.split(','));

    // Find max and min population countries with positive net change
    function getMaxMin() {
        const countries = data.filter(row => 
            row[5] === region && parseInt(row[3]) > 0
        );

        if (countries.length === 0) return [0, 0];

        const maxCountry = countries.reduce((max, curr) => 
            parseInt(curr[1]) > parseInt(max[1]) ? curr : max
        );

        const minCountry = countries.reduce((min, curr) => 
            parseInt(curr[1]) < parseInt(min[1]) ? curr : min
        );

        return [maxCountry[0], minCountry[0]];
    }

    // Calculate average and standard deviation
    function getStdAverage() {
        const populations = data
            .filter(row => row[5] === region)
            .map(row => parseInt(row[1]));

        const avg = populations.reduce((sum, val) => sum + val, 0) / populations.length;
        
        const variance = populations.reduce((sum, val) => 
            sum + Math.pow(val - avg, 2), 0
        ) / (populations.length - 1);

        const stdDev = Math.sqrt(variance);

        return [Number(avg.toFixed(4)), Number(stdDev.toFixed(4))];
    }

    // Calculate population density for each country
    function getDensity() {
        return data
            .filter(row => row[5] === region)
            .map(row => [
                row[0],
                Number((parseInt(row[1]) / parseInt(row[4])).toFixed(4))
            ])
            .sort((a, b) => b[1] - a[1]);
    }

    // Calculate correlation coefficient between population and area
    function getCorrelation() {
        const filtered = data.slice(1).filter(row => row[5] === region);
        
        if (filtered.length === 0) return 0;

        const population = filtered.map(row => parseInt(row[1]));
        const area = filtered.map(row => parseInt(row[4]));

        const n = population.length;
        const sumPop = population.reduce((sum, val) => sum + val, 0);
        const sumArea = area.reduce((sum, val) => sum + val, 0);
        const sumPopSquared = population.reduce((sum, val) => sum + Math.pow(val, 2), 0);
        const sumAreaSquared = area.reduce((sum, val) => sum + Math.pow(val, 2), 0);
        const sumPopArea = population.reduce((sum, val, i) => sum + val * area[i], 0);

        const numerator = n * sumPopArea - sumPop * sumArea;
        const denominator = Math.sqrt(
            (n * sumPopSquared - Math.pow(sumPop, 2)) *
            (n * sumAreaSquared - Math.pow(sumArea, 2))
        );

        if (denominator === 0) return 0;

        return Number((numerator / denominator).toFixed(4));
    }

    return {
        maxMin: getMaxMin(),
        stdAvg: getStdAverage(),
        density: getDensity(),
        correlation: getCorrelation()
    };
}

module.exports = { analyzePopulation };