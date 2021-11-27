const iwe = [ document.getElementById("bill_iw"), document.getElementById("people_iw")];
const reset = document.querySelector(".results_card button");
const form = document.dashboard;

document.querySelector(".attribution span").addEventListener("click", () => {
    document.querySelector(".attribution").classList.toggle("active")
} );

iwe.forEach( el => {
    el.addEventListener("input", inputCheck);
} );

form.custom.addEventListener("input", () => {
    form.tip_percent.forEach( el => {
        el.checked = false;
    } );
    calculate();
} );

form.tip_percent.forEach( el => {
    el.addEventListener( "click", calculate );
} );

reset.addEventListener("click", () => {
    iwe.forEach( el => {
        el.removeAttribute("data-error");
    } )
});

function inputCheck()
{
    let value = this.querySelector("input").value;
    this.removeAttribute("data-error");
    if ( value != "" )
    {
        if ( value <= 0 )
        {
            this.setAttribute( "data-error", "Can't be zero" );
        }
        else
        {
            calculate();
        }
    }
}

function calculate()
{
    if ( form.bill.value != "" && form.people_count.value != "" )
    {
        if ( form.tip_percent.value != "" || form.custom.value != "" )
        {
            var tip_pp = form.custom.value == "" ? (form.bill.value * form.tip_percent.value) / form.people_count.value : (form.bill.value * (form.custom.value / 100)) / form.people_count.value ;
            var bill_pp = (form.bill.value / form.people_count.value) + tip_pp ;
            
            form.tip_result.value = "$" + tip_pp.toFixed(2);
            form.total_result.value = "$" + bill_pp.toFixed(2);
        }
    }
}