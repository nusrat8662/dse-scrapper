var url='http://www.dsebd.org/';
var proxy='https://cors-anywhere.herokuapp.com/';

jQuery.noConflict()(function($){
	$(document).ready(function()
	{
		checkDiv();
	});

	function checkDiv()
	{
		if($('#showLastTrade').is(':visible'))
		{ 
    		pushData();
		} 
		else 
		{
		    setTimeout(checkDiv, 50); 
		}
	}

	function pushData()
	{
		var changeTableData=[];
	    var changeTableHead = ['Trading Code','LTP','Change','CloseP','YCP'];

		$('#pulledData').find('div[id=change] table tr').each(function()
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
					        
			changeTableData.push(obj);
		});

		var col = [];
		for (var i = 0; i < changeTableData.length; i++) 
		{
			for (var key in changeTableData[i]) 
			{
				if (col.indexOf(key) === -1) 
				{
				    col.push(key);
				}
			}
		}
		
        var table = document.createElement("table");
        table.setAttribute('class','responstable');


        var tr = table.insertRow(-1);                

		for (var i = 0; i < changeTableHead.length; i++) 
		{
			var th = document.createElement("th");      
			th.innerHTML = changeTableHead[i];
			tr.appendChild(th);
		}

		
		for (var i = 1; i < changeTableData.length-1; i++) 
		{
			tr = table.insertRow(-1);

			for (var j = 0; j < col.length; j++) 
			{
				var tabCell = tr.insertCell(-1);
			 	tabCell.innerHTML = changeTableData[i][col[j]];

			 	if(j==0)
			    {
			        tabCell.innerHTML = '<a href="company.html?name=' +$.trim(changeTableData[i][col[j]])+ '">' + changeTableData[i][col[j]]+ '</a>';
			    }
			    else 
			    {
			        tabCell.innerHTML = changeTableData[i][col[j]];
			    }

			   	if(j==2)
			   	{
			 		if(changeTableData[i][col[j]] > 0)
			        {
			            tr.setAttribute('id','makeGreen');
			        }
			        else if(changeTableData[i][col[j]] < 0)
			        {
			            tr.setAttribute('id','makeRed');
			        }
			    }
			}
		}

		var divContainer = document.getElementById("showChange");
		divContainer.innerHTML = "";
		divContainer.appendChild(table);		
	}
});

