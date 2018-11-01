<?php
//
// gymo
// js file
// dt173g projekt
// php rest webb service 
// maria ågren 2018
//
// 

// database name: gymo
// username:gymo
// password: passgymo
// table:workout
// id(int, ai, primary key, 11), endurance(int, 11), strength(int, 11), created(timestamp, current_timestamp)
// 

//use superglobal server to get  method used to access the page
$method = $_SERVER['REQUEST_METHOD'];
//path from breaking string into array(explode()) and remove characters that are not pathinfo (trim())
$request = explode('/', trim($_SERVER['PATH_INFO'],'/'));
//to se sent data converted to json
$input = json_decode(file_get_contents('php://input'), true);

//control correct request
if($request[0] != "workout"){
    http_response_code(404);
    exit();
}

//return in json
header("Content-Type: application/json; charset=UTF-8");

//database gymo connection
$conn = mysqli_connect("localhost","gymo","passgymo","gymo") or die("Error connecting to database.");;
$db_connected = mysqli_select_db($conn, "gymo");

//use switch to chose statement due to method
switch($method) {
    case "GET":
		$sql = "SELECT id, endurance, strength,created FROM workout";
		if(isset($request[1])) $sql = $sql . " WHERE id = " . $request[1] . ";";
		break;
	case "POST":
		$sql = "INSERT INTO workout (endurance, strength) VALUES ('" . $input['endurance'] . "', '" . $input['strength'] . "');";
		break;
}

//result in an json array
$result = mysqli_query($conn, $sql) or die(mysqli_error($conn));


$workout_arr = [];
if($method != "GET") $sql = "SELECT id, endurance, strength, created FROM workout";
$result = mysqli_query($conn,$sql) or die(mysqli_error($conn));
while($row = mysqli_fetch_assoc($result)){
		$row_arr['id'] = $row['id'];
		$row_arr['endurance'] = $row['endurance'];
		$row_arr['strength'] = $row['strength'];
		$row_arr['created'] = $row['created'];
		array_push($workout_arr,$row_arr);


		
}
//close database
mysqli_close($conn);

//send back result in json
echo json_encode($workout_arr);
