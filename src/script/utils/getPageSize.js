export default function getPageSize() {
    return {
        width: Math.max(
            document.documentElement.clientWidth,
            document.documentElement.scrollWidth,
            document.body.scrollWidth
        ),
        height: Math.max(
            document.documentElement.clientHeight,
            document.documentElement.scrollHeight,
            document.body.scrollHeight
        )
    };
}