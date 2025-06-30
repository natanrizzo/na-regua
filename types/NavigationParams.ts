import { Service } from "./Service"

export type NavigationParams = {
    ServicesList: undefined
    TimePicker: {
        selectedServiceIds: string[]
    }
    OrderSummary: {
        selectedServices: Service[]
        selectedDateTime: string
    }
}
