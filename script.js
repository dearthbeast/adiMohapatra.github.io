// Dynamic Live Wallpaper (animated bubbles)
const bg = document.getElementById('live-bg');
let bubbles = [];
for(let i=0;i<15;i++){
  let b = document.createElement('div');
  b.className = 'bubble';
  let size = 12 + Math.random()*28;
  b.style.width = b.style.height = size + 'px';
  b.style.left = Math.random()*100 + 'vw';
  b.style.top = 100 + Math.random()*600 +'px';
  b.style.opacity = 0.2 + Math.random()*0.6;
  bg.appendChild(b);
  bubbles.push(b);
}
function animateBubbles() {
  bubbles.forEach(b => {
    let top = parseFloat(b.style.top);
    top -= 0.6 + Math.random();
    if(top < -50) top = 680 + Math.random()*40;
    b.style.top = top + 'px';
  });
  requestAnimationFrame(animateBubbles);
}
animateBubbles();

// Skills list (local storage + dynamic)
const skillsList = document.getElementById('skills-list');
function renderSkills() {
  skillsList.innerHTML = '';
  let skills = JSON.parse(localStorage.getItem('skills') || '[]');
  skills.forEach((s, idx) => {
    const li = document.createElement('li');
    li.innerText = s;
    li.onclick = () => {
      if(confirm("Remove skill?")) {
        skills.splice(idx,1);
        localStorage.setItem('skills', JSON.stringify(skills));
        renderSkills();
      }
    };
    skillsList.appendChild(li);
  });
}
function addSkill() {
  const input = document.getElementById('new-skill');
  let val = input.value.trim();
  if(val) {
    let skills = JSON.parse(localStorage.getItem('skills') || '[]');
    skills.push(val);
    localStorage.setItem('skills', JSON.stringify(skills));
    input.value = '';
    renderSkills();
  }
}
renderSkills();

// Certificates list
const certList = document.getElementById('certificates-list');
function renderCertificates() {
  certList.innerHTML = '';
  let certs = JSON.parse(localStorage.getItem('certificates') || '[]');
  certs.forEach((c, idx) => {
    const li = document.createElement('li');
    li.innerHTML = `<a href="${c.url}" target="_blank">${c.title}</a>`;
    li.onclick = () => {
      if(confirm("Remove certificate?")) {
        certs.splice(idx,1);
        localStorage.setItem('certificates', JSON.stringify(certs));
        renderCertificates();
      }
    };
    certList.appendChild(li);
  });
}
function addCertificate() {
  const titleInput = document.getElementById('new-certificate');
  const urlInput = document.getElementById('new-certificate-url');
  let title = titleInput.value.trim();
  let url = urlInput.value.trim();
  if(title && url) {
    let certs = JSON.parse(localStorage.getItem('certificates') || '[]');
    certs.push({title, url});
    localStorage.setItem('certificates', JSON.stringify(certs));
    titleInput.value = urlInput.value = '';
    renderCertificates();
  }
}
renderCertificates();
