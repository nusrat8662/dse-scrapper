
jQuery.noConflict()(function($){
	$(document).ready(function()
	{
		checkDebtDiv();			
	});

	function checkDebtDiv()
	{
		if($('#showLastTrade').is(':visible'))
		{ 
	    	pushDebtData();
		} 
		else 
		{
			setTimeout(checkDebtDiv, 500); 
		}
	}

	function pushDebtData()
	{
		var debtTableData=[];
		var debtTableHead = ['Trading Code','LTP','Change','CloseP','YCP'];

		$('#pulledData').find('div[id=btrade] table tr').each(function()
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
						        
			debtTableData.push(obj);
		});

		var col = [];
		for (var i = 0; i < debtTableData.length; i++) 
		{
			for (var key in debtTableData[i]) 
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

		for (var i = 0; i < debtTableHead.length; i++) 
		{
			var th = document.createElement("th");      
			th.innerHTML = debtTableHead[i];
			tr.appendChild(th);
		}

			
		for (var i = 1; i < debtTableData.length-1; i++) 
		{
			tr = table.insertRow(-1);

			for (var j = 0; j < col.length; j++) 
			{
				var tabCell = tr.insertCell(-1);
				tabCell.innerHTML = debtTableData[i][col[j]];

			 	if(j==0)
			    {
			        tabCell.innerHTML = '<a href="company.html?name=' +$.trim(debtTableData[i][col[j]])+ '">' + debtTableData[i][col[j]]+ '</a>';
			    }
			    else 
			    {
			        tabCell.innerHTML = debtTableData[i][col[j]];
			    }				

				if(j==2)
				{
				 	if(debtTableData[i][col[j]] > 0)
				    {
				        tr.setAttribute('id','makeGreen');
				    }
				    else if(debtTableData[i][col[j]] < 0)
				    {
				        tr.setAttribute('id','makeRed');
				    }
				}
			}
		}

		var divContainer = document.getElementById("showDebt");
		divContainer.innerHTML = "";
		divContainer.appendChild(table);		
	}
});
