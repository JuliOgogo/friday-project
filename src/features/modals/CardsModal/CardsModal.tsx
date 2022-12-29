import React, { FC, useState } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import { FormGroup, Select, MenuItem, SelectChangeEvent, IconButton } from '@mui/material'
import InputLabel from '@mui/material/InputLabel'
import { useFormik } from 'formik'

import { addCardTC, updateCardTC } from '../../cards/cards-reducer'
import { BaseModal } from '../BaseModal/BaseModal'
import { ButtonModalGroup } from '../ButtonModalGroup'

import { useAppDispatch } from 'app/store'
import { CustomInput } from 'common/components/CustomInput/CustomInput'
import { Title } from 'common/components/Title/Title'

export const CardsModal: FC<CardsModalType> = ({ titleName, id_pack, id_card, open, hide }) => {
  const dispatch = useAppDispatch()
  const [itemName, setItemName] = useState('')

  const handleChange = (event: SelectChangeEvent) => {
    setItemName(event.target.value as string)
  }

  const formik = useFormik({
    initialValues: {
      question: '',
      answer: '',
    },
    validate: (values: { question: string; answer: string }) => {
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
    onSubmit: (values: { question: string; answer: string }) => {
      if (titleName === 'Add new card') {
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
  // const menuItems = ['Text', 'Image', 'Video']

  return (
    <>
      <BaseModal open={open}>
        <Title text={titleName} />
        <IconButton>
          <CloseIcon fontSize={'large'} onClick={hide} />
        </IconButton>
        <FormGroup>
          <InputLabel>Choose a question format</InputLabel>
          <Select value={itemName} label="Choose a question format" onChange={handleChange}>
            <MenuItem value={'Text'}>Text</MenuItem>
            <MenuItem value={'Image'}>Image</MenuItem>
            <MenuItem value={'Video'}>Video</MenuItem>
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
  id_card?: string
  open: boolean
  hide: () => void
}
type FormikErrorType = {
  question?: string
  answer?: string
}
