<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

$db_conn = mysqli_connect("localhost", "root", "", "reactphp");
if($db_conn === false){
    die("ERROR: Could Not Connect".mysqli_connect_error());
}

$method = $_SERVER['REQUEST_METHOD'];

//echo "test-----".$method; die;
switch($method){
    case "GET";
        $path = explode('/', $_SERVER['REQUEST_URI']);

        if(isset($path[4]) && is_numeric($path[4])){
            $json_array = array();
            $idbarang =  $path[4];
            
            $getbarangrow = mysqli_query($db_conn, "SELECT * FROM tbl_user WHERE idbarang='$idbarang'");
            while($barangrow = mysqli_fetch_array($getbarangrow)){
                $json_array['rowBarangdata'] = array('id' => $barangrow['idbarang'], 'namabarang' => $barangrow['namabarang'], 'stokbarang' => $barangrow['stokbarang'], 'status' => $barangrow['status']);
            }
            echo json_encode($json_array['rowBarangdata']);
            return;
        }else{
            $allbarang = mysqli_query($db_conn, "SELECT * FROM tbl_user");
            if(mysqli_num_rows($allbarang) > 0){
                while($row = mysqli_fetch_array($allbarang)) {
                    $json_array["barangdata"][] = array("id" => $row['idbarang'], "namabarang" => $row['namabarang'], "stokbarang" => $row['stokbarang'], "status" => $row['status']);
                }
                echo json_encode($json_array["barangdata"]);
                return ;
            } else{
                echo json_encode(["result" => "Please check the Data"]);
                return;
            }       
        }
    break;

    case "POST";
        $barangpostdata = json_decode(file_get_contents("php://input"));
        //echo "success data";
        //print_r($userpostdata); die;
        $namabarang = $barangpostdata -> namabarang;
        $stokbarang = $barangpostdata -> stokbarang;
        $status = $barangpostdata -> status;
        $result = mysqli_query($db_conn, "INSERT INTO tbl_user(namabarang, stokbarang, status) 
        VALUES('$namabarang', '$stokbarang', '$status')");

        if($result){
            echo json_encode(["success" => "Data Barang Telah Dimasukkan!"]);
            return;
        } else{
            echo json_encode(["success" => "Tolong Check Kembali Data Barang!"]);
            return;
        }
    break;

    case "PUT";
        $barangUpdate = json_decode(file_get_contents("php://input"));
        $idbarang = $barangUpdate -> id;
        $namabarang = $barangUpdate -> namabarang;
        $stokbarang = $barangUpdate -> stokbarang;
        $status = $barangUpdate -> status;

        $updateData = mysqli_query($db_conn, "UPDATE tbl_user SET namabarang = '$namabarang', stokbarang = '$stokbarang', status = '$status' WHERE idbarang = '$idbarang'");
        if($updateData){
            echo json_encode(["success" => "Data Barang Telah Diperbaharui!"]);
            return;
        } else{
            echo json_encode(["success" => "Tolong Check Kembali Data Barang!"]);
            return;
        }
        print_r($barangUpdate); die;

    break;

    case "DELETE";
        $path = explode('/', $_SERVER["REQUEST_URI"]);
        
        $result = mysqli_query($db_conn, "DELETE FROM tbl_user WHERE idbarang = '$path[4]'");
        if($result){
            echo json_encode(["success" => "Data Barang Telah Dihapus!"]);
            return;
        } else{
            echo json_encode(["success" => "Tolong Check Kembali Data Barang!"]);
            return;
        }
    break;


}

?>