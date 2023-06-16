const int ledPin1 =  54;
const int ledPin2 =  55;
const int ledPin3 =  56;
const int ledPin4 =  57;
const int ledPin5 =  58;
const int ledPin6 =  59;
const int ledPin7 =  60;
const int ledPin8 =  61;

void setup() {
  Serial.begin(9600);
 
  pinMode(ledPin1, OUTPUT);
  pinMode(ledPin2, OUTPUT);
  pinMode(ledPin3, OUTPUT);
  pinMode(ledPin4, OUTPUT);
  pinMode(ledPin5, OUTPUT);
  pinMode(ledPin6, OUTPUT);
  pinMode(ledPin7, OUTPUT);
  pinMode(ledPin8, OUTPUT);
 
  digitalWrite(ledPin1, LOW);
  digitalWrite(ledPin2, LOW);
  digitalWrite(ledPin3, LOW);
  digitalWrite(ledPin4, LOW);
  digitalWrite(ledPin5, LOW);
  digitalWrite(ledPin6, LOW);
  digitalWrite(ledPin7, LOW);
  digitalWrite(ledPin8, LOW);
}
void loop() {
  if(Serial.available()>0)
  {
    String inBytes = Serial.readStringUntil('\n');
    if(inBytes == "on_1")digitalWrite(ledPin1, HIGH);
    if(inBytes == "off_1")digitalWrite(ledPin1, LOW);
    if(inBytes == "on_2")digitalWrite(ledPin2, HIGH);
    if(inBytes == "off_2")digitalWrite(ledPin2, LOW);
    if(inBytes == "on_3")digitalWrite(ledPin3, HIGH);
    if(inBytes == "off_3")digitalWrite(ledPin3, LOW);
    if(inBytes == "on_4")digitalWrite(ledPin4, HIGH);
    if(inBytes == "off_4")digitalWrite(ledPin4, LOW);
    if(inBytes == "on_5")digitalWrite(ledPin5, HIGH);
    if(inBytes == "off_5")digitalWrite(ledPin5, LOW);
    if(inBytes == "on_6")digitalWrite(ledPin6, HIGH);
    if(inBytes == "off_6")digitalWrite(ledPin6, LOW);
    if(inBytes == "on_7")digitalWrite(ledPin7, HIGH);
    if(inBytes == "off_7")digitalWrite(ledPin7, LOW);
    if(inBytes == "on_8")digitalWrite(ledPin8, HIGH);
    if(inBytes == "off_8")digitalWrite(ledPin8, LOW);
    if(inBytes == "on_all"){
      digitalWrite(ledPin1, HIGH);
      digitalWrite(ledPin2, HIGH);
      digitalWrite(ledPin3, HIGH);
      digitalWrite(ledPin4, HIGH);
      digitalWrite(ledPin5, HIGH);
      digitalWrite(ledPin6, HIGH);
      digitalWrite(ledPin7, HIGH);
      digitalWrite(ledPin8, HIGH);
      }
      if(inBytes == "off_all"){
      digitalWrite(ledPin1, LOW);
      digitalWrite(ledPin2, LOW);
      digitalWrite(ledPin3, LOW);
      digitalWrite(ledPin4, LOW);
      digitalWrite(ledPin5, LOW);
      digitalWrite(ledPin6, LOW);
      digitalWrite(ledPin7, LOW);
      digitalWrite(ledPin8, LOW);
        } 
}
}
