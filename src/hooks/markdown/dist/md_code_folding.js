"use strict";
exports.__esModule = true;
var mdCodeFoldHooks = /** @class */ (function () {
    function mdCodeFoldHooks() {
    }
    mdCodeFoldHooks.foldCode = function (event) {
        var trigger = event.target; // Get the clicked button element
        // check if the clicked element is a fold button (parent of target)
        if (trigger.classList.contains('md-code-fold-btn') ||
            trigger.classList.contains('md-code-fold-icon')) {
            var codeBlk = trigger.closest('code'); // Get the code block element
            if (!codeBlk)
                return;
            codeBlk.classList.toggle('collapsed');
        }
    };
    /**
     * Description addCodeFoldingHook method.
     * This function use **Event Delegation** to add code folding hook dynamically.
     *    so it also handles the case where code blocks are dynamically added to the page.
     *    e.g when edit blog
     * @returns {any}
     */
    mdCodeFoldHooks.addCodeFoldingHook = function () {
        var buttons = document.querySelectorAll('.markdown-body');
        buttons.forEach(function (btn) {
            btn.removeEventListener('click', mdCodeFoldHooks.foldCode);
            btn.addEventListener('click', mdCodeFoldHooks.foldCode);
        });
    };
    mdCodeFoldHooks.removeCodeFoldingHook = function () {
        var buttons = document.querySelectorAll('.markdown-body');
        buttons.forEach(function (btn) {
            btn.removeEventListener('click', mdCodeFoldHooks.foldCode);
        });
    };
    return mdCodeFoldHooks;
}());
exports["default"] = mdCodeFoldHooks;
