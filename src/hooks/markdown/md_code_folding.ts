export default class mdCodeFoldHooks {
    protected static foldCode(event: Event) {
        const trigger = event.target as HTMLElement; // Get the clicked button element

        // check if the clicked element is a fold button (parent of target)
        if (
            trigger.classList.contains('md-code-fold-btn') ||
            trigger.classList.contains('md-code-fold-icon')
        ) {
            const codeBlk = trigger.closest('code') as HTMLElement; // Get the code block element
            if (!codeBlk) return;
            codeBlk.classList.toggle('collapsed');
        }
    }

    /**
     * Description addCodeFoldingHook method.
     * This function use **Event Delegation** to add code folding hook dynamically.
     *    so it also handles the case where code blocks are dynamically added to the page.
     *    e.g when edit blog
     * @returns {any}
     */
    public static addCodeFoldingHook() {
        const buttons = document.querySelectorAll('.markdown-body');
        buttons.forEach((btn) => {
            btn.removeEventListener('click', mdCodeFoldHooks.foldCode);
            btn.addEventListener('click', mdCodeFoldHooks.foldCode);
        });
    }

    public static removeCodeFoldingHook() {
        const buttons = document.querySelectorAll('.markdown-body');
        buttons.forEach((btn) => {
            btn.removeEventListener('click', mdCodeFoldHooks.foldCode);
        });
    }
}
