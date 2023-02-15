const Global_Summary_URL=`https://api.covid19api.com/summary`;
const India_Summary_URL=`https://api.covid19api.com/dayone/country/India/status/confirmed`;

const display= async(url,key) => {
try{
   const response = await fetch(url);
   const result = await response.json(); //Converting raw data to readable stream
   key==="Global Summary Data"?display_Global_Summary_details(result):display_India_Summary_details(result);
}
catch(err){
    console.error(err);
}
}

const display_Global_Summary_details=(x)=>{
    document.getElementById("India_D").innerHTML="";
    if(x.Message!==""){
        alert("Kindly try after 5 mins - Caching the data !!!!");
        document.getElementById("Global").disabled = true;
        setTimeout(() => {
            document.getElementById("Global").disabled = false;
        }, 300000);
    }
 let Global_Info="";
 Global_Info=`
   <div class="card border border-dark border-2" id="display-card">
   <div class="card-header text-center text-dark fw-bold"> Global Covid Summary Report </div>
   <div class="card-body">
   <p class="card-text"><span class="fw-bold">Date: </span>${x.Global.Date}</p>
   <p class="card-text"><span class="fw-bold">New Cases Confirmed: </span>${x.Global.NewConfirmed}</p>
   <p class="card-text"><span class="fw-bold">Total Cases Confirmed: </span>${x.Global.TotalConfirmed}</p>
   <p class="card-text"><span class="fw-bold">New Deaths: </span>${x.Global.NewDeaths}</p>
   <p class="card-text"><span class="fw-bold">Total Deaths: </span>${x.Global.TotalDeaths}</p>
   <p class="card-text"><span class="fw-bold">New Recovered: </span> ${x.Global.NewRecovered}</p>
   <p class="card-text"><span class="fw-bold">Total Recovered: </span>${x.Global.TotalRecovered}</p>
   </div>
   </div>
   </div>`
    document.getElementById("Global_D").innerHTML=Global_Info;
}

const display_India_Summary_details=(data)=>{
    document.getElementById("Global_D").innerHTML="";
    let India_info="";
    India_info=`<table class="table table-bordered border-dark border-2 align-middle">
    <thead><tr><th>Date</th><th>Number Of Cases</th></tr></thead>
    <tbody id="table-body"></tbody></table>`;
    document.getElementById("India_D").innerHTML=India_info;
    India_info="";
    data.map((x)=>{
        India_info+=`<tr><td>${x.Date.substring(0,10)}</td><td>${x.Cases}</td></tr>`;
    });
    document.getElementById("table-body").innerHTML=India_info;
   }

let global_btn=document.getElementById("Global")
global_btn_key=global_btn.innerText;
global_btn.addEventListener("click",function(){display(Global_Summary_URL,global_btn_key);});

let india_summary_btn=document.getElementById("India_Summary");
india_btn_key=india_summary_btn.innerText;
india_summary_btn.addEventListener("click",function(){display(India_Summary_URL,india_btn_key);});