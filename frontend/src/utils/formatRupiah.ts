const rupiah = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
})

export function formatRupiah(price: number) {
    return rupiah.format(price)
}
