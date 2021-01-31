$(function () {
    $(document).on('click', '[data-toggle="lightbox"]', function(event) {
        event.preventDefault();
        $(this).ekkoLightbox();
    });
    center_image()
})

function center_image() {
    $("img").attr('data-toggle', 'lightbox');
    //
    // $("[alt^='Left_']").each((index, el) => {
    //     // console.log("Image: ", el);
    //     var value_alt = $(el).attr('alt').split('_')
    //     if (value_alt.length > 1) {
    //         $(el).width(value_alt[1])
    //     }
    //
    //     const src = $(el).prop('src');
    //     $(el).wrap(`<a href=\"${src}\" data-toggle=\"lightbox\" class="ml-4"></a>`)
    //     $(el).addClass('border border-dark')
    // })
    //
    // $("[alt^='Center_']").each((index, el) => {
    //     // console.log("Image: ", el);
    //     let value_alt = $(el).attr('alt').split('_')
    //     if (value_alt.length > 1) {
    //         $(el).width(value_alt[1]);
    //     }
    //
    //     const src = $(el).prop('src');
    //     $(el).addClass('img-center');
    //     $(el).wrap(`<a href=\"${src}\" data-toggle=\"lightbox\"></a>`)
    // })
    // $("[alt^='Small_']").each((index, el) => {
    //     // console.log("Image: ", el);
    //     var value_alt = $(el).attr('alt').split('_')
    //     $(el).addClass('small-img-center')
    //     if (value_alt.length > 1) {
    //         $(el).width(value_alt[1])
    //     }
    // })
}
