$(function () {
    $(document).on('click', '[data-toggle="lightbox"]', function (event) {
        event.preventDefault();
        $(this).ekkoLightbox();
    });
    format_image()
})

function format_image() {
    $("img").each((i, img) => {
        const attrAlt = $(img).attr('alt').split('_');
        const src = $(img).prop('src');
        if (attrAlt[0] === "Center")
            $(img).addClass('img-center');
        if (attrAlt.length > 1)
            $(img).width(attrAlt[1]);
        $(img).wrap(`<a href=\"${src}\" data-toggle=\"lightbox\" class="ml-4"></a>`)
    });
}
