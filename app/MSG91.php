<?php

namespace app;

/**
* class MSG91 to send SMS on Mobile Numbers.
* @author Shashank Tiwari
*/
class MSG91 {

    function __construct() {

    }

    private $SENDER_ID = 'Kafo';
    private $USER = "ppa277";
    private $PASSWORD = "dnat121717";
    private $LANG = 1;
    private $ROUTE_NO = 4;
    private $RESPONSE_TYPE = 'json';


   

    public function sendSMS($OTP, $mobileNumber){
        $isError = 0;
        $errorMessage = true;

        //Your message to send, Adding URL encoding.
        $message = urlencode("Welcome to www.codershood.info , Your OPT is : $OTP");
     

        //Preparing post parameters
        $postData = array(

            
            'User' => $this->USER,
            'Pass' => $this->PASSWORD,
            'From' => $this->SENDER_ID,
            'Gsm' => $mobileNumber,
            'Msg' => $OTP,
           // 'route' => $this->ROUTE_NO,
            //'response' => $this->RESPONSE_TYPE
        );
     
        $url = "https://services.mtnsyr.com:7443/General/MTNSERVICES/ConcatenatedSender.aspx";
     
        $ch = curl_init();
        curl_setopt_array($ch, array(
            CURLOPT_URL => $url,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => $postData
        ));
     
     
        //Ignore SSL certificate verification
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
     
     
        //get response
        $output = curl_exec($ch);

        echo json_encode($output);
        die();
     
        //Print error if any
        if (curl_errno($ch)) {
            $isError = true;
            $errorMessage = curl_error($ch);
        }
        curl_close($ch);
        if($isError){
            return array('error' => 1 , 'message' => $errorMessage);
        }else{
            return array('error' => 0 );
        }
    }
}
?>