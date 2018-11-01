//
// gymo
// js file
// dt173g projekt
// php rest webb service 
// maria ågren 2018
//
// 

"use strict";

var URL = "http://localhost/gymo/src/gymolist.php/workout/" 

 //dom onload
document.addEventListener("DOMContentLoaded", function(){ 

 
  // Add minutes in Endurance and Strength POST
    document.getElementById("add").addEventListener("click", function(ev){
        let endurance = document.getElementById("endurance").value;
        let strength = document.getElementById("strength").value;
       
        if( !(strength != '' && endurance != '' ) ) location.reload();
       
        let json =  {"endurance": endurance, "strength": strength};
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST", URL, true);
        xmlhttp.setRequestHeader('Content-Type', 'application/json');
        xmlhttp.send( JSON.stringify(json) );

        xmlhttp.onload = function() {
            location.reload();
        
    }
  });



  
  // show training - GET
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
           if (xmlhttp.status == 200) {


                var jsonData = JSON.parse( xmlhttp.responseText );
               
                var revjsonData = jsonData.reverse();


                
          for(var i=0; i<3; i++){
       
                document.getElementById("latest").innerHTML += "<p>"+jsonData[i].created+"</p>";   
            } 

            if(revjsonData[0].endurance< 20){
                            document.getElementById("minutes-endurance").innerHTML += "<p class='minutes'>"+revjsonData[0].endurance+"  minuter </p><p class='pepp'>Kom igen, det kan du slå!</p>" ;   
                        }else{
                            document.getElementById("minutes-endurance").innerHTML += "<p class='minutes'>"+revjsonData[0].endurance+"  minuter </p><p class='pepp'>Bra jobbat!</p>" ; 
                        }
                        
            if(revjsonData[0].strength< 20) {
                        document.getElementById("minutes-strength").innerHTML += "<p class='minutes'>"+revjsonData[0].strength+"  minuter </p><p class='pepp'>Kom igen, ta i hårdare!</p>" ;   
                        }else{
                            document.getElementById("minutes-strength").innerHTML += "<p class='minutes'>"+revjsonData[0].strength+"  minuter </p><p class='pepp'>Starkt jobbat!</p>" ; 
                        }   
                        
                        
            //table for all training
            for (var i = 0; i<revjsonData.length; i++){
                    document.getElementById("all").innerHTML += "</td><td>" +revjsonData[i].endurance+ " min</td><td>" +revjsonData[i].strength+ " min</td><td>" +jsonData[i].created+ "</td><td>";



            }
           }
           else if (xmlhttp.status == 400) {
              alert('There was an error 400');
           }
           else {
               alert('something else other than 200 was returned');
           }
        }
    };

    xmlhttp.open("GET", URL, true);
    xmlhttp.send();

}); 
