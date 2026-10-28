
window.addEventListener("load", function () {
    const buttons = document.querySelectorAll(".NI button");
    const national = document.querySelector(".clients-section .NC");
    const international = document.querySelector(".clients-section #I");

    if (!national || !international || buttons.length === 0) {
        console.error("National/International sections ya buttons nahi mile.");
        return;
    }

    function showClients(type) {
        // Dono sections ko pehle hide karo
        national.style.display = "none";
        international.style.display = "none";

        // Sabhi buttons se active class hatao
        buttons.forEach(function (btn) {
            btn.classList.remove("active");
        });

        // Selected section show karo
        if (type === "N") {
            national.style.display = "grid";
        } else if (type === "I") {
            international.style.display = "grid";
        }

        // Selected button ko active banao
        buttons.forEach(function (btn) {
            if (btn.dataset.target === type) {
                btn.classList.add("active");
            }
        });

        console.log("Selected clients:", type);
    }

    // Buttons par click event
    buttons.forEach(function (btn) {
        btn.addEventListener("click", function () {
            showClients(this.dataset.target);
        });
    });

    // Page load par National Clients dikhao
    showClients("N");
});
