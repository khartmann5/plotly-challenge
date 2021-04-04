d3.json('samples.json').then(data => {
    // console.log(data);
});

// Create initial function 
function init() {
    // Prevent the page from refreshing
    // d3.event.preventDefault();
  
    // Select the dropdown menu
    let dropDown = d3.select("#selDataset");

    // read the data
    d3.json('samples.json').then(data => {
        // console.log(data);

        // get id into dropdown menu
        data.names.forEach(function(name) {
            dropDown.append("option").text(name).property("Value");
        });

        getPlot(data.names[0]);
        getInfo(data.names[0]);
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
        // console.log(data);

        let samp = data.samples.filter(s => s.id.toString() === id)[0];
        // console.log(samp);

        // get only top 10 sample values for plot
        let sampleValues = samp.sample_values.slice(0,10).reverse();

        let idValues = (samp.otu_ids.slice(0,10)).reverse();

        let idtu = idValues.map(d => "OTU " + d)
        // console.log(idtu);

        let lables = samp.otu_labels.slice(0,10);

        // console.log(sampleValues);
        // console.log(idValues);

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
            yaxis:{tickmode:"linear"},
            margin:{l:100,r:100,t:30,b:20}
        };
        
        // create horizontal bar plot
        Plotly.newPlot("bar", barData, layout);
        
        // set up trace for bubble chart
        let trace2 = {
            x: samp.otu_ids,
            y: samp.sample_values,
            mode: "markers",
            marker: {
                size: samp.sample_values,
                color: samp.otu_ids
            },
            text: samp.otu_labels
        };

        // set up layout for bubble chart
        let layout2 = {
            xaxis:{title: "OTU ID"},
            height: 600,
            width: 1300
        };

        let bubbleData = [trace2];

        // create bubble chart
        Plotly.newPlot("bubble", bubbleData, layout2)


        // get washing frequency for guage chart
        let washfreq = data.metadata.map(d => d.wfreq);
        // console.log(washfreq);

        // let wfreqid = data.metadata.wfreq.filter(w => w.id.toString() === id)[0];

        // set up trace for gauge chart
        let trace3 = {
            domain: { x: [0,1], y: [0,1]},
            value: washfreq,
            title: {text: "Scrubs per Week"},
            type: "indicator",
            mode: "gauge+number"
        }

        // set up layout for gauge chart
        let layout3 = {
            width: 600, height: 500, margin: { t: 0, b: 0 }
        };

        let gaugeData = [trace3];

        // create gauge chart
        Plotly.newPlot("gauge", gaugeData, layout3)

    });
};

// build function that retrieves metadata information
function getInfo(id) {
    d3.json('samples.json').then(data => {

        // get metadata info
        let metadata = data.metadata;
        // console.log(metadata);

        // filter metadata by id
        let metaid = metadata.filter(meta => meta.id.toString() === id)[0];

        // selet demo info to display data
        let demoInfo = d3.select("#sample-metadata");

        // empty before retrieving new data
        demoInfo.html("");

        // append info to display
        Object.entries(metaid).forEach((key) => {
            demoInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1]);
        });

    });
};


init();