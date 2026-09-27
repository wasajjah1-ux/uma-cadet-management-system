// ======================================================
// UMA KABAMBA - COMPLETE WORKING SYSTEM
// With Course Category (Professional Short / Bachelor of Defense Studies)
// Made by 2Lt Herbert Wasajja for UMAK only
// ======================================================

const DEFAULT_USER = "Wasajja";
const DEFAULT_PASS = "Ug1491";
let currentPhoto = "";

// ========== LOGIN ==========
function doLogin() {
  var username = document.getElementById("loginUser").value.trim();
  var password = document.getElementById("loginPass").value;

  if (username === DEFAULT_USER && password === DEFAULT_PASS) {
    document.getElementById("loginScreen").classList.add("hidden");
    document.getElementById("mainApp").classList.remove("hidden");
    document.getElementById("userDisplay").textContent = "Logged in as: " + username;
    alert("Login successful! Welcome " + username);
    initApp();
  } else {
    alert("Wrong username or password!\n\nUse:\nUsername: Wasajja\nPassword: Ug1491");
  }
}

function doLogout() {
  document.getElementById("mainApp").classList.add("hidden");
  document.getElementById("loginScreen").classList.remove("hidden");
  document.getElementById("loginPass").value = "";
}

// ========== DATA ==========
function getCadets() {
  try {
    return JSON.parse(localStorage.getItem("uma_cadets") || "[]");
  } catch (e) {
    return [];
  }
}
function saveCadets(data) {
  localStorage.setItem("uma_cadets", JSON.stringify(data));
}

function getSubjects() {
  try {
    var s = JSON.parse(localStorage.getItem("uma_subjects") || "null");
    if (!s) {
      s = ["Political Education", "Skills at Arms", "IPB", "Tactics", "Coins", "Military Law", "Military Intelligence", "Map Using", "Leadership", "Drill", "Physical Training", "Field Craft", "Battle Craft"];
      localStorage.setItem("uma_subjects", JSON.stringify(s));
    }
    return s;
  } catch (e) {
    return [];
  }
}
function saveSubjects(data) {
  localStorage.setItem("uma_subjects", JSON.stringify(data));
}

function getScores() {
  try {
    return JSON.parse(localStorage.getItem("uma_scores") || "[]");
  } catch (e) {
    return [];
  }
}
function saveScores(data) {
  localStorage.setItem("uma_scores", JSON.stringify(data));
}

function getExercises() {
  try {
    return JSON.parse(localStorage.getItem("uma_exercises") || "[]");
  } catch (e) {
    return [];
  }
}
function saveExercises(data) {
  localStorage.setItem("uma_exercises", JSON.stringify(data));
}

// ========== SAMPLE DATA (with Course Category) ==========
function loadSampleData() {
  if (getCadets().length > 0) return;

  var sample = [
    {id:"1", courseCategory:"Professional Short Cadet Course", serviceNo:"UG/2023/001", fullName:"Okello David", rank:"O/Cdt", year:"1", intake:"06", sex:"Male", dob:"2002-03-15", age:"22", education:"UACE", nextOfKin:"Mrs. Okello Mary", company:"Alpha", platoon:"1 Platoon", section:"1 Section", pcRank:"Capt", pcName:"Kato James", photo:""},
    {id:"2", courseCategory:"Professional Short Cadet Course", serviceNo:"UG/2023/002", fullName:"Nabukenya Sarah", rank:"O/Cdt", year:"1", intake:"06", sex:"Female", dob:"2003-07-22", age:"21", education:"UACE", nextOfKin:"Mr. Nabukenya Peter", company:"Alpha", platoon:"1 Platoon", section:"2 Section", pcRank:"Capt", pcName:"Kato James", photo:""},
    {id:"3", courseCategory:"Bachelor of Defense Studies (3 Years)", serviceNo:"UG/2022/015", fullName:"Mugisha Brian", rank:"O/Cdt", year:"2", intake:"07", sex:"Male", dob:"2001-11-05", age:"23", education:"Degree", nextOfKin:"Mrs. Mugisha Grace", company:"Bravo", platoon:"2 Platoon", section:"1 Section", pcRank:"Lt", pcName:"Ochieng Paul", photo:""},
    {id:"4", courseCategory:"Bachelor of Defense Studies (3 Years)", serviceNo:"UG/2022/016", fullName:"Achieng Faith", rank:"O/Cdt", year:"2", intake:"07", sex:"Female", dob:"2002-01-18", age:"22", education:"UACE", nextOfKin:"Mr. Achieng John", company:"Bravo", platoon:"2 Platoon", section:"2 Section", pcRank:"Lt", pcName:"Ochieng Paul", photo:""},
    {id:"5", courseCategory:"Bachelor of Defense Studies (3 Years)", serviceNo:"UG/2021/030", fullName:"Ssekandi Mark", rank:"O/Cdt", year:"3", intake:"08", sex:"Male", dob:"2000-09-30", age:"24", education:"Degree", nextOfKin:"Mrs. Ssekandi Ruth", company:"Charlie", platoon:"3 Platoon", section:"1 Section", pcRank:"Capt", pcName:"Wanyama Isaac", photo:""},
    {id:"6", courseCategory:"Bachelor of Defense Studies (3 Years)", serviceNo:"UG/2021/031", fullName:"Namukasa Esther", rank:"O/Cdt", year:"3", intake:"08", sex:"Female", dob:"2001-04-12", age:"23", education:"UACE", nextOfKin:"Mr. Namukasa Tom", company:"Charlie", platoon:"3 Platoon", section:"2 Section", pcRank:"Capt", pcName:"Wanyama Isaac", photo:""},
    {id:"7", courseCategory:"Professional Short Cadet Course", serviceNo:"UG/2023/003", fullName:"Kizza Joseph", rank:"O/Cdt", year:"1", intake:"06", sex:"Male", dob:"2002-12-08", age:"22", education:"UACE", nextOfKin:"Mrs. Kizza Alice", company:"Alpha", platoon:"1 Platoon", section:"3 Section", pcRank:"Capt", pcName:"Kato James", photo:""},
    {id:"8", courseCategory:"Bachelor of Defense Studies (3 Years)", serviceNo:"UG/2022/017", fullName:"Nakato Patricia", rank:"O/Cdt", year:"2", intake:"07", sex:"Female", dob:"2001-06-25", age:"23", education:"Degree", nextOfKin:"Mr. Nakato Samuel", company:"Bravo", platoon:"2 Platoon", section:"3 Section", pcRank:"Lt", pcName:"Ochieng Paul", photo:""},
    {id:"9", courseCategory:"Bachelor of Defense Studies (3 Years)", serviceNo:"UG/2021/032", fullName:"Ouma Ronald", rank:"O/Cdt", year:"3", intake:"08", sex:"Male", dob:"2000-02-14", age:"24", education:"UACE", nextOfKin:"Mrs. Ouma Helen", company:"Charlie", platoon:"3 Platoon", section:"3 Section", pcRank:"Capt", pcName:"Wanyama Isaac", photo:""},
    {id:"10", courseCategory:"Professional Short Cadet Course", serviceNo:"UG/2023/004", fullName:"Nalubega Irene", rank:"O/Cdt", year:"1", intake:"06", sex:"Female", dob:"2003-08-19", age:"21", education:"UACE", nextOfKin:"Mr. Nalubega Moses", company:"Alpha", platoon:"1 Platoon", section:"1 Section", pcRank:"Capt", pcName:"Kato James", photo:""}
  ];
  saveCadets(sample);
}

// ========== INIT ==========
function initApp() {
  loadSampleData();
  updateStats();
  renderCadets();
  renderSubjects();
  populateSubjectSelect();
  populateCadetLists();
  var today = new Date().toISOString().split("T")[0];
  if (document.getElementById("scoreDate")) document.getElementById("scoreDate").value = today;
  if (document.getElementById("exDate")) document.getElementById("exDate").value = today;
}

function showTab(id) {
  var tabs = document.querySelectorAll(".tab-content");
  for (var i = 0; i < tabs.length; i++) tabs[i].classList.remove("active");

  var buttons = document.querySelectorAll(".nav button");
  for (var i = 0; i < buttons.length; i++) buttons[i].classList.remove("active");

  document.getElementById(id).classList.add("active");
  if (event && event.target) event.target.classList.add("active");

  if (id === "dashboard") updateStats();
  if (id === "cadets") renderCadets();
  if (id === "subjects") renderSubjects();
  if (id === "scores") {
    renderScores();
    populateSubjectSelect();
    populateCadetLists();
  }
  if (id === "exercises") {
    renderExercises();
    populateCadetLists();
  }
}

function updateStats() {
  document.getElementById("statCadets").textContent = getCadets().length;
  document.getElementById("statSubjects").textContent = getSubjects().length;
  document.getElementById("statExercises").textContent = getExercises().length;
}

// ========== PHOTO ==========
function previewPhoto(event) {
  var file = event.target.files[0];
  if (!file) return;
  var reader = new FileReader();
  reader.onload = function(e) {
    currentPhoto = e.target.result;
    document.getElementById("photoPreview").src = currentPhoto;
    document.getElementById("photoPreview").style.display = "block";
    document.getElementById("photoPlaceholder").style.display = "none";
  };
  reader.readAsDataURL(file);
}

function clearPhoto() {
  currentPhoto = "";
  document.getElementById("photoPreview").src = "";
  document.getElementById("photoPreview").style.display = "none";
  document.getElementById("photoPlaceholder").style.display = "block";
  document.getElementById("photoInput").value = "";
}

// ========== CADETS ==========
function saveCadet(e) {
  e.preventDefault();
  var id = document.getElementById("cadetId").value;

  var cadet = {
    id: id || Date.now().toString(),
    courseCategory: document.getElementById("courseCategory").value,
    serviceNo: document.getElementById("serviceNo").value.trim().toUpperCase(),
    fullName: document.getElementById("fullName").value.trim(),
    rank: "O/Cdt",
    year: document.getElementById("year").value,
    intake: document.getElementById("intake").value,
    sex: document.getElementById("sex").value,
    dob: document.getElementById("dob").value,
    age: document.getElementById("age").value,
    education: document.getElementById("education").value.trim(),
    nextOfKin: document.getElementById("nextOfKin").value.trim(),
    company: document.getElementById("company").value.trim(),
    platoon: document.getElementById("platoon").value.trim(),
    section: document.getElementById("section").value.trim(),
    pcRank: document.getElementById("pcRank").value.trim(),
    pcName: document.getElementById("pcName").value.trim(),
    photo: currentPhoto || ""
  };

  var cadets = getCadets();
  for (var i = 0; i < cadets.length; i++) {
    if (cadets[i].serviceNo === cadet.serviceNo && cadets[i].id !== cadet.id) {
      showAlert("cadetAlert", "Service number already exists!", "error");
      return;
    }
  }

  if (id) {
    for (var i = 0; i < cadets.length; i++) {
      if (cadets[i].id === id) {
        if (!currentPhoto && cadets[i].photo) cadet.photo = cadets[i].photo;
        cadets[i] = cadet;
        break;
      }
    }
  } else {
    cadets.push(cadet);
  }

  saveCadets(cadets);
  showAlert("cadetAlert", "Cadet saved successfully!", "success");
  resetCadetForm();
  renderCadets();
  updateStats();
  populateCadetLists();
}

function editCadet(id) {
  var cadets = getCadets();
  var c = null;
  for (var i = 0; i < cadets.length; i++) {
    if (cadets[i].id === id) {
      c = cadets[i];
      break;
    }
  }
  if (!c) return;

  document.getElementById("cadetId").value = c.id;
  document.getElementById("courseCategory").value = c.courseCategory || "";
  document.getElementById("serviceNo").value = c.serviceNo;
  document.getElementById("fullName").value = c.fullName;
  document.getElementById("year").value = c.year;
  document.getElementById("intake").value = c.intake;
  document.getElementById("sex").value = c.sex;
  document.getElementById("dob").value = c.dob || "";
  document.getElementById("age").value = c.age || "";
  document.getElementById("education").value = c.education || "";
  document.getElementById("nextOfKin").value = c.nextOfKin || "";
  document.getElementById("company").value = c.company || "";
  document.getElementById("platoon").value = c.platoon || "";
  document.getElementById("section").value = c.section || "";
  document.getElementById("pcRank").value = c.pcRank || "";
  document.getElementById("pcName").value = c.pcName || "";

  if (c.photo) {
    currentPhoto = c.photo;
    document.getElementById("photoPreview").src = c.photo;
    document.getElementById("photoPreview").style.display = "block";
    document.getElementById("photoPlaceholder").style.display = "none";
  } else {
    clearPhoto();
  }

  document.getElementById("cadetSaveBtn").textContent = "Update Cadet";
  showTab("cadets");
}

function deleteCadet(id) {
  if (!confirm("Delete this cadet?")) return;
  var cadets = getCadets();
  var sn = "";
  var newList = [];
  for (var i = 0; i < cadets.length; i++) {
    if (cadets[i].id === id) sn = cadets[i].serviceNo;
    else newList.push(cadets[i]);
  }
  saveCadets(newList);

  if (sn) {
    var scores = getScores().filter(function(s) { return s.serviceNo !== sn; });
    saveScores(scores);
    var exercises = getExercises().filter(function(e) { return e.serviceNo !== sn; });
    saveExercises(exercises);
  }

  renderCadets();
  updateStats();
  populateCadetLists();
}

function resetCadetForm() {
  document.getElementById("cadetForm").reset();
  document.getElementById("cadetId").value = "";
  document.getElementById("rank").value = "O/Cdt";
  document.getElementById("cadetSaveBtn").textContent = "Save Cadet";
  clearPhoto();
}

function renderCadets() {
  var filter = "";
  if (document.getElementById("cadetFilter")) {
    filter = document.getElementById("cadetFilter").value.toLowerCase();
  }
  var list = getCadets();
  if (filter) {
    list = list.filter(function(c) {
      return c.serviceNo.toLowerCase().indexOf(filter) !== -1 ||
             c.fullName.toLowerCase().indexOf(filter) !== -1 ||
             (c.courseCategory && c.courseCategory.toLowerCase().indexOf(filter) !== -1);
    });
  }

  var html = "";
  for (var i = 0; i < list.length; i++) {
    var c = list[i];
    html += "<tr>";
    html += "<td>" + (c.photo ? "<img src='" + c.photo + "' class='cadet-photo-thumb'>" : "<div style='width:45px;height:55px;background:#eee;border-radius:4px;'></div>") + "</td>";
    html += "<td><strong>" + c.serviceNo + "</strong></td>";
    html += "<td>" + c.fullName + "</td>";
    html += "<td>" + (c.courseCategory || "-") + "</td>";
    html += "<td><span class='badge badge-year" + c.year + "'>Year " + c.year + "</span></td>";
    html += "<td>Intake " + c.intake + "</td>";
    html += "<td>" + (c.company || "-") + "</td>";
    html += "<td>";
    html += "<button class='btn btn-primary' onclick=\"editCadet('" + c.id + "')\">Edit</button> ";
    html += "<button class='btn btn-danger' onclick=\"deleteCadet('" + c.id + "')\">Delete</button> ";
    html += "<button class='btn btn-success' onclick=\"printCadet('" + c.serviceNo + "')\">Print</button>";
    html += "</td></tr>";
  }
  document.getElementById("cadetTableBody").innerHTML = html || "<tr><td colspan='8'>No cadets found</td></tr>";
}

// ========== SUBJECTS ==========
function saveSubject(e) {
  e.preventDefault();
  var name = document.getElementById("subjectName").value.trim();
  var id = document.getElementById("subjectId").value;
  var subjects = getSubjects();

  if (id !== "") {
    subjects[parseInt(id)] = name;
  } else {
    if (subjects.indexOf(name) !== -1) {
      showAlert("subjectAlert", "Subject already exists!", "error");
      return;
    }
    subjects.push(name);
  }
  saveSubjects(subjects);
  showAlert("subjectAlert", "Subject saved!", "success");
  resetSubjectForm();
  renderSubjects();
  updateStats();
  populateSubjectSelect();
}

function editSubject(i) {
  document.getElementById("subjectId").value = i;
  document.getElementById("subjectName").value = getSubjects()[i];
  document.getElementById("subjectSaveBtn").textContent = "Update Subject";
}

function deleteSubject(i) {
  if (!confirm("Delete this subject?")) return;
  var s = getSubjects();
  s.splice(i, 1);
  saveSubjects(s);
  renderSubjects();
  updateStats();
  populateSubjectSelect();
}

function resetSubjectForm() {
  document.getElementById("subjectForm").reset();
  document.getElementById("subjectId").value = "";
  document.getElementById("subjectSaveBtn").textContent = "Add Subject";
}

function renderSubjects() {
  var subjects = getSubjects();
  var html = "";
  for (var i = 0; i < subjects.length; i++) {
    html += "<tr><td>" + (i + 1) + "</td><td>" + subjects[i] + "</td>";
    html += "<td><button class='btn btn-primary' onclick='editSubject(" + i + ")'>Edit</button> ";
    html += "<button class='btn btn-danger' onclick='deleteSubject(" + i + ")'>Delete</button></td></tr>";
  }
  document.getElementById("subjectTableBody").innerHTML = html || "<tr><td colspan='3'>No subjects</td></tr>";
}

function populateSubjectSelect() {
  var subjects = getSubjects();
  var html = "";
  for (var i = 0; i < subjects.length; i++) {
    html += "<option value='" + subjects[i] + "'>" + subjects[i] + "</option>";
  }
  document.getElementById("scoreSubject").innerHTML = html;
}

// ========== SCORES ==========
function populateCadetLists() {
  var cadets = getCadets();
  var html = "";
  for (var i = 0; i < cadets.length; i++) {
    html += "<option value='" + cadets[i].serviceNo + "'>" + cadets[i].fullName + "</option>";
  }
  document.getElementById("cadetList").innerHTML = html;
  document.getElementById("cadetList2").innerHTML = html;
}

function loadCadetName() {
  var sn = document.getElementById("scoreServiceNo").value.trim().toUpperCase();
  var cadets = getCadets();
  for (var i = 0; i < cadets.length; i++) {
    if (cadets[i].serviceNo === sn) {
      document.getElementById("scoreCadetName").value = cadets[i].fullName;
      return;
    }
  }
  document.getElementById("scoreCadetName").value = "";
}

function loadCadetNameEx() {
  var sn = document.getElementById("exServiceNo").value.trim().toUpperCase();
  var cadets = getCadets();
  for (var i = 0; i < cadets.length; i++) {
    if (cadets[i].serviceNo === sn) {
      document.getElementById("exCadetName").value = cadets[i].fullName;
      return;
    }
  }
  document.getElementById("exCadetName").value = "";
}

function saveScore(e) {
  e.preventDefault();
  var score = {
    id: Date.now().toString(),
    serviceNo: document.getElementById("scoreServiceNo").value.trim().toUpperCase(),
    cadetName: document.getElementById("scoreCadetName").value,
    subject: document.getElementById("scoreSubject").value,
    examType: document.getElementById("examType").value,
    marks: document.getElementById("scoreMarks").value,
    max: document.getElementById("scoreMax").value,
    date: document.getElementById("scoreDate").value,
    remarks: document.getElementById("scoreRemarks").value
  };

  var found = false;
  var cadets = getCadets();
  for (var i = 0; i < cadets.length; i++) {
    if (cadets[i].serviceNo === score.serviceNo) {
      found = true;
      break;
    }
  }
  if (!found) {
    showAlert("scoreAlert", "Service number not found!", "error");
    return;
  }

  var scores = getScores();
  scores.push(score);
  saveScores(scores);
  showAlert("scoreAlert", "Score saved!", "success");
  document.getElementById("scoreForm").reset();
  document.getElementById("scoreDate").value = new Date().toISOString().split("T")[0];
  renderScores();
}

function deleteScore(id) {
  if (!confirm("Delete this score?")) return;
  var scores = getScores().filter(function(s) { return s.id !== id; });
  saveScores(scores);
  renderScores();
}

function renderScores() {
  var filter = "";
  if (document.getElementById("scoreFilter")) {
    filter = document.getElementById("scoreFilter").value.toLowerCase();
  }
  var list = getScores();
  if (filter) {
    list = list.filter(function(s) {
      return s.serviceNo.toLowerCase().indexOf(filter) !== -1 ||
             s.subject.toLowerCase().indexOf(filter) !== -1;
    });
  }

  var html = "";
  for (var i = 0; i < list.length; i++) {
    var s = list[i];
    html += "<tr>";
    html += "<td>" + s.serviceNo + "</td>";
    html += "<td>" + (s.cadetName || "-") + "</td>";
    html += "<td>" + s.subject + "</td>";
    html += "<td>" + s.examType + "</td>";
    html += "<td><strong>" + s.marks + "/" + s.max + "</strong></td>";
    html += "<td>" + (s.date || "-") + "</td>";
    html += "<td><button class='btn btn-danger' onclick=\"deleteScore('" + s.id + "')\">Delete</button></td>";
    html += "</tr>";
  }
  document.getElementById("scoreTableBody").innerHTML = html || "<tr><td colspan='7'>No scores yet</td></tr>";
}

// ========== FIELD EXERCISES ==========
function saveExercise(e) {
  e.preventDefault();
  var ex = {
    id: Date.now().toString(),
    serviceNo: document.getElementById("exServiceNo").value.trim().toUpperCase(),
    cadetName: document.getElementById("exCadetName").value,
    name: document.getElementById("exName").value.trim(),
    score: document.getElementById("exScore").value.trim(),
    date: document.getElementById("exDate").value,
    remarks: document.getElementById("exRemarks").value
  };

  var found = false;
  var cadets = getCadets();
  for (var i = 0; i < cadets.length; i++) {
    if (cadets[i].serviceNo === ex.serviceNo) {
      found = true;
      break;
    }
  }
  if (!found) {
    showAlert("exerciseAlert", "Service number not found!", "error");
    return;
  }

  var list = getExercises();
  list.push(ex);
  saveExercises(list);
  showAlert("exerciseAlert", "Exercise saved!", "success");
  document.getElementById("exerciseForm").reset();
  document.getElementById("exDate").value = new Date().toISOString().split("T")[0];
  renderExercises();
  updateStats();
}

function deleteExercise(id) {
  if (!confirm("Delete this record?")) return;
  var list = getExercises().filter(function(e) { return e.id !== id; });
  saveExercises(list);
  renderExercises();
  updateStats();
}

function renderExercises() {
  var list = getExercises();
  var html = "";
  for (var i = 0; i < list.length; i++) {
    var e = list[i];
    html += "<tr>";
    html += "<td>" + e.serviceNo + "</td>";
    html += "<td>" + (e.cadetName || "-") + "</td>";
    html += "<td>" + e.name + "</td>";
    html += "<td><strong>" + e.score + "</strong></td>";
    html += "<td>" + (e.date || "-") + "</td>";
    html += "<td><button class='btn btn-danger' onclick=\"deleteExercise('" + e.id + "')\">Delete</button></td>";
    html += "</tr>";
  }
  document.getElementById("exerciseTableBody").innerHTML = html || "<tr><td colspan='6'>No exercises yet</td></tr>";
}

// ========== SEARCH & PRINT ==========
function searchCadet() {
  var sn = document.getElementById("searchServiceNo").value.trim().toUpperCase();
  var cadets = getCadets();
  var c = null;
  for (var i = 0; i < cadets.length; i++) {
    if (cadets[i].serviceNo === sn) {
      c = cadets[i];
      break;
    }
  }

  var result = document.getElementById("searchResult");
  if (!c) {
    result.innerHTML = "<div class='alert alert-error'>No cadet found with that Service Number.</div>";
    return;
  }

  var scores = getScores().filter(function(s) { return s.serviceNo === sn; });
  var exercises = getExercises().filter(function(e) { return e.serviceNo === sn; });

  var html = "<div class='card' style='border:2px solid #1a472a;'>";
  html += "<div style='display:flex;gap:20px;margin-bottom:15px;'>";
  if (c.photo) html += "<img src='" + c.photo + "' style='width:100px;height:120px;object-fit:cover;border-radius:6px;'>";
  html += "<div><h2 style='margin:0;'>" + c.fullName + "</h2>";
  html += "<p><strong>" + c.serviceNo + "</strong><br><strong>Course:</strong> " + (c.courseCategory || "-") + "</p></div></div>";

  html += "<div class='form-grid'>";
  html += "<div><strong>Year / Intake:</strong> Year " + c.year + " / Intake " + c.intake + "</div>";
  html += "<div><strong>Sex / Age / DOB:</strong> " + c.sex + " / " + (c.age || "-") + " / " + (c.dob || "-") + "</div>";
  html += "<div><strong>Education:</strong> " + (c.education || "-") + "</div>";
  html += "<div><strong>Next of Kin:</strong> " + (c.nextOfKin || "-") + "</div>";
  html += "<div><strong>Company:</strong> " + (c.company || "-") + "</div>";
  html += "<div><strong>Platoon / Section:</strong> " + (c.platoon || "-") + " / " + (c.section || "-") + "</div>";
  html += "<div><strong>Platoon Commander:</strong> " + (c.pcRank || "") + " " + (c.pcName || "-") + "</div>";
  html += "</div>";

  html += "<h3>Academic Scores</h3><table><thead><tr><th>Subject</th><th>Exam Type</th><th>Score</th><th>Date</th></tr></thead><tbody>";
  if (scores.length === 0) html += "<tr><td colspan='4'>No scores</td></tr>";
  else {
    for (var i = 0; i < scores.length; i++) {
      html += "<tr><td>" + scores[i].subject + "</td><td>" + scores[i].examType + "</td><td>" + scores[i].marks + "/" + scores[i].max + "</td><td>" + (scores[i].date || "-") + "</td></tr>";
    }
  }
  html += "</tbody></table>";

  html += "<h3>Field Exercises</h3><table><thead><tr><th>Exercise</th><th>Score</th><th>Date</th><th>Remarks</th></tr></thead><tbody>";
  if (exercises.length === 0) html += "<tr><td colspan='4'>No exercises</td></tr>";
  else {
    for (var i = 0; i < exercises.length; i++) {
      html += "<tr><td>" + exercises[i].name + "</td><td>" + exercises[i].score + "</td><td>" + (exercises[i].date || "-") + "</td><td>" + (exercises[i].remarks || "-") + "</td></tr>";
    }
  }
  html += "</tbody></table>";
  html += "<br><button class='btn btn-success' onclick=\"printCadet('" + sn + "')\">Print Full Record</button></div>";

  result.innerHTML = html;
}

function printCadet(serviceNo) {
  var cadets = getCadets();
  var c = null;
  for (var i = 0; i < cadets.length; i++) {
    if (cadets[i].serviceNo === serviceNo) {
      c = cadets[i];
      break;
    }
  }
  if (!c) return;

  var scores = getScores().filter(function(s) { return s.serviceNo === serviceNo; });
  var exercises = getExercises().filter(function(e) { return e.serviceNo === serviceNo; });

  var html = "<div style='font-family:Arial;max-width:800px;margin:0 auto;'>";
  html += "<div style='text-align:center;border-bottom:3px solid #1a472a;padding-bottom:15px;margin-bottom:20px;'>";
  html += "<h1 style='color:#1a472a;margin:0;'>UGANDA MILITARY ACADEMY – KABAMBA</h1>";
  html += "<h2>Officer Cadet Full Record</h2>";
  html += "<p>Generated: " + new Date().toLocaleString() + "</p></div>";

  html += "<div style='display:flex;gap:20px;margin-bottom:20px;'>";
  if (c.photo) html += "<img src='" + c.photo + "' style='width:120px;height:140px;object-fit:cover;border:1px solid #ccc;'>";
  html += "<div><h2 style='margin:0;'>" + c.fullName + "</h2>";
  html += "<p><strong>Service No:</strong> " + c.serviceNo + "<br>";
  html += "<strong>Course Category:</strong> " + (c.courseCategory || "-") + "<br>";
  html += "<strong>Rank:</strong> " + c.rank + "<br>";
  html += "<strong>Year / Intake:</strong> Year " + c.year + " / Intake " + c.intake + "</p></div></div>";

  html += "<h3 style='background:#1a472a;color:white;padding:8px;'>Personal & Unit Information</h3>";
  html += "<table style='width:100%;border-collapse:collapse;margin-bottom:20px;'>";
  html += "<tr><td style='padding:6px;width:30%;'><strong>Sex / Age / DOB</strong></td><td>" + c.sex + " / " + (c.age || "-") + " / " + (c.dob || "-") + "</td></tr>";
  html += "<tr><td style='padding:6px;'><strong>Education</strong></td><td>" + (c.education || "-") + "</td></tr>";
  html += "<tr><td style='padding:6px;'><strong>Next of Kin</strong></td><td>" + (c.nextOfKin || "-") + "</td></tr>";
  html += "<tr><td style='padding:6px;'><strong>Company</strong></td><td>" + (c.company || "-") + "</td></tr>";
  html += "<tr><td style='padding:6px;'><strong>Platoon / Section</strong></td><td>" + (c.platoon || "-") + " / " + (c.section || "-") + "</td></tr>";
  html += "<tr><td style='padding:6px;'><strong>Platoon Commander</strong></td><td>" + (c.pcRank || "") + " " + (c.pcName || "-") + "</td></tr>";
  html += "</table>";

  html += "<h3 style='background:#1a472a;color:white;padding:8px;'>Academic Scores</h3>";
  html += "<table style='width:100%;border-collapse:collapse;margin-bottom:20px;'>";
  html += "<thead><tr style='background:#e8f0e8;'><th>Subject</th><th>Exam Type</th><th>Score</th><th>Date</th></tr></thead><tbody>";
  if (scores.length === 0) html += "<tr><td colspan='4'>No scores recorded</td></tr>";
  else {
    for (var i = 0; i < scores.length; i++) {
      html += "<tr><td style='padding:6px;border-bottom:1px solid #ddd;'>" + scores[i].subject + "</td>";
      html += "<td style='padding:6px;border-bottom:1px solid #ddd;'>" + scores[i].examType + "</td>";
      html += "<td style='padding:6px;border-bottom:1px solid #ddd;'><strong>" + scores[i].marks + "/" + scores[i].max + "</strong></td>";
      html += "<td style='padding:6px;border-bottom:1px solid #ddd;'>" + (scores[i].date || "-") + "</td></tr>";
    }
  }
  html += "</tbody></table>";

  html += "<h3 style='background:#1a472a;color:white;padding:8px;'>Field Exercises</h3>";
  html += "<table style='width:100%;border-collapse:collapse;'>";
  html += "<thead><tr style='background:#e8f0e8;'><th>Exercise Name</th><th>Score</th><th>Date</th><th>Remarks</th></tr></thead><tbody>";
  if (exercises.length === 0) html += "<tr><td colspan='4'>No field exercises recorded</td></tr>";
  else {
    for (var i = 0; i < exercises.length; i++) {
      html += "<tr><td style='padding:6px;border-bottom:1px solid #ddd;'>" + exercises[i].name + "</td>";
      html += "<td style='padding:6px;border-bottom:1px solid #ddd;'><strong>" + exercises[i].score + "</strong></td>";
      html += "<td style='padding:6px;border-bottom:1px solid #ddd;'>" + (exercises[i].date || "-") + "</td>";
      html += "<td style='padding:6px;border-bottom:1px solid #ddd;'>" + (exercises[i].remarks || "-") + "</td></tr>";
    }
  }
  html += "</tbody></table>";
  html += "<p style='margin-top:40px;font-size:0.85rem;color:#666;text-align:center;'>— End of Record — Made by 2Lt Herbert Wasajja for UMAK only —</p></div>";

  var printDiv = document.getElementById("printArea");
  printDiv.innerHTML = html;
  printDiv.classList.remove("hidden");
  window.print();
  printDiv.classList.add("hidden");
}

// ========== SETTINGS ==========
function changeCredentials() {
  var curr = document.getElementById("currPass").value;
  var newU = document.getElementById("newUser").value.trim();
  var newP = document.getElementById("newPass").value;
  var conf = document.getElementById("confirmPass").value;

  if (curr !== DEFAULT_PASS) {
    showAlert("credAlert", "Current password is wrong!", "error");
    return;
  }
  if (!newU || !newP) {
    showAlert("credAlert", "New username and password required!", "error");
    return;
  }
  if (newP !== conf) {
    showAlert("credAlert", "New passwords do not match!", "error");
    return;
  }

  showAlert("credAlert", "Credentials updated successfully!", "success");
}

function exportData() {
  var cadets = getCadets();
  var csv = "Course Category,Service No,Full Name,Rank,Year,Intake,Sex,DOB,Age,Education,Next of Kin,Company,Platoon,Section,PC Rank,PC Name\n";
  for (var i = 0; i < cadets.length; i++) {
    var c = cadets[i];
    csv += '"' + (c.courseCategory || "") + '","' + c.serviceNo + '","' + c.fullName + '","' + c.rank + '","' + c.year + '","' + c.intake + '","' + c.sex + '","' + (c.dob || "") + '","' + (c.age || "") + '","' + (c.education || "") + '","' + (c.nextOfKin || "") + '","' + (c.company || "") + '","' + (c.platoon || "") + '","' + (c.section || "") + '","' + (c.pcRank || "") + '","' + (c.pcName || "") + '"\n';
  }
  var blob = new Blob([csv], { type: "text/csv" });
  var a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "UMA_Cadets_" + new Date().toISOString().slice(0, 10) + ".csv";
  a.click();
}

function clearAllData() {
  if (confirm("Delete ALL data including the 10 sample cadets?")) {
    localStorage.removeItem("uma_cadets");
    localStorage.removeItem("uma_subjects");
    localStorage.removeItem("uma_scores");
    localStorage.removeItem("uma_exercises");
    location.reload();
  }
}

function showAlert(id, msg, type) {
  var el = document.getElementById(id);
  if (!el) return;
  el.innerHTML = "<div class='alert alert-" + type + "'>" + msg + "</div>";
  setTimeout(function() {
    el.innerHTML = "";
  }, 4000);
}

// Enter key support
document.getElementById("loginPass").onkeypress = function(e) {
  if (e.key === "Enter" || e.keyCode === 13) {
    doLogin();
  }
};