var data = [
  {date: "2011-11-14T16:17:54Z", quantity: 2, total: 190, tip: 100, type: "tab"},
  {date: "2011-11-14T16:20:19Z", quantity: 2, total: 190, tip: 100, type: "tab"},
  {date: "2011-11-14T16:28:54Z", quantity: 1, total: 300, tip: 200, type: "visa"},
  {date: "2011-11-14T16:30:43Z", quantity: 2, total: 90, tip: 0, type: "tab"},
  {date: "2011-11-14T16:48:46Z", quantity: 2, total: 90, tip: 0, type: "tab"},
  {date: "2011-11-14T16:53:41Z", quantity: 2, total: 90, tip: 0, type: "tab"},
  {date: "2011-11-14T16:54:06Z", quantity: 1, total: 100, tip: 0, type: "cash"},
  {date: "2011-11-14T16:58:03Z", quantity: 2, total: 90, tip: 0, type: "tab"},
  {date: "2011-11-14T17:07:21Z", quantity: 2, total: 90, tip: 0, type: "tab"},
  {date: "2011-11-14T17:22:59Z", quantity: 2, total: 90, tip: 0, type: "tab"},
  {date: "2011-11-14T17:25:45Z", quantity: 2, total: 200, tip: 0, type: "cash"},
  {date: "2011-11-14T17:29:52Z", quantity: 1, total: 200, tip: 100, type: "visa"}
]; 

// Create Crossfaiter instance.
var ndx = crossfilter(data);

// Setup dimension based on data.
var totalDim = ndx.dimension(function(d) { return d.total; });
var typeDim  = ndx.dimension(function(d) {return d.type;});

// Show values equal to 90.
 var total_90 = totalDim.filter(90); 
print_filter("total_90"); 

// Show values from 90 - 100.
var total_90_101= totalDim.filter([90,101]);
print_filter("total_90_101"); 

// Show values divisible by 3.
var total_3= totalDim.filter(function(d) { if (d%3===0) {return d;} } );
print_filter("total_3"); 

// Show values where the payment type is 'Visa'.
var visa_filter = typeDim.filter("visa"); 
print_filter("visa_filter");

// Group the filters and return the total value for all entries using 'Cash'.
var cash_total = ndx.groupAll().reduceSum(function(d) {return d.total;}).value() 
console.log("cash_total="+cash_total); 

// Clear all filters.
typeDim.filterAll();

// Show all values payed using cash or visa.
var cash_and_visa_filter = typeDim.filter(function(d) { if (d ==="visa" || d==="cash") {return d;} });
print_filter("cash_and_visa_filter");


function print_filter(filter){
  var f=eval(filter);
  if (typeof(f.length) != "undefined") {}else{}
  if (typeof(f.top) != "undefined") {f=f.top(Infinity);}else{}
  if (typeof(f.dimension) != "undefined") {f=f.dimension(function(d) { return "";}).top(Infinity);}else{}
  console.log(filter+"("+f.length+") = "+JSON.stringify(f).replace("[","[\n\t").replace(/}\,/g,"},\n\t").replace("]","\n]"));
} 