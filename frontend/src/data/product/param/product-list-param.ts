// Serializes optional filters into request query parameters.
export default class ProductListParam {
    private readonly query: string

    constructor({ query = "" }: { query?: string } = {}) {
        this.query = query.trim()
    }

    toQueryString(): string {
        const params = new URLSearchParams()
        // The query key must match the backend contract.
        if (this.query) params.set("q", this.query)
        return params.toString()
    }
}
