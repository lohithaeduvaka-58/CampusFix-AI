function renderAdmin(){
  const all=getComplaints();
  document.getElementById("aTotal").textContent=all.length;
  document.getElementById("aPending").textContent=all.filter(c=>["Submitted","In Review"].includes(c.status)).length;
  document.getElementById("aProgress").textContent=all.filter(c=>c.status==="In Progress").length;
  document.getElementById("aResolved").textContent=all.filter(c=>c.status==="Resolved").length;
  const q=(document.getElementById("adminSearch")?.value||"").toLowerCase();
  const sf=document.getElementById("statusFilter").value,pf=document.getElementById("priorityFilter").value;
  const list=all.filter(c=>{
    const matchesQ=(c.id+" "+c.title+" "+c.location+" "+c.category).toLowerCase().includes(q);
    return matchesQ&&(sf==="All Status"||c.status===sf)&&(pf==="All Priority"||c.priority===pf);
  });
  const body=document.getElementById("adminTable");
  body.innerHTML=list.length?list.map(c=>`
    <tr>
      <td><b>${c.id}</b></td><td><b>${esc(c.title)}</b><br><span class="complaint-meta">${esc(c.created)}</span></td>
      <td>${esc(c.location)}</td><td>🤖 ${esc(c.category)}</td>
      <td><span class="badge badge-${c.priority.toLowerCase()}">${c.priority}</span></td>
      <td><span class="status ${statusClass(c.status)}">${c.status}</span></td>
      <td><button class="small-btn" onclick="openComplaint('${c.id}')">Manage</button></td>
    </tr>`).join(""):'<tr><td colspan="7" class="muted">No complaints match your filters.</td></tr>';
}
function esc(s){return String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
function statusClass(s){return "status-"+s.toLowerCase().replaceAll(" ","-")}
function openComplaint(id){
  const c=getComplaints().find(x=>x.id===id);if(!c)return;
  document.getElementById("modalBody").innerHTML=`
    <div class="detail-grid">
      <div class="detail"><small>Complaint ID</small><b>${c.id}</b></div>
      <div class="detail"><small>AI Priority</small><b>${c.priority}</b></div>
      <div class="detail"><small>AI Category</small><b>🤖 ${esc(c.category)}</b></div>
      <div class="detail"><small>Location</small><b>${esc(c.location)}</b></div>
      <div class="detail"><small>Submitted</small><b>${esc(c.created)}</b></div>
      <div class="detail"><small>Assigned To</small><b>${esc(c.assigned||"Unassigned")}</b></div>
    </div>
    <h3>${esc(c.title)}</h3><p class="muted">${esc(c.description)}</p>
    ${c.photo?`<img class="photo-preview" src="${c.photo}" alt="Complaint photo">`:""}
    <label>Status
      <select id="editStatus">
        ${["Submitted","In Review","In Progress","Resolved","Rejected"].map(s=>`<option ${s===c.status?"selected":""}>${s}</option>`).join("")}
      </select>
    </label>
    <label>Assigned team
      <select id="editAssigned">
        ${["Unassigned","Electrical Team","Plumbing Team","Housekeeping Team","IT Support","Security Team","General Maintenance"].map(s=>`<option ${s===c.assigned?"selected":""}>${s}</option>`).join("")}
      </select>
    </label>
    <button class="btn btn-primary full" onclick="updateComplaint('${c.id}')">Save Changes</button>`;
  document.getElementById("modal").classList.remove("hidden");
}
function updateComplaint(id){
  const data=getComplaints(),c=data.find(x=>x.id===id);if(!c)return;
  c.status=document.getElementById("editStatus").value;c.assigned=document.getElementById("editAssigned").value;
  saveComplaints(data);closeModal();renderAdmin();
}
function closeModal(){document.getElementById("modal").classList.add("hidden")}
renderAdmin();
