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

int pinP1Up = 5;
int pinP1Down = 4;
int pinP2Up = 0;
int pinP2Down = 2;

void setup(){
  Serial.begin(9600);

  /*Inicia o WiFi no modo de soft acess point que permite ao usuario acessar a ESP8266 sabendo a senha e o SSID
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


  //Trata todos os pedidos de arquivo ou de estado
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
    if(digitalRead(pinP1Up) == HIGH && digitalRead(pinP1Down) == HIGH){
      request->send_P(204, "text/plain", "0");
    }else if(digitalRead(pinP1Up) == HIGH ){
      request->send_P(200, "text/plain", "-1");
    }else if(digitalRead(pinP1Down) == HIGH){
      request->send_P(200, "text/plain", "1");
    }else request->send_P(204, "text/plain", "0");
  });

  server.on("/p2", HTTP_GET, [](AsyncWebServerRequest *request){
    if(digitalRead(pinP2Up) == HIGH && digitalRead(pinP2Down) == HIGH){
      request->send_P(204, "text/plain", "0");
    }else if(digitalRead(pinP2Up) == HIGH ){
      request->send_P(200, "text/plain", "-1");
    }else if(digitalRead(pinP2Down) == HIGH){
      request->send_P(200, "text/plain", "1");
    }else request->send_P(204, "text/plain", "0");
  });
}

void loop(){
  /*Não é necessario colocar algo no loop considerando que os dados só seram madados quando pedidos e se no momento
  de serem pedidos estavam sendo processados.
  Essa é a vantagem de escolher a biblioteca de servidor assincrono.
  */
}

