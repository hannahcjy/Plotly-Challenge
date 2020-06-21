//Create Initial Graph
function init() {
  //Read in Json file and create variables
  d3.json("samples.json").then(function(data){
      console.log(data.samples[0].otu_ids[0]);

      //get sample_values as values (x axis) for Bar Chart
      var sample_values_all = data.samples[0].sample_values;
      var sample_values = sample_values_all.filter(function(d,i) {return i<10}).reverse();
      console.log(sample_values);
      
      //get otu_ids as labels (y axis) for Bar Chart
      var otu_all = data.samples[0].otu_ids;
      var otu_ids = otu_all.filter(function(d,i) {return i<10}).reverse();
      for (var i=0;i<10;i++){
          otu_ids[i] = "OTU " + otu_ids[i]        
      }
      console.log(otu_ids);
      
      //get otu_labels as hovertext for Bar Chart
      var label_all = data.samples[0].otu_labels;
      var otu_labels = label_all.filter(function(d,i) {return i<10}).reverse();
      console.log(otu_labels);

      //Create Initial Bar Chart
      var trace = {
          x: sample_values,
          y: otu_ids,
          type: "bar",
          orientation: "h",
          text: otu_labels
      };
      // Create the data array for our plot
      var bar_data = [trace];
      // Plot the chart to a div tag with id "bar-plot"
      Plotly.newPlot("bar", bar_data);


      //Create Initial Bubble Chart
      var trace1 = {
          x: otu_all,
          y: sample_values_all,
          mode: 'markers',
          marker: {
            size: sample_values_all,
            color: otu_all
          },
          text: label_all,
        };
      var bubble_data = [trace1];
      Plotly.newPlot("bubble", bubble_data);
            
      //create initial Metadata
      var table_key = Object.keys(data.metadata[0]);
      var table_value = Object.values(data.metadata[0]);
      var table_pair = [];
      for (var i = 0; i < table_key.length; i++) {
        table_pair.push(table_key[i] + ": " + table_value[i]);
        document.getElementById('sample-metadata').innerHTML += '<br>' + table_pair[i];
      }
      console.log(table_pair);
 
  })
}

//add values into dropdown list
var selectDropdown = d3.select("#selDataset");


function addOptions() {
    d3.json("samples.json").then(function(data) {

        data.names.forEach((name, i) => {
            var appendOption = selectDropdown.append("option").text(name).attr('value', i);
        });
    });
}

addOptions();


// Call updatePlotly() when a change takes place to the DOM
d3.selectAll("#selDataset").on("change", updatePlotly);

//Create updatePloyly function
function updatePlotly() {
  var selectDropdown = d3.select("#selDataset");
  var dataset = selectDropdown.property("value");
  d3.json("samples.json").then(function(data){

    for (var i = 0; i < 153; i++) {
    //console.log('"' + i.toString() + '"')

      if (dataset === (i.toString())) {

        //get otu_labels as hovertext for Bar Chart
        var label_all = data.samples[i].otu_labels;
        var otu_labels = label_all.filter(function(d,i) {return i<10}).reverse();
        console.log(label_all);
        
        //get sample_values as values (x axis) for Bar Chart
        var sample_values_all = data.samples[i].sample_values;
        var sample_values = sample_values_all.filter(function(d,i) {return i<10}).reverse();
        console.log(sample_values);
        
        //get otu_ids as labels (y axis) for Bar Chart
        var otu_all = data.samples[i].otu_ids;
        var otu_ids = otu_all.filter(function(d,i) {return i<10}).reverse();
        for (var j=0;j<10;j++){
            otu_ids[j] = "OTU " + otu_ids[j]        
        }
        console.log(otu_ids);
        
        //get metadata
        var table_key = Object.keys(data.metadata[i]);
        var table_value = Object.values(data.metadata[i]);


        break;
      }
    }

    //Create Initial Bar Chart
    var trace = {
      x: sample_values,
      y: otu_ids,
      type: "bar",
      orientation: "h",
      text: otu_labels
    };
    // Create the data array for our plot
    var bar_data = [trace];
    // Plot the chart to a div tag with id "bar-plot"
    Plotly.newPlot("bar", bar_data);

    //Create Initial Bubble Chart
    var trace1 = {
      x: otu_all,
      y: sample_values_all,
      mode: 'markers',
      marker: {
        size: sample_values_all,
        color: otu_all
      },
      text: label_all,
    };
    var bubble_data = [trace1];
    Plotly.newPlot("bubble", bubble_data);

    var table_pair = [];
    document.getElementById('sample-metadata').innerHTML = "";
      for (var k = 0; k < table_key.length; k++) {
        table_pair.push(table_key[k] + ": " + table_value[k]);
        document.getElementById('sample-metadata').innerHTML += '<br>' + table_pair[k];
      }



  })
}
init() 


