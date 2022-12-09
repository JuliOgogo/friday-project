import React, {useState} from "react";
import SuperInputText from "../../../n1-main/m1-ui/common/c1-SuperInputText/SuperInputText";
import SuperButton from "../../../n1-main/m1-ui/common/c2-SuperButton/SuperButton";
import SuperCheckbox from "../../../n1-main/m1-ui/common/c3-SuperCheckbox/SuperCheckbox";
import s from './TestStand.module.css'
import SuperEditableSpan from "../../../n1-main/m1-ui/common/c4-SuperEditableSpan/SuperEditableSpan";

type TestStandPropsType = {}

export const TestStand: React.FC<TestStandPropsType> = ({}) => {

    const [value, setValue] = useState('')

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

                <SuperEditableSpan
                    value={value}
                    onChangeText={setValue}
                    spanProps={{
                        defaultText: 'enter text...',
                    }}
                />
            </div>
        </div>
    )
}