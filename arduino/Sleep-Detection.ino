#include <stdlib.h>
#include <WiFi.h>

WiFiClient client;
/*-----------------ESP8266 Serial WiFi Module---------------*/
#define SSID "cbk" // "SSID-WiFi Name"
#define PASS "25052000" // "WiFi Password
#define IP "184.106.153.149"// thingspeak.com ip
String msg = "GET /update?key=ELG43NLIZT6C4OGI"; //change it with your key...
/*-----------------------------------------------------------*/

//int BAUD_RATE = 9600;
//int BLINK_LIMIT = 10;
int interruptPin = P1_6;
int led = RED_LED;
int error;
unsigned long timerStart = 0; // the time the delay started
char SERVER[] = "siliconcupcake.wtf";
int SERVER_PORT = 3000;

void setup() {
 Serial.begin(115200);
 Serial.println("AT");
 delay(5000);
 //Serial.begin(9600);
  timerStart = millis();
  //attachInterrupt(digitalPinToInterrupt(interruptPin), resetTimer, RISING);  // If interrupt, reset timerStart
 
  // Connect to WiFi
 if(Serial.find("OK")){
   connectWiFi();
  }
}

void loop() {
  error=0;
  if(!digitalRead(interruptPin))
  {
   resetTimer();
  }
  if ( ((millis() - timerStart) >= ((5000)) ) ) {
    Serial.println("The driver is sleeping.");
    // Send HTTP request to server and start alarm sound
      sendPOSTRequest();
      sendThingSpeakRequest();
      resetTimer();
  }
  else{
    //sendThingSpeakRequest(0);
  }
}

void sendPOSTRequest() {
  Serial.println("Initialising HTTP Request.");
  // close any connection before send a new request.
  // This will free the socket on the WiFi shield
  client.stop();
  // if there's a successful connection:
  if (client.connect(SERVER, SERVER_PORT)) {
    Serial.println("Attempting connection to server");
    char msgg[200];
    sprintf(msgg,"POST /alert");
    // send the HTTP PUT request:
    client.println(msgg);
    client.println("Host: siliconcupcake.wtf");
    client.println("User-Agent: Energia/1.1");
    client.println("Connection: close");
    client.println();
  }
  else {
    // if you couldn't make a connection:
    Serial.println("Connection failed");
  }
}

void sendThingSpeakRequest(){
  String cmd = "AT+CIPSTART=\"TCP\",\"";
  cmd += IP;
  cmd += "\",80";
  Serial.println(cmd);
  delay(2000);
  if(Serial.find("Error")){
    return;
  }
  cmd = msg ;
  cmd += "&field2=";
  /*
  if(value==1){
    cmd += "1";
  }
  else{
    cmd += "0";
  }*/
  cmd += "1";
  cmd += "\r\n";
  Serial.print("AT+CIPSEND=");
  Serial.println(cmd.length());
  if(Serial.find(">")){
    Serial.print(cmd);
  }
  else{
    Serial.println("AT+CIPCLOSE");
    //Resend...
    error=1;
  }
}

void resetTimer() {
  Serial.println("Resetting timer.");
  timerStart = millis();
}

 
boolean connectWiFi(){
  Serial.println("AT+CWMODE=1");
  delay(2000);
  String cmd="AT+CWJAP=\"";
  cmd+=SSID;
  cmd+="\",\"";
  cmd+=PASS;
  cmd+="\"";
  Serial.println(cmd);
  delay(5000);
  if(Serial.find("OK")){
    return true;
  }else{
    return false;
  }
}