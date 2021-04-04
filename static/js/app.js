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

        getPlot(data.names[0]);
        // getInfo(data.names[0]);
    });
};

// create the function for the change event
function optionChanged(id) {
    getPlot(id);
    getInfo(id);
}

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

        let idValues = (samp.otu_ids.slice(0,10)).reverse();

        let idtu = idValues.map(d => "OTU" + d)
        console.log(idtu);

        let lables = samp.otu_labels.slice(0,10);

        console.log(sampleValues);
        console.log(idValues);

        // create trace variable
        let trace1 = {
            x: sampleValues,
            y: idtu,
            text: lables,
            type: "bar",
            orientation: "h",
        };
        
        // create data variable
        let barData = [trace1]

        // create layout
        let layout = {
            title: "Top 10 OTU",

        };
        
        // create horizontal bar plot
        Plotly.newPlot("bar", barData, layout);
        


    });
};


init();