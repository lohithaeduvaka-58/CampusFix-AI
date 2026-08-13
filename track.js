requireStudent();
function trackComplaint(e){
  e.preventDefault();
  const id=document.getElementById('trackId').value.trim().toUpperCase();
  const c=getComplaints().find(x=>x.id===id);
  const el=document.getElementById('trackResult');
  if(!c){el.innerHTML='<section class="card"><p class="message">Complaint not found.</p></section>';return}
  el.innerHTML=`<section class="card">
    <div class="section-title"><h2>${escapeHtml(c.title)}</h2><span class="badge ${c.priority.toLowerCase()}">${c.priority}</span></div>
    <p><b>Complaint ID:</b> ${escapeHtml(c.id)}</p>
    <p><b>Location:</b> ${escapeHtml(c.location)}</p>
    <p><b>Category:</b> ${escapeHtml(c.category)}</p>
    <p><b>Status:</b> <span class="status">${escapeHtml(c.status)}</span></p>
    <p><b>Assigned:</b> ${escapeHtml(c.assigned)}</p>
    <p>${escapeHtml(c.description)}</p>
    <hr>
    <p class="muted">Submitted: ${new Date(c.createdAt).toLocaleString()}</p>
  </section>`;
}
function escapeHtml(s){return String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]))}
