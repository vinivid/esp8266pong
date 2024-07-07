/*Made by vini
https://github.com/vinivid
*/

#include <ESP8266WiFi.h>
#include <ESPAsyncTCP.h>
#include <ESPAsyncWebServer.h>
#include <FS.h>
#include <LittleFS.h>

//Coloca o nome do WiFi e a senha a ser usada
const char* ssid = "esp8266pong";
const char* passWord = "123456789";

//inicializa um instancia servidor no port 80
AsyncWebServer server(80);
AsyncEventSource events("/events");

int pinP1Up = 5;//D1
int pinP1Down = 4;//D2
int pinP2Up = 14;//D5
int pinP2Down = 12;//D6

void setup(){
  Serial.begin(9600);

  /*Inicia o WiFi no modo de soft acess point que permite ao usuario acessar a ESP8266 sabendo a senha e o SSID
  */
  WiFi.softAP(ssid, passWord);
  IPAddress IP = WiFi.softAPIP();

  Serial.println(IP);
  Serial.println(WiFi.localIP());

  pinMode(pinP1Up, INPUT);
  pinMode(pinP1Down, INPUT);
  pinMode(pinP2Up, INPUT);
  pinMode(pinP2Down, INPUT);

  //Inicia o server
  server.begin();

  //inicia o sistema de file do ESP
  if(!LittleFS.begin()){
    Serial.println("Erro ao abrir littleFS"); return;
  }

  server.addHandler(&events);

  //Sends the html, css and javascript to the interface
  server.on("/", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send(LittleFS, "/index.html");
    Serial.println("Sucess html");
  });

  server.on("/look.css", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send(LittleFS, "/look.css");
    Serial.println("Sucess css");
  });

  server.on("/control.js", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send(LittleFS, "/control.js");
    Serial.println("Sucess js");
  });

}

void loop(){
  delay(110);
  if(digitalRead(pinP1Up) == HIGH) events.send("-1p1", "buttonPress");
  if(digitalRead(pinP1Down) == HIGH) events.send("1p1", "buttonPress");
  if(digitalRead(pinP2Up) == HIGH) events.send("-1p2", "buttonPress");
  if(digitalRead(pinP2Down) == HIGH) events.send("1p2", "buttonPress");
}