const STORAGE_KEY = "campusfixai_complaints";

function getComplaints(){
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
  catch(e){ return []; }
}
function saveComplaints(data){ localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); }

function seedData(){
  if(getComplaints().length) return;
  const demo = [
    {id:"CF-1001",title:"Water leakage near washroom",description:"Water is continuously leaking near the ground-floor washroom.",location:"Main Block, Ground Floor",category:"Plumbing",priority:"High",status:"In Progress",student:"Demo Student",created:"13 Aug 2026, 09:20",assigned:"Maintenance Team"},
    {id:"CF-1002",title:"Broken classroom fan",description:"The ceiling fan in the classroom is not working and the room is very hot.",location:"CSE Block, Room 204",category:"Electrical",priority:"High",status:"Submitted",student:"Demo Student",created:"13 Aug 2026, 10:05",assigned:"Unassigned"},
    {id:"CF-1003",title:"Garbage near canteen",description:"Garbage has not been collected near the canteen area.",location:"Canteen Entrance",category:"Cleaning",priority:"Medium",status:"Resolved",student:"Demo Student",created:"12 Aug 2026, 15:40",assigned:"Housekeeping Team"},
    {id:"CF-1004",title:"Wi-Fi not working",description:"No Wi-Fi connection in the second floor lab.",location:"IT Block, Lab 2",category:"Internet / Network",priority:"Medium",status:"In Review",student:"Demo Student",created:"13 Aug 2026, 08:45",assigned:"IT Support"}
  ];
  saveComplaints(demo);
}
function analyzeComplaint(title, desc){
  const text = (title+" "+desc).toLowerCase();
  let category="Other", priority="Low";
  const rules=[
    ["Plumbing",["water","leak","pipe","tap","drain","washroom","toilet"],"High"],
    ["Electrical",["fan","light","electric","power","switch","socket","ac","bulb"],"Medium"],
    ["Cleaning",["garbage","trash","dirty","clean","waste","dust"],"Medium"],
    ["Internet / Network",["wifi","wi-fi","internet","network","router","connection"],"Medium"],
    ["Furniture",["bench","chair","desk","table","door","window","furniture"],"Medium"],
    ["Security",["security","fight","unsafe","theft","camera","cctv"],"High"]
  ];
  for(const [cat,words,p] of rules){
    if(words.some(w=>text.includes(w))){category=cat;priority=p;break;}
  }
  if(/danger|fire|smoke|sparking|accident|flood|emergency|broken wire/.test(text)) priority="High";
  if(category==="Other" && text.length>80) priority="Medium";
  return {category,priority};
}
function newId(){
  const nums=getComplaints().map(c=>parseInt((c.id||"").replace(/\D/g,""))||0);
  return "CF-"+String(Math.max(1000,...nums)+1);
}
function formatNow(){
  return new Date().toLocaleString("en-IN",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"});
}
function toast(msg){
  const el=document.getElementById("toast"); if(!el)return;
  el.textContent=msg; el.classList.add("show"); setTimeout(()=>el.classList.remove("show"),2800);
}
function logout(){ localStorage.removeItem("cf_role"); location.href="index.html"; }
function loadDemoData(){ localStorage.removeItem(STORAGE_KEY); seedData(); location.reload(); }
seedData();
