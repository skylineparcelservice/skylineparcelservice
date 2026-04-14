// --- 1. SLIDESHOW LOGIC ---
let sIndex = 0;
function runSlideshow() {
    let slides = document.getElementsByClassName("mySlides");
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    sIndex++;
    if (sIndex > slides.length) { sIndex = 1; }
    if (slides[sIndex - 1]) {
        slides[sIndex - 1].style.display = "block";
    }
    setTimeout(runSlideshow, 4000);
}
runSlideshow();

// --- 2. TRACKING DATABASE & LOGIC ---
function trackPackage() {
    const id = document.getElementById('trackingID').value.trim();
    const timeline = document.getElementById('timelineContainer');
    const msg = document.getElementById('statusMessage');

    const database = {
        "SK-1001": {
            customerName: "Hatstat Rebecca",
            finalStatus: "DELAYED", // Options: DELIVERED, PROCESSING, DELAYED, CANCELLED
            steps: [
                { type: "FROM", location: "DHL Group, NW DE", date: "Label Created<br>3/17/26 12:25 PM", progress: "completed" },
                { type: "WE HAVE YOUR PACKAGE", location: "NORDRHEIN-WESTFALEN, DE", date: "3/18/26 11:07 AM", progress: "current" },
                { type: "ON THE WAY", location: "At destination sort facility", date: "NORDRHEIN-WESTFALEN, NC<br>4/15/26 12:00 PM", progress: "incomplete" },
                { type: "OUT FOR DELIVERY", location: "Shipment is out for local delivery", date: "4/24/26 9:30 AM", progress: "incompleted" }, 
                { type: "TO", location: "35 hatstat Albany twp 04217 US", date: "Scheduled Delivery Date<br>4/25/26 before 11:00 AM", extra: "Estimated between<br>10:20 AM - 11:00 AM", progress: "incomplete" }
            ]
        }
    };

    timeline.innerHTML = "";
    
    if (database[id]) {
        const data = database[id];
        msg.innerHTML = "Shipment Found";
        msg.style.color = "green";
        
        let html = `
            <div class="customer-welcome">
                <i class="fas fa-user-circle"></i> 
                <span>Welcome, <strong>${data.customerName}</strong></span>
            </div>
            <ul class="timeline-list">`;
            
        let completedSteps = 0;
        data.steps.forEach(step => {
            if (step.progress !== "incomplete") { completedSteps++; }
            html += `
                <li class="timeline-item ${step.progress}">
                    <div class="dot"></div>
                    <div class="status-content">
                        <div class="status-header">${step.type}</div>
                        <div class="status-loc">${step.location}</div>
                        <div class="status-time">${step.date}</div>
                        ${step.extra ? `<div class="status-estimated">${step.extra}</div>` : ''}
                    </div>
                </li>`;
        });

        // This adds the Status Badge right at the blue line you marked
        html += `</ul>
            <div class="final-status-badge ${data.finalStatus.toLowerCase()}">
                STATUS: ${data.finalStatus}
            </div>`;

        timeline.innerHTML = html;
        timeline.style.display = "block";
        
        const progressHeight = ((completedSteps - 1) / (data.steps.length - 1)) * 100;
        timeline.style.setProperty('--progress-height', progressHeight + '%');
        
    } else {
        msg.innerHTML = "Invalid Tracking ID";
        msg.style.color = "red";
    }
}
