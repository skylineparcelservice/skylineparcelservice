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
            customerName: "John Doe",
            finalStatus: "DELIVERED", // Options: DELIVERED, PROCESSING, DELAYED, CANCELLED
            steps: [
                { type: "FROM", location: "Tomball, TX US", date: "Label Created<br>8/19/25 1:06 PM", progress: "completed" },
                { type: "WE HAVE YOUR PACKAGE", location: "HOUSTON, TX", date: "8/19/25 3:01 PM", progress: "completed" },
                { type: "ON THE WAY", location: "At destination sort facility", date: "CHARLOTTE, NC<br>8/20/25 6:53 PM", progress: "completed" },
                { type: "OUT FOR DELIVERY", location: "Shipment is out for local delivery", date: "8/21/25 9:00 AM", progress: "completed" }, 
                { type: "TO", location: "CHERRYVILLE, NC US", date: "Scheduled Delivery Date<br>8/21/25 before 8:00 PM", extra: "Estimated between<br>10:20 AM - 2:20 PM", progress: "current" }
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
