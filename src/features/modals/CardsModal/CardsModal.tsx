import React, { FC, useState } from 'react'

import { FormGroup, Select, MenuItem, SelectChangeEvent } from '@mui/material'
import InputLabel from '@mui/material/InputLabel'
import { useFormik } from 'formik'

import { CardType } from '../../cards/cards-api'
import { addCardTC, updateCardTC } from '../../cards/cards-reducer'
import { BaseModal } from '../BaseModal'
import { ButtonModalGroup } from '../ButtonModalGroup'
import s from '../Modal.module.css'

import { useAppDispatch } from 'app/store'
import { CustomInput } from 'common/components/CustomInput/CustomInput'

export const CardsModal: FC<CardsModalType> = ({
  titleName,
  id_pack,
  id_card,
  open,
  hide,
  cardQuestion,
  cardAnswer,
}) => {
  const dispatch = useAppDispatch()
  const [itemName, setItemName] = useState('Text')
  const menuItems = ['Text', 'Image', 'Video']

  const handleChange = (event: SelectChangeEvent) => {
    setItemName(event.target.value as string)
  }

  const formik = useFormik({
    initialValues: {
      question: cardQuestion ? cardQuestion : '',
      answer: cardAnswer ? cardAnswer : '',
    },
    validate: (values: ValuesType) => {
      const errors: FormikErrorType = {}

      if (!values.question) {
        errors.question = 'Required field'
      } else if (values.question.length > 70) {
        errors.question = 'Question length must be lower than 70 symbols ⚠'
      }

      if (!values.answer) {
        errors.answer = 'Required field'
      } else if (values.answer.length > 70) {
        errors.answer = 'Answer length must be lower than 70 symbols ⚠'
      }

      return errors
    },
    onSubmit: (values: ValuesType) => {
      if (titleName === 'Add new card') {
        formik.resetForm()
        dispatch(addCardTC({ cardsPack_id: id_pack, question: values.question, answer: values.answer }))
        hide()
      } else if (titleName === 'Edit card') {
        dispatch(
          updateCardTC(id_pack, {
            _id: id_card ? id_card : '',
            question: values.question,
            answer: values.answer,
          })
        )
        hide()
      }
    },
  })

  return (
    <>
      <BaseModal open={open} titleName={titleName} hide={hide}>
        <FormGroup>
          <InputLabel className={s.label}>Choose a question format</InputLabel>
          <Select value={itemName} label="Choose a question format" onChange={handleChange}>
            {menuItems.map((i, index) => (
              <MenuItem key={index} value={i}>
                {i}
              </MenuItem>
            ))}
          </Select>
          <CustomInput
            label={'Question'}
            error={!!formik.errors.question && formik.touched.question}
            helperText={formik.touched.question && formik.errors.question}
            {...formik.getFieldProps('question')}
          />
          <CustomInput
            label={'Answer'}
            error={!!formik.errors.answer && formik.touched.answer}
            helperText={formik.touched.answer && formik.errors.answer}
            {...formik.getFieldProps('answer')}
          />
          <ButtonModalGroup
            hide={hide}
            onClickHandler={() => {
              formik.handleSubmit()
            }}
          />
        </FormGroup>
      </BaseModal>
    </>
  )
}

type CardsModalType = {
  titleName: string
  id_pack: string
  open: boolean
  hide: () => void
  id_card?: string
  cardQuestion?: string
  cardAnswer?: string
}
type FormikErrorType = {
  question?: string
  answer?: string
}
type ValuesType = Pick<CardType, 'question' | 'answer'>
