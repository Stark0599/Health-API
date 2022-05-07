# Health API
Api that work as a backend for an android app that sends context-based alarms from patients to caretakers.
This project was developed to apply knowledge about Node js, Express js and Firebase, implementing basic functionalities to test an android app.
The android app was developed with another mate in Java using Google Maps and Firebase libraries.

This api allows:
* Store own information as patient and about my caretakers using firebase.
  <p align ="center">
  <img src="https://user-images.githubusercontent.com/73082949/167236444-5143d256-a815-4bc5-9cdd-c8f8c8ca3d65.png" alt="drawing" height="400"> 
   </p>
* Verifying notifications code of caretakers, this is shared with the patient. The patient could send a request to the caretaker using the notifications code,  this request could be accepted or declined.
  <p align ="center">
  <img src="https://user-images.githubusercontent.com/73082949/167235566-2d3b533a-9b02-499c-beb3-25ca22b6f4e6.png" alt="drawing" height="400">
  <img src="https://user-images.githubusercontent.com/73082949/167235906-0f567bc5-2f72-4c76-8e7c-4c459d8fc21b.png" alt="drawing" height="400"> 
  </p>
* Send app notifications to caretaker in case of emergency using Firebase Cloud Messaging.
 <p align ="center">
  <img src="https://user-images.githubusercontent.com/73082949/167235836-bd712f3f-8a1d-4d00-9e13-34c37f665f5b.png" alt="drawing" height="400"> 
 </p>
* Send mails in case of emergency.
<p align ="center">
  <img src="https://user-images.githubusercontent.com/73082949/167237000-222178e9-23c5-4787-910a-306f3593ba86.png" alt="drawing" height="400"> 
   </p>
* Send real time location in case of emergency.

# Things to do
* Implement auth to secure the data.
* Maybe explore another data store ways to use like SQL.

# Disclaimer
* All the data used for the testing of the developed app was false.
