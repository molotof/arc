const ENTRY_TYPE_MARKDOWN = 3;

function MarkdownEntry(name, value) {
    Entry.call( this, ENTRY_TYPE_MARKDOWN, name, value );
}

MarkdownEntry.prototype = Object.create(Entry.prototype);
MarkdownEntry.prototype.constructor = MarkdownEntry;

MarkdownEntry.prototype.TypeName = function() {
    return "MarkdownEntry";
}

MarkdownEntry.prototype.Render = function(with_value, id){
    return this.formGroup( this.textarea(true, with_value, id), id );
}

MarkdownEntry.prototype.OnRendered = function(id) {
    Entry.prototype.OnRendered.call( this, id );

    var on_show = undefined;
    // enable preview
    if( this.is_new == false ) {
        on_show = function(e) {
            $('button[data-handler=bootstrdefaultTargetap-markdown-cmdPreview]').click();
            // for some reason the width of the preview area is computed before
            // it is actually visible, so it sticks to 100px if we call the preview
            // here ... we need to refresh it -.-.
            $('.md-preview').css('width', '');
        };
    }

    var elem_id = this.id(id);
    var elem = $('#' + elem_id);
    elem.markdown({
        autofocus:true,
        savable:false,
        iconlibrary:'fa',
        fullscreen:{
            'enable': true,
            'icons': 'fa'
        },
        onShow: on_show,
    });
}
