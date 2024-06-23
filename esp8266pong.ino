#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <ESPAsyncTCP.h>
#include <ESPAsyncWebServer.h>
#include <FS.h>
#include "LittleFS.h"

// assigning the pins to be used
const int buttonYUp = 5;
const int buttonYDown = 4;

//size of the player pong racket
int p1bary = 0;
int p1size = 5;

//position of the ball in the plane
int ballx = 0;
int bally = 0;

//the direction the ball is going to go depending on the state of the game
int currxdir = -1;

//limits of the plane
int yaxis = 50;
int xaxis = 50;

const char* ssid = "PongNoESP";
const char* password = "1234";

AsyncWebServer server(80);

void setupPin(void){
  pinMode(buttonYUp, INPUT);
  pinMode(buttonTDown, INPUT);
}

void setup() {
  Serial.begin(9600);

  if(!LittleFS.begin()){
    Serial.println("Error in LittleFS");
    return;
  }

  

  setupPin();
}

void loop() {
  int leftButton = digitalRead(buttonYUp);
  int rightButton = digitalRead(buttonYDown);

}
