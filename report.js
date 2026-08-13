requireStudent();
let selectedAI={category:'Other',priority:'MEDIUM'};
function detectAI(text,title){
  const s=(text+' '+title).toLowerCase();
  let category='Other';
  if(/fan|light|electric|switch|power|socket|ac |air conditioner|bulb/.test(s))category='Electrical';
  else if(/water|pipe|leak|tap|washroom|toilet|drain/.test(s))category='Plumbing';
  else if(/garbage|trash|dirty|clean|dust|waste/.test(s))category='Cleaning';
  else if(/wifi|wi-fi|internet|network|router|connection/.test(s))category='Network';
  else if(/bench|chair|desk|table|door|window|furniture/.test(s))category='Furniture';
  else if(/security|camera|cctv|theft|gate/.test(s))category='Security';
  let priority='LOW';
  if(/danger|fire|spark|shock|flood|leak|emergency|unsafe|security|theft/.test(s))priority='HIGH';
  else if(/not working|broken|problem|issue|unable|hot|urgent/.test(s))priority='MEDIUM';
  if(/fire|spark|shock|flood|emergency/.test(s))priority='HIGH';
  return {category,priority};
}
function analyzeForm(){
  const r=detectAI(document.getElementById('description').value,document.getElementById('title').value);
  selectedAI=r;
  document.getElementById('aiPreview').innerHTML='<b>Category:</b> '+r.category+' &nbsp; <b>Priority:</b> <span class="badge '+r.priority.toLowerCase()+'">'+r.priority+'</span>';
}
function previewImage(e){
  const file=e.target.files[0],img=document.getElementById('preview');
  if(!file){img.classList.add('hidden');return}
  const reader=new FileReader();
  reader.onload=()=>{img.src=reader.result;img.classList.remove('hidden')};
  reader.readAsDataURL(file);
}
function submitComplaint(e){
  e.preventDefault();
  analyzeForm();
  const user=currentUser();
  const file=document.getElementById('image').files[0];
  const finish=(image='')=>{
    const complaints=getComplaints();
    const c={id:'CF-'+Math.floor(100000+Math.random()*900000),studentEmail:user.email,studentName:user.name,title:document.getElementById('title').value.trim(),location:document.getElementById('location').value.trim(),description:document.getElementById('description').value.trim(),category:document.getElementById('category').value||selectedAI.category,priority:selectedAI.priority,status:'SUBMITTED',assigned:'Unassigned',createdAt:new Date().toISOString(),image};
    complaints.unshift(c);saveComplaints(complaints);
    document.getElementById('formMsg').style.color='#15803d';
    document.getElementById('formMsg').textContent='Complaint submitted successfully! ID: '+c.id;
    document.getElementById('reportForm').reset();
    document.getElementById('preview').classList.add('hidden');
    setTimeout(()=>location.href='student.html',1200);
  };
  if(file){const reader=new FileReader();reader.onload=()=>finish(reader.result);reader.readAsDataURL(file)}else finish();
}
