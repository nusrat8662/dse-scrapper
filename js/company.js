
jQuery.noConflict()(function($){
  $(document).ready(function () {  

    var company = window.location.href;    
    var splitString = company.split("=");
    var companyName = splitString[1];
                        
    var url='http://www.dsebd.org/displayCompany.php?name='+companyName;
    var proxy='https://cors-anywhere.herokuapp.com/';

    $.ajax({
      url: proxy+url,
      complete: function(data)
      {
          $('#pulledData').html(data.responseText);

          $('#market2').html($('#pulledData').find('table[id=company]:eq(4)'));
          $('#market').html($('#pulledData').find('table[id=company]:eq(3)'));

          $('#basic2').html($('#pulledData').find('table[id=company]:eq(5)'));
          $('#basic').html($('#pulledData').find('table[id=company]:eq(4)'));

          $('#agm').html($('#pulledData').find('table[id=company]:eq(6)'));
          $('#agmTitle').html($('#pulledData').find('table[id=company]:eq(5)'));

          $('#interimTable').html($('#pulledData').find('table[id=company]:eq(6)'));
          
          $('#address').html($('#pulledData').find('table[id=company]:eq(20)'));
          
          var title = $('#pulledData').find('table[id=company] tr th').text();
          title = title.split("Company Name:");
          title = title[1];
          title = title.split("Market");
          title = title[0];

          var h2Div = document.getElementById("titleH");
          var h2 = document.createElement("h2");
          h2.classList.add('wow', 'animated', 'bounceInLeft');
          var node = document.createTextNode(title);
          h2.appendChild(node);
          h2Div.appendChild(h2);

      }
    })
  });
});