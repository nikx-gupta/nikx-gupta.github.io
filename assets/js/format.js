$(function () {
    formatNavigation();
    $("#important,#topics,#commands,#references").addClass("heading");
    formatCLICommands();
});

function formatNavigation() {
    const url = window.location.href;
    const crumbs = url.split('/').slice(3);
    if (crumbs.length > 1)
        $("#navigation").append(`<li class="breadcrumb-item"><a href="/home">Home</a></li>`);
    else
        $("#navigation").hide();
    for (let i = 0; i < crumbs.length - 1; i++) {
        const name = crumbs[i].replace(".html", "");
        const link = "/" + crumbs.slice(0, crumbs.length - 1).join('/');
        // console.log(link);
        if (name !== "home")
            $("#navigation").append(`<li class="breadcrumb-item"><a href="${link}">${name}</a></li>`);
    }

    console.log(crumbs);
}

function formatCLICommands() {
    console.log("updating CLI Commands");
    $("[id=cli],[id=arm-templates]").each((i, el_cli) => {
        $(el_cli).addClass("alert alert-success");
        $(el_cli).next("ul:eq(0)").each((i, el_sub_cli) => {
            console.log("Updating CLI: ", $(el_sub_cli));
            let collapse_panels = '';
            $(el_sub_cli).find("li>h3").each((i, el_h3) => {
                collapse_panels += createCollapsiblePanel(el_h3);
            });

            let final_html = `<div class="accordion" id="cli_accordion">${collapse_panels}</div>`;
            $(el_sub_cli).replaceWith(final_html);
        });
    });
};

function createCollapsiblePanel(el_content) {
    // let sib = $(el_content).next("div.highlighter-rouge:eq(0)");
    let sib = $(el_content).next();
    const id = "id" + Math.random().toString().substr(2, 8);
    const head_text = $(el_content).text();
    const head_id = "head" + id;
    const html = sib.prop('outerHTML');
    sib.remove();
    return `
          <div class="card">
            <div class="card-header" id="${head_id}">
              <h5 class="mb-0">
                <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#${id}" aria-expanded="true" aria-controls="${id}">
                    ${head_text}
                </button>
              </h5>
            </div>
            <div id="${id}" class="collapse hide" aria-labelledby="${head_id}" data-parent="#cli_accordion">
              <div class="card-body">
                ${html}
              </div>
            </div>
          </div>
        `;

    // let collapseHtml = `
    //         <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
    //           <div class="panel panel-default">
    //             <div class="panel-heading" role="tab" id="headingOne">
    //               <h4 class="panel-title">
    //                 <a role="button" data-toggle="collapse" data-parent="#accordion" href="#${id}" aria-expanded="true" aria-controls="collapseOne">
    //                   ${$(el_content).text()}
    //                 </a>
    //               </h4>
    //             </div>
    //              <div id="${id}" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
    //                 <div class="panel-body">
    //                     ${html}
    //                 </div>
    //              </div>
    //           </div>
    //         </div>
    //         `;

    //$(el_content).replaceWith(collapseHtml);
}
