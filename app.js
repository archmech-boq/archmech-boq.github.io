const showcase=document.querySelector('.hero');
const documentCard=showcase.querySelector('.document');
const choices=[...showcase.querySelectorAll('.mode-picker button')];
const looks={
 quantity:{number:'01',title:'บัญชีแสดงปริมาณงาน',label:'QUANTITY TAKEOFF',unit:'หน่วยตามรายการ',heading:['รายการงาน','ปริมาณ','หน่วย','อ้างอิง'],rows:[['งานพื้นกระเบื้อง','80.00','ตร.ม.','A-01'],['งานผนังเบา','45.00','ตร.ม.','A-02'],['งานฝ้าเพดาน','80.00','ตร.ม.','A-03'],['งานทาสีภายใน','150.00','ตร.ม.','A-02']],totalLabel:'รายการตัวอย่างในหมวดนี้',total:'4 รายการ',note:'ปริมาณและเลขแบบสมมติ เพื่อแสดงรูปแบบเอกสาร',caption:'เริ่มจากรายการและปริมาณ',detail:'แยกหมวด · แยกหน่วย · อ้างอิงแบบ'},
 cost:{number:'02',title:'ประมาณราคางานก่อสร้าง',label:'COST ESTIMATION',unit:'หน่วย : บาท',heading:['รายการงาน','วัสดุ','ค่าแรง','รวม'],rows:[['งานพื้นกระเบื้อง','48,000','20,000','68,000'],['งานผนังเบา','27,000','13,500','40,500'],['งานฝ้าเพดาน','28,000','16,000','44,000'],['งานทาสีภายใน','15,000','12,000','27,000']],totalLabel:'รวมหมวดงานตัวอย่าง',total:'179,500.00',note:'ตัวเลขสมมติ ไม่ใช่ราคามาตรฐานหรือใบเสนอราคาบริการ',caption:'แยกต้นทุนให้เห็นรายละเอียด',detail:'ค่าวัสดุ · ค่าแรง · ยอดรวม'},
 summary:{number:'03',title:'สรุปงบประมาณตัวอย่าง',label:'BUDGET OVERVIEW',unit:'หน่วย : บาท',heading:['รายการสรุป','วัสดุ','ค่าแรง','รวม'],rows:[['งานสถาปัตยกรรม','118,000','61,500','179,500']],totalLabel:'รวมเฉพาะหมวดตัวอย่าง',total:'179,500.00',note:'ตัวเลขสมมติ เฉพาะรายการที่แสดง ไม่ใช่งบทั้งโครงการ',caption:'เห็นภาพรวมจากรายการที่คิด',detail:'สรุปยอด · ระบุขอบเขต · เตรียมตัดสินใจ'}
};
function setLook(key){
 if(!looks[key])return;
 const data=looks[key];
 showcase.dataset.look=key;
 choices.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.look===key)));
 document.getElementById('scene-counter').textContent=data.number+' / 03';
 documentCard.querySelector('.doc-no').textContent=data.number+' / 03';
 documentCard.querySelector('.doc-heading small').textContent=data.label;
 documentCard.querySelector('.doc-heading h2').textContent=data.title;
 documentCard.querySelector('.doc-meta span:last-child').textContent=data.unit;
 const head=documentCard.querySelector('thead tr');head.replaceChildren(...data.heading.map(label=>{const th=document.createElement('th');th.textContent=label;th.scope='col';return th;}));
 const body=documentCard.querySelector('tbody');body.replaceChildren(...data.rows.map(row=>{const tr=document.createElement('tr');row.forEach(value=>{const td=document.createElement('td');td.textContent=value;tr.append(td)});return tr;}));
 documentCard.querySelector('.doc-total span').textContent=data.totalLabel;
 documentCard.querySelector('.doc-total b').textContent=data.total;
 documentCard.querySelector('.doc-note').textContent=data.note;
 showcase.querySelector('.floating-note b').textContent=data.caption;
 showcase.querySelector('.floating-note small').textContent=data.detail;
 documentCard.classList.remove('is-changing');void documentCard.offsetWidth;documentCard.classList.add('is-changing');
}
choices.forEach(button=>{
 button.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse'&&showcase.dataset.look!==button.dataset.look)setLook(button.dataset.look)});
 button.addEventListener('click',()=>{if(showcase.dataset.look!==button.dataset.look)setLook(button.dataset.look)});
 button.addEventListener('focus',()=>{if(showcase.dataset.look!==button.dataset.look)setLook(button.dataset.look)});
});
showcase.querySelector('.document-scene').addEventListener('pointermove',e=>{
 if(e.pointerType!=='mouse'||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 const r=e.currentTarget.getBoundingClientRect();
 documentCard.style.setProperty('--tilt-x',((e.clientX-r.left)/r.width-.5)*5+'deg');
 documentCard.style.setProperty('--tilt-y',-((e.clientY-r.top)/r.height-.5)*5+'deg');
});
showcase.querySelector('.document-scene').addEventListener('pointerleave',()=>{
 documentCard.style.setProperty('--tilt-x','0deg');documentCard.style.setProperty('--tilt-y','0deg');
});
setLook('quantity');
