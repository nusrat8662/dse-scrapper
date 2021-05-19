var shareUrl='http://www.dsebd.org/latest_share_price_all.php';
		
var proxy='https://cors-anywhere.herokuapp.com/';


var shareData=[];

var shareTableHead = ['TRADING CODE','LTP*','HIGH','LOW','CLOSEP*','YCP','% CHANGE','TRADE','VALUE(mn)','VOLUME'];

jQuery.noConflict()(function($){
	$(document).ready(function(){
		$.ajax({
			url: proxy+shareUrl,
			complete: function(data){
				$('#pulledShareData').html(data.responseText);
				$('#pulledShareData').find('table tr').each(function(){
				var currentRow = $(this);

				var col1_value = currentRow.find("td:eq(1)").text();
				var col2_value=currentRow.find("td:eq(2)").text();
        		var col3_value=currentRow.find("td:eq(3)").text();
        		var col4_value = currentRow.find("td:eq(4)").text();
				var col5_value=currentRow.find("td:eq(5)").text();
        		var col6_value=currentRow.find("td:eq(6)").text();
        		var col7_value = currentRow.find("td:eq(7)").text();
				var col8_value=currentRow.find("td:eq(8)").text();
        		var col9_value=currentRow.find("td:eq(9)").text();
        		var col10_value=currentRow.find("td:eq(10)").text();

        		var obj={};
				obj.col1=col1_value;
				obj.col2=col2_value;
				obj.col3=col3_value;
				obj.col4=col4_value;
				obj.col5=col5_value;
				obj.col6=col6_value;
				obj.col7=col7_value;
				obj.col8=col8_value;
				obj.col9=col9_value;
				obj.col10=col10_value;
					        
				shareData.push(obj);
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

			    for (var i = 1; i < shareData.length; i++) {
			        
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
			               	if(shareData[i][col[j]] > 0)
			                {
			                	tr.setAttribute('id','makeShareGreen');
			                }
				            else if(shareData[i][col[j]] < 0)
				            {
				               	tr.setAttribute('id','makeShareRed');
				            }
				        }
			        }
			    }

			    var divContainer = document.getElementById("showtable");
			    divContainer.innerHTML = "";
			    divContainer.appendChild(table);
			    divContainer.style.display = "";
			}
		});		
	});
});