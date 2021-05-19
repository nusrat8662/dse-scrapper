

jQuery.noConflict()(function($){
	$(document).ready(function(){

	checkPulledTable();

});

function negative()
{
	shareData.sort(function(a, b){
		return a.col7-b.col7; 
	});
					
	var col = [];
	for (var i = 0; i < shareData.length; i++) {
		for (var key in shareData[i]) {
			if (col.indexOf(key) === -1) {
				col.push(key);
			}
		}
	}

    var table = document.createElement("table");
    table.setAttribute('class','responstable');


    var tr = table.insertRow(-1);                

	for (var i = 0; i < shareTableHead.length; i++) {
		var th = document.createElement("th");     
		th.innerHTML = shareTableHead[i];
		tr.appendChild(th);
	}

	for (var i = 1; i <= 10; i++) {
		tr = table.insertRow(-1);

		for (var j = 0; j < col.length; j++) {
			var tabCell = tr.insertCell(-1);
			if(j==0)
			{
			    tabCell.innerHTML = '<a href="company.html?name=' +$.trim(shareData[i][col[j]])+ '">' + shareData[i][col[j]]+ '</a>';
			}
			else 
			{
			    tabCell.innerHTML = shareData[i][col[j]];
			}

			if(j==6)
			{
				tr.setAttribute('id','makeShareRed');		                
			}
		}
	}

	var divContainer = document.getElementById("negative_share");
	divContainer.innerHTML = "";
	divContainer.appendChild(table);
	divContainer.style.display = "";
}

function checkPulledTable()
{
	if($('#showtable').is(':visible'))
	{ 
    	negative();
	} 
	else 
	{
		setTimeout(checkPulledTable, 500); 
	}
}
});