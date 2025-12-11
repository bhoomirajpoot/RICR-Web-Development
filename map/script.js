const statePositions = {
    "andhra pradesh": [41, 72],
    "arunachal pradesh": [88, 24],
    assam: [82, 34],
    bihar: [63, 38],
    chhattisgarh: [47, 54],
    goa: [25, 75],
    gujarat: [15, 45],
    haryana: [34, 28],
    "himachal pradesh": [37, 20],
    jharkhand: [60, 45],
    karnataka: [33, 75],
    kerala: [32, 87],
    "madhya pradesh": [38, 46],
    maharashtra: [31, 57],
    manipur: [87, 42],
    meghalaya: [80, 39],
    mizoram: [84, 49],
    nagaland: [89, 38],
    odisha: [58, 56],
    punjab: [31, 24],
    rajasthan: [26, 38],
    sikkim: [70, 32],
    "tamil nadu": [36, 86],
    telangana: [40, 63],
    tripura: [80, 44],
    "uttar pradesh": [48, 38],
    uttarakhand: [43, 26],
    "west bengal": [70, 48],
    delhi: [36, 31.5],
    "jammu & kashmir": [35, 12],
    ladakh: [30, 15]
};

const stateInfo = {
  "andhra pradesh": { capital: "Amaravati" },
  "arunachal pradesh": { capital: "Itanagar" },
  assam: { capital: "Dispur" },
  bihar: { capital: "Patna" },
  chhattisgarh: { capital: "Raipur" },
  goa: { capital: "Panaji" },
  gujarat: { capital: "Gandhinagar" },
  haryana: { capital: "Chandigarh" },
  "himachal pradesh": { capital: "Shimla" },
  jharkhand: { capital: "Ranchi" },
  karnataka: { capital: "Bengaluru" },
  kerala: { capital: "Thiruvananthapuram" },
  "madhya pradesh": { capital: "Bhopal" },
  maharashtra: { capital: "Mumbai" },
  manipur: { capital: "Imphal" },
  meghalaya: { capital: "Shillong" },
  mizoram: { capital: "Aizawl" },
  nagaland: { capital: "Kohima" },
  odisha: { capital: "Bhubaneswar" },
  punjab: { capital: "Chandigarh" },
  rajasthan: { capital: "Jaipur" },
  sikkim: { capital: "Gangtok" },
  "tamil nadu": { capital: "Chennai" },
  telangana: { capital: "Hyderabad" },
  tripura: { capital: "Agartala" },
  "uttar pradesh": { capital: "Lucknow" },
  uttarakhand: { capital: "Dehradun" },
  "west bengal": { capital: "Kolkata" },
  delhi: { capital: "New Delhi" },
  "jammu & kashmir": { capital: "Srinagar/Jammu" },
  ladakh: { capital: "Leh" }
};

const aliases = {
  tn: "tamil nadu",
  tamilnadu: "tamil nadu",
  ap: "andhra pradesh",
  andhra: "andhra pradesh",
  mp: "madhya pradesh",
  mh: "maharashtra",
  up: "uttar pradesh",
  uk: "uttarakhand",
  jk: "jammu & kashmir",
  wb: "west bengal",
  raj: "rajasthan"
};

const lookup = {};
Object.keys(statePositions).forEach(k => lookup[k] = k);
Object.keys(aliases).forEach(a => lookup[a] = aliases[a]);

const dropdown = document.getElementById("stateDropdown");
const mapWrap = document.getElementById("mapWrap");
const clearBtn = document.getElementById("clearBtn");
const placed = new Set();

Object.keys(statePositions).sort().forEach(st => {
    const opt = document.createElement("option");
    opt.value = st;
    opt.textContent = st.replace(/\b\w/g, c => c.toUpperCase());
    dropdown.appendChild(opt);
});

dropdown.onchange = () => {
    if (dropdown.value) search(dropdown.value);
};

function normalize(s) {
    return s.trim().toLowerCase().replace(/\s+/g, " ");
}

function placeFlag(state) {
    const [xp, yp] = statePositions[state];

    const marker = document.createElement("div");
    marker.className = "marker";
    marker.style.left = xp + "%";
    marker.style.top = yp + "%";

    const info = stateInfo[state];

    marker.innerHTML = `
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
            <rect x="2" y="2" width="2" height="20" fill="#333"/>
            <path d="M4 5c2-1 5-1 7 0 2 1 5 1 7 0v10c-2 1-5 1-7 0-2-1-5-1-7 0V5z" fill="#d10000"/>
        </svg>
        <div class="tooltip">
            <b>${state.replace(/\b\w/g, c => c.toUpperCase())}</b><br>
            Capital: ${info.capital}
        </div>
    `;
    mapWrap.appendChild(marker);
    placed.add(state);
}

function flash(state) {
    document.querySelectorAll(".marker").forEach(m => {
        if (m.querySelector(".tooltip").innerHTML.toLowerCase().includes(state)) {
            m.animate([{ transform: "scale(1)" }, { transform: "scale(1.3)" }, { transform: "scale(1)" }], { duration: 400 });
        }
    });
}

function search(arg) {
    const name = normalize(arg);
    if (!name) return;
    let st = lookup[name];
    if (!st) return alert("Not found: " + arg);
    if (placed.has(st)) return flash(st);
    placeFlag(st);
}

clearBtn.onclick = () => {
    document.querySelectorAll(".marker").forEach(m => m.remove());
    placed.clear();


};
const addAllBtn = document.getElementById("addAllBtn");

addAllBtn.onclick = () => {
    Object.keys(statePositions).forEach(state => {
        if (!placed.has(state)) {
            placeFlag(state);
        }
    });
};

