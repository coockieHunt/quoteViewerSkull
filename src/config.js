const config = {
    title_page: import.meta.env.VITE_TITLE_PAGE || "Quote App",
    max_quote_length: 500,
    copy_success_message: "Quote copied to clipboard!",
    copy_failure_message: "Failed to copy quote."
};

export default config;
