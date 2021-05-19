
var company;
var splitString;
var companyName;

jQuery.noConflict()(function($){
  $(document).ready(function () {  
    
    function showAlert()
    {
      alert("done");
    }

    company = window.location.href;    
    splitString = company.split("=");
    companyName = splitString[1];

    var graphUrl='http://www.dsebd.org/php_graph/monthly_graph.php?inst=' +companyName+ '&duration=1&type=price';




    //console.log(companyName);

    getGraph(graphUrl);
  });
});

  function getGraph(geturl)
  {
      var xVal = [];
      var yVal = [];
      var datePrice = [];

      var proxy='https://cors-anywhere.herokuapp.com/';
      $.ajax({
      url: proxy+geturl,
      complete: function(data)
      {
        var graphData = data.responseText.toString();
        var res = graphData.split("+");
            
        for(var i=1; i <res.length-1; i++)
        {
          var d = res[i].split(",");
          d[0] = trimString(d[0]);

          var string = d[1].toString();
          var moDstring = string.slice(0,string.length-3);

          xVal.push(d[0]);
          yVal.push(moDstring);
        }
            
        var obj = {};
        obj.x = xVal;
        obj.y = yVal;
        obj.type = "scatter";
        datePrice.push(obj);

        var layout = {
          title: '',
          xaxis: {
            title: 'Year',
            titlefont: {
              family: 'Courier New, monospace',
              size: 24,
              color: '#7f7f7f'
            }
          },
          yaxis: {
            title: 'Price',
            titlefont: {
              family: 'Courier New, monospace',
              size: 24,
              color: '#7f7f7f'
            }
          }
        };
        Plotly.newPlot('graph1', datePrice, layout);
      }
    })

    function trimString(x)
    {
      return x.replace(/(['"])/g, "");
    }
  }

function sixMonth()
{
  var sixUrl = 'http://www.dsebd.org/php_graph/monthly_graph.php?inst=' +companyName+ '&duration=6&type=price';
  getGraph(sixUrl);
}

function oneMonth()
{
  var oneUrl = 'http://www.dsebd.org/php_graph/monthly_graph.php?inst=' +companyName+ '&duration=1&type=price';
  getGraph(oneUrl);
}

function threeMonth()
{
  var threeUrl = 'http://www.dsebd.org/php_graph/monthly_graph.php?inst=' +companyName+ '&duration=3&type=price';
  getGraph(threeUrl);
}

function nineMonth()
{
  var nineMonth = 'http://www.dsebd.org/php_graph/monthly_graph.php?inst=' +companyName+ '&duration=9&type=price';
  getGraph(nineMonth);
}

function oneYear()
{
  var oneYr = 'http://www.dsebd.org/php_graph/monthly_graph.php?inst=' +companyName+ '&duration=12&type=price';
  getGraph(oneYr);
}

function twoYears()
{
  var twoYear = 'http://www.dsebd.org/php_graph/monthly_graph.php?inst=' +companyName+ '&duration=24&type=price';
  getGraph(twoYear);
}