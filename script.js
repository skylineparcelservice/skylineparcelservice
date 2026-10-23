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
    // Added .toUpperCase() to handle mixed-case inputs like Sk-1711
    const id = document.getElementById('trackingID').value.trim().toUpperCase();
    const timeline = document.getElementById('timelineContainer');
    const msg = document.getElementById('statusMessage');

    const database = {
        "SK-2833": {
            customerName: "Susan Dunlap",
            finalStatus: "ON HOLD", 
            statusNote: "YOUR CASH IS CURRENTLY ON HOLD.",
            steps: [
                { type: "FROM", location: "FedEx", date: "Label Created<br>23/10/26 08:02 AM", progress: "completed" },
                { type: "WE HAVE YOUR PACKAGE", location: "CHATSWORTH, CA US", date: "23/10/26 09:32 AM", progress: "completed" },
                { type: "ON THE WAY", location: "At destination sort facility", date: "23/10/26 13:00 PM", progress: "current" },
                { type: "OUT FOR DELIVERY", location: "Shipment is out for delivery", date: "24/10/26 09:20 AM", progress: "incomplete" }, 
                { type: "TO", location: "20314 74th Avenue NE C303, Arlington, WA 98223", date: "Scheduled Delivery<br>24/10/26 17:28 PM", extra: "", progress: "incomplete" }
            ]
        },

        "SK-2133": {
            customerName: "Keontra A. Everitt",
            finalStatus: "ON HOLD",
            statusNote: "Action Required: Shipping Suspended Instructions on how to resolve this compliance issue have been sent to your email.",
            steps: [
                { type: "FROM", location: "PremiercourierserviceInc to Skylineparcelservice", date: "24/07/26 09:00 AM", progress: "completed" },
                { type: "WE HAVE YOUR PACKAGE", location: "Connecticut 210 Capitol Ave, Hartford, CT 06106", date: "24/07/26 11:32 AM", progress: "completed" },
                { type: "ON THE WAY", location: "At destination sort facility", date: "25/07/26 02:00 PM", progress: "completed" },
                { type: "OUT FOR DELIVERY", location: "509  port Wall Street Houston Texas", date: "27/07/26 11:00 AM", progress: "current" }, 
                { type: "TO", location: "Longview, TX 75605", date: "Schedule delivery date<br>27/07/26 02:00 PM", extra: "", progress: "incomplete" }
            ]
        },

        "SK-4711": {
            customerName: "MARIXIE ANNA VELASCO",
            finalStatus: "PROCESSING",
            statusNote: "ON TRANSIT.",
            steps: [
                { type: "FROM", location: "SkylineParcelService", date: "10/12/26 10:25 AM", progress: "completed" },
                { type: "WE HAVE YOUR PACKAGE", location: "Ontario Delivery Ltd.(Headquarters): P.O Box 25101 RPO West,Brantford , Ontario ,N3T 6K5 .CA", date: "10/13/26 02:10 PM", progress: "completed" },
                { type: "ON THE WAY", location: "At destination sort facility, Ontario,CA", date: "10/14/26 08:25 AM", progress: "completed" },
                { type: "OUT FOR DELIVERY", location: "(Guest) c/o Cambridge Suites Toronto 15 Richmond St E, Toronto ON M5C 1N2", date: "10/14/26 08:53 AM", progress: "current" }, 
                { type: "TO", location: "(Guest) c/o Cambridge Suites Toronto 15 Richmond St E, Toronto ON M5C 1N2", date: "Est. 10/15/26 08:53 AM", extra: "", progress: "incomplete" }
            ]
        },

        "SK-1711": {
            customerName: "Kaleb Hebert",
            finalStatus: "PROCESSING",
            statusNote: "ON TRANSIT.",
            steps: [
                { type: "FROM", location: "Aeros International Outlet", date: "10/21/26 08:25 AM", progress: "completed" },
                // Fixed missing quotation mark here:
                { type: "WE HAVE YOUR PACKAGE", location: "133 W Canal St, Newcomerstown, OH 43832", date: "10/21/26 10:07 PM", progress: "completed" },
                { type: "ON THE WAY", location: "At destination sort facility", date: "10/22/26 15:30 PM", progress: "completed" },
                { type: "OUT FOR DELIVERY", location: "Shipment is out for delivery", date: "10/22/26 20:16 PM", progress: "current" }, 
                { type: "TO", location: "1705 Canal Ave Nederland Texas United States 77627", date: "Est. 10/23/26 17:28 PM", extra: "", progress: "incomplete" }
            ]
        },

        "SK-57703": {
            customerName: "Jaime Tinoco",
            finalStatus: "ON HOLD",
            statusNote: "Client needs to compulsory solidify the lease agreement by paying the 3 months rent upfront, the first month rent and the rent for the month of August has been received by Teresa, now he only he needs to pay the last month rent and the September rent to have the keys released to you today.",
            steps: [
                { type: "FROM", location: "Paul Dillman", date: "Label Created<br>01/07/2026, 10:25 AM", progress: "completed" },
                { type: "WE HAVE YOUR PACKAGE", location: "1401 Glenoaks Blvd, San Fernando, CA 91340", date: "01/07/2026, 11:40 AM", progress: "completed" },
                { type: "ON THE WAY", location: "At destination sort facility", date: "02/07/2026, 16:25 PM", progress: "completed" },
                { type: "OUT FOR DELIVERY", location: "20710 filbert rd Bothell wa.98012", date: "03/07/2026, 08:53 AM", progress: "completed" }, 
                { type: "TO", location: "20710 filbert rd Bothell wa.98012", date: "Scheduled delivery<br>06/07/2026, 16:10 PM", extra: "", progress: "current" }
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
