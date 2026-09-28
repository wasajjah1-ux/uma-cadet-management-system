/* ============================================
   UMA Kabamba – Cadet Management System
   Complete JavaScript
   ============================================ */

const DEFAULT_USER = "Wasajja";
const DEFAULT_PASS = "Ug1491";

let currentPhoto = "";
let currentCategory = "";
let currentCadetIndex = 0;
let currentAlumniIndex = 0;
let currentUser = DEFAULT_USER;
let currentStudentSN = "";

/* ==================== LOGIN ==================== */
function switchLogin(type) {
  document.getElementById("tabAdmin").classList.toggle("active", type === "admin");
  document.getElementById("tabStudent").classList.toggle("active", type === "student");
  document.getElementById("adminLogin").classList.toggle("hidden", type !== "admin");
  document.getElementById("studentLogin").classList.toggle("hidden", type !== "student");
}

function doAdminLogin() {
  const username = document.getElementById("loginUser").value.trim();
  const password = document.getElementById("loginPass").value;

  if (username === DEFAULT_USER && password === DEFAULT_PASS) {
    currentUser = username;
    document.getElementById("loginScreen").classList.add("hidden");
    document.getElementById("mainApp").classList.remove("hidden");
    document.getElementById("userDisplay").textContent = "Logged in as: " + username;
    initApp();
    startOfficerAnimation();
  } else {
    alert("Wrong Admin username or password!\n\nUse:\nUsername: Wasajja\nPassword: Ug1491");
  }
}

function doStudentLogin() {
  const username = document.getElementById("stuUser").value.trim().toLowerCase();
  const password = document.getElementById("stuPass").value.trim().toUpperCase();

  if (!username || !password) {
    alert("Please enter both username and Army Number");
    return;
  }

  const cadets = getCadets();
  let found = null;
  for (let i = 0; i < cadets.length; i++) {
    if (cadets[i].serviceNo === password) {
      found = cadets[i];
      break;
    }
  }

  if (!found) {
    alert("Army Number not found in the system.\n\nPlease check your Service Number or contact the Writing Team.");
    return;
  }

  currentStudentSN = found.serviceNo;
  currentUser = username;

  document.getElementById("loginScreen").classList.add("hidden");
  document.getElementById("studentApp").classList.remove("hidden");
  document.getElementById("stuDisplay").textContent = "Student: " + found.fullName;
  document.getElementById("stuWelcome").textContent = "Welcome, " + found.fullName;
  document.getElementById("stuServiceNo").textContent =
    "Service No: " + found.serviceNo + " | " + (found.courseCategory || "");

  loadStudentData(found.serviceNo);
}

function doLogout() {
  document.getElementById("mainApp").classList.add("hidden");
  document.getElementById("studentApp").classList.add("hidden");
  document.getElementById("loginScreen").classList.remove("hidden");
  document.getElementById("loginPass").value = "";
  document.getElementById("stuPass").value = "";
  document.getElementById("mainNav").style.display = "none";
  document.getElementById("welcome").classList.add("active");
  currentStudentSN = "";
}

/* ==================== DATA HELPERS ==================== */
function getCadets() {
  try { return JSON.parse(localStorage.getItem("uma_cadets") || "[]"); }
  catch (e) { return []; }
}
function saveCadets(data) {
  localStorage.setItem("uma_cadets", JSON.stringify(data));
}

function getSubjects() {
  try {
    let s = JSON.parse(localStorage.getItem("uma_subjects") || "null");
    if (!s) {
      s = [
        "Political Education", "Skills at Arms", "IPB", "Tactics", "Coins",
        "Military Law", "Military Intelligence", "Map Using", "Leadership",
        "Drill", "Physical Training", "Field Craft", "Battle Craft"
      ];
      localStorage.setItem("uma_subjects", JSON.stringify(s));
    }
    return s;
  } catch (e) { return []; }
}
function saveSubjects(data) {
  localStorage.setItem("uma_subjects", JSON.stringify(data));
}

function getScores() {
  try { return JSON.parse(localStorage.getItem("uma_scores") || "[]"); }
  catch (e) { return []; }
}
function saveScores(data) {
  localStorage.setItem("uma_scores", JSON.stringify(data));
}

function getExercises() {
  try { return JSON.parse(localStorage.getItem("uma_exercises") || "[]"); }
  catch (e) { return []; }
}
function saveExercises(data) {
  localStorage.setItem("uma_exercises", JSON.stringify(data));
}

function getAlumni() {
  try { return JSON.parse(localStorage.getItem("uma_alumni") || "[]"); }
  catch (e) { return []; }
}
function saveAlumniData(data) {
  localStorage.setItem("uma_alumni", JSON.stringify(data));
}

function getUpdates() {
  try { return JSON.parse(localStorage.getItem("uma_updates") || "[]"); }
  catch (e) { return []; }
}
function saveUpdates(data) {
  localStorage.setItem("uma_updates", JSON.stringify(data));
}

/* ==================== INIT & SAMPLE DATA ==================== */
function loadSampleData() {
  if (getCadets().length > 0) return;

  const sample = [
    {id:"y1-1",courseCategory:"Bachelor of Defense Studies (3 Years)",year:"1",serviceNo:"UG/2024/001",fullName:"Okello David",rank:"O/Cdt",sex:"Male",dob:"2003-03-15",age:"21",education:"UACE",nextOfKin:"Mrs. Okello Mary",company:"Alpha",platoon:"1 Platoon",section:"1 Section",pcRank:"Capt",pcName:"Kato James",intake:"06",photo:"",enteredBy:"Wasajja",enteredDate:new Date().toLocaleString(),lastAccessedBy:"Wasajja",printedBy:""},
    {id:"y1-2",courseCategory:"Bachelor of Defense Studies (3 Years)",year:"1",serviceNo:"UG/2024/002",fullName:"Nabukenya Sarah",rank:"O/Cdt",sex:"Female",dob:"2004-07-22",age:"20",education:"UACE",nextOfKin:"Mr. Nabukenya Peter",company:"Alpha",platoon:"1 Platoon",section:"2 Section",pcRank:"Capt",pcName:"Kato James",intake:"06",photo:"",enteredBy:"Wasajja",enteredDate:new Date().toLocaleString(),lastAccessedBy:"Wasajja",printedBy:""},
    {id:"y1-3",courseCategory:"Bachelor of Defense Studies (3 Years)",year:"1",serviceNo:"UG/2024/003",fullName:"Kizza Joseph",rank:"O/Cdt",sex:"Male",dob:"2003-12-08",age:"21",education:"UACE",nextOfKin:"Mrs. Kizza Alice",company:"Bravo",platoon:"2 Platoon",section:"1 Section",pcRank:"Lt",pcName:"Ochieng Paul",intake:"06",photo:"",enteredBy:"Wasajja",enteredDate:new Date().toLocaleString(),lastAccessedBy:"Wasajja",printedBy:""},
    {id:"y1-4",courseCategory:"Bachelor of Defense Studies (3 Years)",year:"1",serviceNo:"UG/2024/004",fullName:"Nalubega Irene",rank:"O/Cdt",sex:"Female",dob:"2004-08-19",age:"20",education:"UACE",nextOfKin:"Mr. Nalubega Moses",company:"Bravo",platoon:"2 Platoon",section:"2 Section",pcRank:"Lt",pcName:"Ochieng Paul",intake:"06",photo:"",enteredBy:"Wasajja",enteredDate:new Date().toLocaleString(),lastAccessedBy:"Wasajja",printedBy:""},
    {id:"y1-5",courseCategory:"Bachelor of Defense Studies (3 Years)",year:"1",serviceNo:"UG/2024/005",fullName:"Ssemwogerere Paul",rank:"O/Cdt",sex:"Male",dob:"2003-05-30",age:"21",education:"UACE",nextOfKin:"Mrs. Ssemwogerere Ruth",company:"Charlie",platoon:"3 Platoon",section:"1 Section",pcRank:"Capt",pcName:"Wanyama Isaac",intake:"06",photo:"",enteredBy:"Wasajja",enteredDate:new Date().toLocaleString(),lastAccessedBy:"Wasajja",printedBy:""},
    {id:"y2-1",courseCategory:"Bachelor of Defense Studies (3 Years)",year:"2",serviceNo:"UG/2023/015",fullName:"Mugisha Brian",rank:"O/Cdt",sex:"Male",dob:"2002-11-05",age:"22",education:"Degree",nextOfKin:"Mrs. Mugisha Grace",company:"Alpha",platoon:"1 Platoon",section:"1 Section",pcRank:"Capt",pcName:"Kato James",intake:"07",photo:"",enteredBy:"Wasajja",enteredDate:new Date().toLocaleString(),lastAccessedBy:"Wasajja",printedBy:""},
    {id:"y2-2",courseCategory:"Bachelor of Defense Studies (3 Years)",year:"2",serviceNo:"UG/2023/016",fullName:"Achieng Faith",rank:"O/Cdt",sex:"Female",dob:"2003-01-18",age:"21",education:"UACE",nextOfKin:"Mr. Achieng John",company:"Alpha",platoon:"1 Platoon",section:"2 Section",pcRank:"Capt",pcName:"Kato James",intake:"07",photo:"",enteredBy:"Wasajja",enteredDate:new Date().toLocaleString(),lastAccessedBy:"Wasajja",printedBy:""},
    {id:"y2-3",courseCategory:"Bachelor of Defense Studies (3 Years)",year:"2",serviceNo:"UG/2023/017",fullName:"Nakato Patricia",rank:"O/Cdt",sex:"Female",dob:"2002-06-25",age:"22",education:"Degree",nextOfKin:"Mr. Nakato Samuel",company:"Bravo",platoon:"2 Platoon",section:"1 Section",pcRank:"Lt",pcName:"Ochieng Paul",intake:"07",photo:"",enteredBy:"Wasajja",enteredDate:new Date().toLocaleString(),lastAccessedBy:"Wasajja",printedBy:""},
    {id:"y2-4",courseCategory:"Bachelor of Defense Studies (3 Years)",year:"2",serviceNo:"UG/2023/018",fullName:"Ouma Ronald",rank:"O/Cdt",sex:"Male",dob:"2001-02-14",age:"23",education:"UACE",nextOfKin:"Mrs. Ouma Helen",company:"Bravo",platoon:"2 Platoon",section:"2 Section",pcRank:"Lt",pcName:"Ochieng Paul",intake:"07",photo:"",enteredBy:"Wasajja",enteredDate:new Date().toLocaleString(),lastAccessedBy:"Wasajja",printedBy:""},
    {id:"y2-5",courseCategory:"Bachelor of Defense Studies (3 Years)",year:"2",serviceNo:"UG/2023/019",fullName:"Namukasa Esther",rank:"O/Cdt",sex:"Female",dob:"2002-04-12",age:"22",education:"UACE",nextOfKin:"Mr. Namukasa Tom",company:"Charlie",platoon:"3 Platoon",section:"1 Section",pcRank:"Capt",pcName:"Wanyama Isaac",intake:"07",photo:"",enteredBy:"Wasajja",enteredDate:new Date().toLocaleString(),lastAccessedBy:"Wasajja",printedBy:""},
    {id:"y3-1",courseCategory:"Bachelor of Defense Studies (3 Years)",year:"3",serviceNo:"UG/2022/030",fullName:"Ssekandi Mark",rank:"O/Cdt",sex:"Male",dob:"2000-09-30",age:"24",education:"Degree",nextOfKin:"Mrs. Ssekandi Ruth",company:"Alpha",platoon:"1 Platoon",section:"1 Section",pcRank:"Capt",pcName:"Kato James",intake:"08",photo:"",enteredBy:"Wasajja",enteredDate:new Date().toLocaleString(),lastAccessedBy:"Wasajja",printedBy:""},
    {id:"y3-2",courseCategory:"Bachelor of Defense Studies (3 Years)",year:"3",serviceNo:"UG/2022/031",fullName:"Nalukenge Grace",rank:"O/Cdt",sex:"Female",dob:"2001-03-11",age:"23",education:"Degree",nextOfKin:"Mr. Nalukenge Paul",company:"Alpha",platoon:"1 Platoon",section:"2 Section",pcRank:"Capt",pcName:"Kato James",intake:"08",photo:"",enteredBy:"Wasajja",enteredDate:new Date().toLocaleString(),lastAccessedBy:"Wasajja",printedBy:""},
    {id:"y3-3",courseCategory:"Bachelor of Defense Studies (3 Years)",year:"3",serviceNo:"UG/2022/032",fullName:"Kato Isaac",rank:"O/Cdt",sex:"Male",dob:"2000-07-19",age:"24",education:"UACE",nextOfKin:"Mrs. Kato Jane",company:"Bravo",platoon:"2 Platoon",section:"1 Section",pcRank:"Lt",pcName:"Ochieng Paul",intake:"08",photo:"",enteredBy:"Wasajja",enteredDate:new Date().toLocaleString(),lastAccessedBy:"Wasajja",printedBy:""},
    {id:"y3-4",courseCategory:"Bachelor of Defense Studies (3 Years)",year:"3",serviceNo:"UG/2022/033",fullName:"Nabirye Joan",rank:"O/Cdt",sex:"Female",dob:"2001-11-28",age:"23",education:"Degree",nextOfKin:"Mr. Nabirye Moses",company:"Bravo",platoon:"2 Platoon",section:"2 Section",pcRank:"Lt",pcName:"Ochieng Paul",intake:"08",photo:"",enteredBy:"Wasajja",enteredDate:new Date().toLocaleString(),lastAccessedBy:"Wasajja",printedBy:""},
    {id:"y3-5",courseCategory:"Bachelor of Defense Studies (3 Years)",year:"3",serviceNo:"UG/2022/034",fullName:"Wasswa Daniel",rank:"O/Cdt",sex:"Male",dob:"2000-01-05",age:"24",education:"UACE",nextOfKin:"Mrs. Wasswa Ruth",company:"Charlie",platoon:"3 Platoon",section:"1 Section",pcRank:"Capt",pcName:"Wanyama Isaac",intake:"08",photo:"",enteredBy:"Wasajja",enteredDate:new Date().toLocaleString(),lastAccessedBy:"Wasajja",printedBy:""},
    {id:"p-1",courseCategory:"Professional Short Cadet Course",year:"Professional",serviceNo:"UG/2024/P01",fullName:"Okello James",rank:"O/Cdt",sex:"Male",dob:"1998-04-12",age:"26",education:"Degree",nextOfKin:"Mrs. Okello Agnes",company:"Alpha",platoon:"1 Platoon",section:"1 Section",pcRank:"Capt",pcName:"Kato James",intake:"06",photo:"",enteredBy:"Wasajja",enteredDate:new Date().toLocaleString(),lastAccessedBy:"Wasajja",printedBy:""},
    {id:"p-2",courseCategory:"Professional Short Cadet Course",year:"Professional",serviceNo:"UG/2024/P02",fullName:"Nakimuli Rose",rank:"O/Cdt",sex:"Female",dob:"1999-08-25",age:"25",education:"Degree",nextOfKin:"Mr. Nakimuli John",company:"Alpha",platoon:"1 Platoon",section:"2 Section",pcRank:"Capt",pcName:"Kato James",intake:"06",photo:"",enteredBy:"Wasajja",enteredDate:new Date().toLocaleString(),lastAccessedBy:"Wasajja",printedBy:""},
    {id:"p-3",courseCategory:"Professional Short Cadet Course",year:"Professional",serviceNo:"UG/2024/P03",fullName:"Ssebunya Peter",rank:"O/Cdt",sex:"Male",dob:"1997-12-03",age:"27",education:"Diploma",nextOfKin:"Mrs. Ssebunya Mary",company:"Bravo",platoon:"2 Platoon",section:"1 Section",pcRank:"Lt",pcName:"Ochieng Paul",intake:"06",photo:"",enteredBy:"Wasajja",enteredDate:new Date().toLocaleString(),lastAccessedBy:"Wasajja",printedBy:""},
    {id:"p-4",courseCategory:"Professional Short Cadet Course",year:"Professional",serviceNo:"UG/2024/P04",fullName:"Nambi Florence",rank:"O/Cdt",sex:"Female",dob:"1998-06-17",age:"26",education:"Degree",nextOfKin:"Mr. Nambi Tom",company:"Bravo",platoon:"2 Platoon",section:"2 Section",pcRank:"Lt",pcName:"Ochieng Paul",intake:"06",photo:"",enteredBy:"Wasajja",enteredDate:new Date().toLocaleString(),lastAccessedBy:"Wasajja",printedBy:""},
    {id:"p-5",courseCategory:"Professional Short Cadet Course",year:"Professional",serviceNo:"UG/2024/P05",fullName:"Kiggundu Alex",rank:"O/Cdt",sex:"Male",dob:"1996-09-09",age:"28",education:"Degree",nextOfKin:"Mrs. Kiggundu Sarah",company:"Charlie",platoon:"3 Platoon",section:"1 Section",pcRank:"Capt",pcName:"Wanyama Isaac",intake:"06",photo:"",enteredBy:"Wasajja",enteredDate:new Date().toLocaleString(),lastAccessedBy:"Wasajja",printedBy:""}
  ];
  saveCadets(sample);

  const sampleScores = [
    {id:"s1",serviceNo:"UG/2024/001",cadetName:"Okello David",subject:"Political Education",examType:"Weekly Test 1",marks:"78",max:"100",date:"2025-09-10",remarks:"Good"},
    {id:"s2",serviceNo:"UG/2024/001",cadetName:"Okello David",subject:"Tactics",examType:"Monthly Test",marks:"85",max:"100",date:"2025-09-15",remarks:"Excellent"},
    {id:"s3",serviceNo:"UG/2023/015",cadetName:"Mugisha Brian",subject:"Skills at Arms",examType:"End of Phase Exam",marks:"72",max:"100",date:"2025-08-20",remarks:""},
    {id:"s4",serviceNo:"UG/2022/030",cadetName:"Ssekandi Mark",subject:"Military Law",examType:"End of Course Exam",marks:"88",max:"100",date:"2025-07-30",remarks:"Outstanding"},
    {id:"s5",serviceNo:"UG/2024/P01",cadetName:"Okello James",subject:"Map Using",examType:"Weekly Test 2",marks:"81",max:"100",date:"2025-09-12",remarks:"Very Good"},
    {id:"s6",serviceNo:"UG/2024/002",cadetName:"Nabukenya Sarah",subject:"Leadership",examType:"Monthly Test",marks:"90",max:"100",date:"2025-09-18",remarks:"Excellent"},
    {id:"s7",serviceNo:"UG/2023/016",cadetName:"Achieng Faith",subject:"IPB",examType:"Weekly Test 1",marks:"76",max:"100",date:"2025-09-05",remarks:""},
    {id:"s8",serviceNo:"UG/2022/031",cadetName:"Nalukenge Grace",subject:"Military Intelligence",examType:"End of Phase Assessment",marks:"84",max:"100",date:"2025-08-25",remarks:"Good"},
    {id:"s9",serviceNo:"UG/2024/P02",cadetName:"Nakimuli Rose",subject:"Drill",examType:"Weekly Test 3",marks:"79",max:"100",date:"2025-09-20",remarks:""},
    {id:"s10",serviceNo:"UG/2024/003",cadetName:"Kizza Joseph",subject:"Field Craft",examType:"Monthly Test",marks:"83",max:"100",date:"2025-09-22",remarks:"Very Good"}
  ];
  saveScores(sampleScores);

  const sampleEx = [
    {id:"e1",serviceNo:"UG/2024/001",cadetName:"Okello David",name:"Exercise Lion",score:"Good",date:"2025-09-05",remarks:"Team leader"},
    {id:"e2",serviceNo:"UG/2023/015",cadetName:"Mugisha Brian",name:"Battle Craft",score:"Very Good",date:"2025-08-12",remarks:""},
    {id:"e3",serviceNo:"UG/2022/030",cadetName:"Ssekandi Mark",name:"Field Craft",score:"Excellent",date:"2025-07-18",remarks:"Best in platoon"},
    {id:"e4",serviceNo:"UG/2024/P01",cadetName:"Okello James",name:"Night Navigation",score:"Good",date:"2025-09-08",remarks:""},
    {id:"e5",serviceNo:"UG/2024/002",cadetName:"Nabukenya Sarah",name:"Section Attack",score:"Very Good",date:"2025-09-14",remarks:""}
  ];
  saveExercises(sampleEx);

  const sampleAlumni = [
    {id:"a1",serviceNo:"UG/2018/001",fullName:"Lt Okello Michael",rank:"Lt",commissionDate:"2021-06-15",remarks:"Commissioned with distinction",enteredBy:"Wasajja",enteredDate:new Date().toLocaleString()},
    {id:"a2",serviceNo:"UG/2019/012",fullName:"2Lt Namukasa Grace",rank:"2Lt",commissionDate:"2022-07-20",remarks:"",enteredBy:"Wasajja",enteredDate:new Date().toLocaleString()},
    {id:"a3",serviceNo:"UG/2017/045",fullName:"Capt Kato Samuel",rank:"Capt",commissionDate:"2020-05-10",remarks:"Now serving at HQ",enteredBy:"Wasajja",enteredDate:new Date().toLocaleString()}
  ];
  saveAlumniData(sampleAlumni);
}

function initApp() {
  loadSampleData();
  updateStats();
  renderSubjects();
  populateSubjectSelect();
  populateCadetLists();
  renderAdminUpdates();
  renderAlumni();

  const today = new Date().toISOString().split("T")[0];
  if (document.getElementById("scoreDate")) document.getElementById("scoreDate").value = today;
  if (document.getElementById("exDate")) document.getElementById("exDate").value = today;
}

/* ==================== NAVIGATION ==================== */
function showTab(id) {
  const tabs = document.querySelectorAll(".tab-content");
  for (let i = 0; i < tabs.length; i++) tabs[i].classList.remove("active");

  const buttons = document.querySelectorAll(".nav button");
  for (let i = 0; i < buttons.length; i++) buttons[i].classList.remove("active");

  document.getElementById(id).classList.add("active");
  if (event && event.target) event.target.classList.add("active");

  if (id === "dashboard") updateStats();
  if (id === "cadets") {
    document.getElementById("categoryView").classList.remove("hidden");
    document.getElementById("categoryDetail").classList.add("hidden");
  }
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
  if (id === "alumni") renderAlumni();
  if (id === "updates") renderAdminUpdates();
}

function updateStats() {
  document.getElementById("statCadets").textContent = getCadets().length;
  document.getElementById("statSubjects").textContent = getSubjects().length;
  document.getElementById("statExercises").textContent = getExercises().length;
  if (document.getElementById("statAlumni")) {
    document.getElementById("statAlumni").textContent = getAlumni().length;
  }
}

/* ==================== OFFICER ANIMATION (SLOW - 4.5 seconds) ==================== */
function startOfficerAnimation() {
  const officers = ["cmdt", "ci", "admin", "cc", "io", "pc", "asm", "fin"];
  let delay = 0;
  const showTime = 4500;

  officers.forEach(function (id, index) {
    setTimeout(function () {
      if (index > 0) document.getElementById(officers[index - 1]).classList.remove("show");
      document.getElementById(id).classList.add("show");
    }, delay);
    delay += showTime;
  });

  setTimeout(function () {
    document.getElementById("fin").classList.remove("show");
    document.getElementById("coreValues").classList.add("show");
  }, delay + 800);
}

function enterSystem() {
  document.getElementById("welcome").classList.remove("active");
  document.getElementById("mainNav").style.display = "flex";
  showTab("dashboard");
}

/* ==================== CADETS ==================== */
function openCategory(cat) {
  currentCategory = cat;
  currentCadetIndex = 0;
  document.getElementById("categoryView").classList.add("hidden");
  document.getElementById("categoryDetail").classList.remove("hidden");
  const title = cat === "Professional" ? "Professionals (Short Cadet Course)" : "Year " + cat + " Cadets";
  document.getElementById("categoryTitle").textContent = title;
  hideAddForm();
  renderCategoryCadets();
}

function backToCategories() {
  document.getElementById("categoryDetail").classList.add("hidden");
  document.getElementById("categoryView").classList.remove("hidden");
}

function getCategoryCadets() {
  const all = getCadets();
  if (currentCategory === "Professional") {
    return all.filter(function (c) {
      return c.courseCategory === "Professional Short Cadet Course" || c.year === "Professional";
    });
  }
  return all.filter(function (c) { return c.year === currentCategory; });
}

function renderCategoryCadets() {
  const list = getCategoryCadets();
  let html = "";
  for (let i = 0; i < list.length; i++) {
    const c = list[i];
    html += "<tr>";
    html += "<td>" + (c.photo ? "<img src='" + c.photo + "' class='cadet-photo-thumb'>" : "<div style='width:45px;height:55px;background:#eee;border-radius:4px;'></div>") + "</td>";
    html += "<td><strong>" + c.serviceNo + "</strong></td>";
    html += "<td>" + c.fullName + "</td>";
    html += "<td>" + (c.company || "-") + "</td>";
    html += "<td>" + (c.enteredBy || "-") + "</td>";
    html += "<td>";
    html += "<button class='btn btn-primary' onclick=\"editCadet('" + c.id + "')\">Edit</button> ";
    html += "<button class='btn btn-danger' onclick=\"deleteCadet('" + c.id + "')\">Remove</button> ";
    html += "<button class='btn btn-success' onclick=\"printCadet('" + c.serviceNo + "')\">Print</button>";
    html += "</td></tr>";
  }
  document.getElementById("cadetTableBody").innerHTML = html || "<tr><td colspan='6'>No cadets in this category yet</td></tr>";
}

function showAddForm() {
  document.getElementById("cadetForm").classList.remove("hidden");
  document.getElementById("cadetListArea").classList.add("hidden");
  resetCadetForm();
}

function hideAddForm() {
  document.getElementById("cadetForm").classList.add("hidden");
  document.getElementById("cadetListArea").classList.remove("hidden");
  resetCadetForm();
}

function prevCadet() {
  const list = getCategoryCadets();
  if (list.length === 0) return;
  currentCadetIndex = (currentCadetIndex - 1 + list.length) % list.length;
  loadCadetToForm(list[currentCadetIndex]);
  showAddForm();
}

function nextCadet() {
  const list = getCategoryCadets();
  if (list.length === 0) return;
  currentCadetIndex = (currentCadetIndex + 1) % list.length;
  loadCadetToForm(list[currentCadetIndex]);
  showAddForm();
}

function loadCadetToForm(c) {
  document.getElementById("cadetId").value = c.id;
  document.getElementById("serviceNo").value = c.serviceNo;
  document.getElementById("fullName").value = c.fullName;
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
  document.getElementById("intake").value = c.intake || "06";

  if (c.photo) {
    currentPhoto = c.photo;
    document.getElementById("photoPreview").src = c.photo;
    document.getElementById("photoPreview").style.display = "block";
    document.getElementById("photoPlaceholder").style.display = "none";
  } else {
    clearPhoto();
  }
  document.getElementById("cadetSaveBtn").textContent = "Update Cadet";
}

function previewPhoto(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function (ev) {
    currentPhoto = ev.target.result;
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

function saveCadet(e) {
  e.preventDefault();
  const id = document.getElementById("cadetId").value;
  const courseCat = currentCategory === "Professional" ? "Professional Short Cadet Course" : "Bachelor of Defense Studies (3 Years)";
  const yearVal = currentCategory === "Professional" ? "Professional" : currentCategory;

  const existing = id ? getCadets().find(function (x) { return x.id === id; }) : null;

  const cadet = {
    id: id || Date.now().toString(),
    courseCategory: courseCat,
    year: yearVal,
    serviceNo: document.getElementById("serviceNo").value.trim().toUpperCase(),
    fullName: document.getElementById("fullName").value.trim(),
    rank: "O/Cdt",
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
    intake: document.getElementById("intake").value,
    photo: currentPhoto || (existing ? existing.photo : ""),
    enteredBy: existing ? (existing.enteredBy || currentUser) : currentUser,
    enteredDate: existing ? (existing.enteredDate || new Date().toLocaleString()) : new Date().toLocaleString(),
    lastAccessedBy: currentUser,
    printedBy: existing ? (existing.printedBy || "") : ""
  };

  const cadets = getCadets();
  for (let i = 0; i < cadets.length; i++) {
    if (cadets[i].serviceNo === cadet.serviceNo && cadets[i].id !== cadet.id) {
      showAlert("cadetAlert", "Service number already exists!", "error");
      return;
    }
  }

  if (id) {
    for (let i = 0; i < cadets.length; i++) {
      if (cadets[i].id === id) {
        cadets[i] = cadet;
        break;
      }
    }
  } else {
    cadets.push(cadet);
  }

  saveCadets(cadets);
  showAlert("cadetAlert", "Cadet saved successfully!", "success");
  hideAddForm();
  renderCategoryCadets();
  updateStats();
  populateCadetLists();
}

function editCadet(id) {
  const cadets = getCadets();
  let c = null;
  for (let i = 0; i < cadets.length; i++) {
    if (cadets[i].id === id) {
      c = cadets[i];
      break;
    }
  }
  if (!c) return;
  c.lastAccessedBy = currentUser;
  saveCadets(cadets);
  loadCadetToForm(c);
  showAddForm();
}

function deleteCadet(id) {
  if (!confirm("Remove this cadet?")) return;
  const cadets = getCadets();
  let sn = "";
  const newList = [];
  for (let i = 0; i < cadets.length; i++) {
    if (cadets[i].id === id) sn = cadets[i].serviceNo;
    else newList.push(cadets[i]);
  }
  saveCadets(newList);
  if (sn) {
    saveScores(getScores().filter(function (s) { return s.serviceNo !== sn; }));
    saveExercises(getExercises().filter(function (e) { return e.serviceNo !== sn; }));
  }
  renderCategoryCadets();
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

/* ==================== SUBJECTS ==================== */
function saveSubject(e) {
  e.preventDefault();
  const name = document.getElementById("subjectName").value.trim();
  const id = document.getElementById("subjectId").value;
  const subjects = getSubjects();

  if (id !== "") {
    subjects[parseInt(id)] = name;
  } else {
    if (subjects.indexOf(name) !== -1) {
      showAlert("subjectAlert", "Already exists!", "error");
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
  document.getElementById("subjectSaveBtn").textContent = "Update";
}

function deleteSubject(i) {
  if (!confirm("Delete?")) return;
  const s = getSubjects();
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
  const subjects = getSubjects();
  let html = "";
  for (let i = 0; i < subjects.length; i++) {
    html += "<tr><td>" + (i + 1) + "</td><td>" + subjects[i] + "</td>";
    html += "<td><button class='btn btn-primary' onclick='editSubject(" + i + ")'>Edit</button> ";
    html += "<button class='btn btn-danger' onclick='deleteSubject(" + i + ")'>Delete</button></td></tr>";
  }
  document.getElementById("subjectTableBody").innerHTML = html || "<tr><td colspan='3'>No subjects</td></tr>";
}

function populateSubjectSelect() {
  const subjects = getSubjects();
  let html = "";
  for (let i = 0; i < subjects.length; i++) {
    html += "<option>" + subjects[i] + "</option>";
  }
  document.getElementById("scoreSubject").innerHTML = html;
}

function populateCadetLists() {
  const cadets = getCadets();
  let html = "";
  for (let i = 0; i < cadets.length; i++) {
    html += "<option value='" + cadets[i].serviceNo + "'>" + cadets[i].fullName + "</option>";
  }
  document.getElementById("cadetList").innerHTML = html;
  document.getElementById("cadetList2").innerHTML = html;
}

/* ==================== SCORES ==================== */
function loadCadetName() {
  const sn = document.getElementById("scoreServiceNo").value.trim().toUpperCase();
  const cadets = getCadets();
  for (let i = 0; i < cadets.length; i++) {
    if (cadets[i].serviceNo === sn) {
      document.getElementById("scoreCadetName").value = cadets[i].fullName;
      return;
    }
  }
  document.getElementById("scoreCadetName").value = "";
}

function saveScore(e) {
  e.preventDefault();
  const score = {
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

  let found = false;
  const cadets = getCadets();
  for (let i = 0; i < cadets.length; i++) {
    if (cadets[i].serviceNo === score.serviceNo) {
      found = true;
      break;
    }
  }
  if (!found) {
    showAlert("scoreAlert", "Service number not found!", "error");
    return;
  }

  const scores = getScores();
  scores.push(score);
  saveScores(scores);
  showAlert("scoreAlert", "Score saved!", "success");
  document.getElementById("scoreForm").reset();
  document.getElementById("scoreDate").value = new Date().toISOString().split("T")[0];
  renderScores();
}

function deleteScore(id) {
  if (!confirm("Delete?")) return;
  saveScores(getScores().filter(function (s) { return s.id !== id; }));
  renderScores();
}

function renderScores() {
  const filter = (document.getElementById("scoreFilter") ? document.getElementById("scoreFilter").value : "").toLowerCase();
  let list = getScores();
  if (filter) {
    list = list.filter(function (s) {
      return s.serviceNo.toLowerCase().indexOf(filter) !== -1 ||
             s.subject.toLowerCase().indexOf(filter) !== -1 ||
             (s.cadetName && s.cadetName.toLowerCase().indexOf(filter) !== -1);
    });
  }
  let html = "";
  for (let i = 0; i < list.length; i++) {
    const s = list[i];
    html += "<tr><td>" + s.serviceNo + "</td><td>" + (s.cadetName || "-") + "</td>";
    html += "<td>" + s.subject + "</td><td>" + s.examType + "</td>";
    html += "<td><strong>" + s.marks + "/" + s.max + "</strong></td>";
    html += "<td>" + (s.date || "-") + "</td>";
    html += "<td><button class='btn btn-danger' onclick=\"deleteScore('" + s.id + "')\">Delete</button></td></tr>";
  }
  document.getElementById("scoreTableBody").innerHTML = html || "<tr><td colspan='7'>No scores</td></tr>";
}

/* ==================== FIELD EXERCISES ==================== */
function loadCadetNameEx() {
  const sn = document.getElementById("exServiceNo").value.trim().toUpperCase();
  const cadets = getCadets();
  for (let i = 0; i < cadets.length; i++) {
    if (cadets[i].serviceNo === sn) {
      document.getElementById("exCadetName").value = cadets[i].fullName;
      return;
    }
  }
  document.getElementById("exCadetName").value = "";
}

function saveExercise(e) {
  e.preventDefault();
  const ex = {
    id: Date.now().toString(),
    serviceNo: document.getElementById("exServiceNo").value.trim().toUpperCase(),
    cadetName: document.getElementById("exCadetName").value,
    name: document.getElementById("exName").value.trim(),
    score: document.getElementById("exScore").value.trim(),
    date: document.getElementById("exDate").value,
    remarks: document.getElementById("exRemarks").value
  };

  let found = false;
  const cadets = getCadets();
  for (let i = 0; i < cadets.length; i++) {
    if (cadets[i].serviceNo === ex.serviceNo) {
      found = true;
      break;
    }
  }
  if (!found) {
    showAlert("exerciseAlert", "Service number not found!", "error");
    return;
  }

  const list = getExercises();
  list.push(ex);
  saveExercises(list);
  showAlert("exerciseAlert", "Exercise saved!", "success");
  document.getElementById("exerciseForm").reset();
  document.getElementById("exDate").value = new Date().toISOString().split("T")[0];
  renderExercises();
  updateStats();
}

function deleteExercise(id) {
  if (!confirm("Delete?")) return;
  saveExercises(getExercises().filter(function (e) { return e.id !== id; }));
  renderExercises();
  updateStats();
}

function renderExercises() {
  const list = getExercises();
  let html = "";
  for (let i = 0; i < list.length; i++) {
    const e = list[i];
    html += "<tr><td>" + e.serviceNo + "</td><td>" + (e.cadetName || "-") + "</td>";
    html += "<td>" + e.name + "</td><td><strong>" + e.score + "</strong></td>";
    html += "<td>" + (e.date || "-") + "</td>";
    html += "<td><button class='btn btn-danger' onclick=\"deleteExercise('" + e.id + "')\">Delete</button></td></tr>";
  }
  document.getElementById("exerciseTableBody").innerHTML = html || "<tr><td colspan='6'>No exercises</td></tr>";
}

/* ==================== ALUMNI ==================== */
function showAlumniForm() {
  document.getElementById("alumniForm").classList.remove("hidden");
  resetAlumniForm();
}

function hideAlumniForm() {
  document.getElementById("alumniForm").classList.add("hidden");
  resetAlumniForm();
}

function resetAlumniForm() {
  document.getElementById("alumniForm").reset();
  document.getElementById("alumniId").value = "";
  document.getElementById("alumniSaveBtn").textContent = "Save Alumni";
}

function saveAlumni(e) {
  e.preventDefault();
  const id = document.getElementById("alumniId").value;

  const alumni = {
    id: id || Date.now().toString(),
    serviceNo: document.getElementById("alumniServiceNo").value.trim().toUpperCase(),
    fullName: document.getElementById("alumniFullName").value.trim(),
    rank: document.getElementById("alumniRank").value.trim(),
    commissionDate: document.getElementById("alumniCommissionDate").value,
    remarks: document.getElementById("alumniRemarks").value.trim(),
    enteredBy: currentUser,
    enteredDate: new Date().toLocaleString()
  };

  const list = getAlumni();
  for (let i = 0; i < list.length; i++) {
    if (list[i].serviceNo === alumni.serviceNo && list[i].id !== alumni.id) {
      showAlert("alumniAlert", "Service number already exists in Alumni!", "error");
      return;
    }
  }

  if (id) {
    for (let i = 0; i < list.length; i++) {
      if (list[i].id === id) {
        list[i] = alumni;
        break;
      }
    }
  } else {
    list.push(alumni);
  }

  saveAlumniData(list);
  showAlert("alumniAlert", "Alumni record saved!", "success");
  hideAlumniForm();
  renderAlumni();
  updateStats();
}

function editAlumni(id) {
  const list = getAlumni();
  let a = null;
  for (let i = 0; i < list.length; i++) {
    if (list[i].id === id) {
      a = list[i];
      break;
    }
  }
  if (!a) return;

  document.getElementById("alumniId").value = a.id;
  document.getElementById("alumniServiceNo").value = a.serviceNo;
  document.getElementById("alumniFullName").value = a.fullName;
  document.getElementById("alumniRank").value = a.rank;
  document.getElementById("alumniCommissionDate").value = a.commissionDate;
  document.getElementById("alumniRemarks").value = a.remarks || "";
  document.getElementById("alumniSaveBtn").textContent = "Update Alumni";
  showAlumniForm();
}

function deleteAlumni(id) {
  if (!confirm("Delete this Alumni record?")) return;
  saveAlumniData(getAlumni().filter(function (a) { return a.id !== id; }));
  renderAlumni();
  updateStats();
}

function prevAlumni() {
  const list = getAlumni();
  if (list.length === 0) return;
  currentAlumniIndex = (currentAlumniIndex - 1 + list.length) % list.length;
  editAlumni(list[currentAlumniIndex].id);
}

function nextAlumni() {
  const list = getAlumni();
  if (list.length === 0) return;
  currentAlumniIndex = (currentAlumniIndex + 1) % list.length;
  editAlumni(list[currentAlumniIndex].id);
}

function renderAlumni() {
  const filter = (document.getElementById("alumniSearch") ? document.getElementById("alumniSearch").value : "").toLowerCase();
  let list = getAlumni();
  if (filter) {
    list = list.filter(function (a) {
      return a.serviceNo.toLowerCase().indexOf(filter) !== -1 ||
             a.fullName.toLowerCase().indexOf(filter) !== -1;
    });
  }

  let html = "";
  for (let i = 0; i < list.length; i++) {
    const a = list[i];
    html += "<tr>";
    html += "<td><strong>" + a.serviceNo + "</strong></td>";
    html += "<td>" + a.fullName + "</td>";
    html += "<td>" + a.rank + "</td>";
    html += "<td>" + (a.commissionDate || "-") + "</td>";
    html += "<td>";
    html += "<button class='btn btn-primary' onclick=\"editAlumni('" + a.id + "')\">Edit</button> ";
    html += "<button class='btn btn-danger' onclick=\"deleteAlumni('" + a.id + "')\">Delete</button> ";
    html += "<button class='btn btn-success' onclick=\"printAlumni('" + a.id + "')\">Print</button>";
    html += "</td></tr>";
  }
  document.getElementById("alumniTableBody").innerHTML = html || "<tr><td colspan='5'>No Alumni records yet</td></tr>";
}

function printAlumni(id) {
  const list = getAlumni();
  let a = null;
  for (let i = 0; i < list.length; i++) {
    if (list[i].id === id) {
      a = list[i];
      break;
    }
  }
  if (!a) return;

  const destination = prompt("Print destination (e.g. TO: CI, TO: Commandant):", "TO: Chief Instructor (CI)");
  if (destination === null) return;

  let html = "<div style='font-family:Arial;max-width:800px;margin:0 auto;padding:20px;'>";
  html += "<div style='text-align:center;border-bottom:3px solid #1a472a;padding-bottom:15px;margin-bottom:20px;'>";
  html += "<h1 style='color:#1a472a;margin:0;'>UGANDA MILITARY ACADEMY – KABAMBA</h1>";
  html += "<h2>Alumni / Commissioned Officer Record</h2>";
  html += "<p style='font-size:1.15rem;font-weight:bold;margin-top:12px;color:#1a472a;'>" + destination + "</p>";
  html += "<p>Generated: " + new Date().toLocaleString() + "</p></div>";

  html += "<table style='width:100%;border-collapse:collapse;margin-bottom:20px;'>";
  html += "<tr><td style='padding:8px;width:35%;'><strong>Service Number</strong></td><td>" + a.serviceNo + "</td></tr>";
  html += "<tr><td style='padding:8px;'><strong>Full Name</strong></td><td>" + a.fullName + "</td></tr>";
  html += "<tr><td style='padding:8px;'><strong>Rank at Commission</strong></td><td>" + a.rank + "</td></tr>";
  html += "<tr><td style='padding:8px;'><strong>Date of Commission</strong></td><td>" + (a.commissionDate || "-") + "</td></tr>";
  html += "<tr><td style='padding:8px;'><strong>Remarks</strong></td><td>" + (a.remarks || "-") + "</td></tr>";
  html += "<tr><td style='padding:8px;'><strong>Recorded By</strong></td><td>" + (a.enteredBy || "-") + " on " + (a.enteredDate || "-") + "</td></tr>";
  html += "</table>";
  html += "<p style='margin-top:40px;text-align:center;color:#666;font-size:0.85rem;'>— End of Alumni Record — Made by 2Lt Herbert Wasajja for UMAK only —</p></div>";

  const printDiv = document.getElementById("printArea");
  printDiv.innerHTML = html;
  printDiv.classList.remove("hidden");

  setTimeout(function () {
    window.print();
    setTimeout(function () {
      printDiv.classList.add("hidden");
    }, 1000);
  }, 300);
}

/* ==================== UPDATES ==================== */
function saveUpdate(e) {
  e.preventDefault();
  const title = document.getElementById("updateTitle").value.trim();
  const message = document.getElementById("updateMessage").value.trim();
  if (!title || !message) return;

  const updates = getUpdates();
  updates.unshift({
    id: Date.now().toString(),
    title: title,
    message: message,
    date: new Date().toLocaleString(),
    by: currentUser
  });
  saveUpdates(updates);
  document.getElementById("updateTitle").value = "";
  document.getElementById("updateMessage").value = "";
  showAlert("updateAlert", "Update posted successfully!", "success");
  renderAdminUpdates();
}

function renderAdminUpdates() {
  const updates = getUpdates();
  let html = "";
  if (updates.length === 0) {
    html = "<p>No updates posted yet.</p>";
  } else {
    for (let i = 0; i < updates.length; i++) {
      html += "<div class='update-card'>";
      html += "<h4>" + updates[i].title + "</h4>";
      html += "<div class='date'>" + updates[i].date + " | by " + updates[i].by + "</div>";
      html += "<p style='margin-top:8px;'>" + updates[i].message + "</p>";
      html += "<button class='btn btn-danger' style='margin-top:8px;' onclick=\"deleteUpdate('" + updates[i].id + "')\">Delete</button>";
      html += "</div>";
    }
  }
  document.getElementById("adminUpdatesList").innerHTML = html;
}

function renderStudentUpdates() {
  const updates = getUpdates();
  let html = "";
  if (updates.length === 0) {
    html = "<p>No academy updates at the moment.</p>";
  } else {
    for (let i = 0; i < updates.length; i++) {
      html += "<div class='update-card'>";
      html += "<h4>" + updates[i].title + "</h4>";
      html += "<div class='date'>" + updates[i].date + "</div>";
      html += "<p style='margin-top:8px;'>" + updates[i].message + "</p>";
      html += "</div>";
    }
  }
  document.getElementById("studentUpdatesList").innerHTML = html;
}

function deleteUpdate(id) {
  if (!confirm("Delete this update?")) return;
  saveUpdates(getUpdates().filter(function (u) { return u.id !== id; }));
  renderAdminUpdates();
}

/* ==================== STUDENT DATA ==================== */
function loadStudentData(sn) {
  const scores = getScores().filter(function (s) { return s.serviceNo === sn; });
  let html = "";
  if (scores.length === 0) {
    html = "<p>No academic scores recorded yet.</p>";
  } else {
    html = "<table><thead><tr><th>Subject</th><th>Exam Type</th><th>Score</th><th>Date</th><th>Remarks</th></tr></thead><tbody>";
    for (let i = 0; i < scores.length; i++) {
      html += "<tr><td>" + scores[i].subject + "</td><td>" + scores[i].examType + "</td>";
      html += "<td><strong>" + scores[i].marks + "/" + scores[i].max + "</strong></td>";
      html += "<td>" + (scores[i].date || "-") + "</td><td>" + (scores[i].remarks || "-") + "</td></tr>";
    }
    html += "</tbody></table>";
  }
  document.getElementById("studentScores").innerHTML = html;

  const exercises = getExercises().filter(function (e) { return e.serviceNo === sn; });
  html = "";
  if (exercises.length === 0) {
    html = "<p>No field exercises recorded yet.</p>";
  } else {
    html = "<table><thead><tr><th>Exercise</th><th>Score</th><th>Date</th><th>Remarks</th></tr></thead><tbody>";
    for (let i = 0; i < exercises.length; i++) {
      html += "<tr><td>" + exercises[i].name + "</td><td><strong>" + exercises[i].score + "</strong></td>";
      html += "<td>" + (exercises[i].date || "-") + "</td><td>" + (exercises[i].remarks || "-") + "</td></tr>";
    }
    html += "</tbody></table>";
  }
  document.getElementById("studentExercises").innerHTML = html;

  renderStudentUpdates();
}

/* ==================== SEARCH ==================== */
function searchCadet() {
  const sn = document.getElementById("searchServiceNo").value.trim().toUpperCase();
  const cadets = getCadets();
  let c = null;
  for (let i = 0; i < cadets.length; i++) {
    if (cadets[i].serviceNo === sn) {
      c = cadets[i];
      break;
    }
  }

  const result = document.getElementById("searchResult");
  if (!c) {
    result.innerHTML = "<div class='alert alert-error'>No cadet found with that Service Number.</div>";
    return;
  }

  c.lastAccessedBy = currentUser;
  saveCadets(cadets);

  const scores = getScores().filter(function (s) { return s.serviceNo === sn; });
  const exercises = getExercises().filter(function (e) { return e.serviceNo === sn; });

  let html = "<div class='card' style='border:2px solid #1a472a;'>";
  html += "<div style='display:flex;gap:20px;margin-bottom:15px;'>";
  if (c.photo) html += "<img src='" + c.photo + "' style='width:100px;height:120px;object-fit:cover;border-radius:6px;'>";
  html += "<div><h2 style='margin:0;'>" + c.fullName + "</h2>";
  html += "<p><strong>" + c.serviceNo + "</strong> | " + (c.courseCategory || "-") + "</p>";
  html += "<p>Year: " + (c.year || "-") + " | Company: " + (c.company || "-") + "</p></div></div>";

  html += "<div class='form-grid'>";
  html += "<div><strong>Sex / Age / DOB:</strong> " + c.sex + " / " + (c.age || "-") + " / " + (c.dob || "-") + "</div>";
  html += "<div><strong>Education:</strong> " + (c.education || "-") + "</div>";
  html += "<div><strong>Next of Kin:</strong> " + (c.nextOfKin || "-") + "</div>";
  html += "<div><strong>Platoon / Section:</strong> " + (c.platoon || "-") + " / " + (c.section || "-") + "</div>";
  html += "<div><strong>Platoon Commander:</strong> " + (c.pcRank || "") + " " + (c.pcName || "-") + "</div>";
  html += "</div>";

  html += "<div class='audit-info'>";
  html += "<strong>Audit Information</strong><br>";
  html += "Entered by: <strong>" + (c.enteredBy || "-") + "</strong> on " + (c.enteredDate || "-") + "<br>";
  html += "Last accessed by: <strong>" + (c.lastAccessedBy || "-") + "</strong><br>";
  html += "Printed by: <strong>" + (c.printedBy || "Not yet printed") + "</strong>";
  html += "</div>";

  html += "<h3>Academic Scores</h3><table><thead><tr><th>Subject</th><th>Exam Type</th><th>Score</th><th>Date</th></tr></thead><tbody>";
  if (scores.length === 0) html += "<tr><td colspan='4'>No scores recorded</td></tr>";
  else {
    for (let i = 0; i < scores.length; i++) {
      html += "<tr><td>" + scores[i].subject + "</td><td>" + scores[i].examType + "</td>";
      html += "<td>" + scores[i].marks + "/" + scores[i].max + "</td><td>" + (scores[i].date || "-") + "</td></tr>";
    }
  }
  html += "</tbody></table>";

  html += "<h3>Field Exercises</h3><table><thead><tr><th>Exercise</th><th>Score</th><th>Date</th><th>Remarks</th></tr></thead><tbody>";
  if (exercises.length === 0) html += "<tr><td colspan='4'>No field exercises</td></tr>";
  else {
    for (let i = 0; i < exercises.length; i++) {
      html += "<tr><td>" + exercises[i].name + "</td><td>" + exercises[i].score + "</td>";
      html += "<td>" + (exercises[i].date || "-") + "</td><td>" + (exercises[i].remarks || "-") + "</td></tr>";
    }
  }
  html += "</tbody></table>";

  html += "<br><button class='btn btn-success' onclick=\"printCadet('" + sn + "')\">Print Full Record</button> ";
  html += "<button class='btn btn-primary' onclick=\"exportSingleCadet('" + sn + "')\">Export this Cadet to Excel</button>";
  html += "</div>";
  result.innerHTML = html;
}

/* ==================== PRINT CADET (FULLY WORKING) ==================== */
function printCadet(sn) {
  const destination = prompt("Print destination (e.g. TO: CI, TO: Commandant, TO: Course Coordinator):", "TO: Chief Instructor (CI)");
  if (destination === null) return;

  const cadets = getCadets();
  let c = null;
  for (let i = 0; i < cadets.length; i++) {
    if (cadets[i].serviceNo === sn) {
      c = cadets[i];
      break;
    }
  }
  if (!c) {
    alert("Cadet not found");
    return;
  }

  c.printedBy = currentUser + " on " + new Date().toLocaleString();
  c.lastAccessedBy = currentUser;
  saveCadets(cadets);

  const scores = getScores().filter(function (s) { return s.serviceNo === sn; });
  const exercises = getExercises().filter(function (e) { return e.serviceNo === sn; });

  let html = "<div style='font-family:Arial;max-width:800px;margin:0 auto;padding:20px;'>";
  html += "<div style='text-align:center;border-bottom:3px solid #1a472a;padding-bottom:15px;margin-bottom:20px;'>";
  html += "<h1 style='color:#1a472a;margin:0;'>UGANDA MILITARY ACADEMY – KABAMBA</h1>";
  html += "<h2>Officer Cadet Full Record</h2>";
  html += "<p style='font-size:1.15rem;font-weight:bold;margin-top:12px;color:#1a472a;'>" + destination + "</p>";
  html += "<p>Generated: " + new Date().toLocaleString() + "</p></div>";

  html += "<div style='display:flex;gap:20px;margin-bottom:20px;'>";
  if (c.photo) html += "<img src='" + c.photo + "' style='width:120px;height:140px;object-fit:cover;border:1px solid #ccc;'>";
  html += "<div><h2 style='margin:0;'>" + c.fullName + "</h2>";
  html += "<p><strong>Service No:</strong> " + c.serviceNo + "<br>";
  html += "<strong>Course:</strong> " + (c.courseCategory || "-") + "<br>";
  html += "<strong>Year:</strong> " + (c.year || "-") + " | <strong>Rank:</strong> " + c.rank + "</p></div></div>";

  html += "<h3 style='background:#1a472a;color:white;padding:8px;'>Personal & Unit Information</h3>";
  html += "<table style='width:100%;border-collapse:collapse;margin-bottom:20px;'>";
  html += "<tr><td style='padding:6px;width:30%;'><strong>Sex / Age / DOB</strong></td><td>" + c.sex + " / " + (c.age || "-") + " / " + (c.dob || "-") + "</td></tr>";
  html += "<tr><td style='padding:6px;'><strong>Education</strong></td><td>" + (c.education || "-") + "</td></tr>";
  html += "<tr><td style='padding:6px;'><strong>Next of Kin</strong></td><td>" + (c.nextOfKin || "-") + "</td></tr>";
  html += "<tr><td style='padding:6px;'><strong>Company</strong></td><td>" + (c.company || "-") + "</td></tr>";
  html += "<tr><td style='padding:6px;'><strong>Platoon / Section</strong></td><td>" + (c.platoon || "-") + " / " + (c.section || "-") + "</td></tr>";
  html += "<tr><td style='padding:6px;'><strong>Platoon Commander</strong></td><td>" + (c.pcRank || "") + " " + (c.pcName || "-") + "</td></tr>";
  html += "</table>";

  html += "<h3 style='background:#1a472a;color:white;padding:8px;'>Audit Trail</h3>";
  html += "<table style='width:100%;border-collapse:collapse;margin-bottom:20px;'>";
  html += "<tr><td style='padding:6px;width:30%;'><strong>Entered By</strong></td><td>" + (c.enteredBy || "-") + " on " + (c.enteredDate || "-") + "</td></tr>";
  html += "<tr><td style='padding:6px;'><strong>Last Accessed By</strong></td><td>" + (c.lastAccessedBy || "-") + "</td></tr>";
  html += "<tr><td style='padding:6px;'><strong>Printed By</strong></td><td>" + (c.printedBy || "-") + "</td></tr>";
  html += "</table>";

  html += "<h3 style='background:#1a472a;color:white;padding:8px;'>Academic Scores</h3>";
  html += "<table style='width:100%;border-collapse:collapse;margin-bottom:20px;'>";
  html += "<thead><tr style='background:#e8f0e8;'><th>Subject</th><th>Exam Type</th><th>Score</th><th>Date</th></tr></thead><tbody>";
  if (scores.length === 0) html += "<tr><td colspan='4'>No scores recorded</td></tr>";
  else {
    for (let i = 0; i < scores.length; i++) {
      html += "<tr><td style='padding:6px;border-bottom:1px solid #ddd;'>" + scores[i].subject + "</td>";
      html += "<td style='padding:6px;border-bottom:1px solid #ddd;'>" + scores[i].examType + "</td>";
      html += "<td style='padding:6px;border-bottom:1px solid #ddd;'><strong>" + scores[i].marks + "/" + scores[i].max + "</strong></td>";
      html += "<td style='padding:6px;border-bottom:1px solid #ddd;'>" + (scores[i].date || "-") + "</td></tr>";
    }
  }
  html += "</tbody></table>";

  html += "<h3 style='background:#1a472a;color:white;padding:8px;'>Field Exercises</h3>";
  html += "<table style='width:100%;border-collapse:collapse;'>";
  html += "<thead><tr style='background:#e8f0e8;'><th>Exercise</th><th>Score</th><th>Date</th><th>Remarks</th></tr></thead><tbody>";
  if (exercises.length === 0) html += "<tr><td colspan='4'>No field exercises</td></tr>";
  else {
    for (let i = 0; i < exercises.length; i++) {
      html += "<tr><td style='padding:6px;border-bottom:1px solid #ddd;'>" + exercises[i].name + "</td>";
      html += "<td style='padding:6px;border-bottom:1px solid #ddd;'><strong>" + exercises[i].score + "</strong></td>";
      html += "<td style='padding:6px;border-bottom:1px solid #ddd;'>" + (exercises[i].date || "-") + "</td>";
      html += "<td style='padding:6px;border-bottom:1px solid #ddd;'>" + (exercises[i].remarks || "-") + "</td></tr>";
    }
  }
  html += "</tbody></table>";
  html += "<p style='margin-top:40px;text-align:center;color:#666;font-size:0.85rem;'>— End of Record — Made by 2Lt Herbert Wasajja for UMAK only —</p></div>";

  const printDiv = document.getElementById("printArea");
  printDiv.innerHTML = html;
  printDiv.classList.remove("hidden");

  setTimeout(function () {
    window.print();
    setTimeout(function () {
      printDiv.classList.add("hidden");
    }, 1000);
  }, 300);
}

/* ==================== EXPORT ==================== */
function exportSingleCadet(sn) {
  const cadets = getCadets();
  let c = null;
  for (let i = 0; i < cadets.length; i++) {
    if (cadets[i].serviceNo === sn) {
      c = cadets[i];
      break;
    }
  }
  if (!c) return;

  let csv = "Field,Value\n";
  csv += "Service No," + c.serviceNo + "\n";
  csv += "Full Name," + c.fullName + "\n";
  csv += "Course Category," + (c.courseCategory || "") + "\n";
  csv += "Year," + (c.year || "") + "\n";
  csv += "Sex," + c.sex + "\n";
  csv += "Company," + (c.company || "") + "\n";
  csv += "Entered By," + (c.enteredBy || "") + "\n";
  csv += "Entered Date," + (c.enteredDate || "") + "\n";
  csv += "Last Accessed By," + (c.lastAccessedBy || "") + "\n";
  csv += "Printed By," + (c.printedBy || "") + "\n";

  const blob = new Blob([csv], { type: "text/csv" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "Cadet_" + c.serviceNo + ".csv";
  a.click();
}

function exportData() {
  const cadets = getCadets();
  let csv = "Course Category,Year,Service No,Full Name,Rank,Sex,Company,Entered By,Entered Date,Last Accessed By,Printed By\n";
  for (let i = 0; i < cadets.length; i++) {
    const c = cadets[i];
    csv += '"' + (c.courseCategory || "") + '","' + (c.year || "") + '","' + c.serviceNo + '","' + c.fullName + '","' + c.rank + '","' + c.sex + '","' + (c.company || "") + '","' + (c.enteredBy || "") + '","' + (c.enteredDate || "") + '","' + (c.lastAccessedBy || "") + '","' + (c.printedBy || "") + '"\n';
  }
  const blob = new Blob([csv], { type: "text/csv" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "UMA_Cadets_" + new Date().toISOString().slice(0, 10) + ".csv";
  a.click();
}

function exportAlumni() {
  const list = getAlumni();
  let csv = "Service No,Full Name,Rank,Date of Commission,Remarks,Entered By,Entered Date\n";
  for (let i = 0; i < list.length; i++) {
    const a = list[i];
    csv += '"' + a.serviceNo + '","' + a.fullName + '","' + a.rank + '","' + (a.commissionDate || "") + '","' + (a.remarks || "") + '","' + (a.enteredBy || "") + '","' + (a.enteredDate || "") + '"\n';
  }
  const blob = new Blob([csv], { type: "text/csv" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "UMA_Alumni_" + new Date().toISOString().slice(0, 10) + ".csv";
  a.click();
}

function clearAllData() {
  if (confirm("Delete ALL data? This cannot be undone.")) {
    localStorage.removeItem("uma_cadets");
    localStorage.removeItem("uma_subjects");
    localStorage.removeItem("uma_scores");
    localStorage.removeItem("uma_exercises");
    localStorage.removeItem("uma_alumni");
    localStorage.removeItem("uma_updates");
    location.reload();
  }
}

/* ==================== UTILITIES ==================== */
function showAlert(id, msg, type) {
  const el = document.getElementById(id);
  if (!el) return;
  el.innerHTML = "<div class='alert alert-" + type + "'>" + msg + "</div>";
  setTimeout(function () { el.innerHTML = ""; }, 4000);
}

/* ==================== EVENT LISTENERS ==================== */
document.getElementById("loginPass").onkeypress = function (e) {
  if (e.key === "Enter" || e.keyCode === 13) doAdminLogin();
};

document.getElementById("stuPass").onkeypress = function (e) {
  if (e.key === "Enter" || e.keyCode === 13) doStudentLogin();
};