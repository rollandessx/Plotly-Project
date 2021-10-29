
d3.json('samples.json').then(({ names }) => {
    // =============================FILL=OPTIONS================
    names.forEach(name => {
        d3.select('select').append('option').text(name);
    });
    // =========================================================

    showCharts();
});

function showCharts() {
    var sel = d3.select('select').node().value
    d3.json('samples.json').then(({ metadata, samples }) => {

        var meta = metadata.filter(obj => obj.id == sel)[0];
        var sample = samples.filter(obj => obj.id == sel)[0];

        // ======================METADATA============================

        d3.select('.panel-body').html('');
        Object.entries(meta).forEach(([key, val]) => {
            d3.select('.panel-body').append('h4').text(key.toUpperCase() + ": " + val);
        });
        // =========================================================


        var { otu_ids, sample_values, otu_labels } = sample

        // ======================BAR=CHART=========================
        var data = [
            {
                x: sample_values.slice(0, 10).reverse(),
                y: otu_ids.slice(0, 10).reverse().map(x => 'OTU ' + x),
                type: 'bar',
                orientation: 'h',
                text: otu_labels.slice(0, 10).reverse()
            }
        ];
        var layout = { title: {text:'Top 10 Bacteria Cultures Found', font: { size: 20 } ,'y':0.87}}
        Plotly.newPlot('bar', data, layout);
        // =========================================================

                
        // =====================BUBBLE=CHART========================
        var trace1 = {
            x: otu_ids.slice(0, 10).reverse(),
            y: sample_values.slice(0, 10).reverse(),
            text: otu_labels.slice(0, 10).reverse(),
            mode: 'markers',
            marker: {
                size: sample_values.slice(0, 10).reverse(),
                color: otu_ids,
                colorscale: 'Earth'
            }
        };
          
        var data = [trace1];
        
          var layout = {
            title: 'Bacteria Cultures Per Sample', font: { size: 15},
            showlegend: false,
            height: 600
        };
        
        Plotly.newPlot('bubble', data, layout);
        // =========================================================

        // ====================GAUGE=CHART==========================
        var data = [
            {
              domain: { x: [0, 1], y: [0, 1] },
              value: 2,
              title: '<b>Belly Button Wash Frequency</b><br>Scrubs per Week',
              type: "indicator",
              mode: "gauge+number",
              delta: { reference: 400 },
              gauge: { axis: { range: [null, 10] }, bar:{color:'red'},'steps':[{range:[0,2], color:'black'},
              {range:[2,4], color:'blue'},{range:[4,6], color:'yellow'},{range:[6,8], color:'darkgreen'},{range:[8,10], color:'lightgray'}] }
            }
          ];          
                
          var layout = { width: 600, height: 500 };
          Plotly.newPlot('gauge', data);

    });
};















function optionChanged() {
    showCharts()
};