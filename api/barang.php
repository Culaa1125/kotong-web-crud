<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Pragma: no-cache");

$db_conn = mysqli_connect("localhost", "root", "", "reactphp");
if($db_conn === false){
    die("ERROR: Could Not Connect".mysqli_connect_error());
}

$method = $_SERVER['REQUEST_METHOD'];

switch($method){
    case "GET":
        $path = explode('/', $_SERVER['REQUEST_URI']);

        if(isset($path[4]) && is_numeric($path[4])){
            $json_array = array();
            $idbarang = intval($path[4]);
            
            $getbarangrow = mysqli_query($db_conn, "SELECT * FROM tbl_barang WHERE idbarang='$idbarang'");
            if(mysqli_num_rows($getbarangrow) > 0){
                $barangrow = mysqli_fetch_assoc($getbarangrow);
                $json_array = array(
                    'id' => $barangrow['idbarang'],
                    'namabarang' => $barangrow['namabarang'],
                    'stokbarang' => $barangrow['stokbarang'],
                    'status' => $barangrow['status']
                );
                echo json_encode($json_array);
            } else {
                echo json_encode(["result" => "Data tidak ditemukan"]);
            }
            return;
        } else {
            $allbarang = mysqli_query($db_conn, "SELECT * FROM tbl_barang ORDER BY idbarang");
            $json_array = array();
            if(mysqli_num_rows($allbarang) > 0){
                while($row = mysqli_fetch_assoc($allbarang)) {
                    $json_array[] = array(
                        "id" => $row['idbarang'],
                        "namabarang" => $row['namabarang'],
                        "stokbarang" => $row['stokbarang'],
                        "status" => $row['status']
                    );
                }
                echo json_encode($json_array);
            } else {
                echo json_encode([]);
            }
            return;
        }
    break;

    case "POST":
        $barangpostdata = json_decode(file_get_contents("php://input"));
        $namabarang = $barangpostdata->namabarang;
        $stokbarang = $barangpostdata->stokbarang;

        $status = ($stokbarang > 0) ? 1 : 0;

        $result = mysqli_query($db_conn, 
            "INSERT INTO tbl_barang(namabarang, stokbarang, status) 
            VALUES('$namabarang', '$stokbarang', '$status')"
        );

        if($result){
            echo json_encode(["success" => "Data Barang Telah Dimasukkan!"]);
        } else {
            echo json_encode(["success" => "Tolong Check Kembali Data Barang!"]);
        }
        return;
    break;


    case "PUT":
        $barangUpdate = json_decode(file_get_contents("php://input"));
        $idbarang = $barangUpdate->id;
        $namabarang = $barangUpdate->namabarang;
        $stokbarang = $barangUpdate->stokbarang;

        $status = ($stokbarang > 0) ? 1 : 0;

        $updateData = mysqli_query($db_conn, 
            "UPDATE tbl_barang 
             SET namabarang = '$namabarang', stokbarang = '$stokbarang', status = '$status' 
             WHERE idbarang = '$idbarang'"
        );

        if($updateData){
            echo json_encode(["success" => "Data Barang Telah Diperbaharui!"]);
        } else {
            echo json_encode(["success" => "Tolong Check Kembali Data Barang!"]);
        }
        return;
    break;

    case "DELETE";
        $path = explode('/', $_SERVER["REQUEST_URI"]);
        $id = $path[4];
        $result = mysqli_query($db_conn, "DELETE FROM tbl_barang WHERE idbarang = '$id'");

        if($result){
            mysqli_query($db_conn, "SET @num := 0");
            mysqli_query($db_conn, "UPDATE tbl_barang SET idbarang = @num := (@num+1)");
            mysqli_query($db_conn, "ALTER TABLE tbl_barang AUTO_INCREMENT = 1");

            echo json_encode(["success" => "Data Barang Telah Dihapus dan ID direset!"]);
        } else {
            echo json_encode(["success" => "Tolong Check Kembali Data Barang!"]);
        }
        return;
    break;

}
?>
