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

int pin1 = 5;
int pin2 = 4;
int pin5 = 14;
int pin6 = 12;

void setup(){
  Serial.begin(9600);

  /*Inicia o WiFi no modo de soft acess point
  */
  WiFi.softAP(ssid, passWord);
  IPAddress IP = WiFi.softAPIP();

  Serial.println(IP);
  Serial.println(WiFi.localIP());

  pinMode(pin5, OUTPUT);
  pinMode(pin1, OUTPUT);
  pinMode(pin2, INPUT);
  pinMode(pin6, INPUT);

  //Inicia o server
  server.begin();

  //inicia o sistema de file do ESP
  if(!LittleFS.begin()){
    Serial.println("Erro ao abrir littleFS"); return;
  }

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

  server.on("/p1", HTTP_GET, [](AsyncWebServerRequest *request){
    if(digitalRead(pin2) == HIGH){
      request->send_P(200, "text/plain", "1");
      Serial.println("kinda");
    }else if(digitalRead(pin6) == HIGH){
      request->send_P(200, "text/plain", "-1");
      Serial.print("neg");
    }else request->send_P(204, "text/plain", "0");
  });
}

void loop(){
  digitalWrite(pin1, HIGH);
  delay(300);
  digitalWrite(pin1, LOW);
  digitalWrite(pin5, HIGH);
  delay(300);
  digitalWrite(pin5, LOW);
}

