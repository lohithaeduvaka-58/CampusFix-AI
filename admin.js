requireAdmin();
function renderAdmin(){
  const all=getComplaints();
  document.getElementById('aTotal').textContent=all.length;
  document.getElementById('aPending').textContent=all.filter(c=>c.status==='SUBMITTED'||c.status==='IN REVIEW').length;
  document.getElementById('aProgress').textContent=all.filter(c=>c.status==='IN PROGRESS').length;
  document.getElementById('aResolved').textContent=all.filter(c=>c.status==='RESOLVED').length;
  const q=(document.getElementById('search').value||'').toLowerCase();
  const sf=document.getElementById('statusFilter').value,pf=document.getElementById('priorityFilter').value;
  const rows=all.filter(c=>(sf==='ALL'||c.status===sf)&&(pf==='ALL'||c.priority===pf)&&(!q||[c.id,c.title,c.location,c.category,c.description].join(' ').toLowerCase().includes(q)));
  document.getElementById('adminList').innerHTML=rows.length?rows.map(c=>`<div class="admin-row">
    <b>${c.id}</b><div><b>${escapeHtml(c.title)}</b><br><small>${escapeHtml(c.location)}</small></div>
    <span>${escapeHtml(c.category)}</span><span class="badge ${c.priority.toLowerCase()}">${c.priority}</span>
    <span class="status">${escapeHtml(c.status)}</span><button class="btn small" onclick="openComplaint('${c.id}')">View</button>
  </div>`).join(''):'<p class="muted">No matching complaints.</p>';
}
function openComplaint(id){
  const c=getComplaints().find(x=>x.id===id);if(!c)return;
  document.getElementById('modalContent').innerHTML=`<p class="eyebrow">${c.id}</p><h2>${escapeHtml(c.title)}</h2>
  <div class="detail-grid">
    <div class="detail"><b>Student</b>${escapeHtml(c.studentName)}<br>${escapeHtml(c.studentEmail)}</div>
    <div class="detail"><b>Location</b>${escapeHtml(c.location)}</div>
    <div class="detail"><b>Category</b>${escapeHtml(c.category)}</div>
    <div class="detail"><b>Priority</b><span class="badge ${c.priority.toLowerCase()}">${c.priority}</span></div>
  </div>
  <p><b>Description</b></p><p>${escapeHtml(c.description)}</p>
  ${c.image?`<img src="${c.image}" class="preview" alt="Complaint photo">`:''}
  <label>Status</label>
  <select id="editStatus">
    ${['SUBMITTED','IN REVIEW','IN PROGRESS','RESOLVED'].map(s=>`<option ${c.status===s?'selected':''}>${s}</option>`).join('')}
  </select>
  <label>Assign to</label>
  <select id="editAssigned">
    ${['Unassigned','Electrical Maintenance','Plumbing Team','Cleaning Team','IT Support','Furniture Team','Security Team'].map(s=>`<option ${c.assigned===s?'selected':''}>${s}</option>`).join('')}
  </select>
  <button class="btn primary full" onclick="updateComplaint('${c.id}')">Update Complaint</button>`;
  document.getElementById('modal').classList.remove('hidden');
}
function updateComplaint(id){
  const data=getComplaints(),c=data.find(x=>x.id===id);if(!c)return;
  c.status=document.getElementById('editStatus').value;c.assigned=document.getElementById('editAssigned').value;
  saveComplaints(data);closeModal();renderAdmin();
}
function closeModal(){document.getElementById('modal').classList.add('hidden')}
function escapeHtml(s){return String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]))}
renderAdmin();
