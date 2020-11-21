/*
 *the Array: mySymptomsObject- is an Array with Objects that saves the Disease Name,the Symptoms and an advice for the patient 
 */
let mySymptomsObject = [
    {
        disease: "Appendicitis",
        symptoms: [
            "Dull pain near the navel or the upper abdomen that becomes sharp as it moves to the lower right abdomen",
            "Loss of appetite",
            "Nausea and/or vomiting soon after abdominal pain begins",
            "Abdominal swelling",
            "Fever of 99-102 degrees Fahrenheit"
        ],
        notice: "That are the symptoms of appendicitis, go to Emergency."
    },
    {
        disease: "Heart attack",
        symptoms: [
            "severe pain in the left chest area / behind the sternum",
            "shortness of breath",
            "anxiety"
        ],
        notice: "Call an ambulance, that is an emergency.This symptoms are typically to a heart attack!"
    },
    {
        disease: "Stroke",
        symptoms: [
            "Visual impairment",
            "Speech and language comprehension disorder",
            "Paralysis, numbness",
            "Vertigo with unsteady gait",
            "Very severe headache"
        ],
        notice: "It should be viewed as a life-threatening emergency.Call the ambulance!"
    },
    {
        disease: "Chronic kidney disease",
        symptoms: [
            "oedema",
            "blood in urine",
            "muscle cramps",
            "weight loss and poor appetite"
        ],
        notice: "Symptoms that could be caused by kidney disease, contact your familiy Doctor to send you to specialist."
    },
    {
        disease: "Bronchial asthma",
        symptoms: [
            "Shortness of breath",
            "Tightness of chest",
            "Wheezing",
            "Excessive coughing or a cough that keeps you awake at night"
        ],
        notice: "Keep Calm! Fear and panic only lead to more shortness of breath, which in certain circumstances can lead to a serious lack of oxygen.Adopt a posture that makes breathing easier (driver's seat, riding seat) and take the right medication (if possible according to the prescribed self-treatment plan).Call a doctor if necessary."
    }
]

function generateItemProfiles(profile, x) {
    return `
    <div class="positionProfiles">
       <div class="profiles"id="profile-${x}">
       <div>
        <img class="profilImg" src=http://doriana-teodora.developerakademie.com/DoctorDatabase/DoctorDatabase/${docsList[x].img}>
        <h2>${docsList[x].title} ${docsList[x].first_name} ${docsList[x].last_name}</h2>
        <span>${docsList[x].specialities}</span>
       </div>
       <ul> 
        <h2 class="openingHours">Opening Hours</h2>
       <li>Monday ${docsList[x].opening_hours.monday}</li>
       <li>Tuesday ${docsList[x].opening_hours.tuesday}</li>
       <li>Wednesday ${docsList[x].opening_hours.wednesday}</li>
       <li>Thursday${docsList[x].opening_hours.thursday}</li>
       <li>Friday ${docsList[x].opening_hours.friday}</li>
       <li>Saturday${docsList[x].opening_hours.saturday}</li>
       <li>Sunday ${docsList[x].opening_hours.sunday}</li>
       </ul>
       <div class="adress">
       <h2 class="adressText">Adress:</h2>
       <span class="adressText">${docsList[x].street}</span>
       <span class="adressText">${docsList[x].zipcode}</span>
       <span class="adressText">${docsList[x].city}</span>
       </div>
        </div>
      </div>
       `;
}


function formularLayoutInHtml(indexDoc) {
    return `<div id="formular"class="formular">
    <label for="birthday">First Name</label>
    <input type="text" name="birthday"id="first_name" class="inputCont">
    <label for="birthday">Last Name</label>
    <input type="text" name="birthday"id="last_name" class="inputCont">
    <label for="birthday">Telefon Number</label>
    <input type="number" name="birthday"id="telefonnumber" class="inputCont">
    <button class="Savebtn"onclick="saveAdate(${indexDoc})">Save</button>
    <button class="closeContactFormular"onclick="closeContactFormular(${indexDoc})">X</button>
  </div>`;
}
function createCircleImages(i) {
    return `
    <div class="nameAndImg" id="nameAndImg${i}">
    <img class="imgDocs" src=http://doriana-teodora.developerakademie.com/DoctorDatabase/DoctorDatabase/${docsList[i].img}>
    <h3>Dr. ${docsList[i].first_name + " " + docsList[i].last_name}</h3>
    <button class="appointment" onclick="SetUpAppointment(${i})">Online Appointment</button>
    <div id="popUpDate${i}" class="popUpDate"></div>
    </div>
    `;
}

function SetUpAppointmentLayout(indexDoc) {
    return `
    <div >
    <span class="chatbotText">Do you want to set up a Appointment by the DR. ${docsList[indexDoc].first_name} ${docsList[indexDoc].last_name}?Choose one of the following Dates!
    </span>
    
    <input type="datetime-local" id="meeting-time" class="chatbotInput" 
       name="meeting-time" value="new Date()">
      
    <button class="chatbotSend"onclick="sendMessageWithChatbot(${indexDoc})">OK</button>
    </div>
    `;
}

function sendMessageWithChatbotLayout(indexDoc) {
    return `<div>
<span class="chatbotText">
Your Appointment is fixed.Send us by Contact Form your Name and Telefonnummber!
</span>
<button class="contactForm"onclick="createContactformular(${indexDoc})">Go to contact Form</button>
</div>`;
}

function showDialogBoxSymptomsLayout() {
    return `
<select id="mainSymptoms">
        <option id="mainSymptom">${mySymptomsObject[0].symptoms[2]}</option>
        <option id="mainSymptom">${mySymptomsObject[1].symptoms[0]}</option>
        <option id="mainSymptom">${mySymptomsObject[2].symptoms[2]}</option>
        <option id="mainSymptom">${mySymptomsObject[3].symptoms[1]}</option>
        <option id="mainSymptom">${mySymptomsObject[4].symptoms[2]}</option>
    </select>
`;
}

function showTheFixedAppointmentLayout(xIndexDoc) {
    return `
    <div>
    <span>Your personal Data is saved.We will contact you! See you soon! ${docsList[xIndexDoc].first_name} ${docsList[xIndexDoc].last_name} </span>
    </div>
    `;
}

function createCheckboxLayout(j1, position) {
    return `
    <input type="checkbox" id="symptom${j1}" >
    <label for="symptom"> ${mySymptomsObject[position].symptoms[j1]}</label><br></br>
    `;
}