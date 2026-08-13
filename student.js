const user=requireStudent();
document.getElementById('studentName').textContent=user.name;
function renderStudent(){
  const list=getComplaints().filter(c=>c.studentEmail===user.email);
  document.getElementById('total').textContent=list.length;
  document.getElementById('pending').textContent=list.filter(c=>c.status==='SUBMITTED'||c.status==='IN REVIEW').length;
  document.getElementById('progress').textContent=list.filter(c=>c.status==='IN PROGRESS').length;
  document.getElementById('resolved').textContent=list.filter(c=>c.status==='RESOLVED').length;
  const el=document.getElementById('complaintList');
  if(!list.length){el.innerHTML='<p class="muted">No complaints yet. Report your first campus problem.</p>';return}
  el.innerHTML=list.map(c=>`<div class="complaint">
    <div class="complaint-head"><div><b>${escapeHtml(c.title)}</b><p class="muted">${escapeHtml(c.id)} · ${escapeHtml(c.location)}</p></div>
    <span class="badge ${c.priority.toLowerCase()}">${c.priority}</span></div>
    <p>${escapeHtml(c.description)}</p>
    <p><b>${escapeHtml(c.category)}</b> · <span class="status">${escapeHtml(c.status)}</span></p>
    <small class="muted">${formatDate(c.createdAt)} · Assigned: ${escapeHtml(c.assigned)}</small>
  </div>`).join('');
}
function formatDate(d){return new Date(d).toLocaleString()}
function escapeHtml(s){return String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]))}
renderStudent();
