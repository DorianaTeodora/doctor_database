let specialitiesDetails = []
const BASE_SERVER_URL = "http://doriana-teodora.developerakademie.com/DoctorDatabase/DoctorDatabase/";
let myJSON;
let docsList = [];
let answers = [];
let datesArray = [];
let myObjectContactFormular;
let docsListFormulars = [];
let arrayPic = ["img/5stars.png", "img/4stars.png"];
let symptomsNumber = 0;
let indexSpeciality = 0;
let selectedImage = 0;
let indexProfileVar = 3;
/*
* function load()- loads the JSON from the Server. The answer can be successful or failed
*/
function load() {
    loadJSONfromServer()
        .then(function (result) {
            console.log('Laden erfolgreich!', result);
            myJSON = JSON.parse(result);
            for (let i = 0; i < myJSON.length; i++) {
                docsList[i] = myJSON[i];
            }
            displayDocsImages();
            Profiles();
        })
        .catch(function (error) {
            console.error('Fehler beim laden!', error);
        });
}

function loadJSONfromServer() {
    return new Promise(function (resolve, reject) {
        let xhttp = new XMLHttpRequest();
        let serverURL = BASE_SERVER_URL + 'get_doctors.php';
        xhttp.open('GET', serverURL);
        xhttp.onreadystatechange = function (oEvent) {
            if (xhttp.readyState === 4) {
                let response = JSON.parse(xhttp.responseText);
                if (xhttp.status >= 200 && xhttp.status <= 399) {
                    resolve(xhttp.responseText);
                } else {
                    reject(response.error);
                }
            }
        };
        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhttp.send();
    });
};

/*
*function chooseSpecialist()- display the name and the rating from doctors
*/
function chooseSpecialist() {
    let pic = 0;
    let specialistChoosed = document.getElementById("specialists").value;
    for (let i = 0; i < docsList.length; i++) {
        if (i % 2 != 0) {
            pic = 0;
        }
        else pic = 1;
        if ((docsList[i].specialities == specialistChoosed)) {
            let specialityDetails = `
            <div class="rating">
            <h3 class="h3">DR ${docsList[i].first_name} ${docsList[i].last_name}</h3>
            <img class="starPic"src=${arrayPic[pic]}>
            </div>
            `;
            document.getElementById("mainPageBewertung").innerHTML = specialityDetails;
        }
    }
}

/*
*function Profiles()-displays the Profiles for each doctor: name, picture, opening hours and address.On the buttons:back and next you change the profile
*/
function Profiles() {
    for (let x = docsList.length - 1; x >= 0; x--) {
        let item = generateItemProfiles(docsList[x], x);
        let item2 = document.getElementById("idHtmlSecond").insertAdjacentHTML("beforeend", item);
        console.log("Profile-DR" + x);
    }
}


/*Creates a Contact Formular for each Doctor*/
function createContactformular(indexDoc) {
    document.getElementById("chatbot").style.display = "none";
    let dateLayout = formularLayoutInHtml(indexDoc);
    let insertItem = document.getElementById("popUpDate" + indexDoc).innerHTML = formularLayoutInHtml(indexDoc);
    document.getElementById("popUpDate" + indexDoc).style.display = "block";
}

/*Displays the photos from the Doctors in a circle form */
function displayDocsImages() {
    for (let i = 0; i < docsList.length; i++) {
        let itemImage = createCircleImages(i);
        let docs = document.getElementById("images").insertAdjacentHTML("beforeend", itemImage);
    }
}

/*Set up an Appointment, display a chatbot*/
function SetUpAppointment(indexDoc) {
    let chatbot = SetUpAppointmentLayout(indexDoc);
    let insertChatbot = document.getElementById("chatbot").innerHTML = chatbot;
    document.getElementById("chatbot").style.display = "block";
}

/*
*function sendMessageWithChatbot()-an automatic answer comes, with the date saved from input.
*/
function sendMessageWithChatbot(indexDoc) {
    let setDate = document.getElementById("meeting-time").value;
    let dateFix = `
    <span class="setDate">${setDate}</span>
    `;
    document.getElementById("chatbot").insertAdjacentHTML("beforeend", dateFix);
    let answerSiri = sendMessageWithChatbotLayout(indexDoc);
    document.getElementById("chatbot").insertAdjacentHTML("beforeend", answerSiri);
}

/*
*function showDialogBoxSymptoms()-displays the first input with the Symptoms
*/
function showDialogBoxSymptoms() {
    let itemMainSymptome = showDialogBoxSymptomsLayout();
    document.getElementById("dialogBox").innerHTML = itemMainSymptome;
    document.getElementById("dialogBox").style.display = "block";
}

/*
* showTheFixedAppointment()-gives an automatic answer with the fixed Appointment to a specific Doctor
*/
function showTheFixedAppointment(xIndexDoc) {
    let displayAppointment = showTheFixedAppointmentLayout(xIndexDoc);
    let displayAppointmentInsert = document.getElementById("test").innerHTML = displayAppointment;
    document.getElementById("popUpDate" + xIndexDoc).style.display = "none";
    document.getElementById("test").style.display = "block";
    setTimeout(closeDocAnswer, 3000);
}
/*
*the button NEXT function,to change the profil. The Profile container is to left displaced
*/
let doctors = [];
let currentDoctor;
let currentDoctorIndex = 0;
function goNext() {
    if (currentDoctorIndex >= 4) currentDoctorIndex = 0;
    document.getElementById("profile-" + currentDoctorIndex).style.display = "none";
    ++currentDoctorIndex;
    document.getElementById("profile-" + currentDoctorIndex).style.display = "flex";
    currentDoctor = docsList[currentDoctorIndex];
    console.log(currentDoctor);
    console.log(currentDoctorIndex);
}

/*
*the button BACK function,to change the profil. The Profile container is to right displaced
*/
function goBack() {
    if (currentDoctorIndex == 0) {
        currentDoctorIndex = 4;
        document.getElementById("profile-" + 0).style.display = "none";
        document.getElementById("profile-" + 1).style.display = "none";
        document.getElementById("profile-" + 2).style.display = "none";
        document.getElementById("profile-" + 3).style.display = "none";
        //document.getElementById("profile-" + currentDoctorIndex).style.display = "flex";
    }
    currentDoctor = docsList[currentDoctorIndex];
    document.getElementById("profile-" + currentDoctorIndex).style.display = "flex";
    --currentDoctorIndex;
    console.log(currentDoctor);
    console.log(currentDoctorIndex);
}

/*the contactForm will be closed*/
function closeContactFormular(indexDoc) {
    document.getElementById("popUpDate" + indexDoc).style.display = "none";
}

/*
*saveAdate()-creates an input to introduce the name and Phone number from the User
*/
function saveAdate(indexDoc) {
    let first_name = document.getElementById("first_name").value;
    let last_name = document.getElementById("last_name").value;
    let telefonr = document.getElementById("telefonnumber".value);
    myObjectContactFormular = {
        'first_name': first_name,
        'last_name': last_name,
        'telefon_number': telefonr,
    }
    docsListFormulars.push(myObjectContactFormular);
    showTheFixedAppointment(indexDoc);
}

/*
*closeDocAnswer()-close the automatic answer to 3 seconds
*/
function closeDocAnswer() {
    document.getElementById("test").style.display = "none";
}

/*
*filterSymptoms()-made to create the checkbox input with the symptoms
*/
function filterSymptoms() {
    let index;
    let selectedSymptom = document.getElementById("mainSymptoms").value;
    let i = 0;
    for (i = 0; i < mySymptomsObject.length; i++) {
        for (let j = 0; j < mySymptomsObject[i].symptoms.length; j++) {
            if (selectedSymptom == mySymptomsObject[i].symptoms[j]) {
                index = i;
            }
        }
    }
    createCheckbox(index);
}

/*create a layout for the checkbox*/
function createCheckbox(position) {
    for (let j1 = 0; j1 < mySymptomsObject[position].symptoms.length; j1++) {
        let itemDialogBoxSymptoms = createCheckboxLayout(j1, position);
        document.getElementById("symptomsBox").insertAdjacentHTML("beforeend", itemDialogBoxSymptoms);
        document.getElementById("symptomsBox").style.display = "block";
        document.getElementById("showDialogBox").style.display = "none";
    }
    let btnTOCLoseDialogBoxSimptoms = `<button class="goBtn"onclick="closeDialogBoxSymptoms(${position})" id="goBtn">GO</button>
    `;
    document.getElementById("btnCloseTheWindowSymptoms").innerHTML = btnTOCLoseDialogBoxSimptoms;
    document.getElementById("btnCloseTheWindowSymptoms").style.display = "block";
}

/*Hide the OK button from the Dialog Window Symptoms*/
function closeDialogBoxSymptoms(number) {
    symptomsNumber = 0;
    for (let k = 0; k < mySymptomsObject[number].symptoms.length; k++) {
        let answer = document.getElementById("symptom" + k);
        if (answer.checked == true) {
            symptomsNumber++;
            console.log(k + "true");
        }
        else {
            console.log(k + "false");
        }
    }
    if (symptomsNumber >= 3) {
        diagnosticThePatient(number);
    }
    else if (symptomsNumber < 3) {
        informThePatient();
    }
    let btnCloseInformation = `<button class="closeBtn"onclick="closeDisplayInformation()" id="closeBtn">Close</button>`;
    document.getElementById("diseaseInformationBtnClose").innerHTML = btnCloseInformation;
}

/*the Patient will be diagnosed*/
function diagnosticThePatient(number) {
    document.getElementById("diseaseInformation").innerHTML = mySymptomsObject[number].notice;
    document.getElementById("diseaseInformationName").innerHTML = mySymptomsObject[number].disease;
    document.getElementById("diseaseInformation").style.display = "block";
    document.getElementById("diseaseInformationBtnClose").style.display = "block";
}

/*the patient will be informed*/
function informThePatient() {
    document.getElementById("diseaseInformation").innerHTML = "Contact your familiy doctor to determine, if you need to see a specialist";
    document.getElementById("diseaseInformation").style.display = "block";
    document.getElementById("diseaseInformationBtnClose").style.display = "block";
}
/*
*closeDisplayInformation()-close the Display Information
*/
function closeDisplayInformation() {
    document.getElementById("diseaseInformation").style.display = "none";
    document.getElementById("diseaseInformation").innerHTML = "";
    document.getElementById("diseaseInformationName").innerHTML = "";
    document.getElementById("symptomsBox").innerHTML = "";
    document.getElementById("symptomsBox").style.display = "none";
    document.getElementById("goBtn").innerHTML = "";
    document.getElementById("btnCloseTheWindowSymptoms").style.display = "none";
    document.getElementById("showDialogBox").style.display = "block";
    document.getElementById("diseaseInformationBtnClose").style.display = "none";
}

/*
*dialogBoxCheckDoc()-displays the container with the 4 main symptoms
*/
function dialogBoxCheckDoc() {
    document.getElementById("checkDoc").style.display = "block";
}

/*
*closeInformationDialogBox()-close the container with the 4 main symptoms
*/
function closeInformationDialogBox() {
    document.getElementById("checkDoc").style.display = "none";
    document.getElementById("dialogBox").style.display = "none";
}
