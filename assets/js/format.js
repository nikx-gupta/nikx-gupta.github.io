$(function () {
    formatNavigation();
    formatTables();
    // $("#important,#topics,#commands,#references").addClass("heading");
    formatCLICommands();
    formatCollapseCode();
});

function formatNavigation() {
    const url = window.location.href;
    const crumbs = url.split('/').slice(3).filter(x => x !== "");
    if (crumbs.length > 1)
        $("#navigation").append(`<li class="breadcrumb-item"><a href="/home">Home</a></li>`);
    else
        $("#navigation").hide();
    for (let i = 0; i < crumbs.length; i++) {
        const name = crumbs[i].replace(".html", "");
        const link = "/" + crumbs.slice(0, crumbs.length - 1).join('/');
        console.log(link);
        if (name !== "home") {
            if (i === crumbs.length - 1) {
                $("#navigation").append(`<li class="breadcrumb-item active" aria-current="page">${name}</li>`);
            } else {
                $("#navigation").append(`<li class="breadcrumb-item"><a href="${link}">${name}</a></li>`);
            }
        }
    }
}

function formatTables() {
    $("table").addClass("table table-dark");
}

function formatCollapseCode() {
    // $("div.language-json").addClass("table table-dark").moreContent();
}

function formatCLICommands() {
    // console.log("updating CLI Commands");
    $("[id*=cli],[id*=arm]").each((i, el_cli) => {
        // $(el_cli).addClass("alert alert-success");
        $(el_cli).next("ul:eq(0)").each((i, el_sub_cli) => {
            // console.log("Updating CLI: ", $(el_sub_cli));
            $(el_sub_cli).find("li>h3").each((i, el_h3) => {
                const id = "headId_" + Math.random().toString().substr(2, 8);
                // collapse_panels += createCollapsiblePanel(el_h3);
                $(el_h3).parent().find(".language-json").wrap(function () {
                    return `
                        <div class="collapse" id="${id}">
                          <div class="card card-body">
                          </div>
                        </div>
                    `;
                });
                $(el_h3).replaceWith(`<a data-toggle="collapse" 
                            href="#${id}" role="button" aria-expanded="false"
                            aria-controls="${id}">${$(el_h3).text()}</a>`);
            });
        });
    });
};
