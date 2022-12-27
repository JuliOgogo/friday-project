import React, { FC } from 'react'

import { Checkbox, FormControlLabel, FormGroup, Typography } from '@mui/material'
import { useFormik } from 'formik'
import { useParams } from 'react-router-dom'

import { useAppDispatch } from '../../../app/store'
import style from '../../auth/login/loginForm/LoginForm.module.css'
import { createPackTC, updatePackTC } from '../../packs/packs-reducer'
import { BaseModal } from '../BaseModal/BaseModal'

import { ButtonGroup } from './ButtonGroup'

import { CustomInput } from 'common/components/CustomInput/CustomInput'
import { Title } from 'common/components/Title/Title'

export const PacksModal: FC<PacksModalType> = ({ titleName, open, hide }) => {
  const dispatch = useAppDispatch()
  const pack_id = useParams()

  const formik = useFormik({
    initialValues: {
      packName: '',
      private: false,
    },
    validate: (values: { packName: string; private: boolean }) => {
      const errors: FormikErrorType = {}

      if (!values.packName) {
        errors.packName = 'Required field'
      } else if (values.packName.length > 20) {
        errors.packName = 'Pack name length must be lower than 20 symbols ⚠'
      }

      return errors
    },
    onSubmit: (values: { packName: string; private: boolean }) => {
      if (titleName === 'Add new pack') {
        dispatch(createPackTC(values.packName, values.private))
      } else if (titleName === 'Edit pack') {
        dispatch(updatePackTC(values.packName, pack_id.toString()))
      }
    },
  })

  return (
    <>
      <BaseModal open={open}>
        <Title text={titleName} />
        <FormGroup>
          <div>
            <CustomInput
              label={'Name pack'}
              error={!!formik.errors.packName && formik.touched.packName}
              helperText={formik.touched.packName && formik.errors.packName}
              {...formik.getFieldProps('packName')}
            />
            <FormControlLabel
              label={<Typography className={style.checkboxRemember}>Private pack</Typography>}
              control={<Checkbox checked={formik.values.private} {...formik.getFieldProps('private')} />}
            />
          </div>

          <ButtonGroup
            hide={hide}
            formikHandler={() => {
              formik.handleSubmit()
            }}
          />
        </FormGroup>
      </BaseModal>
    </>
  )
}

type PacksModalType = {
  titleName: string
  open: boolean
  hide: () => void
}
type FormikErrorType = {
  packName?: string
  private?: boolean
}
