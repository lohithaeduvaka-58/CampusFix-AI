const STUDENT={email:'student@campusfix.ai',password:'student123',name:'Demo Student'};
const ADMIN={email:'admin@campusfix.ai',password:'admin123'};

function getComplaints(){return JSON.parse(localStorage.getItem('campusfix_complaints')||'[]')}
function saveComplaints(data){localStorage.setItem('campusfix_complaints',JSON.stringify(data))}
function currentUser(){return JSON.parse(sessionStorage.getItem('campusfix_user')||'null')}
function requireStudent(){const u=currentUser();if(!u||u.role!=='student')location.href='index.html';return u}
function requireAdmin(){const u=currentUser();if(!u||u.role!=='admin')location.href='index.html';return u}
function logout(){sessionStorage.removeItem('campusfix_user');location.href='index.html'}
function showLogin(type){
  document.querySelectorAll('.tab').forEach(x=>x.classList.remove('active'));
  document.querySelectorAll('.tab')[type==='student'?0:1].classList.add('active');
  document.getElementById('studentLogin').classList.toggle('hidden',type!=='student');
  document.getElementById('adminLogin').classList.toggle('hidden',type!=='admin');
}
function studentLogin(e){
  e.preventDefault();
  const email=document.getElementById('studentEmail').value.trim(),pass=document.getElementById('studentPassword').value;
  if(email===STUDENT.email&&pass===STUDENT.password){sessionStorage.setItem('campusfix_user',JSON.stringify({role:'student',name:STUDENT.name,email}));location.href='student.html'}
  else document.getElementById('loginMsg').textContent='Invalid student credentials.';
}
function adminLogin(e){
  e.preventDefault();
  const email=document.getElementById('adminEmail').value.trim(),pass=document.getElementById('adminPassword').value;
  if(email===ADMIN.email&&pass===ADMIN.password){sessionStorage.setItem('campusfix_user',JSON.stringify({role:'admin',email}));location.href='admin.html'}
  else document.getElementById('loginMsg').textContent='Invalid admin credentials.';
}
function seedDemo(){
  if(localStorage.getItem('campusfix_seeded'))return;
  const now=Date.now();
  saveComplaints([
    {id:'CF-100001',studentEmail:STUDENT.email,studentName:STUDENT.name,title:'Broken classroom fan',location:'CSE Block - Room 204',description:'The ceiling fan is not working and the classroom is very hot.',category:'Electrical',priority:'HIGH',status:'IN PROGRESS',assigned:'Electrical Maintenance',createdAt:new Date(now-86400000).toISOString(),image:''},
    {id:'CF-100002',studentEmail:STUDENT.email,studentName:STUDENT.name,title:'Water leakage',location:'Main Block - Ground Floor',description:'Water is leaking continuously near the washroom.',category:'Plumbing',priority:'HIGH',status:'RESOLVED',assigned:'Plumbing Team',createdAt:new Date(now-172800000).toISOString(),image:''},
    {id:'CF-100003',studentEmail:'other@student.ai',studentName:'Other Student',title:'Wi-Fi problem',location:'Library',description:'Campus Wi-Fi is unavailable in the library.',category:'Network',priority:'MEDIUM',status:'SUBMITTED',assigned:'IT Support',createdAt:new Date(now-3600000).toISOString(),image:''}
  ]);
  localStorage.setItem('campusfix_seeded','1');
}
seedDemo();
