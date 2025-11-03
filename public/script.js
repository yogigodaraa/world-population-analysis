document.getElementById('analysisForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('csvfile', document.getElementById('csvfile').files[0]);
    formData.append('region', document.getElementById('region').value);

    try {
        const response = await fetch('/analyze', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('Analysis failed');
        }

        const data = await response.json();
        displayResults(data);
    } catch (error) {
        alert('Error: ' + error.message);
    }
});

function displayResults(data) {
    const results = document.getElementById('results');
    results.classList.remove('hidden');

    // Display max/min countries
    document.getElementById('maxCountry').textContent = data.maxMin[0];
    document.getElementById('minCountry').textContent = data.maxMin[1];

    // Display average and standard deviation
    document.getElementById('average').textContent = data.stdAvg[0].toLocaleString();
    document.getElementById('stdDev').textContent = data.stdAvg[1].toLocaleString();

    // Display density list
    const densityList = document.getElementById('density');
    densityList.innerHTML = '';
    data.density.forEach(([country, density]) => {
        const li = document.createElement('li');
        li.textContent = `${country}: ${density.toLocaleString()} people/km²`;
        densityList.appendChild(li);
    });

    // Display correlation
    document.getElementById('correlation').textContent = data.correlation.toLocaleString();
}