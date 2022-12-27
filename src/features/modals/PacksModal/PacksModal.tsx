import React, { FC } from 'react'

import { Button, Checkbox, FormControlLabel, FormGroup, Typography } from '@mui/material'
import { useFormik } from 'formik'

import { useAppDispatch } from '../../../app/store'
import { CustomButton } from '../../../common/components/CustomButton/CustomButton'
import style from '../../auth/login/loginForm/LoginForm.module.css'
import { createPackTC } from '../../packs/packs-reducer'
import { BaseModal } from '../BaseModal/BaseModal'

import { CustomInput } from 'common/components/CustomInput/CustomInput'
import { Title } from 'common/components/Title/Title'

export const PacksModal: FC<PacksModalType> = ({ titleName }) => {
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
      } else if (values.packName.length > 20) {
        errors.packName = 'Pack name length must be lower than 20 symbols ⚠'
      }

      return errors
    },
    onSubmit: (values: { packName: string; private: boolean }) => {
      dispatch(createPackTC(values.packName, values.private))
    },
  })

  return (
    <>
      <BaseModal text={titleName}>
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
          <Button
            onClick={() => {
              // onClose(false)
            }}
            sx={{ width: '170px', mt: '60px' }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              formik.handleSubmit()
            }}
            variant="contained"
            type={'submit'}
            color={'primary'}
            sx={{ width: '170px' }}
          >
            Save
          </Button>
        </FormGroup>
      </BaseModal>
    </>
  )
}

type PacksModalType = {
  titleName: string
}
type FormikErrorType = {
  packName?: string
  private?: boolean
}

//onClose={handleOpen(false)}
