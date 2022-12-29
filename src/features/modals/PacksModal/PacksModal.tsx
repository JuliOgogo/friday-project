import React, { FC } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import { Checkbox, FormControlLabel, FormGroup, IconButton, Typography } from '@mui/material'
import { useFormik } from 'formik'

import style from '../../auth/login/loginForm/LoginForm.module.css'
import { createPackTC, updatePackTC } from '../../packs/packs-reducer'
import { BaseModal } from '../BaseModal/BaseModal'
import { ButtonModalGroup } from '../ButtonModalGroup'

import { useAppDispatch } from 'app/store'
import { CustomInput } from 'common/components/CustomInput/CustomInput'
import { Title } from 'common/components/Title/Title'

export const PacksModal: FC<PacksModalType> = ({ titleName, open, hide, id_pack }) => {
  const dispatch = useAppDispatch()

  const formik = useFormik({
    initialValues: {
      packName: '',
      private: false,
    },
    validate: (values: { packName: string; private: boolean }) => {
      const errors: FormikErrorType = {}

      if (!values.packName) {
        errors.packName = 'Required field'
      } else if (values.packName.length > 30) {
        errors.packName = 'Pack name length must be lower than 30 symbols ⚠'
      }

      return errors
    },
    onSubmit: (values: { packName: string; private: boolean }) => {
      if (titleName === 'Add new pack') {
        dispatch(createPackTC(values.packName, values.private))
        hide()
      } else if (titleName === 'Edit pack') {
        dispatch(updatePackTC(values.packName, id_pack ? id_pack : ''))
        hide()
      }
    },
  })

  return (
    <>
      <BaseModal open={open}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '400px',
            height: '70px',
          }}
        >
          <Title text={titleName} />
          <IconButton
            style={{
              backgroundColor: 'transparent',
              boxShadow: 'none',
            }}
          >
            <CloseIcon
              fontSize={'large'}
              onClick={hide}
              style={{
                width: '30px',
              }}
            />
          </IconButton>
        </div>
        <hr />
        <div
          style={{
            display: 'flex',
            flexFlow: 'column wrap',
          }}
        >
          <FormGroup>
            <CustomInput
              label={'Name pack'}
              error={!!formik.errors.packName && formik.touched.packName}
              helperText={formik.touched.packName && formik.errors.packName}
              {...formik.getFieldProps('packName')}
            />
            <div className={style.checkboxPrivate}>
              <FormControlLabel
                label={<Typography className={style.checkboxRemember}>Private pack</Typography>}
                control={<Checkbox checked={formik.values.private} {...formik.getFieldProps('private')} />}
              />
            </div>
            <ButtonModalGroup
              hide={hide}
              onClickHandler={() => {
                formik.handleSubmit()
              }}
            />
          </FormGroup>
        </div>
      </BaseModal>
    </>
  )
}

type PacksModalType = {
  titleName: string
  open: boolean
  hide: () => void
  id_pack?: string
}
type FormikErrorType = {
  packName?: string
  private?: boolean
}
