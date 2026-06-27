import { useCallback } from "react";

export function useProjectCardLink() {
    const openProjectCard = useCallback((categoryAnchorId, projectAnchorId = null) => {
        if (typeof window === "undefined") return;

        window.dispatchEvent(
            new CustomEvent("open-project", {
                detail: {
                    categoryAnchorId,
                    projectAnchorId,
                },
            })
        );

        const targetHash = projectAnchorId || categoryAnchorId;
        if (targetHash) {
            window.location.hash = targetHash;
        } else {
            window.history.replaceState(null, "", window.location.pathname + window.location.search);
        }
    }, []);

    return { openProjectCard };
}
