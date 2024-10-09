import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "react-dom/client";
import Main from "./Layout/Main";
import Auth from "./Layout/Auth";

createInertiaApp({
    resolve: (name) => {
        const pages = import.meta.glob("./Pages/**/*.jsx", { eager: true });
        let page = pages[`./Pages/${name}.jsx`];
        if (!page) {
            throw new Error(`Page not found: ${name}`);
        }
        if (name.startsWith("Admin/")) {
            page.default.layout = page.default.layout || ((page) => <Main>{page}</Main>);
        } else {
            page.default.layout = page.default.layout || ((page) => <Auth>{page}</Auth>);
        }
        return page;
    },
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />);
    },
});