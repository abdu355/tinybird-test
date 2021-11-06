const isEmpty = (obj) => {
    return obj && Object?.keys(obj)?.length === 0 ? "Result is an empty object." : "";
}
export default isEmpty