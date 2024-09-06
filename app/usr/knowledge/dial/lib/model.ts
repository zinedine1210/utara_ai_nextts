import { DialList } from "@@/src/types/types";
export class DialModel {
    public code: string;
    public dial_code: string;
    public name: string;


    constructor(props: DialList){
        this.code = props.code
        this.dial_code = props.dial_code
        this.name = props.name
    }

    static toDatatableResponse = (array: DialList[]) => {
        return array.map((item: DialList) => {
            return new DialModel(item)
        })
    }

    static toOptions = (array: DialList[]) => {
        return array.map((item: DialList) => {
            return {
                label: item.name,
                value: item.dial_code
            }
        })
    }
}