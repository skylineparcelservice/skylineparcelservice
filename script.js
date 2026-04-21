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

    // ADD MORE CUSTOMERS BY COPYING A FULL BLOCK BELOW
    const database = {
        "SK-1001": {
            customerName: "Sam Abdullah",
            finalStatus: "DELAYED", 
            statusNote: "ON HOLD FOR INSURANCE  CHARGES.",
            steps: [
                { type: "FROM", location: "Elite Fund Solutions", date: "Label Created<br>4/21/26 8:25 AM", progress: "completed" },
                { type: "WE HAVE YOUR PACKAGE", location: "Kansas City, MO", date: "4/22/26 4:40 PM", progress: "completed" },
                { type: "ON THE WAY", location: "St. Louis, MO", date: "4/23/26 9:25 AM", progress: "completed" },
                { type: "OUT FOR DELIVERY", location: "COLUMBIA, MO", date: "4/23/26 1:10 PM", progress: "completed" }, 
                { type: "TO", location: "COLUMBIA, MO", date: "Scheduled Delivery<br>4/24/26 10:30 AM", extra: "", progress: "current" }
            ]
        }, // <-- ALWAYS put a comma between customers

        "SK-2002": {
            customerName: "Chen Xiaoxin",
            finalStatus: "DELAYED",
            statusNote: "ON HOLD FOR CUSTOM CLEARANCE CHARGES. $300 Please contact supplier",
            steps: [
                { type: "FROM", location: "GLOVES HUT", date: "4/16/26 06:00 PM", progress: "completed" },
                { type: "WE HAVE YOUR PACKAGE", location: "Quanzhou Distribution Center, FJ", date: "4/16/26 11:07 AM", progress: "completed" },
                { type: "ON THE WAY", location: "At destination sort facility", date: "4/16/26 12:00 PM", progress: "completed" },
                { type: "OUT FOR DELIVERY", location: "Shipment is out for delivery", date: "4/18/26 12:30 AM", progress: "completed" }, 
                { type: "TO", location: "Juran Home Express Station, No. 1, Chenghui International Road, Daxiamei, Nan'an City, Quanzhou, Fujian Province", date: "Schedule delivery date<br>4/25/26 11:00 AM", extra: "", progress: "current" }
            ]
        },

        "SK-3003": {
            customerName: "Alhassane Diallo",
            finalStatus: "PROCESSING",
            statusNote: "ON HOLD FOR CUSTOM CLEARANCE CHARGES. $300 Please contact supplier.",
            steps: [
                { type: "FROM", location: "GLOVES HUT", date: "4/20/26 04:00 PM", progress: "completed" },
                { type: "WE HAVE YOUR PACKAGE", location: "CONAKRY TRI", date: "4/20/26 4:45 PM", progress: "completed" },
                { type: "ON THE WAY", location: "At destination sort facility", date: "4/20/26 05:00 PM", progress: "completed" },
                { type: "OUT FOR DELIVERY", location: "Shipment is out for international delivery", date: "4/20/26 05:00 PM", progress: "current" }, 
                { type: "TO", location: "Conakry Guinea", date: "Est. 4/23/26 11:00 AM", extra: "", progress: "incomplete" }
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

        html += `</ul>
            <div class="final-status-badge ${data.finalStatus.toLowerCase()}">
                STATUS: ${data.finalStatus}
            </div>
            ${data.statusNote ? `<div class="status-note-box"><strong>Note:</strong> ${data.statusNote}</div>` : ''}`;

        timeline.innerHTML = html;
        timeline.style.display = "block";
        
        const progressHeight = ((completedSteps - 1) / (data.steps.length - 1)) * 100;
        timeline.style.setProperty('--progress-height', progressHeight + '%');
        
    } else {
        msg.innerHTML = "Invalid Tracking ID";
        msg.style.color = "red";
    }
}
