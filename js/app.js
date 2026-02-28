// ---------------- AUTH SYSTEM ----------------

function showLogin(){
document.getElementById("loginForm").style.display="block";
document.getElementById("signupForm").style.display="none";
}

function showSignup(){
document.getElementById("loginForm").style.display="none";
document.getElementById("signupForm").style.display="block";
}

function signup(){
let user=signupUser.value;
let pass=signupPass.value;

if(!user || !pass) return;

localStorage.setItem(user, JSON.stringify({
password:pass,
xp:0,
coins:500,
level:1,
subscribed:false
}));

authMessage.innerText="Account created!";
}

function login(){
let user=loginUser.value;
let pass=loginPass.value;
let data=JSON.parse(localStorage.getItem(user));

if(data && data.password===pass){
localStorage.setItem("currentUser",user);
window.location="dashboard.html";
}else{
authMessage.innerText="Invalid credentials";
}
}

function logout(){
localStorage.removeItem("currentUser");
window.location="index.html";
}

function checkAuth(){
if(!localStorage.getItem("currentUser")){
window.location="index.html";
}
}

// ---------------- USER DATA ----------------

function loadUserData(){
let user=localStorage.getItem("currentUser");
let data=JSON.parse(localStorage.getItem(user));

navUser.innerText=user;
level.innerText=data.level;
coins.innerText=data.coins;
subStatus.innerText=data.subscribed?"Premium":"Go Premium";

xpFill.style.width=(data.xp%100)+"%";

if(data.xp>=200){
badge.style.display="block";
badge.innerText="🏆 Elite Player Unlocked!";
}
loadLeaderboard();
}

// ---------------- GAMIFIED SYSTEM ----------------

function completeMission(){
let user=localStorage.getItem("currentUser");
let data=JSON.parse(localStorage.getItem(user));

let reward=data.subscribed?40:20;

data.xp+=reward;
data.coins+=reward;
data.level=Math.floor(data.xp/100)+1;

localStorage.setItem(user,JSON.stringify(data));
loadUserData();
}

function toggleSubscription(){
let user=localStorage.getItem("currentUser");
let data=JSON.parse(localStorage.getItem(user));
data.subscribed=!data.subscribed;
localStorage.setItem(user,JSON.stringify(data));
loadUserData();
}

// ---------------- LEADERBOARD ----------------

function loadLeaderboard(){
const games=[
["EA FC 24","Janu",9800],
["GTA Online","Alex",8700],
["Spider-Man 2","Riya",9100],
["Call of Duty","Palak",9900]
];

leaderboardTable.innerHTML="<tr><th>Game</th><th>Top Player</th><th>Score</th></tr>";
games.forEach(g=>{
leaderboardTable.innerHTML+=`<tr><td>${g[0]}</td><td>${g[1]}</td><td>${g[2]}</td></tr>`;
});
}

// ---------------- CHAT SYSTEM ----------------

function sendMessage(){
let user=localStorage.getItem("currentUser");
let msg=chatInput.value;
if(!msg) return;
chatBox.innerHTML+=`<div><b>${user}:</b> ${msg}</div>`;
chatInput.value="";
chatBox.scrollTop=chatBox.scrollHeight;
}

// ---------------- AI (Gemini Ready) ----------------

async function getAIRecommendation(){
aiOutput.innerText="Generating...";

const input=aiInput.value;

const response=await fetch(
"https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=YOUR_API_KEY",
{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({
contents:[{parts:[{text:"Suggest a PlayStation game for: "+input}]}]
})
}
);

const data=await response.json();
aiOutput.innerText=
data?.candidates?.[0]?.content?.parts?.[0]?.text
|| "Error generating recommendation.";
}