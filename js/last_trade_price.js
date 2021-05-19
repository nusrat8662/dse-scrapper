var url='http://www.dsebd.org/';
var proxy='https://cors-anywhere.herokuapp.com/';

var tableData=[];

var tableHead = ['Trading Code','LTP','Change','CloseP','YCP'];

jQuery.noConflict()(function($){
	$(document).ready(function(){
		$.ajax({
			url: proxy+url,
			complete: function(data)
			{
			    $('#pulledData').html(data.responseText);

			    var object = $('#pulledData').find('div[id=bvoluem] table tr');

			    $('#pulledData').find('div[id=bvoluem] table tr').each(function()
			    {
					var currentRow = $(this);

					var col1_value = currentRow.find("td:eq(0)").text();
					var col2_value=currentRow.find("td:eq(1)").text();
	        		var col3_value=currentRow.find("td:eq(2)").text();
	        		var col4_value = currentRow.find("td:eq(3)").text();
					var col5_value=currentRow.find("td:eq(4)").text();

	        		var obj={};
					obj.col1=col1_value;
					obj.col2=col2_value;
					obj.col3=col3_value;
					obj.col4=col4_value;
					obj.col5=col5_value;
						        
					tableData.push(obj);
					;
				});

				var col = [];
				for (var i = 0; i < tableData.length; i++) {
					for (var key in tableData[i]) {
					    if (col.indexOf(key) === -1) {
					        col.push(key);
					    }
					}
				}

	        	var table = document.createElement("table");
	        	table.setAttribute('class','responstable');
			
	        	var tr = table.insertRow(-1);                   

				for (var i = 0; i < tableHead.length; i++) {
				    var th = document.createElement("th");      
				    th.innerHTML = tableHead[i];
				    tr.appendChild(th);
				}

				for (var i = 1; i < tableData.length-1; i++) {

				    tr = table.insertRow(-1);

				    for (var j = 0; j < col.length; j++) {
				        
				        var tabCell = tr.insertCell(-1);
				        tabCell.innerHTML = tableData[i][col[j]];

				        if(j==0)
			            {
			               	tabCell.innerHTML = '<a href="company.html?name=' +$.trim(shareData[i][col[j]])+ '">' + shareData[i][col[j]]+ '</a>';
			            }
			            else 
			            {
			               	tabCell.innerHTML = shareData[i][col[j]];
			            }
			            
				        if(j==2)
				        {
				            if(tableData[i][col[j]] > 0)
				            {
				           		tr.setAttribute('id','makeGreen');
				          	}
				           	else if(tableData[i][col[j]] < 0)
				            {
				               	tr.setAttribute('id','makeRed');
				            }
				        }
				    }
				}

				var divContainer = document.getElementById("showLastTrade");
				divContainer.innerHTML = "";
				divContainer.appendChild(table);
				divContainer.style.display = "";
			}
		})
	});
});