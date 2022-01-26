$(document).ready(function(){
	$("#matFiltro").on("keyup", function() {
	  var value = $(this).val().toLowerCase();
	  $("#matAduanaBody tr").filter(function() {
		$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
	  });
	});
});

$(document).keyup(function(event) {
    if ($("#canMaterial").is(":focus") && event.key == "Enter") {
        addMaterial();
    }
});

$.get("MOCK_DATA.csv", function(response, status){
	console.log('Holaaaa');
    if(status=="succes"){
		console.log('Hola mundo')
        var data = $.csv.toArrays(response); 
        var html = ''; 
        for(var row in data) { 
            html += '<tr>\r\n';
            for(var item in data[row]) { 
            html += '<td>' + data[row][item] + '</td>\r\n'; } 
            html += '</tr>\r\n'; 
        } 
        $('#contents').html(html);
    }
});

function addMaterial() {
	table = document.getElementById('matAduanaTable');
	row = table.insertRow(-1);
	cell = row.insertCell(-1);
	cell.innerHTML = $('#numParte').val();;
	cell = row.insertCell(-1);
	cell.innerHTML = $('#canMaterial').val();
	$('#numParte').val("");
	$('#canMaterial').val("");
	numParte.focus();
}

function parse() {
	var fileUpload = document.getElementById("upload");
	var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
	if (regex.test(fileUpload.value.toLowerCase())) {
		if (typeof (FileReader) != "undefined") {
			var reader = new FileReader();
			reader.onload = function (e) {
				var table = document.createElement("table");
				var rows = e.target.result.split("\n");
				for (var i = 0; i < rows.length; i++) {
					var cells = rows[i].split(",");
					if (cells.length > 1) {
						var row = table.insertRow(-1);
						for (var j = 0; j < cells.length; j++) {
							var cell = row.insertCell(-1);
							cell.innerHTML = cells[j];
						}
					}
				}
				var dvCSV = document.getElementById("dvCSV");
				dvCSV.innerHTML = "";
				dvCSV.appendChild(table);
			}
			reader.readAsText(fileUpload.files[0]);
		} else {
			alert("This browser does not support HTML5.");
		}
	} else {
		alert("Please upload a valid CSV file.");
	}
}
