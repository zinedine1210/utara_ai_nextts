import { TopUpType } from "@@/src/types/datatabletypes";
import { formatCurrency, formatDateData } from "@@/src/utils/script";

export class TopUpModel {
    public id: string
    public orgId: string
    public parentId: string
    public recName: string
    public transDate: string
    public transId: string
    public currency: "IDR" | "THB"
    public amount: number
    public voucherCode: string
    public discount: null | string
    public discountType: null | string
    public discountValue: null | string
    public totalAmount: number
    public provider: null | string
    public providerTransId: string
    public paymentMethod: null | string
    public paymentProvider: null | string
    public bankId: null | string
    public bankAcc: null | string
    public bankVaAcc: null | string
    public paidDate: string | null
    public expireDate: string | null
    public status: string
    public recBy: string
    public recDate: string
    public modBy: null | string
    public modDate: string | null
    public originResponse: null | string
    public createAt: string

    public amountFormat: string
    public totalAmountFormat: string

    constructor(props: TopUpType) {
        this.id = props.id
        this.orgId = props.org_id
        this.parentId = props.parent_id
        this.recName = props.rec_name
        this.transDate = formatDateData(props.trans_date.toString())
        this.transId = props.trans_id
        this.currency = props.currency
        this.amount = props.amount
        this.voucherCode = props.voucher_code
        this.discount = props.discount
        this.discountType = props.discount_type
        this.discountValue = props.discount_value
        this.totalAmount = props.total_amount
        this.provider = props.provider
        this.providerTransId = props.provider_trans_id
        this.paymentMethod = props.payment_method
        this.paymentProvider = props.payment_provider
        this.bankId = props.bank_id
        this.bankAcc = props.bank_acc
        this.bankVaAcc = props.bank_va_acc
        this.paidDate = props.paid_date ? formatDateData(props.paid_date.toString()) : null
        this.expireDate = props.expire_date ? formatDateData(props.expire_date.toString()) : null
        this.status = props.status
        this.recBy = props.rec_by
        this.recDate = formatDateData(props.rec_date)
        this.modBy = props.mod_by
        this.modDate = props.mod_date ? formatDateData(props.mod_date.toString()) : null
        this.originResponse = props.origin_response
        this.createAt = formatDateData(props.rec_date)
        this.totalAmountFormat = formatCurrency(props.total_amount, false)
        this.amountFormat = formatCurrency(props.amount, false)
    }

    static toDatatableResponse = (array: TopUpType[]) => {
        return array.map((item: TopUpType) => {
            return new TopUpModel(item)
        })
    }
}
