
import {ChangeEvent, FC} from "react";

export type PropsType = {
    checked: boolean
    callBack: (isDone: boolean) => void
}



export const SuperCheckBox: FC<PropsType> = ({checked, callBack}) => {

const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        callBack(e.currentTarget.checked)
}

    return (
        <input
            type={"checkbox"}
            checked={checked}
            color="primary"
            onChange={onChangeHandler}
        />
    );
};
