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
        "SK-1171": {
            customerName: "Walz Christof Benjamin",
            finalStatus: "PENDING", 
            statusNote: "ON HOLD FOR INSURANCE CHARGES.",
            steps: [
                { type: "FROM", location: "PremiercourierserviceInc to Skylineparcelservice", date: "Label Created<br>6/5/26 10:25 AM", progress: "completed" },
                { type: "WE HAVE YOUR PACKAGE", location: "Texas (Headquarters): 509  port Wall Street Houston Texas", date: "6/5/26 11:40 PM", progress: "completed" },
                { type: "ON THE WAY", location: "St. Louis, MO", date: "7/5/26 09:25 AM", progress: "completed" },
                { type: "OUT FOR DELIVERY", location: "Kinzigweg 1671139, Germany", date: "8/6/26 08:53 AM", progress: "completed" }, 
                { type: "TO", location: "Kinzigweg 1671139, Germany", date: "Scheduled Delivery<br>8/6/26 08:53 AM", extra: "", progress: "current" }
            ]
        },

        "SK-2137": {
            customerName: "Michael",
            finalStatus: "PROCESSING",
            statusNote: "ON TRANSIT",
            steps: [
                { type: "FROM", location: "SpaceX", date: "6/13/26 09:00 AM", progress: "completed" },
                { type: "WE HAVE YOUR PACKAGE", location: "", date: "6/13/26 11:00 AM", progress: "completed" },
                { type: "ON THE WAY", location: "At destination sort facility", date: "6/13/26 03:00 PM", progress: "completed" },
                { type: "OUT FOR DELIVERY", location: "Shipment is out for delivery", date: "6/13/26 04:30 PM", progress: "completed" }, 
                { type: "TO", location: "3 Steven’s Court Hilton Head Island South Carolina 29926", date: "Schedule delivery date<br>6/30/26 09:00 AM", extra: "", progress: "current" }
            ]
        },

        "SK-3771": {
            customerName: "R Helmer",
            finalStatus: "PROCESSING",
            statusNote: "ON TRANSIT.",
            steps: [
                { type: "FROM", location: "SECURITY COMPANY", date: "3/2/26 09:00 AM", progress: "completed" },
                { type: "WE HAVE YOUR PACKAGE", location: "California, USA", date: "9/20/26 11:00 AM", progress: "completed" },
                { type: "ON THE WAY", location: "At destination sort facility", date: "6/24/26 03:00 PM", progress: "completed" },
                { type: "OUT FOR DELIVERY", location: "Shipment is out for international delivery", date: "6/25/26 04:30 PM", progress: "current" }, 
                { type: "TO", location: "125 MAGNOLIA DR BARDSTOWN, KY 40004", date: "Est. 6/30/26 11:00 PM", extra: "", progress: "incomplete" }
            ]
        },

        "SK-4004": {
            customerName: "Hatstat Rebecca ",
            finalStatus: "DELAYED",
            statusNote: "ON HOLD.",
            steps: [
                { type: "FROM", location: "DHL Group, NW DE", date: "3/17/26 12:25 PM", progress: "completed" },
                { type: "WE HAVE YOUR PACKAGE", location: "NORDRHEIN-WESTFALEN, DE", date: "3/18/26 11:07 AM", progress: "completed" },
                { type: "ON THE WAY", location: "At destination sort facility", date: "4/15/26 12:00 PM", progress: "completed" },
                { type: "OUT FOR DELIVERY", location: "Shipment is out for local delivery", date: "4/24/26 09:30 AM", progress: "current" }, 
                { type: "TO", location: "35 hatstat Albany twp 04217 US", date: "Est. 4/25/26 11:00 AM", extra: "", progress: "incomplete" }
            ]
        },

        "SK-5005": {
            customerName: "Jaime Tinoco",
            finalStatus: "PROCESSING",
            statusNote: "Keys and Lease Agreement Paper",
            steps: [
                { type: "FROM", location: "Paul Dillman", date: "Label Created<br>01/07/2026, 10:25 AM", progress: "completed" },
                { type: "WE HAVE YOUR PACKAGE", location: "1401 Glenoaks Blvd, San Fernando, CA 91340", date: "01/07/2026, 11:40 AM", progress: "completed" },
                { type: "ON THE WAY", location: "At destination sort facility", date: "02/07/2026, 16:25 PM", progress: "completed" },
                { type: "OUT FOR DELIVERY", location: "20710 filbert rd Bothell wa.98012", date: "03/07/2026, 08:53 AM", progress: "current" }, 
                { type: "TO", location: "20710 filbert rd Bothell wa.98012", date: "Scheduled delivery<br>03/07/2026, 13:10 PM", extra: "", progress: "incompleted" }
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
        timeline.style.display = "none";
    }
}
