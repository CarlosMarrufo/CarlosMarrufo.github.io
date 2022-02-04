<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="script.js"></script>
    <script type="text/javascript" src="https://unpkg.com/xlsx@0.15.1/dist/xlsx.full.min.js"></script>
    <title>aEa</title>
</head>
<?php

$mysqli = new mysqli('local.soldaduras.com.mx', 'cmarrufo', 'B@53%de%D4t05', 'aduana');

if ($mysqli->connect_error) {
    die('Error de conexión (' . $mysqli->connect_errno . ') '
            . $mysqli->connect_error);
}
echo 'Éxito... ' . $mysqli->host_info . "\n";

$mysqli->close();

?>
<body>
    <h1 class="a">mataduana</h1>
    <div class="inp-material" id="inp-material">
        <input type="text" name="numParte" id="numParte" placeholder="Número de parte">
        <input type="text" name="canMaterial" id="canMaterial" placeholder="Cantidad en aduana">
        <input type="button" id="addBtn" onclick="addMaterial();" value="Agregar">
        <input type="text" name="matFiltro" id="matFiltro" placeholder="Buscar">
    </div>

    <div id="tableContainer">
        <table class="mat-aduana" id="matAduanaTable">
            <thead>
                <tr class="mat-aduana__header">
                    <th>Número de parte</th>
                    <th>Cantidad en aduana</th>
                </tr>
            </thead>
            <tbody id="matAduanaBody">
            </tbody>
        </table>
    </div>
    
    <input id="upload" type="file">
    <button id="parse" onclick="parse()">Parse</button>
    <button id="export" onclick="ExportToExcel('xlsx')">Exportar</button>
</body>
</html>