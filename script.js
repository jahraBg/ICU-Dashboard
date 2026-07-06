const API_URL =
  "https://script.google.com/macros/s/AKfycbyEh1jE0Ki70_Zzph_ADZTeCxZ-uF64MkDYS4nO8h-UqTkVOgrqoXtxzIVQ0i6SPMmu/exec";

async function loadDashboard() {

    try {

        const response = await fetch(API_URL);
        const data = await response.json();

        // ===== TOP CARDS =====

        document.getElementById("patientCount").textContent =
            data.stats.patients.replace(/\D/g, "");

        document.getElementById("freeBeds").textContent =
            data.stats.freeBeds.replace(/\D/g, "");

        document.getElementById("ventilated").textContent =
            data.stats.ventilated.replace(/\D/g, "");

        document.getElementById("admissions").textContent =
            data.stats.admissions.replace(/\D/g, "");

        document.getElementById("discharges").textContent =
            data.stats.discharge.replace(/\D/g, "");

        // ===== PATIENT TABLE =====

        loadPatients(data.patients);

        // ===== DOCTORS =====

      // ===== DOCTORS =====

const doctorList = document.getElementById("doctorList");
doctorList.innerHTML = "";

const doctorIcons = {
    icu: "🩺",
    cardio: "❤️",
    medical: "➕",
    surgical: "🦴",
    gastro: "🫁",
    nephro: "🫀",
    ent: "👂",
    ortho: "🦴"
};

const doctorColors = {
    icu: "#00838f",
    cardio: "#d00f0f",
    medical: "#1565c0",
    surgical: "#7b1fa2",
    gastro: "#ef6c00",
    nephro: "#2e7d32",
    ent: "#00897b",
    ortho: "#6d4c41"
};

Object.entries(data.doctors).forEach(([department, doctors]) => {

    const list = doctors.filter(d => d.trim() !== "");

    if (list.length === 0) return;

    const card = document.createElement("div");
    card.className = "doctor-card";

    card.innerHTML = `
        <div class="doctor-header"
             style="background:${doctorColors[department] || "#1565c0"}">

            <span class="doctor-icon">
                ${doctorIcons[department] || "👨‍⚕️"}
            </span>

            <span class="doctor-title">
                ${department.toUpperCase()}
            </span>
        </div>

        <div class="doctor-body">
            ${list.map(name =>
                `<div class="doctor-name">• ${name}</div>`
            ).join("")}
        </div>
    `;

    doctorList.appendChild(card);

});

    } catch (err) {

        console.error(err);

    }

}

updateClock();
setInterval(updateClock, 1000);

loadDashboard();
setInterval(loadDashboard, 5000);

function loadPatients(patients) {
    const table = document.getElementById("patientTable");
    table.innerHTML = "";

    patients.forEach(patient => {
        if (!patient.name || !patient.name.trim()) return;

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${patient.room || ""}</td>
            <td>${patient.name || ""}</td>
            <td>${patient.diagnosis || ""}</td>
            <td>${patient.unit || ""}</td>
            <td>${patient.doaICU || ""}</td>
         
        `;

        table.appendChild(row);
    });
}
//   <td>${getDaysInICU(patient.doaICU)}</td>
function updateClock() {

    const now = new Date();

    document.getElementById("clock").textContent =
        now.toLocaleTimeString("en-GB");

    document.getElementById("date").textContent =
        now.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "long",
            //year: "numeric"
        });

    document.getElementById("day").textContent =
        now.toLocaleDateString("en-GB", {
            weekday: "long"
        });

}

// function getDaysInICU(doaText) {
//     if (!doaText) return "";

//     const text = String(doaText).trim();

//     // Accept DD/MM/YYYY or DD-MM-YYYY or DD\MM\YYYY
//     const parts = text.split(/[\/\\-]/).map(x => x.trim());
//     if (parts.length !== 3) return "";

//     let day = parseInt(parts[0], 10);
//     let month = parseInt(parts[1], 10);
//     let year = parseInt(parts[2], 10);

//     if (Number.isNaN(day) || Number.isNaN(month) || Number.isNaN(year)) return "";
//     if (year < 100) year += 2000;

//     const admitDate = new Date(year, month - 1, day);
//     if (isNaN(admitDate.getTime())) return "";

//     const today = new Date();
//     const start = new Date(admitDate.getFullYear(), admitDate.getMonth(), admitDate.getDate());
//     const now = new Date(today.getFullYear(), today.getMonth(), today.getDate());

//   const diff = Math.floor((now - start) / 86400000) + 1;
// return String(Math.max(diff, 1));
// }