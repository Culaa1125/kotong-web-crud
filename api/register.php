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

if ($method === "POST") {
    $data = json_decode(file_get_contents("php://input"));
    $username = $data->username;
    $password = $data->password;

    // cek jika username sudah ada
    $check = mysqli_query($db_conn, "SELECT * FROM user WHERE username='$username'");
    if (mysqli_num_rows($check) > 0) {
        echo json_encode(["success" => false, "message" => "Username sudah digunakan"]);
        return;
    }

    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    $sql = "INSERT INTO user (username, password) VALUES ('$username', '$hashedPassword')";
    if (mysqli_query($db_conn, $sql)) {
        echo json_encode(["success" => true, "message" => "User berhasil didaftarkan"]);
    } else {
        echo json_encode(["success" => false, "message" => "Gagal mendaftar user"]);
    }
}
