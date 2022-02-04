$(document).ready(function(){ //OC, REF, FACTURA, MAT, CANTIDAD
								// ORDEN: PROV, REF, FACT, OC, ART, CANT
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

function ExportToExcel(type, fn, dl) {
	var elt = document.getElementById('matAduanaTable');
	var wb = XLSX.utils.table_to_book(elt, { sheet: "sheet1" });
	console.log('Llega');
	return dl ?
		XLSX.write(wb, { bookType: type, bookSST: true, type: 'base64' }):
		XLSX.writeFile(wb, fn || ('MySheetName.' + (type || 'xlsx')));
}

function parse() {
	var fileUpload = document.getElementById("upload");
	var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
	if (regex.test(fileUpload.value.toLowerCase())) {
		if (typeof (FileReader) != "undefined") {
			var reader = new FileReader();
			reader.onload = function (e) {
				var body = document.getElementById('matAduanaBody')
				var rows = e.target.result.split("\n");
				for (var i = 0; i < rows.length; i++) {
					var cells = rows[i].split(",");
					if (cells.length > 1) {
						var row = body.insertRow(-1);
						for (var j = 0; j < cells.length; j++) {
							var cell = row.insertCell(-1);
							cell.innerHTML = cells[j];
						}
					}
				}	
			}
			reader.readAsText(fileUpload.files[0]);
		} else {
			alert("This browser does not support HTML5.");
		}
	} else {
		alert("Please upload a valid CSV file.");
	}
}
