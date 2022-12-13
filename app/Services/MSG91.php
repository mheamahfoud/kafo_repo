<?php

namespace App\Services;
use Illuminate\Support\Facades\Http;
/**
* class MSG91 to send SMS on Mobile Numbers.
* @author Shashank Tiwari
*/
class MSG91 {

    function __construct() {

    }

    const  SENDER_ID = 'Kafo';
    const  USER = "ppa277";
    const  PASSWORD = "dnat121717";
    const  LANG = 1;
    const  URL = "https://services.mtnsyr.com:7443/General/MTNSERVICES/ConcatenatedSender.aspx";



   

    public static  function sendSMS($otp,$mobileNumber){
  
            $response = Http::get(self::URL, [
           'User' => self::USER,// 'ppa277',
            'Pass' => self::PASSWORD,//'dnat121717',
            'From' =>self::SENDER_ID,// 'Kafo',
            'Gsm' => $mobileNumber,
            'Msg' =>'Kafo App OTP is '. $otp,
              'Lang' => self::LANG,
        ]);
       
        
        
      
     if ($response->getStatusCode() == 200) { // 200 OK
          $response_data = $response->getBody()->getContents();
      //      echo json_encode($response_data);
      //  die();
    
       }
        
  
    }
}
?>