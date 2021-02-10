
/* global CMS */

"use strict";

CMS.registerEditorComponent({
    id: "learning-block",
    label: "Learning Block",
    fields: [
        {
            name: "content",
            label: "Content",
            widget: "markdown"
        },
        {
            name: "title",
            label: "Title",
            widget: "string"
        }
    ],
    pattern: /^{% example "([\s\S]*?)" %}([\s\S]*?){% endexample %}/,
    fromBlock: function (match) {
        return {
            title: match[1],
            content: match[2]
        };
    },
    toBlock: function (obj) {
        return `{% example "${obj.title}" %}\n${obj.content}\n{% endexample %}`;
    },
    toPreview: function (obj) {
        var md = window.markdownit();
        var content = obj.content ? md.render(obj.content) : "";
        return `<div class="block example-block"><svg width="40" height="38" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.262 38c-.487 0-.73 0-.974-.249-.487-.497-.73-1.244-.73-1.741l1.948-11.444-8.283-8.21c-.487-.497-.73-1.243-.487-1.99.243-.746.73-1.243 1.461-1.243l11.207-1.742L18.52.933c.73-1.244 2.68-1.244 3.167 0l5.116 10.448 11.207 1.742c.73 0 1.218.497 1.461 1.244.244.746 0 1.492-.487 1.99l-8.04 7.96 1.95 11.444c0 .746-.244 1.493-.731 1.741-.487.498-1.218.498-1.95.25l-9.988-5.474-9.988 5.473c-.487 0-.73.249-.975.249zm10.963-8.21c.244 0 .488 0 .731.25l9.258 4.975-1.705-10.449c0-.497 0-1.244.487-1.741l7.552-7.463-10.232-1.493c-.487 0-1.218-.498-1.462-.995l-4.629-9.453-4.628 9.453c-.244.497-.975.995-1.462.995L3.903 15.362l7.552 7.463c.487.497.73.995.487 1.741L9.993 35.015l9.258-4.976c.243-.248.487-.248.974-.248z" fill="currentColor"/></svg><p class="h4">${obj.title || "Example"}</p>${content}</div>`;
    }
});
