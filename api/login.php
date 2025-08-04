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

    $sql = "SELECT * FROM users WHERE username = '$username'";
    $result = mysqli_query($db_conn, $sql);

    if (mysqli_num_rows($result) > 0) {
        $user = mysqli_fetch_assoc($result);

        if (password_verify($password, $user['password'])) {
            echo json_encode([
                "success" => true,
                "user" => [
                    "userid" => $user['userid'],
                    "username" => $user['username']
                ]
            ]);
        } else {
            echo json_encode(["success" => false, "message" => "Password salah"]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Username tidak ditemukan"]);
    }
}
