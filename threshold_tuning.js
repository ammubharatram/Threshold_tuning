
 // select the svg container first
var svg = d3.select('.canvas')
  .append('svg')
    .attr('width', 1120)
    .attr('height', 1000);


// create margins & dimensions
var margin = {top: 20, right: 20, bottom: 100, left: 100};
var graphWidth = 800 - margin.left - margin.right;
var graphHeight = 800 - margin.top - margin.bottom;


var graph = svg.append('g')
  .attr('width', graphWidth)
  .attr('height', graphHeight)
  .attr('transform', `translate(${margin.left}, ${margin.top})`);


// create axes groups  
var xAxisGroup = graph.append('g')
  .attr('transform', `translate(0, ${graphHeight})`)

const yAxisGroup = graph.append('g');

// load data
 d3.csv("INT90.FI_for_viz.csv").then( data => {
 // Convert numeric variables to numeric 
 data.forEach(function(d) {
    d.RATIO_NUM_MT103_12M
    = +d.RATIO_NUM_MT103_12M;
    d["pred_rf.SAR"] = +d["pred_rf.SAR"];
  });

colnames_data =Object.keys(data[0]);
is_x_var = element => {return element === "RATIO_NUM_MT103_12M";} 
  var x_index = colnames_data.findIndex(is_x_var);

  console.log(x_index);

  console.log(colnames_data[x_index]);
// $$$$$$$ Definitions - global fns for rate of alerts 

//tp_rate

//var indices = slider_bins.every((element,index)=>{return index; });
function tp_count(left,right) {
  var count_tp=0;
  for (var  i = 0; i <  data.length; i++) {
 
if (data[i].RATIO_NUM_MT103_12M <=left || data[i].RATIO_NUM_MT103_12M >=right){

   if(data[i].SAR === 'SAR' &&  data[i]["pred_rf.SAR"] >=0.5) {
    count_tp +=1;
    
       }
      }
}
return count_tp;

};

//fp_rate

//var indices = slider_bins.every((element,index)=>{return index; });
function fp_count(left,right) {
  var count_fp=0;
  for (var  i = 0; i <  data.length; i++) {
 
if (data[i].RATIO_NUM_MT103_12M <=left || data[i].RATIO_NUM_MT103_12M >=right){

   if(data[i].SAR === 'No_SAR' &&  data[i]["pred_rf.SAR"] >=0.5) {
    count_fp +=1;
    
       }
      }
}
return count_fp;

};


//tn_rate

function tn_count(left,right) {
  var count_tn = 0;
  for(var i = 0; i < data.length; i++) {
   if (data[i].RATIO_NUM_MT103_12M <=left || data[i].RATIO_NUM_MT103_12M >=right){
  
   if(data[i].SAR === 'SAR' &&  data[i]["pred_rf.SAR"] <0.5) {
    count_tn +=1;
    
       }
    
      }
     
}
return count_tn;
};


//fn_rate

function fn_count(left,right){
  var count_fn = 0;
  for(var i = 0; i < data.length; i++) {
   if (data[i].RATIO_NUM_MT103_12M <=left || data[i].RATIO_NUM_MT103_12M >=right){
  
   if(data[i].SAR === 'SAR' &&  data[i]["pred_rf.SAR"] <0.5) {
    count_fn +=1;
    
       }
    
      }
     
}
return count_fn;
};

//Number of Alerts within the zone

function alerts_count(left,right){
  var num_alerts=0;
  for(var i = 0; i < data.length; i++) {
    if (data[i].RATIO_NUM_MT103_12M <=left || data[i].RATIO_NUM_MT103_12M >=right){
      num_alerts+= 1;
} 
} 
return num_alerts;
};


// Count_SAR
function count_sar(left,right) {
  var num_sar = 0;
  for(var i = 0; i < data.length; i++) {
    if (data[i].RATIO_NUM_MT103_12M <=left || data[i].RATIO_NUM_MT103_12M >=right){
      if(data[i].SAR === 'SAR') {
    num_sar +=1;
    
       }
    
      }
     
} return num_sar;
}

// Count_nonSAR
function count_no_sar(left,right) {
  var num_non_sar = 0;
  for(var i = 0; i < data.length; i++) {
    if (data[i].RATIO_NUM_MT103_12M <=left || data[i].RATIO_NUM_MT103_12M >=right){
      if(data[i].SAR === 'No_SAR') {
    num_non_sar +=1;
    
       }
    
      }
     
  } return num_non_sar;
}


console.log(data.length);

console.log(d3.min(data, d => d.RATIO_NUM_MT103_12M));
console.log(data[data.length-1].RATIO_NUM_MT103_12M );
console.log(alerts_count(-100,617));

//test global functions 
//console.log(count_fp);
//console.log(data[1]["pred_rf.SAR"]);
//console.log(slider_bins.indexOf(-52.48));
console.log(fp_count(-30,100));
console.log(tp_count(-30,100));
console.log(fn_count(-30,100));
console.log(tn_count(-30,100));
console.log(data[29]);
console.log(data.length);

// On click functions- maximize fraction of SARs and F-score
//var left_right_array = data.map( d=> d.RATIO_NUM_MT103_12M).sort();
//1. Max_sar_setting function
max_sar_setting = function() {
  $('#img').show(); //<----here
 
     

  var array_frac_sars = [];
  var left_array =[];
  var right_array = [];
  var left=d3.min(data, d => d.RATIO_NUM_MT103_12M);
 //for (var i=0; i < left_right_array.length; i++) {
  for (;left<=-30;left++){
   for (var right=30;right <= d3.max(data, d => d.RATIO_NUM_MT103_12M);right++){
      var i=0;
      var frac_sar_temp= count_sar(left,right)/alerts_count(left,right);
        array_frac_sars.push(frac_sar_temp);
        left_array.push(left);
        right_array.push(right);

      } }
    
  // for (left >= d3.min(data, d => d.RATIO_NUM_MT103_12M) ; left <=30;left++) {
  //   for (right>=30;right <= d3.max(data, d => d.RATIO_NUM_MT103_12M);right++ ){
  

max_sar_temp = Math.max.apply(Math,array_frac_sars);

console.log(array_frac_sars);
console.log(max_sar_temp);
is_max = element => {return element === max_sar_temp;} //function to check if maximum
index_max_sar= array_frac_sars.findIndex(is_max);
console.log(index_max_sar);
d3.select("#max_sar").html(`The optimal threshold setting for max % of SARs is at ${left_array[index_max_sar]} and ${right_array[index_max_sar]} `);

//set all values with this threshold setting automatically! //////////////////////////////////////

d3.select('p#value-step').text(`Positive (+) RATIO_NUM_MT103_12M :   ${d3.format('.2f')(right_array[index_max_sar])}`);
  
  points = [
    [x(right_array[index_max_sar]), 800],
    [x(right_array[index_max_sar]), -800],
    ];
  path1.attr('d', threshold1(points))

  d3.select('p#value-step2').text(`Negative (-)   RATIO_NUM_MT103_12M :    ${d3.format('.2f')(left_array[index_max_sar])}`);
  
  points2 = [
    [x(left_array[index_max_sar]), 800],
    [x(left_array[index_max_sar]), -800],
    ];
  path2.attr('d', threshold2(points2))
//TP rate
var tp_rate = tp_count(left_array[index_max_sar],right_array[index_max_sar])/(tp_count(left_array[index_max_sar],right_array[index_max_sar]) + fn_count(left_array[index_max_sar],right_array[index_max_sar]));
  d3.select("#first").html(`Sensitivity/True Positive Rate   : ${d3.format('.2%')(tp_rate)} <br/>`);
  
  // TN rate
  var tn_rate = tn_count(left_array[index_max_sar],right_array[index_max_sar])/(tn_count(left_array[index_max_sar],right_array[index_max_sar]) + fp_count(left_array[index_max_sar],right_array[index_max_sar]));
  d3.select("#second").html(`Specificity/True Negative Rate   : ${d3.format('.2%')(tn_rate)} <br/>`);

  // Precision
  var precision = tp_count(left_array[index_max_sar],right_array[index_max_sar])/(tp_count(left_array[index_max_sar],right_array[index_max_sar]) + fp_count(left_array[index_max_sar],right_array[index_max_sar]));
  d3.select("#third").html(`Precision   : ${d3.format('.2%')(precision)} <br/>`);

  // F1-score
  var f1_score = 2* (tp_count(left_array[index_max_sar],right_array[index_max_sar]))/(2* (tp_count(left_array[index_max_sar],right_array[index_max_sar])) +  fp_count(left_array[index_max_sar],right_array[index_max_sar]) + fn_count(left_array[index_max_sar],right_array[index_max_sar]));
  d3.select("#fourth").html(`F1-score   : ${d3.format('.2%')(f1_score)} <br/>`);

  //Number of Alerts
  var number_alerts1 = alerts_count(left_array[index_max_sar],right_array[index_max_sar]);
  d3.select("#fifth").html(`Number of Alerts   : ${(number_alerts1)} <br/>`);
  
  //Number of SARs
   var num_sar = count_sar(left_array[index_max_sar],right_array[index_max_sar]);
  d3.select("#sar").html(`Number of SAR's  : ${(num_sar)} <br/>`);
   //Number of SARs
   var num_no_sar = count_no_sar(left_array[index_max_sar],right_array[index_max_sar]);
  d3.select("#no_sar").html(`Number of Non-SAR's  : ${(num_no_sar)} <br/>`);
  //Ratio SAR
  var ratio_sar = count_sar(left_array[index_max_sar],right_array[index_max_sar])/alerts_count(left_array[index_max_sar],right_array[index_max_sar]);
  d3.select("#f_sar").html(`Fraction of SAR's   :   ${d3.format('.2%')(ratio_sar)} <br/>`);
  //Ratio no_SAR
  var ratio_no_sar = count_no_sar(left_array[index_max_sar],right_array[index_max_sar])/alerts_count(left_array[index_max_sar],right_array[index_max_sar]);
  d3.select("#f_no_sar").html(`Fraction of Non-SAR's   :   ${d3.format('.2%')(ratio_no_sar)} <br/>`);
   $('#img').hide();  //<--- hide again
   

}; //end of function 1- Max_sar_setting



//2. Max_f1score_setting function
max_f1score_setting = function() {
  $('#img').show(); //<----here
 
     

  var array_f1scores = [];
  var left_array =[];
  var right_array = [];
  
 //for (var i=0; i < left_right_array.length; i++) {
  var left=d3.min(data, d => d.RATIO_NUM_MT103_12M);
   for (;left<=-30;left++){
   for (var right=30;right <= d3.max(data, d => d.RATIO_NUM_MT103_12M);right++){
      var i=0;
      var frac_f1score_temp= 2* ((tp_count(left,right))/(2* (tp_count(left,right)) +  fp_count(left,right) + fn_count(left,right)));
        array_f1scores.push(frac_f1score_temp);
        left_array.push(left);
        right_array.push(right);

      } }
console.log(array_f1scores);
      console.log(array_f1scores.map(a => a = a || 0));
      var array_f1scores_imputed = array_f1scores.map(a => a = a || 0);

     
        console.log(array_f1scores_imputed);
        //console.log(fp_count(-91.1,428.9)); 

  // for (left >= d3.min(data, d => d.RATIO_NUM_MT103_12M) ; left <=30;left++) {
  //   for (right>=30;right <= d3.max(data, d => d.RATIO_NUM_MT103_12M);right++ ){

max_f1score_temp = Math.max.apply(Math,array_f1scores_imputed);

console.log(max_f1score_temp);

console.log(left_array);
is_max = element => {return element === max_f1score_temp;} //function to check if maximum
index_max_f1score= array_f1scores_imputed.findIndex(is_max);
console.log(index_max_f1score);
d3.select("#max_f1score").html(`The optimal threshold setting for max F1-score is at ${left_array[index_max_f1score]} and ${right_array[index_max_f1score]}`);

//set all values with this threshold setting automatically! //////////////////////////////////////

d3.select('p#value-step').text(`Positive (+) RATIO_NUM_MT103_12M :   ${d3.format('.2f')(right_array[index_max_f1score])}`);
  
  points = [
    [x(right_array[index_max_f1score]), 800],
    [x(right_array[index_max_f1score]), -800],
    ];
  path1.attr('d', threshold1(points))

d3.select('p#value-step2').text(`Negative (-)   RATIO_NUM_MT103_12M :    ${d3.format('.2f')(left_array[index_max_f1score])}`);
  
  points2 = [
    [x(left_array[index_max_f1score]), 800],
    [x(left_array[index_max_f1score]), -800],
    ];
  path2.attr('d', threshold2(points2))
//TP rate
var tp_rate = tp_count(left_array[index_max_f1score],right_array[index_max_f1score])/(tp_count(left_array[index_max_f1score],right_array[index_max_f1score]) + fn_count(left_array[index_max_f1score],right_array[index_max_f1score]));
  d3.select("#first").html(`Sensitivity/True Positive Rate   : ${d3.format('.2%')(tp_rate)} <br/>`);
  
  // TN rate
  var tn_rate = tn_count(left_array[index_max_f1score],right_array[index_max_f1score])/(tn_count(left_array[index_max_f1score],right_array[index_max_f1score]) + fp_count(left_array[index_max_f1score],right_array[index_max_f1score]));
  d3.select("#second").html(`Specificity/True Negative Rate   : ${d3.format('.2%')(tn_rate)} <br/>`);

  // Precision
  var precision = tp_count(left_array[index_max_f1score],right_array[index_max_f1score])/(tp_count(left_array[index_max_f1score],right_array[index_max_f1score]) + fp_count(left_array[index_max_f1score],right_array[index_max_f1score]));
  d3.select("#third").html(`Precision   : ${d3.format('.2%')(precision)} <br/>`);

  // F1-score
  var f1_score = 2* (tp_count(left_array[index_max_f1score],right_array[index_max_f1score]))/(2* (tp_count(left_array[index_max_f1score],right_array[index_max_f1score])) +  fp_count(left_array[index_max_f1score],right_array[index_max_f1score]) + fn_count(left_array[index_max_f1score],right_array[index_max_f1score]));
  d3.select("#fourth").html(`F1-score   : ${d3.format('.2%')(f1_score)} <br/>`);

  //Number of Alerts
  var number_alerts1 = alerts_count(left_array[index_max_f1score],right_array[index_max_f1score]);
  d3.select("#fifth").html(`Number of Alerts   : ${(number_alerts1)} <br/>`);
  
  //Number of SARs
   var num_sar = count_sar(left_array[index_max_f1score],right_array[index_max_f1score]);
  d3.select("#sar").html(`Number of SAR's  : ${(num_sar)} <br/>`);
   //Number of SARs
   var num_no_sar = count_no_sar(left_array[index_max_f1score],right_array[index_max_f1score]);
  d3.select("#no_sar").html(`Number of Non-SAR's  : ${(num_no_sar)} <br/>`);
  //Ratio SAR
  var ratio_sar = count_sar(left_array[index_max_f1score],right_array[index_max_f1score])/alerts_count(left_array[index_max_f1score],right_array[index_max_f1score]);
  d3.select("#f_sar").html(`Fraction of SAR's   :   ${d3.format('.2%')(ratio_sar)} <br/>`);
  //Ratio no_SAR
  var ratio_no_sar = count_no_sar(left_array[index_max_f1score],right_array[index_max_f1score])/alerts_count(left_array[index_max_f1score],right_array[index_max_f1score]);
  d3.select("#f_no_sar").html(`Fraction of Non-SAR's   :   ${d3.format('.2%')(ratio_no_sar)} <br/>`);
   $('#img').hide();  //<--- hide again
   

}; //end of function 2- Max_f1score_setting






  


  



// End of -- $$$$$$$ Definitions - global fns for rate of alerts 


const y = d3.scaleLinear()
  .domain([0, d3.max(data, d => d["pred_rf.SAR"])])
  .range([graphHeight, 0]);
  
const x = d3.scaleLinear()
  .domain([d3.min(data, d => d.RATIO_NUM_MT103_12M), d3.max(data, d => d.RATIO_NUM_MT103_12M)])
  .range([0, graphWidth])
  ;

var xValue = function(d) { return d.RATIO_NUM_MT103_12M;},
    xMap = function(d) { return x(xValue(d));},
    yValue = function(d) { return d["pred_rf.SAR"];}, 
    yMap = function(d) { return y(yValue(d));};




 // create & call axesit
 const xAxis = d3.axisBottom(x).scale(x).ticks(10);
 const yAxis = d3.axisLeft(y)
   .ticks(10)
   .tickFormat(d => d  );

 xAxisGroup.call(xAxis);
 yAxisGroup.call(yAxis);

 const xa = xAxisGroup.selectAll('text')
   .attr('fill', 'black')
   .attr('transform', 'rotate(-40)')
   .attr('text-anchor', 'end')
   
 xa.select('path').attr("marker-end", "url(#arrowhead)");
 yAxisGroup.selectAll('text')
   .attr('fill', 'black')

// console.log(xValue);
// console.log(yValue(data));

// setup fill color
var cValue = function(d) { return d.SAR;};

const color = d3.scaleOrdinal(["green","red"])
                 .domain(data.map(d=>d.SAR));

//console.log(data.map(d=>d.SAR));

//  console.log(data);
 // update colour scale domain

 const legendGroup = svg.append('g')
  .attr('transform', `translate(${graphWidth -180}, 10)`)
 
//var color = d3.scaleOrdinal(d3.schemeCategory10);
/* color = d3.scaleOrdinal();
    .range(["red", "green"]); */




// add the tooltip area to the webpage
var tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 12);
  // change string (from CSV) into number format
  data.forEach(function(d) {
    d.RATIO_NUM_MT103_12M = +d.RATIO_NUM_MT103_12M;
    d["pred_rf.SAR"] = +d["pred_rf.SAR"];
//    console.log(d);
  });

  // don't want dots overlapping axis, so add in buffer to data domain
  x.domain([d3.min(data, xValue)-10, d3.max(data, xValue)]);
  y.domain([d3.min(data, yValue)-0.03, d3.max(data, yValue)]);

  

  // draw dots

  const dots = graph.selectAll('dot')
  .data(data);

      dots 
      .enter().append("circle")
      .attr("class", "dot")
      .attr("r", 3.5)
      .attr("cx", d=>x(d.RATIO_NUM_MT103_12M))
      .attr("cy", d=>y(d["pred_rf.SAR"]))
      .style("fill", function(d) { return color(cValue(d));}) 
      .on("mouseover", function(d) {
          tooltip.transition()
               .duration(200)
               .style("opacity", 0.9);
          tooltip.html( `${d["SAR"]} <br/>(${xValue(d)}, ${yValue(d)})`)
               .style("left", (d3.event.pageX ) + "px")
               .style("top", (d3.event.pageY -68) + "px");
      })
      .on("mouseout", function(d) {
          tooltip.transition()
               .duration(500)
               .style("opacity", 0);
      });

  // draw legend
  var legend = d3.legendColor()
                 .shapePadding(10)
                 .scale(color);

  legendGroup.call(legend);
  legendGroup.selectAll('text').attr('fill', 'black');

 /*  // draw legend colored rectangles
  legend.append("rect")
      .attr("x", graphWidth - 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", color);

  // draw legend text
  legend.append("text")
      .attr("x", graphWidth - 24)S
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) { return d;}) */
console.log(d3.entries(data));

// text label for the x axis
svg.append("text")   
 .attr("transform",
            "translate(" + (graphWidth/1.5  ) + " ," + 
                           (graphHeight + margin.top +50) + ")")         
 .style("text-anchor", "middle")
 .attr("dy", "0em")
 .html(`&#8594; The value of ${colnames_data[x_index]}  `)

 
 
// text label for the y axis
svg.append("text")
.attr("transform",
            "translate(" + (-80) + " ," + 
                           (margin.top + 100) + ")")
//.attr("transform", "rotate(-90)") 
.attr("y", margin.left)
.attr("x", (graphHeight/4))
.attr("dy", "1em")
.style("text-anchor", "end")
.html("Predicted risk &#8593; ")
;  
//

xAxisGroup.call(xAxis);
yAxisGroup.call(yAxis);

/* ########## SLIDER ######################### */
var slider_input1= 30;



// Current Threshold is at 30//
//Slider_Bins to show


//console.log(slider_bins); 
d3.select('p#value-step').text(`Positive (+) ${colnames_data[x_index]} :   30`); //default value
d3.select('p#value-step2').text(`Negative (-) ${colnames_data[x_index]} :   -30`); //default value
//default position of threshold1 : +30
var points = [
  [x(30), 800],
  [x(30), -800],
  ];

  var points2 = [
  [x(-30), 800],
  [x(-30), -800],
  ];

console.log(data.map( d=> d.RATIO_NUM_MT103_12M));

// Step1
var sliderStep = d3.sliderBottom()
.min(d3.min(data, xValue)-2)
.max(d3.max(data, xValue)+2)
.tickFormat(d3.format('.1f'))
.width(300)
.ticks(5)
.step(1)
.default(30)
.on('onchange', val => {
  //test();
  d3.select('p#value-step').text(`Positive (+) RATIO_NUM_MT103_12M :   ${d3.format('.2f')(val)}`);
  //slider_input = 6;
  slider_input1 = val; 
  //console.log(slider_input);
  points = [
    [x(val), 800],
    [x(val), -800],
    ];
  path1.attr('d', threshold1(points))

  
  //TP rate
  var tp_rate = tp_count(slider_input2,val)/(tp_count(slider_input2,val) + fn_count(slider_input2,val));
  d3.select("#first").html(`Sensitivity/True Positive Rate   : ${d3.format('.2%')(tp_rate)} <br/>`);
  
  // TN rate
  var tn_rate = tn_count(slider_input2,val)/(tn_count(slider_input2,val) + fp_count(slider_input2,val));
  d3.select("#second").html(`Specificity/True Negative Rate   : ${d3.format('.2%')(tn_rate)} <br/>`);

  // Precision
  var precision = tp_count(slider_input2,val)/(tp_count(slider_input2,val) + fp_count(slider_input2,val));
  d3.select("#third").html(`Precision   : ${d3.format('.2%')(precision)} <br/>`);

  // F1-score
  var f1_score = 2* (tp_count(slider_input2,val))/(2* (tp_count(slider_input2,val)) +  fp_count(slider_input2,val) + fn_count(slider_input2,val));
  d3.select("#fourth").html(`F1-score   : ${d3.format('.2%')(f1_score)} <br/>`);

  //Number of Alerts
  var number_alerts1 = alerts_count(slider_input2,val);
  d3.select("#fifth").html(`Number of Alerts   : ${(number_alerts1)} <br/>`);
  
  //Number of SARs
   var num_sar = count_sar(slider_input2,val);
  d3.select("#sar").html(`Number of SAR's  : ${(num_sar)} <br/>`);
   //Number of SARs
   var num_no_sar = count_no_sar(slider_input2,val);
  d3.select("#no_sar").html(`Number of Non-SAR's  : ${(num_no_sar)} <br/>`);
  //Ratio SAR
  var ratio_sar = count_sar(slider_input2,val)/alerts_count(slider_input2,val);
  d3.select("#f_sar").html(`Fraction of SAR's   :   ${d3.format('.2%')(ratio_sar)} <br/>`);
  //Ratio no_SAR
  var ratio_no_sar = count_no_sar(slider_input2,val)/alerts_count(slider_input2,val);
  d3.select("#f_no_sar").html(`Fraction of Non-SAR's   :   ${d3.format('.2%')(ratio_no_sar)} <br/>`);


  });

  console.log(d3.max(data, xValue));

/* function test(){
  console.log("59565416");
  console.log(slider_input);
} 
 */
/* function show_results(results) {
  // We want this to show the "results" from the callback function.
  alert(slider_input);
 } 

//console.log(slider_input);

*/
//console.log(d3.format('.2f')(sliderStep.value()));

var gStep = d3
.select('div#slider-step')
.append('svg')
.attr('width', 500)
.attr('height', 100)
.append('g')
.attr('transform', 'translate(30,30)')
.text(sliderStep.value());

gStep.call(sliderStep);
;

var slider_input2= -30;

// Step2
var sliderStep2 = d3.sliderBottom()
.min(d3.min(data, xValue)-2)
.max(d3.max(data, xValue)+2)
.tickFormat(d3.format('.1f'))
.width(300)
.ticks(5)
.step(1)
.default(-30)
.on('onchange', val => {
  //test();
  d3.select('p#value-step2').text(`Negative (-)   RATIO_NUM_MT103_12M :    ${d3.format('.2f')(val)}`);
  //slider_input = 6;
  slider_input2 = val; 
  //console.log(slider_input);
  points2 = [
    [x(val), 800],
    [x(val), -800],
    ];
  path2.attr('d', threshold2(points2))

  //TP rate
  var tp_rate = tp_count(val,slider_input1)/(tp_count(val,slider_input1) + fn_count(val,slider_input1));
  d3.select("#first").html(`Sensitivity/True Positive Rate   : ${d3.format('.2%')(tp_rate)} <br/>`);
  
  // TN rate
  var tn_rate = tn_count(val,slider_input1)/(tn_count(val,slider_input1) + fp_count(val,slider_input1));
  d3.select("#second").html(`Specificity/True Negative Rate   : ${d3.format('.2%')(tn_rate)} <br/>`);

  // Precision
  var precision = tp_count(val,slider_input1)/(tp_count(val,slider_input1) + fp_count(val,slider_input1));
  d3.select("#third").html(`Precision   : ${d3.format('.2%')(precision)} <br/>`);

  // F1-score
  var f1_score = 2* (tp_count(val,slider_input1))/(2* (tp_count(val,slider_input1)) +  fp_count(val,slider_input1) + fn_count(val,slider_input1));
  d3.select("#fourth").html(`F1-score   : ${d3.format('.2%')(f1_score)} <br/>`);
  
  // Number of Alerts
  var number_alerts2 = alerts_count(val,slider_input1);
  d3.select("#fifth").html(`Number of Alerts   : ${(number_alerts2)} <br/>`);

  //Number of SARs
  var num_sar = count_sar(val,slider_input1);
  d3.select("#sar").html(`Number of SAR's  : ${(num_sar)} <br/>`);
   //Number of SARs
   var num_no_sar = count_no_sar(val,slider_input1);
  d3.select("#no_sar").html(`Number of Non-SAR's  : ${(num_no_sar)} <br/>`);
   //Ratio SAR
   var ratio_sar = count_sar(val,slider_input1)/alerts_count(val,slider_input1);
  d3.select("#f_sar").html(`Fraction of SAR's   :   ${d3.format('.2%')(ratio_sar)} <br/>`);
  //Ratio no_SAR
  var ratio_no_sar = count_no_sar(val,slider_input1)/alerts_count(val,slider_input1);
  d3.select("#f_no_sar").html(`Fraction of Non-SAR's   :   ${d3.format('.2%')(ratio_no_sar)} <br/>`);
  
   });//brackets close for onchange callback fn

console.log(data.RATIO_NUM_MT103_12M);
var gStep2 = d3
.select('div#slider-step2')
.append('svg')
.attr('width', 500)
.attr('height', 100)
.append('g')
.attr('transform', 'translate(30,30)')
.text(sliderStep2.value());

gStep2.call(sliderStep2);
;



//Threshold line
// d3 line path generator
const threshold1 = d3.line()
const threshold2 = d3.line() 
// line path element
const path1 = graph.append('path');   // create axes
const path2 = graph.append('path');   // create axes

console.log(sliderStep.value());
console.log(document.getElementById("value-step").innerHTML);

// update path data
path1.attr('fill', 'none')
.transition().duration(2500)  
  .attr('stroke', 'red')
  .attr('stroke-width', '2')
  .attr('d', threshold1(points))
  ; 

// update path data
path2.attr('fill', 'none')
.transition().duration(2500)  
  .attr('stroke', 'blue')
  .attr('stroke-width', '2')
  .attr('d', threshold2(points2))
  ; 



//fp rate
//var fp_rate = 
/* var indices = slider_bins.forEach((currentValue,index)=>{
  return index;
});
 */

var slider_bins = (data.map(item => item.RATIO_NUM_MT103_12M));

console.log(slider_bins.indexOf(sliderStep.value()));
console.log(sliderStep.value());
console.log(data);
//for (i = slider_bins.indexOf(sliderStep2.value()); i < slider_bins.indexOf(sliderStep.value()); i++) {
/* console.log(left_right_array);
  console.log(left_right_array.findIndex(element=> element == 30.4)); */
});


</script>

