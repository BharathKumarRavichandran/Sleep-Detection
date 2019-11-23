#include <stdlib.h>

/*-----------------ESP8266 Serial WiFi Module---------------*/
#define SSID "Dracula" // "SSID-WiFi Name" 
#define PASS "shakeabi" // "WiFi Password"
#define server "siliconcupcake.wtf"

// #define IP "184.106.153.149"// thingspeak.com ip
// String msg = "GET /update?key=DKFNB9UUTA4MOLJP"; // Change it with your key...
/*-----------------------------------------------------------*/

int led = 13;
unsigned long timerStart = 0; // the time the delay started
char server[] = "";

void setup() {
  pinMode(led, OUTPUT);   // initialize the digital pin as an output.
  digitalWrite(led, HIGH); // turn led on
  timerStart = millis();
  attachInterrupt(digitalPinToInterrupt(interruptPin), resetTimer, RISING);  // If interrupt, reset timerStart
  
  // Connect to WiFi
  if(Serial.find("OK")){
    connectWiFi();
  }
}

void loop() {
  if ( ((millis() - timerStart) >= 10000) ) {
    digitalWrite(led, LOW);
    Serial.println("Turned LED Off");

    // Send HTTP request to server and start alarm sound
  }

 
}

void sendPOSTRequest() {
  char postData[] = "{""LDRValue"": 88888888}";
  Serial.println("\nStarting connection to server to send POST data...");
  if (client.connect(server, 8000)) {
    Serial.println("connected to server");
    client.println("POST / HTTP/1.1");
    client.println("Host: 192.168.2.116");
    client.println("Content-Type: application/json");
    client.print("Content-Length: ");
    client.println(strlen(postData));
    client.println();
    client.print(postData);
  }
  while (client.connected()) { 
    while (client.available()) {
      client.flush();
    }
  }
  client.stop();
}

void resetTimer() {
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
