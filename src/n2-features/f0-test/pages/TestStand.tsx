import React from "react";
import SuperInputText from "../../../n1-main/m1-ui/common/c1-SuperInputText/SuperInputText";
import SuperButton from "../../../n1-main/m1-ui/common/c2-SuperButton/SuperButton";
import SuperCheckbox from "../../../n1-main/m1-ui/common/c3-SuperCheckbox/SuperCheckbox";
import s from './TestStand.module.css'

type TestStandPropsType = {}

export const TestStand: React.FC<TestStandPropsType> = ({}) => {
    return (
        <div className={s.testStand}>
            <div className={s.text}>
                <div>Hello! It's Friday Project! 🎉</div>
                <div>And there are my super components!</div>
            </div>

            <div className={s.components}>
                <SuperInputText placeholder={'write something'}/>

                <SuperButton>
                    Click me!
                </SuperButton>

                <SuperCheckbox>
                    Click me too!
                </SuperCheckbox>
            </div>
        </div>
    )
}