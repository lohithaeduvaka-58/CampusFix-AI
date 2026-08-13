function showForm(){document.getElementById("formSection").classList.remove("hidden");document.getElementById("title").focus()}
function hideForm(){document.getElementById("formSection").classList.add("hidden")}

function renderStudent(){
  const all=getComplaints();
  const q=(document.getElementById("studentSearch")?.value||"").toLowerCase();
  const list=all.filter(c=>(c.title+" "+c.location+" "+c.category+" "+c.id).toLowerCase().includes(q));
  document.getElementById("totalCount").textContent=all.length;
  document.getElementById("openCount").textContent=all.filter(c=>!["Resolved","Rejected"].includes(c.status)).length;
  document.getElementById("progressCount").textContent=all.filter(c=>c.status==="In Progress").length;
  document.getElementById("resolvedCount").textContent=all.filter(c=>c.status==="Resolved").length;
  const box=document.getElementById("studentList");
  if(!list.length){box.innerHTML='<div class="muted">No complaints found.</div>';return;}
  box.innerHTML=list.map(c=>`
    <div class="complaint-row">
      <div class="complaint-main">
        <div><h3>${esc(c.title)}</h3><div class="complaint-meta">${c.id} · ${esc(c.location)} · ${esc(c.created)}</div></div>
        <span class="badge badge-${c.priority.toLowerCase()}">${c.priority.toUpperCase()}</span>
      </div>
      <div class="complaint-meta" style="margin-top:9px">🤖 ${esc(c.category)} · Assigned: ${esc(c.assigned||"Unassigned")}</div>
      <div class="complaint-actions"><span class="status ${statusClass(c.status)}">${c.status}</span><button class="small-btn" onclick="viewStudent('${c.id}')">View details</button></div>
    </div>`).join("");
}
function statusClass(s){return "status-"+s.toLowerCase().replaceAll(" ","-")}
function esc(s){return String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
function viewStudent(id){
  const c=getComplaints().find(x=>x.id===id); if(!c)return;
  alert(`Complaint ${c.id}\n\n${c.title}\nLocation: ${c.location}\nCategory: ${c.category}\nPriority: ${c.priority}\nStatus: ${c.status}\n\n${c.description}`);
}
document.getElementById("complaintForm").addEventListener("submit",async e=>{
  e.preventDefault();
  const title=document.getElementById("title").value.trim(), description=document.getElementById("description").value.trim(), location=document.getElementById("location").value.trim();
  const selected=document.getElementById("category").value;
  const ai=analyzeComplaint(title,description);
  const file=document.getElementById("photo").files[0];
  let photo="";
  if(file){
    if(file.size>1200000){toast("Please choose an image under 1.2 MB.");return;}
    photo=await new Promise(res=>{const r=new FileReader();r.onload=()=>res(r.result);r.readAsDataURL(file)});
  }
  const complaint={id:newId(),title,description,location,category:selected==="Auto"?ai.category:selected,priority:selected==="Auto"?ai.priority:"Medium",status:"Submitted",student:"Student",created:formatNow(),assigned:"Unassigned",photo};
  const data=getComplaints();data.unshift(complaint);saveComplaints(data);
  e.target.reset();hideForm();renderStudent();toast(`Complaint ${complaint.id} submitted. AI: ${complaint.category}, ${complaint.priority} priority.`);
});
renderStudent();
