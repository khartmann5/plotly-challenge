d3.json('samples.json').then(data => {
    console.log(data);
});

// Create initial function 
function init() {
    // Prevent the page from refreshing
    // d3.event.preventDefault();
  
    // Select the dropdown menu
    let dropDown = d3.select("#selDataset");

    // read the data
    d3.json('samples.json').then(data => {
        console.log(data);

        // get id into dropdown menu
        data.names.forEach(function(name) {
            dropDown.append("option").text(name).property("Value");
        });

        // getPlot(data.names[0]);
        // getInfo(data.names[0]);
    });
};

// build function that retrieves data and creates plots
function getPlot(id) {
    // read the data
    d3.json('samples.json').then(data => {
        console.log(data);

        let washfreq = data.metadata.map(d => d.washfreq);
        console.log(`Washing frequency: ${washfreq}`);

        let samp = data.samples.filter(s => s.id.toString() === id)[0];
        console.log(samp);

        // get only top 10 sample values for plot
        let sampleValues = samp.sample_values.slice(0,10).reverse();

    });
};


init();